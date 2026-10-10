/*@cc_on
@if (@_jscript)
	var objShell = new ActiveXObject('Shell.Application');
	var pathSelf = WScript.ScriptFullName;
	objShell.ShellExecute('cmd.exe', '/C node.exe "' + pathSelf + '" & pause');
	WScript.Quit();
@else @*/

/*
This is a utility script to generate pages with the buttons, since there's a ton of buttons and to be able to drag them all in, is a time consuming task.
*/

import fs from 'node:fs/promises'
// eslint-disable-next-line n/no-unpublished-import
import toggles from './dist/mapping/toggles.js'
// eslint-disable-next-line n/no-unpublished-import
import buttons from './dist/mapping/buttons.js'
// eslint-disable-next-line n/no-unpublished-import
import enums from './dist/mapping/enums.js'
// eslint-disable-next-line n/no-unpublished-import
import sliders from './dist/mapping/sliders.js'
// eslint-disable-next-line n/no-unpublished-import
import LogicalMappingsEnum, { LogicalMappingsDropdownValues } from './dist/mapping/logical_mappings_enum.js'
// eslint-disable-next-line n/no-unpublished-import
import feedbackMappings from './dist/mapping/feedback_mappings.js'
// eslint-disable-next-line n/no-unpublished-import
import { unroll_indexed } from './dist/presets.js'
// eslint-disable-next-line n/no-unpublished-import
import { LOGICAL_PREFIX, INDEX_PREFIX } from './dist/constants.js'

const page1 = {
	version: 12,
	type: 'page',
	companionBuild: '5.0.2+9665-stable-5eb89669c6',
	page: {
		id: 'oeP1MRGPh1TDLUKSkElWW',
		name: 'Neo\\nLuma',
		controls: {},
		gridSize: {
			// minColumn: 0,
			// maxColumn: 22 - 1,
			// minRow: 0,
			// maxRow: 12 - 1,

			minColumn: 0,
			maxColumn: 12 - 1,
			minRow: 0,
			maxRow: 22 - 1,
		},
	},
	instances: {
		'pzsklqKJf-CT1DgSHp2M-': {
			moduleInstanceType: 'connection',
			moduleId: 'tlof-neoluma-midi-control',
			moduleVersionId: '1.0.0',
			updatePolicy: 'stable',
			sortOrder: 0,
			label: 'TLOF_NeoLuma_MIDI_Control',
			isFirstInit: false,
			config: {
				outPortName: 'VRChat',
				useEditorLog: false,
			},
			secrets: {},
			lastUpgradeIndex: -1,
			enabled: true,
		},
	},
	connectionCollections: [],
	oldPageNumber: 1,
	imageLibrary: [],
	imageLibraryCollections: [],
}

const page2 = {
	...page1,
	page: {
		id: 'oeP1MRGPh1TDLUKSkElWa',
		name: 'Neo\\nLuma\\nLOGICAL',
		controls: {},
		gridSize: {
			// minColumn: 0,
			// maxColumn: 22 - 1,
			// minRow: 0,
			// maxRow: 12 - 1,

			minColumn: 0,
			maxColumn: 12 - 1,
			minRow: 0,
			maxRow: 22 - 1,
		},
	},
	oldPageNumber: 2,
}

const defaultLayers = [
	{
		id: 'canvas',
		name: 'Canvas',
		usage: 'auto',
		type: 'canvas',
		decoration: {
			value: 'default',
			isExpression: false,
		},
		showStatusIcons: {
			value: 'default',
			isExpression: false,
		},
	},
	{
		id: 'box0',
		name: 'Background',
		usage: 'auto',
		type: 'box',
		enabled: {
			value: true,
			isExpression: false,
		},
		opacity: {
			value: 100,
			isExpression: false,
		},
		x: {
			value: 0,
			isExpression: false,
		},
		y: {
			value: 0,
			isExpression: false,
		},
		width: {
			value: 100,
			isExpression: false,
		},
		height: {
			value: 100,
			isExpression: false,
		},
		rotation: {
			value: 0,
			isExpression: false,
		},
		color: {
			value: 0,
			isExpression: false,
		},
		borderWidth: {
			value: 0,
			isExpression: false,
		},
		borderColor: {
			value: 0,
			isExpression: false,
		},
		borderPosition: {
			value: 'inside',
			isExpression: false,
		},
	},
]

