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
	mapping_sliders =
		"import type { SliderMappingData } from './mapping_data.js'\n\nconst ALL = 'ALL'\n\nexport const sliders: SliderMappingData[] = [\n",
	mapping_toggles = "import type { MappingData } from './mapping_data.js'\n\nexport const toggles: MappingData[] = [\n",
	variables = `import type { CompanionVariableDefinitions } from '@companion-module/base'
import type { VariableSchema } from '../variables.js'

export const defaultValues: VariableSchema = {
\tconnected: false,
`

/**
 * @param {string} Type
 * @param {string} string
 * @return {void}
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
		console.log('Processing midi feedback...')
		let variablesNormal = '',
			variablesLogical = '',
			variablesOther = ''
		for (const feedback of mappings.feedback) {
			const { sectionType: HasSections, name: Name } = feedback

			if (HasSections === 'None') {
				variablesNormal += `\t${Name}: { name: '${Name}' },\n`
				continue
			}

			if (HasSections === 'Logical') {
				for (const value of mappings.rangedNames) {
					const { index: key, section, side } = value
					if (section === 'RESERVED') continue
					const number = key >= 0 && key < 10 ? `0${key}` : `${key}`
					variablesLogical += `\t${Name}_${number}: { name: '${Name} in ${section} - ${side}' },\n`
					variables += `\t${Name}_${number}: -1,\n`
				}
				continue
			}

			let values = [mappings.indexedMappings, mappings.enumMappings]
				.flat(1)
				.filter((value) => value.type.feedback === Name)

			if (values.length > 1) {
				console.error(
					`Feedback ${Name} has multiple entries in indexedMappins and enumMappings. Ignoring Feedback. This will probably lead to compilation errors!`,
				)
				continue
			}

			if (values.length === 1) {
				const mapping = values[0]
				for (const [key, value] of mapping.values.entries()) {
					const number = key >= 0 && key < 10 ? `0${key}` : `${key}`
					const name = value.name ?? `${key}`
					variablesLogical += `\t${Name}_${number}: { name: '${Name}: ${name}' },\n`
					variables += `\t${Name}_${number}: -1,\n`
				}
				continue
			}

			values = mappings.mappings.filter((value) => value.type.feedback === Name)

			if (values.length <= 0) {
				console.error(
					`Feedback ${Name} is not of type logical and has no entry in indexedMappins, enumMappings or mappings. Ignoring Feedback. This will probably lead to compilation errors!`,
				)
				continue
			}

			for (const [key, value] of values.entries()) {
				const { section, name } = value
				const number = key >= 0 && key < 10 ? `0${key}` : `${key}`
				variablesOther += `\t${Name}_${number}: { name: '${Name}: ${section} - ${name}' },\n`
				variables += `\t${Name}_${number}: -1,\n`
			}
		}

		variables += `}

export const variableDefinitions: CompanionVariableDefinitions<VariableSchema> = {
\tconnected: { name: 'Connected to VRChat World' },
\t// Feedback Mappings:
${variablesNormal}
\t// Logical Feedback Mappings:
${variablesLogical}
\t// Other Mappings:
${variablesOther}}
`
	}
}

mapping_buttons += `] as const

export default buttons

export const maxLogicalIndex = Math.max(
\t...buttons.filter((option) => option.type === 'indexed').map((option) => option.values.length - 1),
)
`
mapping_enums += '] as const\n\nexport default enums\n'
mapping_sliders += '] as const\n\nexport default sliders\n'
mapping_toggles += '] as const\n\nexport default toggles\n'

await fs.writeFile(path.resolve('./src/mapping/buttons.ts'), mapping_buttons, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/mapping/enums.ts'), mapping_enums, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/mapping/sliders.ts'), mapping_sliders, { encoding: 'utf-8' })
await fs.writeFile(path.resolve('./src/mapping/toggles.ts'), mapping_toggles, { encoding: 'utf-8' })

await fs.writeFile(path.resolve('./src/mapping/variables.ts'), variables, { encoding: 'utf-8' })
await fs.writeFile(
	path.resolve('./src/mapping/mappings.ts'),
	`/* eslint-disable */ // This file is automatically "generated"/copied by the update_mappings.mjs script. Sadly this cannot be done as a simple json import, because the typing of json imports in ts is simply too weak (matches that of non-'as const' types ?)
export const mappings = ${await fs.readFile(path.resolve('./world-docs/MIDI/Mappings.json'), { encoding: 'utf-8' })} as const

export default mappings
`,
	{ encoding: 'utf-8' },
)

/*@end @*/
