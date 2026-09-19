import type ModuleInstance from './main.js'
import buttons, { maxLogicalIndex } from './mapping/buttons.js'
import enums from './mapping/enums.js'
import LogicalMappingsEnum, { LogicalMappingsDropdownOptions } from './mapping/logical_mappings_enum.js'
import sliders from './mapping/sliders.js'
import toggles from './mapping/toggles.js'

export type ActionsSchema = {
	toggle: {
		options: {
			option: string
			logical: LogicalMappingsEnum
		}
	}
	press_button: {
		options: {
			option: string
			logical: LogicalMappingsEnum
			index: number
		}
	}
	set_enum: {
		options: {
			option: string
			logical: LogicalMappingsEnum
		}
	}
	set_slider: {
		options: {
			option: string
			logical: LogicalMappingsEnum
			value: number
		}
	}
	reset: {
		options: Record<string, never>
	}
}

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		toggle: {
			name: 'Toggle Option',
			options: [
				{
					type: 'dropdown',
					id: 'option',
					label: 'Option',
					choices: toggles.map((option) => ({
						id: (option.isLogical === true ? 'LOGICAL__' : option.isLogical ? 'INDEX__' : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: 'substr($(options:option), 0, 9) === "LOGICAL__"',
					choices: LogicalMappingsDropdownOptions,
					default: 0,
				},
			],
			callback: async (action) => {
				self.ToggleOption(action.options.option, action.options.logical)
			},
		},
		press_button: {
			name: 'Press Button',
			options: [
				{
					type: 'dropdown',
					id: 'option',
					label: 'Option',
					choices: buttons.map((option) => ({
						id: (option.isLogical === true ? 'LOGICAL__' : option.isLogical ? 'INDEX__' : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: 'substr($(options:option), 0, 9) === "LOGICAL__"',
					choices: LogicalMappingsDropdownOptions,
					default: 0,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					isVisibleExpression: 'substr($(options:option), 0, 7) === "INDEX__"',
					default: 0,
					min: 0,
					max: maxLogicalIndex,
				},
			],
			callback: async (action) => {
				self.PressButton(action.options.option, action.options.logical, action.options?.index)
			},
		},
		set_enum: {
			name: 'Set Enum',
			options: [
				{
					type: 'dropdown',
					id: 'option',
					label: 'Option',
					choices: enums.map((option) => ({
						id: (option.isLogical === true ? 'LOGICAL__' : option.isLogical ? 'INDEX__' : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: 'substr($(options:option), 0, 9) === "LOGICAL__"',
					choices: LogicalMappingsDropdownOptions,
					default: 0,
				},
			],
			callback: async (action) => {
				self.SetEnum(action.options.option, action.options.logical)
			},
		},
		set_slider: {
			name: 'Set Slider',
			options: [
				{
					type: 'dropdown',
					id: 'option',
					label: 'Option',
					choices: sliders.map((option) => ({
						id: (option.isLogical === true ? 'LOGICAL__' : option.isLogical ? 'INDEX__' : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: 'substr($(options:option), 0, 9) === "LOGICAL__"',
					choices: LogicalMappingsDropdownOptions,
					default: 0,
				},
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 0,
					min: 0,
					max: 127,
				},
			],
			callback: async (action) => {
				self.SetSlider(
					action.options.option,
					action.options?.logical ? action.options.logical : undefined,
					action.options.value,
				)
			},
		},
		reset: {
			name: 'Reset',
			options: [],
			callback: async () => {
				self.reset()
			},
		},
	})
}