const defaultTextLayer = {
	id: 'text0',
	name: 'Text',
	usage: 'auto',
	type: 'text',
	enabled: {
		value: true,
		isExpression: false,
	},
	opacity: {
		value: 100,
		isExpression: false,
	},
	x: {
		value: 0,
		isExpression: false,
	},
	y: {
		value: 0,
		isExpression: false,
	},
	width: {
		value: 100,
		isExpression: false,
	},
	height: {
		value: 100,
		isExpression: false,
	},
	rotation: {
		value: 0,
		isExpression: false,
	},
	color: {
		value: 0xffffff,
		isExpression: false,
	},
	halign: {
		value: 'center',
		isExpression: false,
	},
	valign: {
		value: 'center',
		isExpression: false,
	},
	fontsize: {
		value: 50.4,
		isExpression: false,
	},
	fontsizeAllowShrink: {
		value: true,
		isExpression: false,
	},
	font: {
		value: 'companion-sans',
		isExpression: false,
	},
	outlineColor: {
		value: 4278190080,
		isExpression: false,
	},
}

const defaultFeedbacks = [
	{
		type: 'feedback',
		id: 'xJ3EU7ogda9zBGWGINunt',
		connectionId: 'pzsklqKJf-CT1DgSHp2M-',
		definitionId: 'connected',
		options: {},
		isInverted: {
			value: false,
			isExpression: false,
		},
		upgradeIndex: -1,
		styleOverrides: [
			{
				overrideId: '1Zfz468eqm0CpFgzRWSRW',
				elementId: 'text0',
				elementProperty: 'color',
				override: {
					isExpression: false,
					value: 0,
				},
			},
			{
				overrideId: 'dZaMt58bJaqFpIQG8z-H1',
				elementId: 'box0',
				elementProperty: 'color',
				override: {
					value: 0xb8b8b8,
					isExpression: false,
				},
			},
		],
	},
]

const defaultFeedbackValues = {
	type: 'feedback',
	id: 'xJ3EU7ogda9zBGWGINunt',
	connectionId: 'pzsklqKJf-CT1DgSHp2M-',
	options: {
		value: {
			value: 1,
			isExpression: false,
		},
	},
	isInverted: {
		value: false,
		isExpression: false,
	},
	upgradeIndex: -1,
	styleOverrides: [
		{
			overrideId: '1Zfz468eqm0CpFgzRWSRW',
			elementId: 'text0',
			elementProperty: 'color',
			override: {
				isExpression: false,
				value: 0xffffff,
			},
		},
		{
			overrideId: 'dZaMt58bJaqFpIQG8z-H1',
			elementId: 'box0',
			elementProperty: 'color',
			override: {
				value: 0xff0000,
				isExpression: false,
			},
		},
	],
}

