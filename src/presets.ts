import type { ModuleSchema } from './main.js'
import type ModuleInstance from './main.js'
import type {
	CompanionFeedbackButtonStyleResult,
	CompanionPresetDefinitions,
	CompanionPresetSection,
	SomePresetSimpleFeedbackEntry,
} from '@companion-module/base'
import toggles from './mapping/toggles.js'
import buttons from './mapping/buttons.js'
import sliders from './mapping/sliders.js'
import enums from './mapping/enums.js'
import feedbackMappings, { type FeedbackMappings } from './mapping/feedback_mappings.js'
import type {
	ChannelMappingData,
	IndexedLogicalMapping,
	IndexedNonLogicalMapping,
	LogicalMappingData,
	MappingData,
} from './mapping/mapping_data.js'
import { DefaultToggleDropdownOption, INDEX_PREFIX, LOGICAL_PREFIX } from './constants.js'
import { LogicalMappingsDropdownValues, type LogicalMappingsEnum } from './mapping/logical_mappings_enum.js'

type unroll_indexed_inner_type<T = number> =
	| (ChannelMappingData<T> & { index: null })
	| (LogicalMappingData<T> & { index: null })
	| (LogicalMappingData<T> & { index: number; outer: IndexedLogicalMapping<T> })
	| (ChannelMappingData<T> & { index: number; outer: IndexedNonLogicalMapping<T> })

export function unroll_indexed<T>(data: MappingData<T>[]): unroll_indexed_inner_type<T>[] {
	function mapping(item: MappingData<T>): unroll_indexed_inner_type<T>[] {
		if (item.type === 'indexed') {
			//Even though the code is EXACTLY the same, ts wants me to duplicate them, so that each type of Indexed Values are handled separately
			if (item.isLogical) {
				return item.values.map((value, index) => {
					return {
						...value,
						class: item.class,
						index: index,
						isLogical: item.isLogical,
						enum: item.enum,
						outer: item,
						label: item.label + ' - ' + value.label,
						id: item.id,
					}
				})
			} else {
				return item.values.map((value, index) => {
					return {
						...value,
						class: item.class,
						index: index,
						isLogical: item.isLogical,
						enum: item.enum,
						outer: item,
						label: item.label + ' - ' + value.label,
						id: item.id,
					}
				})
			}
		}

		return [
			{
				...item,
				index: null,
			},
		]
	}

	return data.flatMap(mapping)
}

function getFeedback<T extends FeedbackMappings>(
	feedbackMapping: T,
	style: CompanionFeedbackButtonStyleResult,
	value: number,
	logical: LogicalMappingsEnum,
	index: number,
): SomePresetSimpleFeedbackEntry<ModuleSchema> {
	if (feedbackMapping.hasSections === 'Logical')
		return {
			feedbackId: feedbackMapping.name,
			options: {
				value: value,
				logical: logical,
			},
			style: style,
		}
	if (feedbackMapping.type === 'Enum' || feedbackMapping.hasSections === 'None') {
		const options = {
			value: value,
		}
		//WTF?
		switch (feedbackMapping.type) {
			default:
				return { feedbackId: feedbackMapping.name, options: options, style: style }
			case 'Slider':
				return { feedbackId: feedbackMapping.name, options: options, style: style }
		}
	}

	return {
		feedbackId: feedbackMapping.name,
		options: {
			value: value,
			index: index,
		},
		style: style,
	}
}

