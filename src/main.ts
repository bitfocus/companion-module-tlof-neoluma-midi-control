import { createModuleLogger, InstanceBase, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { defaultValues, UpdateVariableDefinitions, type VariablesSchema } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { type ActionsSchema, UpdateActions } from './actions.js'
import { type FeedbacksSchema, UpdateFeedbacks } from './feedbacks.js'
import UpdatePresets from './presets.js'
import { Output } from './midi/midi.js'
import fs from 'fs'
import fsPromises from 'fs/promises'
import timersPromises from 'timers/promises'
import path from 'path'
import os from 'os'
import toggles from './mapping/toggles.js'
import sliders from './mapping/sliders.js'
import buttons from './mapping/buttons.js'
import enums from './mapping/enums.js'
import type LogicalMappingsEnum from './mapping/logical_mappings_enum.js'
import feedbackMappings, { type FeedbackMappings } from './mapping/feedback_mappings.js'
import type { MappingData, NumberInfo, SliderMappingData } from './mapping/mapping_data.js'
import { VRC_EDITOR_PATH, VRC_PATH } from './logPaths.js'
import { Tail } from 'tail'

const tailLogger = createModuleLogger('TailUtil')

export type ModuleSchema = {
	config: ModuleConfig
	secrets: undefined
	actions: ActionsSchema
	feedbacks: FeedbacksSchema
	variables: VariablesSchema
}

export { UpgradeScripts }

type LogFeedbackResult = {
	mapping: FeedbackMappings
	control: MappingData | SliderMappingData
	extraDataOrSection: number
	data: number
}

const FIND_MAPPING_PREDICATE = (option: string) => (toggle: MappingData<unknown>) => {
	if (toggle.isLogical) option = option.replace(/^LOGICAL__/m, '')
	if (toggle.type === 'indexed') option = option.replace(/^INDEX__/m, '')
	return toggle.id == option
}

export default class ModuleInstance extends InstanceBase<ModuleSchema> {
	config!: ModuleConfig // Setup in init()
	#midiOutput: Output | null = null
	#inReset: boolean = false
	#logTail: Tail | null = null
	#lastUpdate: number
	#lastWatchdog: number
	#watchdogInterval: NodeJS.Timeout | null = null
	#resetTimeout: AbortController = new AbortController()
	#readLogTimeout: AbortController = new AbortController()

	constructor(internal: unknown) {
		super(internal)
		this.#lastUpdate = Date.now()
		this.#lastWatchdog = Date.now()
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updatePresets() // export Presets
		this.updateVariableDefinitions() // export variable definitions

		await this.configUpdated(config)
	}

	async destroy(): Promise<void> {
		this.reset({
			reason: 'destroying module',
			doReconnect: false,
			closeLogfile: true,
			ignoreInReset: true,
		})
		if (this.#watchdogInterval !== null) clearInterval(this.#watchdogInterval)
		this.#watchdogInterval = null
		this.#midiOutput?.close()
		this.#midiOutput = null
		this.log('debug', `${this.id} destroyed`)
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config

		this.log('debug', `Selected MIDI Output: ${config.outPortName}`)

		this.reset({
			reason: 'config updated',
			closeLogfile: false,
			doReconnect: false,
			ignoreInReset: true,
		})

		if (this.#watchdogInterval !== null) clearInterval(this.#watchdogInterval)
		this.#watchdogInterval = null

		this.#midiOutput?.close()
		this.#midiOutput = new Output(config.outPortName)

		const midiOutStatus = this.#midiOutput.isPortOpen()
		this.log('info', `Selected Out Port "${this.#midiOutput.name}" is ${midiOutStatus ? '' : 'NOT '}Open.`)

		if (!midiOutStatus) {
			this.updateStatus(InstanceStatus.BadConfig, 'MIDI Out Port not open')
			this.reset({
				reason: 'MIDI Out Port not open',
				closeLogfile: true,
				doReconnect: false,
				updateStatus: false,
				ignoreInReset: true,
			})
			return
		}

		this.start()
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updatePresets(): void {
		UpdatePresets(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}

	start(): void {
		this.#resetTimeout.abort('module started')
		this.#resetTimeout = new AbortController()
		this.#stopReadLogs('module started')
		this.#inReset = false
		this.log('debug', '\nEntering *main*\n')
		this.updateStatus(InstanceStatus.Connecting, 'Connecting for the first time')
		this.#lastUpdate = Date.now()
		if (this.#watchdogInterval !== null) clearInterval(this.#watchdogInterval)
		this.#watchdogInterval = setInterval(() => this.#tick(), 250)
		this.#startLogRead()

		/*
		const feedbacks = [
			...this._parseFeedbackLog('AAAAAC0A//8BAAAA'),

			...this._parseFeedbackLog(
				'AAAAAAIA//8AAAAABQD//wAAAAARAP//AQAAABIA//8BAAAAEwD//wEAAAAGAP//AAAAAAgA//9/AAAAIgD//wMAAAAlAP//AgAAACMA//8AAAAAJAD//wQAAAAhAP//NQAAABgA//8AAAAAHgD//wIAAAAUAP//HgAAABYA//9/AAAAFQD//wAAAAAgAP//AAAAACoA//8AAAAAFwD//wIAAAAEAP//AQAAAAEA//8AAAAA',
			),
		]
		const changes: { [key: string]: number } = {}
		for (const returnedValue of feedbacks) {
			changes[
				returnedValue.mapping.name +
					(returnedValue.extraDataOrSection >= 0
						? '_' +
							(returnedValue.extraDataOrSection >= 10
								? returnedValue.extraDataOrSection
								: '0' + returnedValue.extraDataOrSection)
						: '')
			] = returnedValue.data
		}
		this.log('debug', 'DEBUGGING changes=' + JSON.stringify(changes))
		*/
	}

	//<editor-fold desc="Action Callbacks">
	#FindValue<T>(
		data: MappingData<T>[],
		option: string,
		logical: LogicalMappingsEnum,
		index: number,
		add: (value: T, logical: number) => T | undefined,
	): NumberInfo<T> | undefined {
		const toggle = data.find(FIND_MAPPING_PREDICATE(option))
		if (typeof toggle === 'undefined') {
			this.log('error', `Could not find toggle with id=${option}`)
			return
		}

		let mapping
		if (toggle.type === 'indexed') {
			if (index >= toggle.values.length) {
				this.log(
					'error',
					`Action with id=${option} required an index in the bounds of [0..${toggle.values.length}], but was given ${index}`,
				)
				return undefined
			}
			mapping = toggle.values[index]
		} else {
			mapping = toggle
		}

		if (mapping.type === 'single') {
			return mapping
		}

		const toAdd = toggle.isLogical ? logical : index
		const length = mapping.range.end - mapping.range.start + 1
		if (toAdd >= length) {
			this.log(
				'error',
				`Action with id=${option} required an index in the bounds of [0..${length}], but was given ${toAdd}`,
			)
			return undefined
		}

		switch (mapping.range.variable) {
			case 'number':
				mapping.number += toAdd
				break
			case 'velocity': {
				const velocity = add(mapping.velocity, toAdd)
				if (typeof velocity === 'undefined') {
					this.log('warn', `Failed to add ${velocity} and ${logical}`)
					break
				}

				mapping.velocity = velocity
			}
		}

		return mapping
	}
	ToggleOption(option: string, logical: LogicalMappingsEnum, index: number, value: number): void {
		const note = this.#FindValue(toggles, option, logical, index, (value, logical) => value + logical)
		if (typeof note === 'undefined') {
			this.log('error', `Could not find toggle with id=${option}`)
			return
		}

		if (value === 0) this.#sendMidiNoteOff(note.channel, note.number, note.velocity)
		else if (value === 1) this.#sendMidiNoteOn(note.channel, note.number, note.velocity)
		else this.#sendMidiControl(note.channel, note.number, note.velocity)
	}

	PressButton(option: string, logical: LogicalMappingsEnum, index: number): void {
		const value = this.#FindValue(buttons, option, logical, index, (value, logical) => value + logical)
		if (typeof value === 'undefined') {
			this.log('error', `Could not find button with id=${option}`)
			return
		}
		this.#sendMidiControl(value.channel, value.number, value.velocity)
	}

	SetEnum(option: string, logical: LogicalMappingsEnum, index: number): void {
		const value = this.#FindValue(enums, option, logical, index, (value, logical) => value + logical)
		if (typeof value === 'undefined') {
			this.log('error', `Could not find enum with id=${option}`)
			return
		}
		this.#sendMidiControl(value.channel, value.number, value.velocity)
	}

	SetSlider(option: string, logical: LogicalMappingsEnum, index: number, value: number): void {
		if (value < 0 || value > 127) return

		const slider = this.#FindValue(sliders, option, logical, index, () => undefined)
		if (typeof slider === 'undefined') {
			this.log('error', `Could not find slider with id=${option}`)
			return
		}

		this.#sendMidiControl(slider.channel, slider.number, value)
	}
	//</editor-fold>

	reset(options?: {
		reason?: string
		closeLogfile?: boolean
		doReconnect?: boolean
		updateStatus?: boolean
		ignoreInReset?: boolean
	}): void {
		const defaultOptions = {
			reason: 'reset',
			closeLogfile: true,
			doReconnect: true,
			updateStatus: true,
			ignoreInReset: false,
		}
		const parsedOptions = { ...defaultOptions, ...(options ?? {}) }

		this.log('debug', `reset called with reason: ${parsedOptions.reason}`)

		//This prevents simple reset loops, such as a reset aborting the logReader, which will also call reset on close
		if (!parsedOptions.ignoreInReset && this.#inReset) return
		this.#inReset = true

		this.#lastUpdate = Date.now()
		if (parsedOptions.closeLogfile) this.#stopReadLogs(parsedOptions.reason)

		this.#resetTimeout.abort(parsedOptions.reason)
		const oldResetController = new AbortController()
		this.#resetTimeout = oldResetController

		this.setVariableValues({
			connected: false,
			...defaultValues,
		})
		this.checkAllFeedbacks()
		if (parsedOptions.updateStatus)
			this.updateStatus(InstanceStatus.Disconnected, `Connection Lost or Reset - ${parsedOptions.reason}`)

		void timersPromises
			// 1 second
			.setTimeout(1e3, undefined, {
				signal: oldResetController.signal,
			})
			.then(() => {
				if (!parsedOptions.doReconnect) return
				if (parsedOptions.updateStatus) this.updateStatus(InstanceStatus.Connecting, 'Connecting after reset')
				this.#lastUpdate = Date.now()
				this.#startLogRead()
			})
			.catch((e) => {
				if (e.name === 'AbortError')
					if (typeof e.cause === 'string') this.log('info', `reconnection aborted, because: ${e.cause}`)
					else this.log('info', 'reconnection aborted')
				else this.log('error', `reconnection failed, due to error: ${e}`)
			})
			.finally(() => {
				if (oldResetController == this.#resetTimeout) this.#inReset = false
			})
	}

	#startLogRead(): void {
		if (this.isLogRead() || !this.#midiOutput?.isPortOpen()) return

		void timersPromises
			.setImmediate(undefined, {
				signal: this.#readLogTimeout.signal,
			})
			.then(async () => {
				await this.#readLogs()
				this.#midiPing()
			})
			.catch((e) => {
				if (e.name === 'AbortError') {
					if (typeof e.cause === 'string') this.log('info', `logRead aborted, because: ${e.cause}`)
					else this.log('info', 'logRead aborted')
				} else this.log('error', `logRead failed, due to error: ${e}`)
			})
	}

	isLogRead(): boolean {
		return this.#logTail !== null
	}

	#tick(): void {
		const elapsed = (Date.now() - this.#lastUpdate) / 1000
		const timeout = 20
		if (elapsed > timeout) {
			this.#lastUpdate = Date.now()
			this.reset({
				reason: `VRChat World did not respond to Midi Pings in the last ${timeout} seconds`,
			})
			return
		}

		const elapsedWatchdog = (Date.now() - this.#lastWatchdog) / 1000
		if (elapsedWatchdog > 5) {
			this.#midiPing()
			this.#lastWatchdog = Date.now()
		}
	}

	//<editor-fold desc="Midi functions">
	#sendMidiControl(channel: number, number: number, value: number): void {
		if (!this.#midiOutput?.isPortOpen()) return
		// this.log('debug', `Sending CC ch${channel} number${number} value${value}`)
		this.#midiOutput.sendMessage([0xb0 | (channel & 0xf), number, value & 0x7f])
	}

	#sendMidiNoteOn(channel: number, note: number, velocity: number): void {
		if (!this.#midiOutput?.isPortOpen()) return
		// this.log('debug', `Sending NOTE_ON ch${channel} note${note} vel${velocity}`)
		this.#midiOutput.sendMessage([0x90 | (channel & 0xf), note, velocity & 0x7f])
	}

	#sendMidiNoteOff(channel: number, note: number, velocity: number): void {
		if (!this.#midiOutput?.isPortOpen()) return
		// this.log('debug', `Sending NOTE_OFF ch${channel} note${note} vel${velocity}`)
		this.#midiOutput.sendMessage([0x80 | (channel & 0xf), note, velocity & 0x7f])
	}

	#midiPing(): void {
		if (!this.isLogRead() || !this.#midiOutput?.isPortOpen()) return
		this.log('debug', 'Sending MidiPing')
		this.#sendMidiNoteOn(0, 1, 20) // Ping
	}

	#setMidiReady(): void {
		if (this.getVariableValue('connected') !== true) {
			this.setVariableValues({ connected: true })
			this.checkFeedbacks('connected')
			this.updateStatus(InstanceStatus.Ok)

			this.#sendMidiNoteOff(0, 1, 119) // Set log received/processed OFF
			this.#sendMidiNoteOn(0, 1, 120) // Set midi feedback ON
			this.#sendMidiNoteOn(0, 1, 121) // Dump state
		}
	}

	#setMidiNotReady(): void {
		this.updateStatus(InstanceStatus.Disconnected, 'Midi not ready')
		this.reset({
			reason: 'Received Midi Not Ready event from world',
			closeLogfile: false,
		})
	}
	//</editor-fold>

	#stopReadLogs(reason: string): void {
		this.#logTail?.unwatch()
		this.#logTail = null
		this.#readLogTimeout.abort(reason)
		this.#readLogTimeout = new AbortController()
	}
	async #readLogs(): Promise<boolean> {
		if (this.isLogRead() || !this.#midiOutput?.isPortOpen()) return false
		try {
			const logPath = await this.#findVRCLog()
			if (logPath == null) return false
			const tailObj = new Tail(logPath, {
				fromBeginning: false,
				fsWatchOptions: {
					signal: this.#readLogTimeout.signal,
				},
				follow: false,
				logger: {
					info(data: any) {
						tailLogger.debug(`${typeof data === 'string' ? data.replace(os.homedir(), '$HOME') : data}`)
					},
					error(data: any) {
						tailLogger.warn(`${typeof data === 'string' ? data.replace(os.homedir(), '$HOME') : data}`)
					},
				},
				encoding: 'utf-8',
			})
			this.#logTail = tailObj
			this.log('debug', `Watching log: ${logPath.replace(os.homedir(), '$HOME')}`)

			tailObj.on('line', (line) => {
				if (typeof line !== 'string') return
				this.#processLogFile(line)
			})
			tailObj.on('error', (error) => {
				this.log('error', `Error during log-read: ${error}`)
				this.#stopReadLogs('Error during log-read')
				this.reset({
					reason: `Error during log-read: ${error}`,
					closeLogfile: true,
				})
			})

			return true
		} catch (err) {
			this.#stopReadLogs('error whilst starting LogReading')
			this.reset({
				reason: 'error whilst starting LogReading',
				closeLogfile: true,
			})
			this.log('warn', `Error reading logs: ${err}`)
			return false
		}
	}

	async #findVRCLog(): Promise<string | null> {
		let logs: string[] = []

		try {
			if (this.config.useEditorLog) {
				logs = [VRC_EDITOR_PATH]
			} else {
				logs = await fsPromises.readdir(VRC_PATH).then((v) =>
					v
						.filter((f) => f.match(/^output_log_.*\.txt$/))
						.map((f) => path.join(VRC_PATH, f))
						.sort(),
				)
			}
		} catch (err) {
			this.log('error', `Error finding logs: ${err}`)
		}

		if (logs.length === 0) {
			this.updateStatus(InstanceStatus.ConnectionFailure, 'Cannot find logs')
			this.reset({
				reason: 'Could not find any Logfile',
			})
			return null
		}

		const latest = logs[logs.length - 1]
		try {
			await fsPromises.access(latest, fs.constants.R_OK)
			return latest
		} catch {
			this.updateStatus(InstanceStatus.ConnectionFailure, 'Failed to read logs')
			this.reset({
				reason: 'Failed to open Logfile',
			})
			return null
		}
	}

	#processLogFile(text: string): void {
		// noinspection RegExpRedundantEscape
		const messageMatches = this.config.useEditorLog
			? Array.from(
					text.matchAll(/\s*\[Neoluma\]\[Midi\]( Ready| Not Ready| Pong|\[Feedback\] ([-A-Za-z0-9+/]*={0,3}))/gm),
				)
			: Array.from(
					text.matchAll(
						/^[0-9]{4}\.(?:0[1-9]|1[0-2])\.(?:[012][0-9]|3[01]) (?:[01][0-9]|2[0-4]):(?:[0-5][0-9]|60|61):(?:[0-5][0-9]|60|61) (?:Debug|Warning|Error)\s*-\s*\[Neoluma\]\[Midi\]( Ready| Not Ready| Pong|\[Feedback\] ([-A-Za-z0-9+/]*={0,3}))/gm,
					),
				)

		if (messageMatches.length === 0) return

		const changes: { [variable: string]: number } = {}
		for (const message of messageMatches) {
			const type = message[1].trim()
			if (type === 'Pong') {
				this.log('debug', 'Received Pong Log')
				this.#setMidiReady()
			} else if (type === 'Ready') {
				this.log('debug', 'Received Ready Log')
				this.#setMidiReady()
			} else if (type === 'Not Ready') {
				this.log('debug', 'Received Not Ready Log')
				this.#setMidiNotReady()
			} else if (type.startsWith('[Feedback] ')) {
				const base64Data = message[2]
				const returnedValues = this.#parseFeedbackLog(base64Data)

				for (const returnedValue of returnedValues) {
					changes[
						returnedValue.mapping.name +
							(returnedValue.extraDataOrSection >= 0
								? '_' +
									(returnedValue.extraDataOrSection >= 10
										? returnedValue.extraDataOrSection
										: '0' + returnedValue.extraDataOrSection)
								: '')
					] = returnedValue.data

					if (
						returnedValue.mapping.name === 'MidiFeedback' &&
						returnedValue.data === 0 &&
						!returnedValue.control.isLogical &&
						returnedValue.control.type === 'single' &&
						returnedValue.control.velocity !== 'ALL'
					) {
						this.#sendMidiNoteOn(
							returnedValue.control.channel,
							returnedValue.control.number,
							returnedValue.control.velocity,
						) // Set midi feedback ON
					} else if (
						returnedValue.mapping.name === 'MidiLog' &&
						returnedValue.data === 1 &&
						!returnedValue.control.isLogical &&
						returnedValue.control.type === 'single' &&
						returnedValue.control.velocity !== 'ALL'
					) {
						// this._SendMidiNoteOff(
						// 	returnedValue.control.channel,
						// 	returnedValue.control.number,
						// 	returnedValue.control.velocity,
						// ) // Set log received/processed OFF
					}
				}
			}
		}

		if (Object.keys(changes).length > 0) {
			this.log(
				'debug',
				'Feedback changes: \n' +
					Object.entries(changes)
						.map((entry) => {
							const [key, value] = entry
							return `\t${key}: ${value}`
						})
						.join('\n'),
			)

			this.setVariableValues(changes)
			for (const name of Object.keys(changes)) {
				this.checkFeedbacks(name as keyof FeedbacksSchema)
			}
			this.checkAllFeedbacks()
		}

		this.#lastUpdate = Date.now()
	}

	#parseFeedbackLog(base64Data: string): LogFeedbackResult[] {
		let rawData
		try {
			rawData = Buffer.from(base64Data, 'base64')
		} catch {
			/* empty */
		}

		if (!rawData) {
			this.log('error', `Unable to parse base64 whilst receiving base64Data=${base64Data}`)
			return []
		}

		let byteOffset = 0

		const result: LogFeedbackResult[] = []
		const version = rawData.readUInt32LE(byteOffset)
		byteOffset += 4
		if (version === 0) {
			while (rawData.length >= byteOffset + 8) {
				const mappedNumber = rawData.readUint16LE(byteOffset)
				byteOffset += 2
				const extraDataOrSection = rawData.readInt16LE(byteOffset) // < 0 = extra, >= 0 = section
				byteOffset += 2
				let data = rawData.readUInt32LE(byteOffset)
				byteOffset += 4

				const mapping = feedbackMappings.find((mapping) => mapping.number === mappedNumber)
				if (typeof mapping === 'undefined') {
					this.log(
						'warn',
						`Could not find any matching mapping whilst receiving mappedNumber=${mappedNumber}, extraDataOrSection=${extraDataOrSection}, data=${data}`,
					)
					continue
				}
				switch (mapping.type) {
					case 'Toggle': {
						const control = toggles.find(
							(toggle) => toggle?.enum === mapping.name || toggle.id.endsWith('__' + mapping.name),
						)
						if (control) {
							data = data > 0 ? 1 : 0
							result.push({ mapping, control, extraDataOrSection, data })
						} else {
							this.log(
								'warn',
								`Could not find ${mapping.name} as an toggle.enum whilst receiving mappedNumber=${mappedNumber}, extraDataOrSection=${extraDataOrSection}, data=${data}`,
							)
						}
						break
					}
					case 'Enum': {
						const control = enums.find(
							(myEnum) => myEnum?.enum === mapping.name || myEnum.id.endsWith('__' + mapping.name),
						)
						if (control) {
							result.push({ mapping, control, extraDataOrSection, data })
						} else {
							this.log(
								'warn',
								`Could not find ${mapping.name} as an enum.enum whilst receiving mappedNumber=${mappedNumber}, extraDataOrSection=${extraDataOrSection}, data=${data}`,
							)
						}
						break
					}
					case 'Slider': {
						const control = sliders.find(
							(slider) => slider?.enum === mapping.name || slider.id.endsWith('__' + mapping.name),
						)
						if (control) {
							result.push({ mapping, control, extraDataOrSection, data })
						} else {
							this.log(
								'warn',
								`Could not find ${mapping.name} as an slider.enum whilst receiving mappedNumber=${mappedNumber}, extraDataOrSection=${extraDataOrSection}, data=${data}`,
							)
						}
						break
					}
				}
			}
		} else {
			this.log('error', `Unsupported version ${version} whilst receiving rawData=${rawData.toString('hex')}`)
		}
		return result
	}
}
