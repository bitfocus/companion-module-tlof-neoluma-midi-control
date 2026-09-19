import type { ModuleSchema } from './main.js'
import type ModuleInstance from './main.js'
import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import toggles from './mapping/toggles.js'
import buttons from './mapping/buttons.js'
import sliders from './mapping/sliders.js'
import enums from './mapping/enums.js'
import feedbackMappings from './mapping/feedback_mappings.js'

export function UpdatePresets(self: ModuleInstance): void {
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
					id: 'buttons',
					type: 'simple',
					name: 'Buttons',
					presets: [],
				},
				{
					id: 'enums',
					type: 'simple',
					name: 'Enums',
					presets: [],
				},
				{
					id: 'sliders',
					type: 'simple',
					name: 'Sliders',
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

	for (const option of toggles) {
		const id = `toggle_${option.id}`
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
									(option.isLogical === true ? 'LOGICAL__' : typeof option.isLogical === 'number' ? 'INDEX__' : '') +
									option.id,
								logical: 0,
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
			if (option.isLogical === true)
				presets[id].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: 1,
						logical: 0,
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
			else if (typeof option.isLogical === 'number' || feedbackMapping.hasSections !== 'None')
				presets[id].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: 1,
						index: toggles
							.filter((toggle) => toggle.enum === option.enum)
							.findIndex((toggle) => toggle.id == option.id),
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
			else
				presets[id].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: 1,
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
		}

		const def = structure[0].definitions.find(
			(def) => typeof def !== 'string' && def.id === 'toggles' && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	const result = buttons.flatMap((item) => {
		if (typeof item.isLogical === 'number' && item.isLogical > 0) {
			return Array.from({ length: item.isLogical }, (_, index) => ({
				...item,
				isLogical: index,
				label: item.label.replace(/ \d+-\d+$/, ' ' + index),
			}))
		}
		return item
	})

	for (const option of result) {
		const id = `button_${option.id}` + (typeof option.isLogical === 'number' ? '_' + option.isLogical : '')
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
									(option.isLogical === true ? 'LOGICAL__' : typeof option.isLogical === 'number' ? 'INDEX__' : '') +
									option.id,
								logical: 0,
								index:
									typeof option.isLogical === 'number'
										? result
												.filter((btn) => btn.id === option.id)
												.findIndex((btn) => btn.isLogical === option.isLogical)
										: 0,
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
			(def) => typeof def !== 'string' && def.id === 'buttons' && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	for (const option of enums) {
		const id = `enum_${option.id}`
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
									(option.isLogical === true ? 'LOGICAL__' : typeof option.isLogical === 'number' ? 'INDEX__' : '') +
									option.id,
								logical: 0,
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
			if (option.isLogical === true)
				presets[id].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: enums.filter((myEnum) => myEnum.enum === option.enum).findIndex((myEnum) => myEnum.id == option.id),
						logical: 0,
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
			else if (typeof option.isLogical === 'number' || feedbackMapping.hasSections !== 'None')
				presets[id].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: enums.filter((myEnum) => myEnum.enum === option.enum).findIndex((myEnum) => myEnum.id == option.id),
						index: enums.filter((myEnum) => myEnum.enum === option.enum).findIndex((myEnum) => myEnum.id == option.id),
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
			else
				presets[id].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: enums.filter((myEnum) => myEnum.enum === option.enum).findIndex((myEnum) => myEnum.id == option.id),
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
		}

		const def = structure[0].definitions.find(
			(def) => typeof def !== 'string' && def.id === 'enums' && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	for (const option of sliders) {
		const id = `slider_${option.id}`
		const indexes = sliders.filter((slider) => slider.enum === option.enum)
		const index = indexes.findIndex((slider) => slider.id == option.id)
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
								value: `$(VRChat_NeoLuma_Control:${option.enum}${indexes.length > 1 ? '_' + (index < 10 ? '0' + index : index) : ''})`,
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
											(option.isLogical === true
												? 'LOGICAL__'
												: typeof option.isLogical === 'number'
													? 'INDEX__'
													: '') + option.id,
										logical: 0,
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
											(option.isLogical === true
												? 'LOGICAL__'
												: typeof option.isLogical === 'number'
													? 'INDEX__'
													: '') + option.id,
										logical: 0,
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
							style: {
								color: 0x000000,
								bgcolor: 0xb8b8b8,
							},
						},
					],
				},
			],
		}

		const feedbackMapping = feedbackMappings.find(
			(mapping) => mapping.type === 'Slider' && mapping.name === option.enum,
		)
		if (feedbackMapping) {
			if (option.isLogical === true)
				presets[id].variants[1].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						logical: 0,
						value: 127,
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
			else if (typeof option.isLogical === 'number' || feedbackMapping.hasSections !== 'None')
				presets[id].variants[1].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						index: sliders
							.filter((slider) => slider.enum === option.enum)
							.findIndex((slider) => slider.id == option.id),
						value: 127,
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
			else
				presets[id].variants[1].feedbacks.push({
					// @ts-expect-error Type 'string' is not assignable to type '"connected" | "AllowPortals" | "Blackout" | "BlinderIntensity" | "CleanLight" | "DiscoBall" | "Flasher" | "FlasherIntensity" | "FlasherSpeed" | "GlobalIntensity" | "Gobo" | ... 34 more ... | "MidiLog"'.ts(2322)
					feedbackId: feedbackMapping.name,
					options: {
						value: 127,
					},
					style: {
						color: 0xffffff,
						bgcolor: 0xff0000,
					},
				})
		}

		const def = structure[0].definitions.find(
			(def) => typeof def !== 'string' && def.id === 'sliders' && def.type === 'simple',
		)
		if (def && typeof def !== 'string' && def.type === 'simple') {
			def.presets.push(id)
		}
	}

	self.setPresetDefinitions(structure, presets)
}
