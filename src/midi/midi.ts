import * as node_midi from '@julusian/midi'
import type ModuleInstance from '../main.js'

export class Output {
	private _output: node_midi.Output | null = null
	public name: string
	public readonly moduleInstance: ModuleInstance

	constructor(name: string, moduleInstance: ModuleInstance) {
		this.name = name
		this.moduleInstance = moduleInstance

		try {
			this._output = new node_midi.Output()
			const outputPortNumberedNames: string[] = getOutputs(this.moduleInstance, this._output)
			for (let i = 0; i < outputPortNumberedNames.length; i++) {
				if (name === outputPortNumberedNames[i]) {
					this._output.openPort(i)
					break
				}
			}
		} catch (err) {
			this.moduleInstance.log('error', `Error opening port ${name}.\nError: ${err}`)
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
			this.moduleInstance.log('error', `Error whilst closing port: ${e}`)
		}
		this._output = null
	}

	isPortOpen(): boolean {
		if (this._output === null) return false
		try {
			return this._output.isPortOpen()
		} catch (e) {
			this.moduleInstance.log('error', `Error determining if port is open: ${e}`)
			return false
		}
	}

	sendMessage(bytes: node_midi.MidiMessage): boolean {
		if (this._output === null) return false
		try {
			this._output.sendMessage(bytes)
			return true
		} catch (e) {
			this.moduleInstance.log('error', `Error during sending Midi Message: ${e}`)
			return false
		}
	}
}

export function getOutputs(self: ModuleInstance, output?: node_midi.Output): string[] {
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
		self.log('error', `Failed to get Midi Outputs: ${err}`)
	}
	return outputs
}
