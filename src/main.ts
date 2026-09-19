import { InstanceBase, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { defaultValues, UpdateVariableDefinitions, type VariablesSchema } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions, type ActionsSchema } from './actions.js'
import { UpdateFeedbacks, type FeedbacksSchema } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { Output } from './midi/midi.js'
import fs from 'fs'
import path from 'path'
import os from 'os'
import toggles from './mapping/toggles.js'
import sliders from './mapping/sliders.js'
import buttons from './mapping/buttons.js'
import enums from './mapping/enums.js'
import type LogicalMappingsEnum from './mapping/logical_mappings_enum.js'
import feedbackMappings, { type FeedbackMappings } from './mapping/feedback_mappings.js'
import type MappingData from './mapping/mapping_data.js'
import type { SliderMappingData } from './mapping/mapping_data.js'

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

export default class ModuleInstance extends InstanceBase<ModuleSchema> {
	config!: ModuleConfig // Setup in init()
	private _midiOutput: Output | null = null
	private _logStream: { path: string; bytesRead: number } | false | null = null
	private _lastUpdate: number
	private _lastWatchdog: number
	private _watchdogInterval: NodeJS.Timeout | number | null = null
	private _resetTimeout: NodeJS.Timeout | number | null = null
	private _fd: number | null = null

