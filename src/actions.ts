import type ModuleInstance from './main.js'
import buttons, { maxLogicalIndex } from './mapping/buttons.js'
import enums from './mapping/enums.js'
import {
	LogicalMappingsDropdownOptions,
	LogicalMappingsDropdownValues,
	type LogicalMappingsEnum,
} from './mapping/logical_mappings_enum.js'
import sliders from './mapping/sliders.js'
import toggles from './mapping/toggles.js'
import {
	DefaultToggleDropdownOption,
	ToggleDropdownOptions,
	SEPERATOR,
	LOGICAL,
	LOGICAL_PREFIX,
	INDEX,
	INDEX_PREFIX,
} from './constants.js'

const SPLIT_SEPERATOR = `split($(options:option), "${SEPERATOR}")`
const IS_LOGICAL_CONDITION = `[0] === "${LOGICAL}"`
const IS_LOGICAL_EXPRESSION = `${SPLIT_SEPERATOR}${IS_LOGICAL_CONDITION}`
const IS_INDEX_EXPRESSION = `split = ${SPLIT_SEPERATOR}; split[0] === "${INDEX}" || (split${IS_LOGICAL_CONDITION} && split[1] === "${INDEX}")`

export type ActionsSchema = {
	toggle: {
		options: {
			option: string
			logical: LogicalMappingsEnum[]
			index: number
			value: number
		}
	}
	press_button: {
		options: {
			option: string
			logical: LogicalMappingsEnum[]
			index: number
		}
	}
	set_enum: {
		options: {
			option: string
			logical: LogicalMappingsEnum[]
			index: number
		}
	}
	set_slider: {
		options: {
			option: string
			logical: LogicalMappingsEnum[]
			index: number
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
			name: 'Set Option',
			options: [
				{
					type: 'dropdown',
					id: 'option',
					label: 'Option',
					choices: toggles.map((option) => ({
						id: (option.isLogical ? LOGICAL_PREFIX : '') + (option.type == 'indexed' ? INDEX_PREFIX : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'multidropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: IS_LOGICAL_EXPRESSION,
					choices: LogicalMappingsDropdownOptions,
					default: LogicalMappingsDropdownValues,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					isVisibleExpression: IS_INDEX_EXPRESSION,
					default: 0,
					min: 0,
					max: maxLogicalIndex,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'Value',
					expressionDescription: '0 for disable, 1 for enable, 2 for toggle',
					choices: ToggleDropdownOptions,
					default: DefaultToggleDropdownOption,
				},
			],
			callback: async (action) => {
				self.ToggleOption(action.options.option, action.options.logical, action.options.index, action.options.value)
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
						id: (option.isLogical ? LOGICAL_PREFIX : '') + (option.type == 'indexed' ? INDEX_PREFIX : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'multidropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: IS_LOGICAL_EXPRESSION,
					choices: LogicalMappingsDropdownOptions,
					default: LogicalMappingsDropdownValues,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					isVisibleExpression: IS_INDEX_EXPRESSION,
					default: 0,
					min: 0,
					max: maxLogicalIndex,
				},
			],
			callback: async (action) => {
				self.PressButton(action.options.option, action.options.logical, action.options.index)
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
						id: (option.isLogical ? LOGICAL_PREFIX : '') + (option.type == 'indexed' ? INDEX_PREFIX : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'multidropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: IS_LOGICAL_EXPRESSION,
					choices: LogicalMappingsDropdownOptions,
					default: LogicalMappingsDropdownValues,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					isVisibleExpression: IS_INDEX_EXPRESSION,
					default: 0,
					min: 0,
					max: maxLogicalIndex,
				},
			],
			callback: async (action) => {
				self.SetEnum(action.options.option, action.options.logical, action.options.index)
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
						id: (option.isLogical ? LOGICAL_PREFIX : '') + (option.type == 'indexed' ? INDEX_PREFIX : '') + option.id,
						label: option.label,
					})),
					disableAutoExpression: true,
					default: '',
				},
				{
					type: 'multidropdown',
					id: 'logical',
					label: 'Logical Mapping',
					isVisibleExpression: IS_LOGICAL_EXPRESSION,
					choices: LogicalMappingsDropdownOptions,
					default: LogicalMappingsDropdownValues,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					isVisibleExpression: IS_INDEX_EXPRESSION,
					default: 0,
					min: 0,
					max: maxLogicalIndex,
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
				self.SetSlider(action.options.option, action.options.logical, action.options.index, action.options.value)
			},
		},
		reset: {
			name: 'Reset',
			options: [],
			callback: async () => {
				self.reset({
					reason: 'Manual Reset via Button',
				})
			},
		},
	})
}
