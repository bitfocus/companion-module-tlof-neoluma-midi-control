/*@cc_on
@if (@_jscript)
	var objShell = new ActiveXObject('Shell.Application');
	var pathSelf = WScript.ScriptFullName;
	objShell.ShellExecute('cmd.exe', '/C node.exe "' + pathSelf + '" & pause');
	WScript.Quit();
@else @*/

/*
This is a utility script to generate the buttons, sliders, enums, from the DOCS.md file
*/

import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * @param {string} name
 */
function cleanupName(name) {
	name = name.trim()
	if (name.endsWith(':')) name = name.substring(0, name.length - 1)
	return name
}

const data = await fs.readFile(path.resolve('./DOCS.md'), { encoding: 'utf-8' })
const chapters = data.split('\n# ')

let mapping_buttons = "import type MappingData from './mapping_data.js'\n\nexport const buttons: MappingData[] = [\n",
	mapping_enums = "import type MappingData from './mapping_data.js'\n\nexport const enums: MappingData[] = [\n",
	mapping_feedback_mappings = 'export const feedbackMappings: FeedbackMappings[] = [\n',
	mapping_logical_mappings_enum = 'export enum LogicalMappingsEnum {\n',
	mapping_sliders =
		"import type { SliderMappingData } from './mapping_data.js'\n\nconst ALL = 'ALL'\n\nexport const sliders: SliderMappingData[] = [\n",
	mapping_toggles = "import type MappingData from './mapping_data.js'\n\nexport const toggles: MappingData[] = [\n",
	feedbacks = `import type ModuleInstance from './main.js'\nimport LogicalMappingsEnum, { LogicalMappingsDropdownOptions } from './mapping/logical_mappings_enum.js'\n\n`,
	variables = `import type ModuleInstance from './main.js'\n\n`

let m