function addStuff(page, toggles, buttons, enums, sliders) {
	let y = 0
	let x = 0

	let result = unroll_indexed(toggles)
	for (const option of result) {
		if (!page.page.controls[String(y)]) page.page.controls[String(y)] = {}

		page.page.controls[String(y)][String(x)] = {
			type: 'button-layered',
			style: {
				layers: [
					...defaultLayers,
					{
						...defaultTextLayer,
						text: {
							isExpression: false,
							value: `Toggle - ${option.label}` + (option.isLogical === true ? ' - ' + LogicalMappingsEnum[0] : ''),
						},
					},
				],
			},
			options: {
				stepProgression: 'auto',
				stepExpression: '',
				rotaryActions: false,
				canModifyStyleInApis: false,
				notes: '',
			},
			feedbacks: [...defaultFeedbacks],
			steps: {
				0: {
					action_sets: {
						down: [
							{
								type: 'action',
								id: 'ChRwKefOa6DnkhRYUUYnN',
								connectionId: 'pzsklqKJf-CT1DgSHp2M-',
								definitionId: 'toggle',
								options: {
									option: {
										value:
											(option.isLogical ? LOGICAL_PREFIX : '') +
											(typeof option.index === 'number' ? INDEX_PREFIX : '') +
											option.id,
										isExpression: false,
									},
									logical: {
										value: LogicalMappingsDropdownValues,
										isExpression: false,
									},
									index: {
										value: 0,
										isExpression: false,
									},
									value: {
										value: 2,
										isExpression: false,
									},
								},
								upgradeIndex: -1,
							},
						],
						up: [],
					},
					options: {
						runWhileHeld: [],
					},
				},
			},
			localVariables: [],
		}

		const feedbackMapping = feedbackMappings.find(
			(mapping) => mapping.type === 'Toggle' && mapping.name === option.enum,
		)
		if (feedbackMapping) {
			const feedback = {
				...defaultFeedbackValues,
				definitionId: feedbackMapping.name,
				options: {
					...defaultFeedbackValues.options,
				},
			}
			if (option.isLogical === true)
				feedback.options.logical = {
					value: 0,
					isExpression: false,
				}
			else if (option.isLogical || feedbackMapping.hasSections !== 'None')
				feedback.options.index = {
					value: result.filter((toggle) => toggle.enum === option.enum).findIndex((toggle) => toggle.id === option.id),
					isExpression: false,
				}
			page.page.controls[String(y)][String(x)].feedbacks.push(feedback)
		}

		x++

		if (x > page.page.gridSize.maxColumn) {
			x = 0
			y++
		}
	}

	if (x !== 0) y++
	x = 0

	result = unroll_indexed(buttons)
	for (const option of result) {
		if (!page.page.controls[String(y)]) page.page.controls[String(y)] = {}

		page.page.controls[String(y)][String(x)] = {
			type: 'button-layered',
			style: {
				layers: [
					...defaultLayers,
					{
						...defaultTextLayer,
						text: {
							isExpression: false,
							value: `Button - ${option.label}` + (option.isLogical === true ? ' - ' + LogicalMappingsEnum[0] : ''),
						},
					},
				],
			},
			options: {
				stepProgression: 'auto',
				stepExpression: '',
				rotaryActions: false,
				canModifyStyleInApis: false,
				notes: '',
			},
			feedbacks: [...defaultFeedbacks],
			steps: {
				0: {
					action_sets: {
						down: [
							{
								type: 'action',
								id: 'ChRwKefOa6DnkhRYUUYnN',
								connectionId: 'pzsklqKJf-CT1DgSHp2M-',
								definitionId: 'press_button',
								options: {
									option: {
										value:
											(option.isLogical ? LOGICAL_PREFIX : '') +
											(typeof option.index === 'number' ? INDEX_PREFIX : '') +
											option.id,
										isExpression: false,
									},
									logical: {
										value: LogicalMappingsDropdownValues,
										isExpression: false,
									},
									index: {
										value: option.index ?? 0,
										isExpression: false,
									},
								},
								upgradeIndex: -1,
							},
						],
						up: [],
					},
					options: {
						runWhileHeld: [],
					},
				},
			},
			localVariables: [],
		}

		x++

		if (x > page.page.gridSize.maxColumn) {
			x = 0
			y++
		}
	}

	if (x !== 0) y++
	x = 0

	result = unroll_indexed(enums)
	let lastEnum = result[0]?.enum
	for (const option of result) {
		if (lastEnum !== option.enum) {
			lastEnum = option.enum
			x += 1
			if (x > page.page.gridSize.maxColumn) {
				y++
				x = 0
			}
		}

		if (!page.page.controls[String(y)]) page.page.controls[String(y)] = {}

		page.page.controls[String(y)][String(x)] = {
			type: 'button-layered',
			style: {
				layers: [
					...defaultLayers,
					{
						...defaultTextLayer,
						text: {
							isExpression: false,
							value: `Enum - ${option.label}` + (option.isLogical ? ' - ' + LogicalMappingsEnum[0] : ''),
						},
					},
				],
			},
			options: {
				stepProgression: 'auto',
				stepExpression: '',
				rotaryActions: false,
				canModifyStyleInApis: false,
				notes: '',
			},
			feedbacks: [...defaultFeedbacks],
			steps: {
				0: {
					action_sets: {
						down: [
							{
								type: 'action',
								id: 'ChRwKefOa6DnkhRYUUYnN',
								connectionId: 'pzsklqKJf-CT1DgSHp2M-',
								definitionId: 'set_enum',
								options: {
									option: {
										value:
											(option.isLogical ? LOGICAL_PREFIX : '') +
											(typeof option.index === 'number' ? INDEX_PREFIX : '') +
											option.id,
										isExpression: false,
									},
									logical: {
										value: LogicalMappingsDropdownValues,
										isExpression: false,
									},
									index: {
										value: 0,
										isExpression: false,
									},
								},
								upgradeIndex: -1,
							},
						],
						up: [],
					},
					options: {
						runWhileHeld: [],
					},
				},
			},
			localVariables: [],
		}

		const feedbackMapping = feedbackMappings.find((mapping) => mapping.type === 'Enum' && mapping.name === option.enum)
		if (feedbackMapping) {
			const feedback = {
				...defaultFeedbackValues,
				definitionId: feedbackMapping.name,
				options: {
					value: {
						value: result
							.filter((myEnum) => myEnum.enum === option.enum)
							.findIndex((myEnum) => myEnum.id === option.id),
						isExpression: false,
					},
				},
			}
			if (option.isLogical === true)
				feedback.options.logical = {
					value: 0,
					isExpression: false,
				}
			else if (option.isLogical || feedbackMapping.hasSections !== 'None')
				feedback.options.index = {
					value: result.filter((myEnum) => myEnum.enum === option.enum).findIndex((myEnum) => myEnum.id === option.id),
					isExpression: false,
				}
			page.page.controls[String(y)][String(x)].feedbacks.push(feedback)
		}

		x++

		if (x > page.page.gridSize.maxColumn) {
			x = 0
			y++
		}
	}

	if (x !== 0) y++
	x = 0

	let result_slider = unroll_indexed(sliders)
	for (const option of result_slider) {
		if (!page.page.controls[String(y)]) page.page.controls[String(y)] = {}

		page.page.controls[String(y)][String(x)] = {
			type: 'button-layered',
			style: {
				layers: [
					...defaultLayers,
					{
						...defaultTextLayer,
						text: {
							isExpression: false,
							value: `Slider - ${option.label}` + (option.isLogical === true ? ' - ' + LogicalMappingsEnum[0] : ''),
						},
					},
				],
			},
			options: {
				stepProgression: 'auto',
				stepExpression: '',
				rotaryActions: false,
				canModifyStyleInApis: false,
				notes: '',
			},
			feedbacks: [...defaultFeedbacks],
			steps: {
				0: {
					action_sets: {
						down: [
							{
								type: 'action',
								id: 'ChRwKefOa6DnkhRYUUYnN',
								connectionId: 'pzsklqKJf-CT1DgSHp2M-',
								definitionId: 'set_slider',
								options: {
									option: {
										value:
											(option.isLogical ? LOGICAL_PREFIX : '') +
											(typeof option.index === 'number' ? INDEX_PREFIX : '') +
											option.id,
										isExpression: false,
									},
									logical: {
										value: LogicalMappingsDropdownValues,
										isExpression: false,
									},
									index: {
										value: 0,
										isExpression: false,
									},
									value: {
										value: 0,
										isExpression: false,
									},
								},
								upgradeIndex: -1,
							},
						],
						up: [],
					},
					options: {
						runWhileHeld: [],
					},
				},
			},
			localVariables: [],
		}

		const feedbackMapping = feedbackMappings.find(
			(mapping) => mapping.type === 'Slider' && mapping.name === option.enum,
		)
		if (feedbackMapping) {
			const feedback = {
				...defaultFeedbackValues,
				definitionId: feedbackMapping.name,
				options: {
					...defaultFeedbackValues.options,
				},
			}
			if (option.isLogical)
				feedback.options.logical = {
					value: 0,
					isExpression: false,
				}
			else if (option.isLogical || feedbackMapping.hasSections !== 'None')
				feedback.options.index = {
					value:
						option.index ??
						result.filter((slider) => slider.enum === option.enum).findIndex((slider) => slider.id === option.id),
					isExpression: false,
				}
			page.page.controls[String(y)][String(x)].feedbacks.push(feedback)
		}

		x++

		if (x > page.page.gridSize.maxColumn) {
			x = 0
			y++
		}
	}

	x = 0
	y++
	page.page.controls[String(y)] = {}
	page.page.controls[String(y)][String(x)] = {
		type: 'pageup',
	}
	x++
	page.page.controls[String(y)][String(x)] = {
		type: 'pagedown',
	}

	if (y > page.page.gridSize.maxRow) {
		console.error('buttons rows do not fit!', y, '/', page.page.gridSize.maxRow)
	}
	return page
}

console.log('page1')

const newPage1 = addStuff(
	page1,
	toggles.filter((o) => o.class !== 'logical'),
	buttons.filter((o) => o.class !== 'logical'),
	enums.filter((o) => o.class !== 'logical'),
	sliders.filter((o) => o.class !== 'logical'),
)
fs.writeFile('Test.companionconfig', JSON.stringify(newPage1, null, '\t'))

console.log('page2')

const newPage2 = addStuff(
	page2,
	toggles.filter((o) => o.class === 'logical'),
	buttons.filter((o) => o.class === 'logical'),
	enums.filter((o) => o.class === 'logical'),
	sliders.filter((o) => o.class === 'logical'),
)
fs.writeFile('Test2.companionconfig', JSON.stringify(newPage2, null, '\t'))

/*@end @*/
