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
^\|(?<Channel>[^\|\n]+)\|(?<Number>[^\|\n\-]*)(?:-\d+)?\|(?<Velocity>[^\|\n]*)\|(?<Section>[^\|\n]*)\|(?<Description>[^\|\n]*)\|(?<BasedOn>[^\|\n]*)\|(?<Type>[^\|\n\(]+)(?:\[\^1\])?(?:\((?<Enum>[^\)\|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__$Description',\n\t\tlabel: '$Section - $Description',\n\t\tchannel: $Channel,\n\t\tnumber: $Number,\n\t\tvelocity: $Velocity,\n\t\tenum: '$Enum',\n\t},\n

Logical toggles:
^\|(?<Channel>[^\|\n]*)\|(?<Number>[^\|\n\-]*)(?:-\d+)?\|(?<Velocity>[^\|\n\-]*)(?:-\d+)?\|(?<Section>[^\|\n]*)\|(?<Description>[^\|\n]*)\|Toggle(?:\((?<Enum>[^\)\|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__$Description',\n\t\tlabel: '$Section - $Description',\n\t\tchannel: $Channel,\n\t\tnumber: $Number,\n\t\tvelocity: $Velocity,\n\t\tenum: '$Enum',\n\t\tisLogical: true,\n\t},\n

Logical buttons (indexed):
^\|(?<Channel>[^\|\n]*)\|(?<Number>[^\|\n\-]*)\|(?<Velocity>[^\|\n\-]*)-(?<Max>\d+)\|(?<Section>[^\|\n]*)\|(?<Description>[^\|\n]*)\|Button(?:\((?<Enum>[^\)\|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__$Description',\n\t\tlabel: '$Section - $Description',\n\t\tchannel: $Channel,\n\t\tnumber: $Number,\n\t\tvelocity: $Velocity,\n\t\tenum: '$Enum',\n\t\tisLogical: ${Max} - ${Velocity} + 1,\n\t},\n

Logical enums:
^\|(?<Channel>[^\|\n]*)\|(?<Number>[^\|\n\-]*)(?:-\d+)?\|(?<Velocity>[^\|\n\-]*)(?:-\d+)?\|(?<Section>[^\|\n]*)\|(?<Description>[^\|\n]*)\|Enum(?:\((?<Enum>[^\)\|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__$Description',\n\t\tlabel: '$Section - $Description',\n\t\tchannel: $Channel,\n\t\tnumber: $Number,\n\t\tvelocity: $Velocity,\n\t\tenum: '$Enum',\n\t\tisLogical: true,\n\t},\n

Logical sliders:
^\|(?<Channel>[^\|\n]*)\|(?<Number>[^\|\n\-]*)(?:-\d+)?\|(?<Velocity>[^\|\n\-]*)(?:-\d+)?\|(?<Section>[^\|\n]*)\|(?<Description>[^\|\n]*)\|Slider(?:\((?<Enum>[^\)\|\n]+)\))?\|$
\t{\n\t\tid: '${Section}__$Description',\n\t\tlabel: '$Section - $Description',\n\t\tchannel: $Channel,\n\t\tnumber: $Number,\n\t\tvelocity: $Velocity,\n\t\tenum: '$Enum',\n\t\tisLogical: true,\n\t},\n



var a = ''
for (let i = 0; i <= 31; i++)
	a += `|0|0|${47 + i}|Macro|Macro ${i}|Set Macro Toggle|Button|\n`
console.log(a)


var a = ''
for (let i = 0; i <= 15; i++)
	a += `|0|1|${4 + i}|General|Color ${i}|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|\n`
console.log(a)

*/
