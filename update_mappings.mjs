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
import mappings from './world-docs/MIDI/Mappings.json' with { type: 'json' }

let mapping_buttons =
		"import type { MappingData } from './mapping_data.js'\n\nexport const buttons: MappingData[] = [\n",
	mapping_enums = "import type { MappingData } from './mapping_data.js'\n\nexport const enums: MappingData[] = [\n",
	mapping_feedback_mappings = `export type FeedbackMappings = typeof feedbackMappings[number]

export const feedbackMappings = [
`,
	mapping_logical_mappings_enum = 'export enum LogicalMappingsEnum {\n',
	mapping_sliders =
		"import type { SliderMappingData } from './mapping_data.js'\n\nconst ALL = 'ALL'\n\nexport const sliders: SliderMappingData[] = [\n",
	mapping_toggles = "import type { MappingData } from './mapping_data.js'\n\nexport const toggles: MappingData[] = [\n",
	variables = `import type ModuleInstance from './main.js'\n\n`

/**
 * @param Type string
 * @param string string
 */
function add_mapping(Type, string) {
	if (Type === 'Button') mapping_buttons += string
	else if (Type === 'Enum') mapping_enums += string
	else if (Type === 'Slider') mapping_sliders += string
	else if (Type === 'Toggle') mapping_toggles += string
	else console.warn('Unknown Mapping type', Type)
}

