/*
^\|(?<Number>[^\|\n]+)\|(?<Section>[^\|\n]+)\|(?<Side>[^\|\n]+)\|$

\t${Section}_${Side} = ${Number},\n
*/

export enum LogicalMappingsEnum {
	Floor_Left = 0,
	Floor_Right = 1,
	DancerPodium_Left = 2,
	DancerPodium_Right = 3,
	ScreenBottom_Left = 4,
	ScreenBottom_Right = 5,
	ScreenSide_Left = 6,
	ScreenSide_Right = 7,
	ScreenTop_Left = 8,
	ScreenTop_Right = 9,
	InScreen_Left = 10,
	InScreen_Right = 11,
	MirrorBallInner_Left = 12,
	MirrorBallInner_Right = 13,
	MirrorBallOuter_Left = 14,
	MirrorBallOuter_Right = 15,
	SideScreenTop_Left = 16,
	SideScreenTop_Right = 17,
	SideScreenBottom_Left = 18,
	SideScreenBottom_Right = 19,
	/*
	RESERVED_Left = 20,
	RESERVED_Right = 21,
	RESERVED_Left = 22,
	RESERVED_Right = 23,
	RESERVED_Left = 24,
	RESERVED_Right = 25,
	RESERVED_Left = 26,
	RESERVED_Right = 27,
	RESERVED_Left = 28,
	RESERVED_Right = 29,
	RESERVED_Left = 30,
	RESERVED_Right = 31,
	*/
}

export const LogicalMappingsDropdownOptions = Object.keys(LogicalMappingsEnum)
	.filter((key) => !isNaN(Number(key)))
	.map((option) => ({
		id: Number(option),
		label: LogicalMappingsEnum[Number(option)],
	}))

export default LogicalMappingsEnum