for (const chapter of chapters) {
	const name = cleanupName(chapter.substring(0, chapter.indexOf('\n')))
	// Midi
	if (name === 'Mappings') {
		console.log('Processing mappings...')
		const regex =
			/^\|(?<Channel>[^|\n]+)\|(?<nNumber>[^|\n-]*)(?:-\d+)?\|(?<Velocity>[^|\n]*)\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|(?<BasedOn>[^|\n]*)\|(?<Type>[^|\n(^]+)(?:\[\^(?:1|2)\])?(?:\((?<Enum>[^)|\n]+)\))?\|$/gm
		while ((m = regex.exec(chapter)) !== null) {
			let { Channel, nNumber, Velocity, Section, Description, Type, Enum } = m.groups
			if (Type === 'Type' || Type === '-') continue
			Enum ??= ''
			const string = `\t{\n\t\tid: '${Section}__${Description}',\n\t\tlabel: '${Section} - ${Description}',\n\t\tchannel: ${Channel},\n\t\tnumber: ${nNumber},\n\t\tvelocity: ${Velocity},\n\t\tenum: '${Enum}',\n\t},\n`
			if (Type === 'Button') mapping_buttons += string
			else if (Type === 'Enum') mapping_enums += string
			else if (Type === 'Slider') mapping_sliders += string
			else if (Type === 'Toggle') mapping_toggles += string
			else console.warn('Unknown Mapping type', Type)
		}
	} else if (name === 'Logical Mappings') {
		console.log('Processing logical mappings...')
		mapping_buttons += '\n	// Logical\n'
		mapping_enums += '\n	// Logical\n'
		mapping_sliders += '\n	// Logical\n'
		mapping_toggles += '\n	// Logical\n'

		const regexLogicalMappingEnum = /^\|(?<nNumber>[^|\n]+)\|(?<Section>[^|\n]+)\|(?<Side>[^|\n]+)\|$/gm
		let foundReserved = false
		while ((m = regexLogicalMappingEnum.exec(chapter)) !== null) {
			let { nNumber, Section, Side } = m.groups
			if (Section === 'Section' || Section === '-') continue // Table header
			if (Section === 'RESERVED' && foundReserved === false) {
				mapping_logical_mappings_enum += '\t/*\n'
				foundReserved = true
			}
			mapping_logical_mappings_enum += `\t${Section}_${Side} = ${nNumber},\n`
		}

		const regexButtons =
			/^\|(?<Channel>[^|\n]*)\|(?<nNumber>[^|\n-]*)\|(?<Velocity>[^|\n-]*)-(?<Max>\d+)\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|Button(?:\((?<Enum>[^)|\n]+)\))?\|$/gm
		while ((m = regexButtons.exec(chapter)) !== null) {
			let { Channel, nNumber, Velocity, Max, Section, Description, Enum } = m.groups
			if (Section === 'Section' || Section === '-') continue
			Enum ??= ''
			mapping_buttons += `\t{\n\t\tid: '${Section}__${Description}',\n\t\tlabel: '${Section} - ${Description}',\n\t\tchannel: ${Channel},\n\t\tnumber: ${nNumber},\n\t\tvelocity: ${Velocity},\n\t\tenum: '${Enum}',\n\t\tisLogical: ${Max} - ${Velocity} + 1,\n\t},\n`
		}

		const regex =
			/^\|(?<Channel>[^|\n]*)\|(?<nNumber>[^|\n-]*)(?:-\d+)?\|(?<Velocity>[^|\n-]*)(?:-\d+)?\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|(?<Type>[^|\n(^]+)(?:\[\^(?:1|2)\])?(?:\((?<Enum>[^)|\n]+)\))?\|$/gm
		while ((m = regex.exec(chapter)) !== null) {
			let { Channel, nNumber, Velocity, Section, Description, Type, Enum } = m.groups
			if (Type === 'Type' || Type === '-') continue
			Enum ??= ''
			const string = `\t{\n\t\tid: '${Section}__${Description}',\n\t\tlabel: '${Section} - ${Description}',\n\t\tchannel: ${Channel},\n\t\tnumber: ${nNumber},\n\t\tvelocity: ${Velocity},\n\t\tenum: '${Enum}',\n\t\tisLogical: true,\n\t},\n`
			if (Type === 'Enum') mapping_enums += string
			else if (Type === 'Toggle') mapping_toggles += string
			else if (Type === 'Slider') mapping_sliders += string
		}
	} else if (name === 'Midi Feedback') {
		console.log('Processing midi feedback...')
		const regex =
				/^\|?(?<nNumber>[^|\n]+)\|(?<Name>[^|\n]+)\|(?<HasSections>[^|\n]+)\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$/gm,
			hasSectionsOptions = [],
			typeOptions = [],
			dataOptions = []
		let variablesNormal = ['', ''],
			variablesLogical = ['', ''],
			variablesOther = ['', ''],
			feedbacksNormal = ['', ''],
			feedbacksLogical = ['', ''],
			feedbacksOther = ['', '']
		while ((m = regex.exec(chapter)) !== null) {
			let { nNumber, Name, HasSections, Type, Data } = m.groups
			if (Type === 'Type' || Type === '-') continue
			if (Data === 'Bool') Data = '0-1'
			mapping_feedback_mappings += `\t{\n\t\tnumber: ${nNumber},\n\t\tname: '${Name}',\n\t\thasSections: '${HasSections}',\n\t\ttype: '${Type}',\n\t\tdata: '${Data}',\n\t},\n`

			if (!hasSectionsOptions.includes(HasSections)) hasSectionsOptions.push(HasSections)
			if (!typeOptions.includes(Type)) typeOptions.push(Type)
			if (!dataOptions.includes(Data)) dataOptions.push(Data)
			const [Min, Max] = Data.split('-')

			if (HasSections === 'None') {
				variablesNormal[0] += `\t${Name}: number\n`
				variablesNormal[1] += `\t\t${Name}: { name: '${Name}' },\n`

				feedbacksNormal[0] += `\t${Name}: {\n\t\ttype: 'boolean'\n\t\toptions: {\n\t\t\tvalue: number\n\t\t}\n\t}\n`
				feedbacksNormal[1] += `\t\t${Name}: {\n\t\t\tname: '${Name}',\n\t\t\tdescription: '${Name}',\n\t\t\ttype: 'boolean',\n\t\t\tdefaultStyle: {\n\t\t\t\tcolor: 0xffffff,\n\t\t\t\tbgcolor: 0x00ff00,\n\t\t\t},\n\t\t\toptions: [\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'value',\n\t\t\t\t\tlabel: 'Value',\n\t\t\t\t\tdefault: 1,\n\t\t\t\t\tmin: ${Min},\n\t\t\t\t\tmax: ${Max},\n\t\t\t\t},\n\t\t\t],\n\t\t\tcallback: (feedback) => {\n\t\t\t\treturn self.getVariableValue('${Name}') === feedback.options.value\n\t\t\t},\n\t\t},\n`
			} else if (HasSections === 'Logical') {
				variablesLogical[0] += `\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n\t${Name}_17: number\n\t${Name}_18: number\n\t${Name}_19: number\n\t${Name}_20: number\n\t${Name}_21: number\n\t${Name}_22: number\n\t${Name}_23: number\n\t${Name}_24: number\n\t${Name}_25: number\n\t${Name}_26: number\n\t${Name}_27: number\n\t${Name}_28: number\n\t${Name}_29: number\n\t${Name}_30: number\n\t${Name}_31: number\n`
				variablesLogical[1] += `\t\t${Name}_00: { name: '${Name} Logical 00' },\n\t\t${Name}_01: { name: '${Name} Logical 01' },\n\t\t${Name}_02: { name: '${Name} Logical 02' },\n\t\t${Name}_03: { name: '${Name} Logical 03' },\n\t\t${Name}_04: { name: '${Name} Logical 04' },\n\t\t${Name}_05: { name: '${Name} Logical 05' },\n\t\t${Name}_06: { name: '${Name} Logical 06' },\n\t\t${Name}_07: { name: '${Name} Logical 07' },\n\t\t${Name}_08: { name: '${Name} Logical 08' },\n\t\t${Name}_09: { name: '${Name} Logical 09' },\n\t\t${Name}_10: { name: '${Name} Logical 10' },\n\t\t${Name}_11: { name: '${Name} Logical 11' },\n\t\t${Name}_12: { name: '${Name} Logical 12' },\n\t\t${Name}_13: { name: '${Name} Logical 13' },\n\t\t${Name}_14: { name: '${Name} Logical 14' },\n\t\t${Name}_15: { name: '${Name} Logical 15' },\n\t\t${Name}_16: { name: '${Name} Logical 16' },\n\t\t${Name}_17: { name: '${Name} Logical 17' },\n\t\t${Name}_18: { name: '${Name} Logical 18' },\n\t\t${Name}_19: { name: '${Name} Logical 19' },\n\t\t${Name}_20: { name: '${Name} Logical 20' },\n\t\t${Name}_21: { name: '${Name} Logical 21' },\n\t\t${Name}_22: { name: '${Name} Logical 22' },\n\t\t${Name}_23: { name: '${Name} Logical 23' },\n\t\t${Name}_24: { name: '${Name} Logical 24' },\n\t\t${Name}_25: { name: '${Name} Logical 25' },\n\t\t${Name}_26: { name: '${Name} Logical 26' },\n\t\t${Name}_27: { name: '${Name} Logical 27' },\n\t\t${Name}_28: { name: '${Name} Logical 28' },\n\t\t${Name}_29: { name: '${Name} Logical 29' },\n\t\t${Name}_30: { name: '${Name} Logical 30' },\n\t\t${Name}_31: { name: '${Name} Logical 31' },\n`

				feedbacksLogical[0] += `\t${Name}: {\n\t\ttype: 'boolean'\n\t\toptions: {\n\t\t\tvalue: number\n\t\t\tlogical: LogicalMappingsEnum\n\t\t}\n\t}\n`
				feedbacksLogical[1] += `\t\t${Name}: {\n\t\t\tname: '${Name}',\n\t\t\tdescription: '${Name}',\n\t\t\ttype: 'boolean',\n\t\t\tdefaultStyle: {\n\t\t\t\tcolor: 0xffffff,\n\t\t\t\tbgcolor: 0x00ff00,\n\t\t\t},\n\t\t\toptions: [\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'value',\n\t\t\t\t\tlabel: 'Value',\n\t\t\t\t\tdefault: 1,\n\t\t\t\t\tmin: ${Min},\n\t\t\t\t\tmax: ${Max},\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: 'dropdown',\n\t\t\t\t\tid: 'logical',\n\t\t\t\t\tlabel: 'Logical',\n\t\t\t\t\tdefault: 0,\n\t\t\t\t\tchoices: LogicalMappingsDropdownOptions,\n\t\t\t\t},\n\t\t\t],\n\t\t\tcallback: (feedback) => {\n\t\t\t\treturn (\n\t\t\t\t\tself.getVariableValue(\n\t\t\t\t\t\t'${Name}_' +\n\t\t\t\t\t\t\t(feedback.options.logical < LogicalMappingsEnum.InScreen_Left\n\t\t\t\t\t\t\t\t? '0' + feedback.options.logical\n\t\t\t\t\t\t\t\t: feedback.options.logical),\n\t\t\t\t\t) === feedback.options.value\n\t\t\t\t)\n\t\t\t},\n\t\t},\n`
			} else {
				variablesOther[0] += `\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n`
				variablesOther[1] += `\t\t${Name}_00: { name: '${Name} Index 00' },\n\t\t${Name}_01: { name: '${Name} Index 01' },\n\t\t${Name}_02: { name: '${Name} Index 02' },\n\t\t${Name}_03: { name: '${Name} Index 03' },\n\t\t${Name}_04: { name: '${Name} Index 04' },\n\t\t${Name}_05: { name: '${Name} Index 05' },\n\t\t${Name}_06: { name: '${Name} Index 06' },\n\t\t${Name}_07: { name: '${Name} Index 07' },\n\t\t${Name}_08: { name: '${Name} Index 08' },\n\t\t${Name}_09: { name: '${Name} Index 09' },\n\t\t${Name}_10: { name: '${Name} Index 10' },\n\t\t${Name}_11: { name: '${Name} Index 11' },\n\t\t${Name}_12: { name: '${Name} Index 12' },\n\t\t${Name}_13: { name: '${Name} Index 13' },\n\t\t${Name}_14: { name: '${Name} Index 14' },\n\t\t${Name}_15: { name: '${Name} Index 15' },\n\t\t${Name}_16: { name: '${Name} Index 16' },\n`

				feedbacksOther[0] += `\t${Name}: {\n\t\ttype: 'boolean'\n\t\toptions: {\n\t\t\tvalue: number\n\t\t\tindex: number\n\t\t}\n\t}\n`
				feedbacksOther[1] += `\t\t${Name}: {\n\t\t\tname: '${Name}',\n\t\t\tdescription: '${Name}',\n\t\t\ttype: 'boolean',\n\t\t\tdefaultStyle: {\n\t\t\t\tcolor: 0xffffff,\n\t\t\t\tbgcolor: 0x00ff00,\n\t\t\t},\n\t\t\toptions: [\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'value',\n\t\t\t\t\tlabel: 'Value',\n\t\t\t\t\tdefault: 1,\n\t\t\t\t\tmin: ${Min},\n\t\t\t\t\tmax: ${Max},\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'index',\n\t\t\t\t\tlabel: 'Index',\n\t\t\t\t\tdefault: 0,\n\t\t\t\t\tmin: 0,\n\t\t\t\t\tmax: 16,\n\t\t\t\t},\n\t\t\t],\n\t\t\tcallback: (feedback) => {\n\t\t\t\treturn (\n\t\t\t\t\tself.getVariableValue(\n\t\t\t\t\t\t'${Name}_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),\n\t\t\t\t\t) === feedback.options.value\n\t\t\t\t)\n\t\t\t},\n\t\t},\n`
			}
		}

		mapping_feedback_mappings =
			`export interface FeedbackMappings {
	number: number
	name: string
	hasSections: '${hasSectionsOptions.join("' | '")}'
	type: '${typeOptions.join("' | '")}'
	data: '${dataOptions.sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1])).join("' | '")}'
}

` + mapping_feedback_mappings

		feedbacks +=
			`export type FeedbacksSchema = {
	connected: {
		type: 'boolean'
		options: Record<string, never>
	}
` +
			'\n\t// Feedback Mappings:\n' +
			feedbacksNormal[0] +
			'\n\t// Logical Feedback Mappings:\n' +
			feedbacksLogical[0] +
			'\n\t// Other Mappings:\n' +
			feedbacksOther[0] +
			'}\n\n' +
			`export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		connected: {
			name: 'Connected to VRChat World',
			description: 'Active when the module is connected and sending data to a VRChat world',
			type: 'boolean',
			defaultStyle: {
				color: 0x000000,
				bgcolor: 0x00ff00,
			},
			options: [],
			callback: () => {
				return !!self.getVariableValue('connected')
			},
		},
` +
			'\n\t\t// Feedback Mappings:\n' +
			feedbacksNormal[1] +
			'\n\t\t// Logical Feedback Mappings:\n' +
			feedbacksLogical[1] +
			'\n\t\t// Other Mappings:\n' +
			feedbacksOther[1] +
			'\t})\n}\n'

		const variablesString =
			'\n\t// Feedback Mappings:\n' +
			variablesNormal[0] +
			'\n\t// Logical Feedback Mappings:\n' +
			variablesLogical[0] +
			'\n\t// Other Mappings:\n' +
			variablesOther[0]

		variables +=
			'export type VariablesSchema = {\n\tconnected: boolean\n' +
			variablesString +
			'}\n\n' +
			'export const defaultValues = {' +
			variablesString.replaceAll(': number', ': -1,') +
			'}\n\n' +
			`export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions({
		connected: { name: 'Connected to VRChat World' },
` +
			'\n\t\t// Feedback Mappings:\n' +
			variablesNormal[1] +
			'\n\t\t// Logical Feedback Mappings:\n' +
			variablesLogical[1] +
			'\n\t\t// Other Mappings:\n' +
			variablesOther[1] +
			'\t})\n\tself.setVariableValues({\n\t\tconnected: false,\n\t\t...defaultValues,\n\t})\n'
	}
}