	constructor(internal: unknown) {
		super(internal)
		this._lastUpdate = Date.now()
		this._lastWatchdog = Date.now()
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
		this.reset(false)
		if (this._resetTimeout !== null) clearTimeout(this._resetTimeout)
		if (this._watchdogInterval) clearInterval(this._watchdogInterval)
		if (this._fd !== null) {
			fs.closeSync(this._fd)
			this._fd = null
		}
		if (this._logStream) this._logStream = null
		if (this._midiOutput) this._midiOutput.close()
		this.log('debug', `${this.id} destroyed`)
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config

		this.log('debug', `Selected MIDI Output: ${config.outPortName}`)

		if (this._resetTimeout !== null) {
			clearTimeout(this._resetTimeout)
			this._resetTimeout = null
		}
		if (this._watchdogInterval) clearInterval(this._watchdogInterval)
		if (this._fd !== null) {
			fs.closeSync(this._fd)
			this._fd = null
		}
		if (this._logStream) this._logStream = null
		if (this._midiOutput) this._midiOutput.close()

		this._midiOutput = new Output(config.outPortName)

		const midiOutStatus = this._midiOutput.isPortOpen()
		this.log('info', `Selected Out Port "${this._midiOutput.name}" is ${midiOutStatus ? '' : 'NOT '}Open.`)

		if (!midiOutStatus) {
			this.updateStatus(InstanceStatus.BadConfig, 'MIDI Out Port not open')
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
		if (this._resetTimeout !== null) {
			clearTimeout(this._resetTimeout)
			this._resetTimeout = null
		}
		this.log('debug', '\nEntering *main*\n')
		this.updateStatus(InstanceStatus.Connecting, 'Connecting for the first time')
		this._lastUpdate = Date.now()
		this._findVRCLog()
		this._midiPing()
		this._watchdogInterval = setInterval(() => this._tick(), 250)

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

	ToggleOption(option: string, logical: LogicalMappingsEnum | undefined): void {
		const toggle = toggles.find(
			(toggle) =>
				toggle.id === option ||
				(toggle.isLogical === true
					? toggle.id === option.replace('LOGICAL__', '')
					: toggle.isLogical && toggle.id === option.replace('INDEX__', '')),
		)
		if (toggle) {
			let velocity = toggle.velocity
			if (toggle.isLogical === true && logical !== undefined) velocity += logical
			this._sendMidiControl(toggle.channel, toggle.number, velocity)
		} else {
			this.log('error', `Could not find toggle with id=${option}`)
		}
	}

	PressButton(option: string, logical: LogicalMappingsEnum | undefined, index: number | undefined): void {
		const button = buttons.find(
			(button) =>
				button.id === option ||
				(button.isLogical === true
					? button.id === option.replace('LOGICAL__', '')
					: button.isLogical && button.id === option.replace('INDEX__', '')),
		)
		if (button) {
			let velocity = button.velocity
			if (button.isLogical === true && logical !== undefined) velocity += logical
			else if (typeof button.isLogical === 'number' && index !== undefined) velocity += index
			this._sendMidiControl(button.channel, button.number, velocity)
		} else {
			this.log('error', `Could not find button with id=${option}`)
		}
	}

	SetEnum(option: string, logical: LogicalMappingsEnum | undefined): void {
		const myEnum = enums.find(
			(myEnum) =>
				myEnum.id === option ||
				(myEnum.isLogical === true
					? myEnum.id === option.replace('LOGICAL__', '')
					: myEnum.isLogical && myEnum.id === option.replace('INDEX__', '')),
		)
		if (myEnum) {
			let velocity = myEnum.velocity
			if (myEnum.isLogical === true && logical !== undefined) velocity += logical
			this._sendMidiControl(myEnum.channel, myEnum.number, velocity)
		} else {
			this.log('error', `Could not find enum with id=${option}`)
		}
	}

	SetSlider(option: string, logical: LogicalMappingsEnum | undefined, value: number): void {
		if (value < 0 || value > 127) return

		const slider = sliders.find(
			(slider) =>
				slider.id === option ||
				(slider.isLogical === true
					? slider.id === option.replace('LOGICAL__', '')
					: slider.isLogical && slider.id === option.replace('INDEX__', '')),
		)
		if (slider) {
			let number = slider.number
			if (slider.isLogical === true && logical !== undefined) number += logical
			this._sendMidiControl(slider.channel, number, value)
		} else {
			this.log('error', `Could not find slider with id=${option}`)
		}
	}

	reset(doReconnect: boolean = true): void {
		// kind of check if we're already trying to connect
		if (this._logStream === false) return

		if (this._fd !== null) {
			fs.closeSync(this._fd)
			this._fd = null
		}
		this._logStream = false

		if (this.getVariableValue('connected')) {
			this.setVariableValues({ connected: false })
			this.checkFeedbacks('connected')
		}
		this.setVariableValues(defaultValues)
		this.checkAllFeedbacks()
		this.updateStatus(InstanceStatus.Disconnected, 'Connection Lost or Reset')

		if (this._resetTimeout !== null) clearTimeout(this._resetTimeout)
		if (doReconnect) {
			this._resetTimeout = setTimeout(() => {
				this.updateStatus(InstanceStatus.Connecting, 'Connecting after reset')
				this._lastUpdate = Date.now()
				this._findVRCLog()
				this._midiPing()
			}, 1e3) // 1 second
		}
	}

	_tick(): void {
		if (this._logStream === false) return

		if (this._readLogs()) {
			this._lastUpdate = Date.now()
		} else {
			const elapsed = (Date.now() - this._lastUpdate) / 1000
			if (elapsed > 20) {
				this._lastUpdate = Date.now()
				this.reset()
				return
			}
		}

		const elapsedWatchdog = (Date.now() - this._lastWatchdog) / 1000
		if (elapsedWatchdog > 5) {
			this._midiPing()
			this._lastWatchdog = Date.now()
		}
	}

	_sendMidiControl(channel: number, number: number, value: number): void {
		if (!this._midiOutput?.isPortOpen()) return
		// this.log('debug', `Sending CC ch${channel} number${number} value${value}`)
		this._midiOutput.sendMessage([0xb0 | (channel & 0xf), number, value & 0x7f])
	}

	_sendMidiNoteOn(channel: number, note: number, velocity: number): void {
		if (!this._midiOutput?.isPortOpen()) return
		// this.log('debug', `Sending NOTE_ON ch${channel} note${note} vel${velocity}`)
		this._midiOutput.sendMessage([0x90 | (channel & 0xf), note, velocity & 0x7f])
	}

	_sendMidiNoteOff(channel: number, note: number, velocity: number): void {
		if (!this._midiOutput?.isPortOpen()) return
		// this.log('debug', `Sending NOTE_OFF ch${channel} note${note} vel${velocity}`)
		this._midiOutput.sendMessage([0x80 | (channel & 0xf), note, velocity & 0x7f])
	}

	_midiPing(): void {
		if (!this._logStream || !this._midiOutput?.isPortOpen()) return
		this.log('debug', 'Sending MidiPing')
		this._sendMidiNoteOn(0, 1, 20) // Ping
	}

	_setMidiReady(): void {
		if (!this.getVariableValue('connected')) {
			this.setVariableValues({ connected: true })
			this.checkFeedbacks('connected')
			this.updateStatus(InstanceStatus.Ok)

			this._sendMidiNoteOff(0, 1, 119) // Set log received/processed OFF
			this._sendMidiNoteOn(0, 1, 120) // Set midi feedback ON
			this._sendMidiNoteOn(0, 1, 121) // Dump state
		}
	}

	_setMidiNotReady(): void {
		this.updateStatus(InstanceStatus.Disconnected, 'Midi not ready')
		this.reset()
	}

	_parseFeedbackLog(base64Data: string): LogFeedbackResult[] {
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
				if (mapping) {
					if (mapping.type === 'Toggle') {
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
					} else if (mapping.type === 'Enum') {
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
					} else if (mapping.type === 'Slider') {
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
					}
				} else {
					this.log(
						'warn',
						`Could not find any matching mapping whilst receiving mappedNumber=${mappedNumber}, extraDataOrSection=${extraDataOrSection}, data=${data}`,
					)
				}
			}
		} else {
			this.log('error', `Unsupported version ${version} whilst receiving rawData=${rawData.toString('hex')}`)
		}
		return result
	}

