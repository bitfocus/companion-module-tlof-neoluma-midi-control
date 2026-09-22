export default interface MappingData<VelocityType = number> {
	id: string
	label: string
	channel: number
	number: number
	velocity: VelocityType
	enum?: string
	isLogical?: boolean | number
}

export type SliderMappingData = MappingData<'ALL'>

/*
Anything:
^\|(?<Channel>[^|\n]+)\|(?<Number>[^|\n-]*)(?:-\d+)?\|(?<Velocity>[^|\n]*)\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|(?<BasedOn>[^|\n]*)\|(?<Type>[^|\n(^]+)(?:\[\^(?:1|2)\])?(?:\((?<Enum>[^)|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__${Description}',\n\t\tlabel: '${Section} - ${Description}',\n\t\tchannel: ${Channel},\n\t\tnumber: ${Number},\n\t\tvelocity: ${Velocity},\n\t\tenum: '${Enum}',\n\t},\n


Logical buttons (indexed):
^\|(?<Channel>[^|\n]*)\|(?<Number>[^|\n-]*)\|(?<Velocity>[^|\n-]*)-(?<Max>\d+)\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|Button(?:\((?<Enum>[^)|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__${Description}',\n\t\tlabel: '${Section} - ${Description}',\n\t\tchannel: ${Channel},\n\t\tnumber: ${Number},\n\t\tvelocity: ${Velocity},\n\t\tenum: '${Enum}',\n\t\tisLogical: ${Max} - ${Velocity} + 1,\n\t},\n

Logical toggles/enums/sliders:
^\|(?<Channel>[^|\n]*)\|(?<Number>[^|\n-]*)(?:-\d+)?\|(?<Velocity>[^|\n-]*)(?:-\d+)?\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|Toggle(?:\((?<Enum>[^)|\n]+)\))?\|$
^\|(?<Channel>[^|\n]*)\|(?<Number>[^|\n-]*)(?:-\d+)?\|(?<Velocity>[^|\n-]*)(?:-\d+)?\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|Enum(?:\((?<Enum>[^)|\n]+)\))?\|$
^\|(?<Channel>[^|\n]*)\|(?<Number>[^|\n-]*)(?:-\d+)?\|(?<Velocity>[^|\n-]*)(?:-\d+)?\|(?<Section>[^|\n]*)\|(?<Description>[^|\n]*)\|Slider(?:\((?<Enum>[^)|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__${Description}',\n\t\tlabel: '${Section} - ${Description}',\n\t\tchannel: ${Channel},\n\t\tnumber: ${Number},\n\t\tvelocity: ${Velocity},\n\t\tenum: '${Enum}',\n\t\tisLogical: true,\n\t},\n


var a = ''
for (let i = 0; i <= 31; i++)
	a += `|0|0|${47 + i}|Macro|Macro ${i}|Set Macro Toggle|Button|\n`
console.log(a)


var a = ''
for (let i = 0; i <= 15; i++)
	a += `|0|1|${4 + i}|General|Color ${i}|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|\n`
console.log(a)



Feedback_mappings:
^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|(?<HasSections>[^|\n]+)\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t{\n\t\tnumber: ${Number},\n\t\tname: '${Name}',\n\t\thasSections: '${HasSections}',\n\t\ttype: '${Type}',\n\t\tdata: '${Data}',\n\t},\n


Logical_mapping_enum:
^\|(?<Number>[^|\n]+)\|(?<Section>[^|\n]+)\|(?<Side>[^|\n]+)\|$
\t${Section}_${Side} = ${Number},\n




Variables - Feedback mappings - variables:

^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|None\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t${Name}: number\n

^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|Logical\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n\t${Name}_17: number\n\t${Name}_18: number\n\t${Name}_19: number\n\t${Name}_20: number\n\t${Name}_21: number\n\t${Name}_22: number\n\t${Name}_23: number\n\t${Name}_24: number\n\t${Name}_25: number\n\t${Name}_26: number\n\t${Name}_27: number\n\t${Name}_28: number\n\t${Name}_29: number\n\t${Name}_30: number\n\t${Name}_31: number\n

^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n



Variables - Feedback mappings - values:

^(?<Number>[^|\n]+)\|(?<Name>[^\|\n]+)\|None\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)
\t${Name}: -1,\n

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|Logical\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)
\t${Name}_00: -1,\n\t${Name}_01: -1,\n\t${Name}_02: -1,\n\t${Name}_03: -1,\n\t${Name}_04: -1,\n\t${Name}_05: -1,\n\t${Name}_06: -1,\n\t${Name}_07: -1,\n\t${Name}_08: -1,\n\t${Name}_09: -1,\n\t${Name}_10: -1,\n\t${Name}_11: -1,\n\t${Name}_12: -1,\n\t${Name}_13: -1,\n\t${Name}_14: -1,\n\t${Name}_15: -1,\n\t${Name}_16: -1,\n\t${Name}_17: -1,\n\t${Name}_18: -1,\n\t${Name}_19: -1,\n\t${Name}_20: -1,\n\t${Name}_21: -1,\n\t${Name}_22: -1,\n\t${Name}_23: -1,\n\t${Name}_24: -1,\n\t${Name}_25: -1,\n\t${Name}_26: -1,\n\t${Name}_27: -1,\n\t${Name}_28: -1,\n\t${Name}_29: -1,\n\t${Name}_30: -1,\n\t${Name}_31: -1,\n

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)
\t${Name}_00: -1,\n\t${Name}_01: -1,\n\t${Name}_02: -1,\n\t${Name}_03: -1,\n\t${Name}_04: -1,\n\t${Name}_05: -1,\n\t${Name}_06: -1,\n\t${Name}_07: -1,\n\t${Name}_08: -1,\n\t${Name}_09: -1,\n\t${Name}_10: -1,\n\t${Name}_11: -1,\n\t${Name}_12: -1,\n\t${Name}_13: -1,\n\t${Name}_14: -1,\n\t${Name}_15: -1,\n\t${Name}_16: -1,\n



Variables - Feedback mappings - names:

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|None\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)
\t\t${Name}: { name: '${Name}' },\n

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|Logical\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)
\t\t${Name}_00: { name: '${Name} Logical 00' },\n\t\t${Name}_01: { name: '${Name} Logical 01' },\n\t\t${Name}_02: { name: '${Name} Logical 02' },\n\t\t${Name}_03: { name: '${Name} Logical 03' },\n\t\t${Name}_04: { name: '${Name} Logical 04' },\n\t\t${Name}_05: { name: '${Name} Logical 05' },\n\t\t${Name}_06: { name: '${Name} Logical 06' },\n\t\t${Name}_07: { name: '${Name} Logical 07' },\n\t\t${Name}_08: { name: '${Name} Logical 08' },\n\t\t${Name}_09: { name: '${Name} Logical 09' },\n\t\t${Name}_10: { name: '${Name} Logical 10' },\n\t\t${Name}_11: { name: '${Name} Logical 11' },\n\t\t${Name}_12: { name: '${Name} Logical 12' },\n\t\t${Name}_13: { name: '${Name} Logical 13' },\n\t\t${Name}_14: { name: '${Name} Logical 14' },\n\t\t${Name}_15: { name: '${Name} Logical 15' },\n\t\t${Name}_16: { name: '${Name} Logical 16' },\n\t\t${Name}_17: { name: '${Name} Logical 17' },\n\t\t${Name}_18: { name: '${Name} Logical 18' },\n\t\t${Name}_19: { name: '${Name} Logical 19' },\n\t\t${Name}_20: { name: '${Name} Logical 20' },\n\t\t${Name}_21: { name: '${Name} Logical 21' },\n\t\t${Name}_22: { name: '${Name} Logical 22' },\n\t\t${Name}_23: { name: '${Name} Logical 23' },\n\t\t${Name}_24: { name: '${Name} Logical 24' },\n\t\t${Name}_25: { name: '${Name} Logical 25' },\n\t\t${Name}_26: { name: '${Name} Logical 26' },\n\t\t${Name}_27: { name: '${Name} Logical 27' },\n\t\t${Name}_28: { name: '${Name} Logical 28' },\n\t\t${Name}_29: { name: '${Name} Logical 29' },\n\t\t${Name}_30: { name: '${Name} Logical 30' },\n\t\t${Name}_31: { name: '${Name} Logical 31' },\n

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)
\t\t${Name}_00: { name: '${Name} Index 00' },\n\t\t${Name}_01: { name: '${Name} Index 01' },\n\t\t${Name}_02: { name: '${Name} Index 02' },\n\t\t${Name}_03: { name: '${Name} Index 03' },\n\t\t${Name}_04: { name: '${Name} Index 04' },\n\t\t${Name}_05: { name: '${Name} Index 05' },\n\t\t${Name}_06: { name: '${Name} Index 06' },\n\t\t${Name}_07: { name: '${Name} Index 07' },\n\t\t${Name}_08: { name: '${Name} Index 08' },\n\t\t${Name}_09: { name: '${Name} Index 09' },\n\t\t${Name}_10: { name: '${Name} Index 10' },\n\t\t${Name}_11: { name: '${Name} Index 11' },\n\t\t${Name}_12: { name: '${Name} Index 12' },\n\t\t${Name}_13: { name: '${Name} Index 13' },\n\t\t${Name}_14: { name: '${Name} Index 14' },\n\t\t${Name}_15: { name: '${Name} Index 15' },\n\t\t${Name}_16: { name: '${Name} Index 16' },\n





Feedbacks - Feedback mappings - Schema:

^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|None\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t${Name}: {\n\t\ttype: 'boolean'\n\t\toptions: {\n\t\t\tvalue: number\n\t\t}\n\t}\n

^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|Logical\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t${Name}: {\n\t\ttype: 'boolean'\n\t\toptions: {\n\t\t\tvalue: number\n\t\t\tlogical: LogicalMappingsEnum\n\t\t}\n\t}\n

^\|?(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^|\n]+)\|(?<Data>[^|\n]+)\|?$
\t${Name}: {\n\t\ttype: 'boolean'\n\t\toptions: {\n\t\t\tvalue: number\n\t\t\tindex: number\n\t\t}\n\t}\n


Feedbacks - Feedback mappings - Updates:

Replace |Bool with |0-1

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|None\|(?<Type>[^|\n]+)\|(?<Data>(?<Min>\d+)?-?(?<Max>\d+)?[^|\n]*)\|?$
\t\t${Name}: {\n\t\t\tname: '${Name}',\n\t\t\tdescription: '${Name}',\n\t\t\ttype: 'boolean',\n\t\t\tdefaultStyle: {\n\t\t\t\tcolor: 0xffffff,\n\t\t\t\tbgcolor: 0x00ff00,\n\t\t\t},\n\t\t\toptions: [\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'value',\n\t\t\t\t\tlabel: 'Value',\n\t\t\t\t\tdefault: 1,\n\t\t\t\t\tmin: ${Min},\n\t\t\t\t\tmax: ${Max},\n\t\t\t\t},\n\t\t\t],\n\t\t\tcallback: (feedback) => {\n\t\t\t\treturn self.getVariableValue('${Name}') === feedback.options.value\n\t\t\t},\n\t\t},\n

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|Logical\|(?<Type>[^|\n]+)\|(?<Data>(?<Min>\d+)?-?(?<Max>\d+)?[^|\n]*)\|?$
\t\t${Name}: {\n\t\t\tname: '${Name}',\n\t\t\tdescription: '${Name}',\n\t\t\ttype: 'boolean',\n\t\t\tdefaultStyle: {\n\t\t\t\tcolor: 0xffffff,\n\t\t\t\tbgcolor: 0x00ff00,\n\t\t\t},\n\t\t\toptions: [\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'value',\n\t\t\t\t\tlabel: 'Value',\n\t\t\t\t\tdefault: 1,\n\t\t\t\t\tmin: ${Min},\n\t\t\t\t\tmax: ${Max},\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: 'dropdown',\n\t\t\t\t\tid: 'logical',\n\t\t\t\t\tlabel: 'Logical',\n\t\t\t\t\tdefault: 0,\n\t\t\t\t\tchoices: LogicalMappingsDropdownOptions,\n\t\t\t\t},\n\t\t\t],\n\t\t\tcallback: (feedback) => {\n\t\t\t\treturn (\n\t\t\t\t\tself.getVariableValue(\n\t\t\t\t\t\t'${Name}_' +\n\t\t\t\t\t\t\t(feedback.options.logical < LogicalMappingsEnum.InScreen_Left\n\t\t\t\t\t\t\t\t? '0' + feedback.options.logical\n\t\t\t\t\t\t\t\t: feedback.options.logical),\n\t\t\t\t\t) === feedback.options.value\n\t\t\t\t)\n\t\t\t},\n\t\t},\n

^(?<Number>[^|\n]+)\|(?<Name>[^|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^|\n]+)\|(?<Data>(?<Min>\d+)?-?(?<Max>\d+)?[^|\n]*)\|?$
\t\t${Name}: {\n\t\t\tname: '${Name}',\n\t\t\tdescription: '${Name}',\n\t\t\ttype: 'boolean',\n\t\t\tdefaultStyle: {\n\t\t\t\tcolor: 0xffffff,\n\t\t\t\tbgcolor: 0x00ff00,\n\t\t\t},\n\t\t\toptions: [\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'value',\n\t\t\t\t\tlabel: 'Value',\n\t\t\t\t\tdefault: 1,\n\t\t\t\t\tmin: ${Min},\n\t\t\t\t\tmax: ${Max},\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: 'number',\n\t\t\t\t\tid: 'index',\n\t\t\t\t\tlabel: 'Index',\n\t\t\t\t\tdefault: 0,\n\t\t\t\t\tmin: 0,\n\t\t\t\t\tmax: 16,\n\t\t\t\t},\n\t\t\t],\n\t\t\tcallback: (feedback) => {\n\t\t\t\treturn (\n\t\t\t\t\tself.getVariableValue(\n\t\t\t\t\t\t'${Name}_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),\n\t\t\t\t\t) === feedback.options.value\n\t\t\t\t)\n\t\t\t},\n\t\t},\n

*/