mapping_buttons +=
	"]\n\nexport default buttons\n\nexport const maxLogicalIndex = Math.max(\n	...buttons.map((option) => option.isLogical).filter((option) => typeof option === 'number'),\n)\n"
mapping_enums += ']\n\nexport default enums\n'
mapping_feedback_mappings += ']\n\nexport default feedbackMappings\n'
mapping_logical_mappings_enum +=
	'\t*/\n}\n\nexport const LogicalMappingsDropdownOptions = Object.keys(LogicalMappingsEnum)\n	.filter((key) => !isNaN(Number(key)))\n	.map((option) => ({\n		id: Number(option),\n		label: LogicalMappingsEnum[Number(option)],\n	}))\n\nexport default LogicalMappingsEnum\n'
mapping_sliders += ']\n\nexport default sliders\n'
mapping_toggles += ']\n\nexport default toggles\n'

variables += '}\n'

await fs.writeFile(path.resolve('./src/mapping/buttons.ts'), mapping_buttons, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/mapping/enums.ts'), mapping_enums, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/mapping/feedback_mappings.ts'), mapping_feedback_mappings, {
	encoding: 'utf-8',
})
await fs.writeFile(path.resolve('./src/mapping/logical_mappings_enum.ts'), mapping_logical_mappings_enum, {
	encoding: 'utf-8',
})
await fs.writeFile(path.resolve('./src/mapping/sliders.ts'), mapping_sliders, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/mapping/toggles.ts'), mapping_toggles, { encoding: 'utf-8' })

await fs.writeFile(path.resolve('./src/feedbacks.ts'), feedbacks, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/variables.ts'), variables, { encoding: 'utf-8' })

/*@end @*/