	_readLogs(): boolean {
		if (!this._logStream || !this._midiOutput?.isPortOpen()) return false
		try {
			const stat = fs.statSync(this._logStream.path)
			const newBytes = stat.size - this._logStream.bytesRead
			if (newBytes <= 0) return false

			const buf = Buffer.alloc(newBytes)
			if (this._fd === null) this._fd = fs.openSync(this._logStream.path, 'r')
			fs.readSync(this._fd, buf, 0, newBytes, this._logStream.bytesRead)
			this._logStream.bytesRead += newBytes

			const text = buf.toString('utf8')

			const messageMatches = this.config.useEditorLog
				? Array.from(
						text.matchAll(/\s*\[Neoluma\]\[Midi\]( Ready| Not Ready| Pong|\[Feedback\] ([-A-Za-z0-9+/]*={0,3}))/gm),
					)
				: Array.from(
						text.matchAll(
							/^[0-9]{4}\.(?:0[1-9]|1[0-2])\.(?:[012][0-9]|3[01]) (?:[01][0-9]|2[0-4]):(?:[0-5][0-9]|60|61):(?:[0-5][0-9]|60|61) (?:Debug|Warning|Error)\s*-\s*\[Neoluma\]\[Midi\]( Ready| Not Ready| Pong|\[Feedback\] ([-A-Za-z0-9+/]*={0,3}))/gm,
						),
					)

			if (messageMatches.length === 0) return false

			const changes: { [variable: string]: number } = {}
			for (const message of messageMatches) {
				const type = message[1].trim()
				if (type === 'Pong') {
					this.log('debug', 'Received Pong Log')
					this._setMidiReady()
				} else if (type === 'Ready') {
					this.log('debug', 'Received Ready Log')
					this._setMidiReady()
				} else if (type === 'Not Ready') {
					this.log('debug', 'Received Not Ready Log')
					this._setMidiNotReady()
				} else if (type.startsWith('[Feedback] ')) {
					const base64Data = message[2]
					const returnedValues = this._parseFeedbackLog(base64Data)

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
							returnedValue.control.velocity !== 'ALL'
						) {
							this._sendMidiNoteOn(
								returnedValue.control.channel,
								returnedValue.control.number,
								returnedValue.control.velocity,
							) // Set midi feedback ON
						} else if (
							returnedValue.mapping.name === 'MidiLog' &&
							returnedValue.data === 1 &&
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
				console.log(changes)

				this.setVariableValues(changes)
				for (const name of Object.keys(changes)) {
					this.checkFeedbacks(name as keyof FeedbacksSchema)
				}
				this.checkAllFeedbacks()
			}

			return true
		} catch (err) {
			this.log('warn', `Error reading logs: ${err}`)
			if (this._fd !== null) {
				fs.closeSync(this._fd)
				this._fd = null
			}
			return false
		}
	}

	_findVRCLog(): void {
		if (this._fd !== null) {
			fs.closeSync(this._fd)
			this._fd = null
		}
		this._logStream = null
		let logs: string[] = []

		try {
			if (this.config.useEditorLog) {
				const vrcEditorPath =
					os.platform() === 'win32'
						? path.join(os.homedir(), 'AppData', 'Local', 'Unity', 'Editor', 'Editor.log')
						: path.join(os.homedir(), '.config', 'unity3d', 'Editor.log') // Assume XDG defaults
				if (fs.existsSync(vrcEditorPath)) logs = [vrcEditorPath]
			} else {
				const localLowPath =
					os.platform() === 'win32'
						? path.join(os.homedir(), 'AppData', 'LocalLow')
						: path.join(os.homedir(), '.local', 'share') // Assume XDG defaults
				const vrcPath = path.join(localLowPath, 'VRChat', 'VRChat')
				logs = fs
					.readdirSync(vrcPath)
					.filter((f) => f.match(/^output_log_.*\.txt$/))
					.map((f) => path.join(vrcPath, f))
					.sort()
			}
		} catch (err) {
			this.log('error', `Error finding logs: ${err}`)
		}

		if (logs.length === 0) {
			this.updateStatus(InstanceStatus.ConnectionFailure, 'Cannot find logs')
			this.reset()
			return
		}

		const latest = logs[logs.length - 1]
		try {
			const size = fs.statSync(latest).size
			this._logStream = { path: latest, bytesRead: size > 0 ? size - 1 : 0 }
			this.log('debug', `Watching log: ${latest.replace(os.homedir(), '$HOME')}`)
		} catch {
			this.updateStatus(InstanceStatus.ConnectionFailure, 'Failed to read logs')
			this.reset()
			return
		}
	}
}
