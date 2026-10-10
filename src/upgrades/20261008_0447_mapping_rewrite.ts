import type {
	CompanionStaticUpgradeProps,
	CompanionStaticUpgradeResult,
	CompanionUpgradeContext,
	JsonObject,
} from '@companion-module/base'
import type { ModuleConfig } from '../config.js'

export function upgrade<T extends JsonObject | undefined>(
	_: CompanionUpgradeContext<ModuleConfig>,
	props: CompanionStaticUpgradeProps<ModuleConfig, T>,
): CompanionStaticUpgradeResult<ModuleConfig, T> {
	const updatedActions = []
	for (const action of props.actions) {
		if (typeof action.options.option !== 'object') continue
		if (action.options.option.isExpression) continue
		if (typeof action.options.option.value !== 'string') continue

		let includeAction = false

		for (const option of [
			{
				name: 'Macro__Macro ',
				newName: 'INDEX__Macro__Macro',
				actionId: 'press_button',
				skipIndex: false,
				skipLogical: false,
			},
			{
				name: 'General__Color ',
				newName: 'INDEX__General__Color',
				actionId: 'press_button',
				skipIndex: false,
				skipLogical: false,
			},
			{
				name: 'General__Gobo: ',
				newName: 'INDEX__General__Gobo',
				actionId: 'press_button',
				skipIndex: false,
				skipLogical: false,
			},
			{
				name: 'Activation__Wash Band: ',
				newName: 'INDEX__Activation__Wash Band',
				actionId: 'press_button',
				mapping: {
					'Always on': '0',
					Bass: '1',
					'Low Mid': '2',
					'Upper Mid': '3',
					Treble: '4',
				},
				skipIndex: false,
				skipLogical: false,
			},
			{
				name: 'Activation__Spot Band: ',
				newName: 'INDEX__Activation__Spot Band',
				actionId: 'press_button',
				mapping: {
					'Always on': '0',
					Bass: '1',
					'Low Mid': '2',
					'Upper Mid': '3',
					Treble: '4',
				},
				skipIndex: false,
				skipLogical: false,
			},
			{
				name: 'Activation__Laser Band: ',
				newName: 'INDEX__Activation__Laser Band',
				actionId: 'press_button',
				mapping: {
					'Always on': '0',
					Bass: '1',
					'Low Mid': '2',
					'Upper Mid': '3',
					Treble: '4',
				},
				skipIndex: false,
				skipLogical: false,
			},
			{
				name: 'LOGICAL__Activation__Wash Band: ',
				newName: 'LOGICAL__INDEX__Activation__Wash Band',
				actionId: 'set_enum',
				mapping: {
					'Always on': '0',
					Bass: '1',
					'Low Mid': '2',
					'Upper Mid': '3',
					Treble: '4',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'LOGICAL__Activation__Spot Band: ',
				newName: 'LOGICAL__INDEX__Activation__Spot Band',
				actionId: 'set_enum',
				mapping: {
					'Always on': '0',
					Bass: '1',
					'Low Mid': '2',
					'Upper Mid': '3',
					Treble: '4',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'LOGICAL__Activation__Laser Band: ',
				newName: 'LOGICAL__INDEX__Activation__Laser Band',
				actionId: 'set_enum',
				mapping: {
					'Always on': '0',
					Bass: '1',
					'Low Mid': '2',
					'Upper Mid': '3',
					Treble: '4',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'LOGICAL__General__Gobo: ',
				newName: 'LOGICAL__INDEX__General__Gobo',
				actionId: 'set_enum',
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'LOGICAL__General__Set Spot to Color: ',
				newName: 'LOGICAL__INDEX__General__Set Spot to Color',
				actionId: 'set_enum',
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'LOGICAL__General__Set Wash to Color: ',
				newName: 'LOGICAL__INDEX__General__Set Wash to Color',
				actionId: 'set_enum',
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'LOGICAL__General__Set Laser to Color: ',
				newName: 'LOGICAL__INDEX__General__Set Laser to Color',
				actionId: 'set_enum',
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Wall Line Activation__Wall Lines: ',
				newName: 'INDEX__Wall Line Activation__Wall Lines',
				actionId: 'set_enum',
				mapping: {
					Fix: '0',
					'Audio Link': '1',
					'Wave Forward': '2',
					'Wave Center': '3',
					'Wave Up': '4',
					'Wave Down': '5',
					Flash: '6',
					RESERVED: '7',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Movement__Spot Movement: ',
				newName: 'INDEX__Movement__Spot Movement',
				actionId: 'set_enum',
				mapping: {
					Static: '0',
					'Wave Forward': '1',
					'Wave Backward': '2',
					'Circle Backward': '3',
					'Circle Forward': '4',
					Random: '5',
					Strike: '6',
					RESERVED: '7',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Movement__Wash Movement: ',
				newName: 'INDEX__Movement__Wash Movement',
				actionId: 'set_enum',
				mapping: {
					Static: '0',
					Wash: '1',
					Strike: '2',
					RESERVED: '3',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'General__Random: ',
				newName: 'INDEX__General__Random',
				actionId: 'set_enum',
				mapping: {
					Off: '0',
					Wave: '1',
					Random: '2',
					All: '3',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Effect__Flasher: ',
				newName: 'INDEX__Effect__Flasher',
				actionId: 'set_enum',
				mapping: {
					Off: '0',
					'Audio Link': '1',
					'Random Audio Link': '2',
					'Hard Audio Link': '3',
					Random: '4',
					Hard: '5',
					RESERVED: '6',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Effect__Moving Head Strobe: ',
				newName: 'INDEX__Effect__Moving Head Strobe',
				actionId: 'set_enum',
				mapping: {
					Off: '0',
					Random: '1',
					'Section Random': '2',
					Hard: '3',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Advanced__Screen Mapping: ',
				newName: 'INDEX__Advanced__Screen Mapping',
				actionId: 'set_enum',
				mapping: {
					Full: '0',
					'Cropped DMX': '1',
					Mapped: '2',
					RESERVED: '3',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Wall Line Colors__',
				newName: 'INDEX__Advanced__Wall Line Colors',
				actionId: 'set_enum',
				mapping: {
					Initialize: '0',
					Deepsea: '1',
					Skyhigh: '2',
					Lavender: '3',
					Lovepotion: '4',
					Yumekawa: '5',
					Sunset: '6',
					Goldenage: '7',
					Redlight: '8',
					Takefive: '9',
					Garden: '10',
					Energize: '11',
					Happy: '12',
					Poppinshower: '13',
					RGB: '14',
					Turquise: '15',
				},
				skipIndex: false,
				skipLogical: true,
			},
			{
				name: 'Activation__Section Enabled',
				actionId: 'press_button',
				newActionId: 'toggle',
			},
			{
				name: 'Activation__Spot Enabled',
				actionId: 'press_button',
				newActionId: 'toggle',
			},
			{
				name: 'Activation__Wash Enabled',
				actionId: 'press_button',
				newActionId: 'toggle',
			},
			{
				name: 'Effect__Laser Enabled',
				actionId: 'press_button',
				newActionId: 'toggle',
			},
			{
				name: 'INDEX__Macro__Use Macro 0-31',
				newName: 'INDEX__Macro__Use Macro',
				actionId: 'press_button',
			},
			{
				name: 'INDEX__Macro__Set Macro 0-31',
				newName: 'INDEX__Macro__Set Macro',
				actionId: 'press_button',
			},
			{
				name: 'INDEX__General__Set Color 0-15',
				newName: 'INDEX__General__Set Color',
				actionId: 'press_button',
			},
		]) {
			if (action.actionId !== option.actionId) continue
			if (
				(typeof option.newName === 'string' && action.options.option.value.startsWith(option.name)) ||
				action.options.option.value == option.name
			) {
				includeAction = true
				const oldName = action.options.option.value
				if (typeof option.newName === 'string') action.options.option.value = option.newName

				if (typeof option.newActionId === 'string') action.actionId = option.newActionId

				if (typeof option.newName === 'string') {
					let value = oldName.slice(option.name.length)
					if (typeof option.mapping === 'object') {
						const newValue = option.mapping[value as keyof typeof option.mapping]
						if (typeof newValue === 'string') {
							value = newValue
						} else {
							continue
						}
					}

					if (!option.skipIndex)
						action.options.index = {
							value: value,
							isExpression: false,
						}
					if (!option.skipLogical)
						action.options.logical = {
							value: value,
							isExpression: false,
						}
				}
			}
		}
		if (
			action.actionId === 'toggle' ||
			action.actionId === 'press_button' ||
			action.actionId === 'set_enum' ||
			action.actionId === 'set_slider'
		) {
			includeAction = typeof action.options.index === 'undefined'
			action.options.index ??= {
				value: 0,
				isExpression: false,
			}
			action.options.index.value ??= 0
		}

		if (includeAction) updatedActions.push(action)
	}

	return {
		updatedConfig: null,
		updatedActions: updatedActions,
		updatedFeedbacks: [],
	}
}