function UpdatePresets(self: ModuleInstance): void {
	const structure: CompanionPresetSection[] = [
		{
			id: 'controls',
			name: 'Controls',
			definitions: [
				{
					id: 'connection',
					type: 'simple',
					name: 'Connection',
					presets: ['connected'],
				},
				{
					id: 'actions',
					type: 'simple',
					name: 'Actions',
					presets: ['reset'],
				},
				{
					id: 'toggles',
					type: 'simple',
					name: 'Toggles',
					presets: [],
				},
				{
					id: 'toggles-logical',
					type: 'simple',
					name: 'Logical Toggles',
					presets: [],
				},
				{
					id: 'buttons',
					type: 'simple',
					name: 'Buttons',
					presets: [],
				},
				{
					id: 'buttons-logical',
					type: 'simple',
					name: 'Logical Buttons',
					presets: [],
				},
				{
					id: 'enums',
					type: 'simple',
					name: 'Enums',
					presets: [],
				},
				{
					id: 'enums-logical',
					type: 'simple',
					name: 'Logical Enums',
					presets: [],
				},
				{
					id: 'sliders',
					type: 'simple',
					name: 'Sliders',
					presets: [],
				},
				{
					id: 'sliders-logical',
					type: 'simple',
					name: 'Logical Sliders',
					presets: [],
				},
			],
		},
	]

	const presets: CompanionPresetDefinitions<ModuleSchema> = {}
	presets['connected'] = {
		type: 'simple',
		name: 'VRChat Connection Indicator',
		style: {
			text: 'VRC\\nDISC',
			size: '24',
			color: 0xffffff,
			bgcolor: 0xb40000,
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'connected',
				options: {},
				style: {
					text: 'VRC\\nLIVE',
					color: 0x000000,
					bgcolor: 0x00ff00,
				},
			},
		],
	}

	presets['reset'] = {
		type: 'simple',
		name: 'Reset',
		style: {
			text: 'Reset',
			size: '24',
			color: 0xffffff,
			bgcolor: 0x000000,
		},
		steps: [
			{
				down: [
					{
						actionId: 'reset',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'connected',
				options: {},
				style: {
					color: 0x000000,
					bgcolor: 0xb8b8b8,
				},
			},
		],
	}

	let result = unroll_indexed(toggles)
	for (const option of result) {
		const id =
			`toggle_${option.id}` +
			(option.isLogical ? '_logical' : '') +
			(typeof option.index === 'number' ? '_' + option.index : '')
		presets[id] = {
			type: 'simple',
			name: `Toggle - ${option.label}`,
			style: {
				text: `Toggle - ${option.label}`,
				size: 'auto',
				color: 0xffffff,
				bgcolor: 0x000000,
			},
			steps: [
				{
					down: [
						{
							actionId: 'toggle',
							options: {
								option:
									(option.isLogical ? LOGICAL_PREFIX : '') +
									(typeof option.index === 'number' ? INDEX_PREFIX : '') +
									option.id,
								logical: LogicalMappingsDropdownValues,
								index: option.index ?? 0,
								value: DefaultToggleDropdownOption,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'connected',
					options: {},
					style: {
						color: 0x000000,
						bgcolor: 0xb8b8b8,
					},
				},
			],
		}

		const feedbackMapping = feedbackMappings.find(
			(mapping) => mapping.type === 'Toggle' && mapping.name === option.enum,
		)
		if (feedbackMapping) {
			presets[id].feedbacks.push(
				getFeedback(
					feedbackMapping,
					{
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
					1,
					option.index ??
						result.filter((toggle) => toggle.enum === option.enum).findIndex((toggle) => toggle.id == option.id),
					0,
				),
			)
		}

		const def = structure[0].definitions.find(
			(def) =>
				typeof def !== 'string' && def.id === 'toggles' + (option.isLogical ? '-logical' : '') && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	result = unroll_indexed(buttons)
	for (const option of result) {
		const id =
			`button_${option.id}` +
			(option.isLogical ? '_logical' : '') +
			(typeof option.index === 'number' ? '_' + option.index : '')
		presets[id] = {
			type: 'simple',
			name: `Button - ${option.label}`,
			style: {
				text: `Button - ${option.label}`,
				size: 'auto',
				color: 0xffffff,
				bgcolor: 0x000000,
			},
			steps: [
				{
					down: [
						{
							actionId: 'press_button',
							options: {
								option:
									(option.isLogical ? LOGICAL_PREFIX : '') +
									(typeof option.index === 'number' ? INDEX_PREFIX : '') +
									option.id,
								logical: LogicalMappingsDropdownValues,
								index: option.index ?? 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'connected',
					options: {},
					style: {
						color: 0x000000,
						bgcolor: 0xb8b8b8,
					},
				},
			],
		}

		const def = structure[0].definitions.find(
			(def) =>
				typeof def !== 'string' && def.id === 'buttons' + (option.isLogical ? '-logical' : '') && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	result = unroll_indexed(enums)
	for (const option of result) {
		const id =
			`enum_${option.id}` +
			(option.isLogical ? '_logical' : '') +
			(typeof option.index === 'number' ? '_' + option.index : '')
		presets[id] = {
			type: 'simple',
			name: `Enum - ${option.label}`,
			style: {
				text: `Enum - ${option.label}`,
				size: 'auto',
				color: 0xffffff,
				bgcolor: 0x000000,
			},
			steps: [
				{
					down: [
						{
							actionId: 'set_enum',
							options: {
								option:
									(option.isLogical ? LOGICAL_PREFIX : '') +
									(typeof option.index === 'number' ? INDEX_PREFIX : '') +
									option.id,
								logical: LogicalMappingsDropdownValues,
								index: option.index ?? 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'connected',
					options: {},
					style: {
						color: 0x000000,
						bgcolor: 0xb8b8b8,
					},
				},
			],
		}

		const feedbackMapping = feedbackMappings.find((mapping) => mapping.type === 'Enum' && mapping.name === option.enum)
		if (feedbackMapping) {
			presets[id].feedbacks.push(
				getFeedback(
					feedbackMapping,
					{
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
					option.index ??
						result.filter((myEnum) => myEnum.enum === option.enum).findIndex((myEnum) => myEnum.id == option.id),
					0,
					0,
				),
			)
		}

		const def = structure[0].definitions.find(
			(def) =>
				typeof def !== 'string' && def.id === 'enums' + (option.isLogical ? '-logical' : '') && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	const result_sliders = unroll_indexed(sliders)
	for (const option of result_sliders) {
		const id =
			`slider_${option.id}` +
			(option.isLogical ? '_logical' : '') +
			(typeof option.index === 'number' ? '_' + option.index : '')
		const indexes = sliders.filter((slider) => slider.enum === option.enum)
		const index = option.index ?? indexes.findIndex((slider) => slider.id == option.id)
		const feedbacks: SomePresetSimpleFeedbackEntry<ModuleSchema>[] = [
			{
				feedbackId: 'connected',
				options: {},
				style: {
					color: 0x000000,
					bgcolor: 0xb8b8b8,
				},
			},
		]

		const feedbackMapping = feedbackMappings.find((mapping) => {
			if (mapping.type !== 'Slider') return false
			if (mapping.name !== option.enum) return false
			if (option.isLogical && mapping.hasSections === 'None') return false
			// noinspection RedundantIfStatementJS
			if (!option.isLogical && mapping.hasSections !== 'None') return false

			return true
		})
		if (feedbackMapping) {
			feedbacks.push(
				getFeedback(
					feedbackMapping,
					{
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
					127,
					0,
					option.index ??
						result_sliders
							.filter((slider) => slider.enum === option.enum)
							.findIndex((slider) => slider.id == option.id),
				),
			)
		}

		presets[id] = {
			type: 'alternatives',
			variants: [
				{
					type: 'layered',
					name: `Slider - ${option.label}`,
					elements: [
						{
							type: 'box',
							id: 'bar',
							name: 'Background',
							x: { isExpression: false, value: 0 },
							y: { isExpression: false, value: 0 },
							width: { isExpression: false, value: 100 },
							height: { isExpression: false, value: 100 },
							color: { isExpression: false, value: 0x000000 },
						},
						{
							type: 'gauge',
							id: 'gauge',
							x: { isExpression: false, value: 0 },
							y: { isExpression: false, value: 90 },
							width: { isExpression: false, value: 100 },
							height: { isExpression: false, value: 10 },
							min: { isExpression: false, value: 0 },
							max: { isExpression: false, value: 127 },
							value: {
								isExpression: true,
								value: `$(VRChat_NeoLuma_Control:${option.enum}${indexes.length > 1 || typeof option.index === 'number' ? '_' + (index < 10 ? '0' + index : index) : ''})`,
							},
							markerEnabled: { isExpression: false, value: true },
							stops: [
								{
									value: { isExpression: false, value: 0 },
									color: { isExpression: false, value: 0xff0000 },
									gradient: { isExpression: false, value: false },
								},
							],
						},
						{
							type: 'text',
							id: 'label',
							x: { isExpression: false, value: 0 },
							y: { isExpression: false, value: 0 },
							width: { isExpression: false, value: 100 },
							height: { isExpression: false, value: 100 },
							text: { isExpression: false, value: `Slider - ${option.label}` },
							color: { isExpression: false, value: 0xffffff },
						},
					],
					steps: [
						{
							down: [
								{
									actionId: 'set_slider',
									options: {
										option:
											(option.isLogical ? LOGICAL_PREFIX : '') +
											(typeof option.index === 'number' ? INDEX_PREFIX : '') +
											option.id,
										logical: LogicalMappingsDropdownValues,
										index: option.index ?? 0,
										value: 0,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: [
						{
							feedbackId: 'connected',
							options: {},
							styleOverrides: [
								{
									elementId: 'label',
									elementProperty: 'color',
									override: { isExpression: false, value: 0x000000 },
								},
								{
									elementId: 'bar',
									elementProperty: 'color',
									override: { isExpression: false, value: 0xb8b8b8 },
								},
							],
						},
					],
				},
				{
					type: 'simple',
					name: `Slider - ${option.label}`,
					style: {
						text: `Slider - ${option.label}`,
						size: 'auto',
						color: 0xffffff,
						bgcolor: 0x000000,
					},
					steps: [
						{
							down: [
								{
									actionId: 'set_slider',
									options: {
										option:
											(option.isLogical ? LOGICAL_PREFIX : '') +
											(typeof option.index === 'number' ? INDEX_PREFIX : '') +
											option.id,
										logical: LogicalMappingsDropdownValues,
										index: option.index ?? 0,
										value: 0,
									},
								},
							],
							up: [],
						},
					],
					feedbacks: feedbacks,
				},
			],
		}

		const def = structure[0].definitions.find(
			(def) =>
				typeof def !== 'string' && def.id === 'sliders' + (option.isLogical ? '-logical' : '') && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	self.setPresetDefinitions(structure, presets)
}

export default UpdatePresets