{
	{
		console.log('Processing mappings...')
		for (const mapping of mappings.mappings) {
			const {
				class: Class,
				channel: Channel,
				number: nNumber,
				section: Section,
				name: Description,
				type: { value: Type },
			} = mapping
			const Enum = typeof mapping.type.feedback === 'string' ? `'${mapping.type.feedback}'` : 'null'
			const Velocity = mapping.velocity ?? 'ALL'

			let string = `\t{
\t\tid: '${Section}__${Description}',
\t\tlabel: '${Section} - ${Description}',
\t\tchannel: ${Channel},
\t\tnumber: ${nNumber},
\t\tvelocity: ${Velocity},
\t\ttype: 'single',
\t\tisLogical: false,
\t\tenum: ${Enum},
\t\tclass: '${Class}',
\t},
`
			add_mapping(Type, string)
		}
	}
	{
		for (const mappings1 of [mappings.indexedMappings, mappings.enumMappings])
			for (const mapping of mappings1) {
				let {
					class: Class,
					section: Section,
					name: Description,
					type: { value: Type },
				} = mapping
				const Enum = typeof mapping.type.feedback === 'string' ? `'${mapping.type.feedback}'` : 'null'
				let string = `\t{
\t\tid: '${Section}__${Description}',
\t\tlabel: '${Section} - ${Description}',
\t\tisLogical: false,
\t\ttype: 'indexed',
\t\tenum: ${Enum},
\t\tclass: '${Class}',
\t\tvalues: [`

				for (const [index, value] of mapping.values.entries()) {
					let { channel, number, velocity } = value
					const name = typeof value.name === 'string' ? value.name : index
					string += `
\t\t\t{
\t\t\t\tid: '${name}',
\t\t\t\tlabel: '${name}',
\t\t\t\tchannel: ${channel},
\t\t\t\tnumber: ${number},
\t\t\t\tvelocity: ${velocity},
\t\t\t\ttype: 'single',
\t\t\t},`
				}
				string += `
\t\t],
\t},
`
				add_mapping(Type, string)
			}
	}
	{
		for (const mapping of mappings.rangedMappings) {
			const {
				class: Class,
				channel: Channel,
				section: Section,
				name: Description,
				type: { value: Type },
			} = mapping
			const Enum = typeof mapping.type.feedback === 'string' ? `'${mapping.type.feedback}'` : 'null'
			let Velocity,
				nNumber,
				min,
				max,
				variable = null
			switch (typeof mapping.velocity) {
				case 'undefined':
					Velocity = "'ALL'"
					break
				case 'object':
					variable = 'velocity'
					Velocity = mapping.velocity.start
					min = mapping.velocity.start
					max = mapping.velocity.end
					break
			}
			switch (typeof mapping.number) {
				case 'object':
					if (variable != null) {
						console.warn('Found ranged Mapping with both variable Velocity and Number')
						continue
					}
					variable = 'number'
					nNumber = mapping.number.start
					min = mapping.number.start
					max = mapping.number.end
					break
				case 'number':
					nNumber = mapping.number
					if (Velocity === 'ALL') {
						console.warn('Found ranged Mapping without range in Velocity or Number')
						continue
					}
					break
			}
			const string = `\t{
\t\tid: '${Section}__${Description}',
\t\tlabel: '${Section} - ${Description}',
\t\tchannel: ${Channel},
\t\tnumber: ${nNumber},
\t\tvelocity: ${Velocity},
\t\ttype: 'ranged',
\t\tisLogical: true,
\t\tenum: ${Enum},
\t\tclass: '${Class}',
\t\trange: {
\t\t\tvariable: '${variable}',
\t\t\tstart: ${min},
\t\t\tend: ${max},
\t\t},
\t},
`
			add_mapping(Type, string)
		}
	}
	{
		for (const mapping of mappings.enumRangedMappings) {
			const {
				class: Class,
				section: Section,
				name: Description,
				type: { value: Type },
			} = mapping
			const Enum = typeof mapping.type.feedback === 'string' ? `'${mapping.type.feedback}'` : 'null'

			let string = `\t{
\t\tid: '${Section}__${Description}',
\t\tlabel: '${Section} - ${Description}',
\t\tisLogical: true,
\t\ttype: 'indexed',
\t\tenum: ${Enum},
\t\tclass: '${Class}',
\t\tvalues: [`

			for (const [index, value] of mapping.values.entries()) {
				let { channel: Channel, number, velocity } = value
				const name = typeof value.name === 'string' ? value.name : index

				let Velocity,
					nNumber,
					min,
					max,
					variable = null
				switch (typeof velocity) {
					case 'undefined':
						Velocity = "'ALL'"
						break
					case 'object':
						variable = 'velocity'
						Velocity = velocity.start
						min = velocity.start
						max = velocity.end
						break
				}
				switch (typeof number) {
					case 'object':
						if (variable != null) {
							console.warn('Found ranged enum Mapping with both variable Velocity and Number')
							continue
						}
						variable = 'number'
						nNumber = number.start
						min = number.start
						max = number.end
						break
					case 'number':
						nNumber = number
						if (Velocity === 'ALL') {
							console.warn('Found ranged enum Mapping without range in Velocity or Number')
							continue
						}
						break
				}

				string += `
\t\t\t{
\t\t\t\tid: '${name}',
\t\t\t\tlabel: '${name}',
\t\t\t\tchannel: ${Channel},
\t\t\t\tnumber: ${nNumber},
\t\t\t\tvelocity: ${Velocity},
\t\t\t\ttype: 'ranged',
\t\t\t\trange: {
\t\t\t\t\tvariable: '${variable}',
\t\t\t\t\tstart: ${min},
\t\t\t\t\tend: ${max},
\t\t\t\t},
\t\t\t},`
			}

			string += `
\t\t],
\t},
`
			add_mapping(Type, string)
		}
	}
	{
		console.log('Processing logical mappings...')
		let foundReserved = false
		for (const value of mappings.rangedNames) {
			const { index: nNumber, section: Section, side: Side } = value
			if (Section === 'Section' || Section === '-') continue // Table header
			if (Section === 'RESERVED' && foundReserved === false) {
				mapping_logical_mappings_enum += '\t/*\n'
				foundReserved = true
			}
			mapping_logical_mappings_enum += `\t${Section}_${Side} = ${nNumber},\n`
		}
	}
	{
		console.log('Processing midi feedback...')
		let variablesNormal = ['', ''],
			variablesLogical = ['', ''],
			variablesOther = ['', '']
		for (const feedback of mappings.feedback) {
			let Min, Max
			switch (feedback.data.type) {
				case 'Bool':
					Min = 0
					Max = 1
					break
				case 'Range':
					Min = feedback.data.start
					Max = feedback.data.end
					break
				default:
					console.warn('Unknown data type: ' + feedback.data.type)
					continue
			}
			const Data = `${Min}-${Max}`
			const { 'section-type': HasSections, type: Type, name: Name, number: nNumber } = feedback
			mapping_feedback_mappings += `\t{\n\t\tnumber: ${nNumber},\n\t\tname: '${Name}',\n\t\thasSections: '${HasSections}',\n\t\ttype: '${Type}',\n\t\tdata: '${Data}',\n\t},\n`

			if (HasSections === 'None') {
				variablesNormal[0] += `\t${Name}: number\n`
				variablesNormal[1] += `\t\t${Name}: { name: '${Name}' },\n`
			} else if (HasSections === 'Logical') {
				variablesLogical[0] += `\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n\t${Name}_17: number\n\t${Name}_18: number\n\t${Name}_19: number\n\t${Name}_20: number\n\t${Name}_21: number\n\t${Name}_22: number\n\t${Name}_23: number\n\t${Name}_24: number\n\t${Name}_25: number\n\t${Name}_26: number\n\t${Name}_27: number\n\t${Name}_28: number\n\t${Name}_29: number\n\t${Name}_30: number\n\t${Name}_31: number\n`
				variablesLogical[1] += `\t\t${Name}_00: { name: '${Name} Logical 00' },\n\t\t${Name}_01: { name: '${Name} Logical 01' },\n\t\t${Name}_02: { name: '${Name} Logical 02' },\n\t\t${Name}_03: { name: '${Name} Logical 03' },\n\t\t${Name}_04: { name: '${Name} Logical 04' },\n\t\t${Name}_05: { name: '${Name} Logical 05' },\n\t\t${Name}_06: { name: '${Name} Logical 06' },\n\t\t${Name}_07: { name: '${Name} Logical 07' },\n\t\t${Name}_08: { name: '${Name} Logical 08' },\n\t\t${Name}_09: { name: '${Name} Logical 09' },\n\t\t${Name}_10: { name: '${Name} Logical 10' },\n\t\t${Name}_11: { name: '${Name} Logical 11' },\n\t\t${Name}_12: { name: '${Name} Logical 12' },\n\t\t${Name}_13: { name: '${Name} Logical 13' },\n\t\t${Name}_14: { name: '${Name} Logical 14' },\n\t\t${Name}_15: { name: '${Name} Logical 15' },\n\t\t${Name}_16: { name: '${Name} Logical 16' },\n\t\t${Name}_17: { name: '${Name} Logical 17' },\n\t\t${Name}_18: { name: '${Name} Logical 18' },\n\t\t${Name}_19: { name: '${Name} Logical 19' },\n\t\t${Name}_20: { name: '${Name} Logical 20' },\n\t\t${Name}_21: { name: '${Name} Logical 21' },\n\t\t${Name}_22: { name: '${Name} Logical 22' },\n\t\t${Name}_23: { name: '${Name} Logical 23' },\n\t\t${Name}_24: { name: '${Name} Logical 24' },\n\t\t${Name}_25: { name: '${Name} Logical 25' },\n\t\t${Name}_26: { name: '${Name} Logical 26' },\n\t\t${Name}_27: { name: '${Name} Logical 27' },\n\t\t${Name}_28: { name: '${Name} Logical 28' },\n\t\t${Name}_29: { name: '${Name} Logical 29' },\n\t\t${Name}_30: { name: '${Name} Logical 30' },\n\t\t${Name}_31: { name: '${Name} Logical 31' },\n`
			} else {
				variablesOther[0] += `\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n`
				variablesOther[1] += `\t\t${Name}_00: { name: '${Name} Index 00' },\n\t\t${Name}_01: { name: '${Name} Index 01' },\n\t\t${Name}_02: { name: '${Name} Index 02' },\n\t\t${Name}_03: { name: '${Name} Index 03' },\n\t\t${Name}_04: { name: '${Name} Index 04' },\n\t\t${Name}_05: { name: '${Name} Index 05' },\n\t\t${Name}_06: { name: '${Name} Index 06' },\n\t\t${Name}_07: { name: '${Name} Index 07' },\n\t\t${Name}_08: { name: '${Name} Index 08' },\n\t\t${Name}_09: { name: '${Name} Index 09' },\n\t\t${Name}_10: { name: '${Name} Index 10' },\n\t\t${Name}_11: { name: '${Name} Index 11' },\n\t\t${Name}_12: { name: '${Name} Index 12' },\n\t\t${Name}_13: { name: '${Name} Index 13' },\n\t\t${Name}_14: { name: '${Name} Index 14' },\n\t\t${Name}_15: { name: '${Name} Index 15' },\n\t\t${Name}_16: { name: '${Name} Index 16' },\n`
			}
		}

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

mapping_buttons += `]

export default buttons

export const maxLogicalIndex = Math.max(
\t...buttons.filter((option) => option.type === 'indexed').map((option) => option.values.length - 1),
)
`
mapping_enums += '] as const\n\nexport default enums\n'
mapping_feedback_mappings += ']\n\nexport default feedbackMappings\n'
mapping_logical_mappings_enum += `\t*/
}

export const LogicalMappingsDropdownOptions = Object.keys(LogicalMappingsEnum)
\t.filter((key) => !isNaN(Number(key)))
\t.map((option) => ({
\t\tid: Number(option),
\t\tlabel: LogicalMappingsEnum[Number(option)],
\t}))

export const LogicalMappingsDropdownValues = LogicalMappingsDropdownOptions.map((v) => v.id)

export default LogicalMappingsEnum
`
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

await fs.writeFile(path.resolve('./src/variables.ts'), variables, { encoding: 'utf-8' })

/*@end @*/
