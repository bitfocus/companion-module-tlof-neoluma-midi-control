import { type DropdownChoice, type SomeCompanionConfigField } from '@companion-module/base'
import { getOutputs } from './midi/midi.js'

export type ModuleConfig = {
	outPortName: string
	useEditorLog: boolean
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	const outPortNames: DropdownChoice[] = []
	const outPorts = getOutputs()
	outPorts.forEach((m) => {
		outPortNames.push({ id: m, label: m })
	})

	return [
		{
			type: 'dropdown',
			id: 'outPortName',
			label: 'MIDI Out',
			width: 6,
			default: outPorts[0] || 'NONE DETECTED',
			choices: outPortNames,
		},
		{
			type: 'checkbox',
			id: 'useEditorLog',
			label: 'Use Unity Editor Log (instead of VRChat log)',
			tooltip: 'Enable this if you are testing in the Unity Editor instead of VRChat',
			width: 6,
			default: false,
		},
	]
}
