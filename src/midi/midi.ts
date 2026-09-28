import * as node_midi from '@julusian/midi'
import { createModuleLogger } from '@companion-module/base'

const logger = createModuleLogger('MidiUtil')

export class Output {
	private _output: node_midi.Output | null = null
	public name: string

	constructor(name: string) {
		this.name = name

		try {
			this._output = new node_midi.Output()
			const outputPortNumberedNames: string[] = getOutputs(this._output)
			for (let i = 0; i < outputPortNumberedNames.length; i++) {
				if (name === outputPortNumberedNames[i]) {
					this._output.openPort(i)
					break
				}
			}
		} catch (err) {
			logger.error(`Error opening port ${name}.\nError: ${err}`)
			this._output?.closePort()
			this._output = null
		}
	}

	close(): void {
		if (this._output === null) return
		try {
			this._output.closePort()
			this._output.destroy()
		} catch (e) {
			logger.error(`Error whilst closing port: ${e}`)
		}
		this._output = null
	}

	isPortOpen(): boolean {
		if (this._output === null) return false
		try {
			return this._output.isPortOpen()
		} catch (e) {
			logger.error(`Error determining if port is open: ${e}`)
			return false
		}
	}

	sendMessage(bytes: node_midi.MidiMessage): boolean {
		if (this._output === null) return false
		try {
			this._output.sendMessage(bytes)
			return true
		} catch (e) {
			logger.error(`Error during sending Midi Message: ${e}`)
			return false
		}
	}
}

export function getOutputs(output?: node_midi.Output): string[] {
	if (!output) {
		try {
			output = new node_midi.Output()
		} catch {
			return []
		}
	}
	const outputs: string[] = []
	try {
		for (let i = 0; i < output.getPortCount(); i++) {
			let counter = 0
			const portName = output.getPortName(i)
			let numberedPortName = portName
			while (outputs.includes(numberedPortName)) {
				counter++
				numberedPortName = `${portName} ${counter}`
			}
			outputs.push(numberedPortName)
		}
	} catch (err) {
		logger.error(`Failed to get Midi Outputs: ${err}`)
	}
	return outputs
}
