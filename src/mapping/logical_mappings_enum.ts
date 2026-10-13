import mappings from './mappings.js'

type LogicalMappingsDataType = Exclude<(typeof mappings.rangedNames)[number], { section: 'RESERVED' }>
export type LogicalMappingsEnum = LogicalMappingsDataType['index']

export const LogicalMappingsData: LogicalMappingsDataType[] = mappings.rangedNames.filter(
	(v) => v.section !== 'RESERVED',
)

export const LogicalMappingsDropdownOptions = LogicalMappingsData.map((option) => ({
	id: option.index,
	label: `${option.section}_${option.side}`,
}))

export const LogicalMappingsDropdownValues = LogicalMappingsData.map((v) => v.index)
