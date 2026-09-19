import type ModuleInstance from './main.js'

/*
Feedback mappings:

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|(?<HasSections>[^\|\n]+)\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t${Name}: number\n



NEW:

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|None\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t${Name}: number\n

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|Logical\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n\t${Name}_17: number\n\t${Name}_18: number\n\t${Name}_19: number\n\t${Name}_20: number\n\t${Name}_21: number\n\t${Name}_22: number\n\t${Name}_23: number\n\t${Name}_24: number\n\t${Name}_25: number\n\t${Name}_26: number\n\t${Name}_27: number\n\t${Name}_28: number\n\t${Name}_29: number\n\t${Name}_30: number\n\t${Name}_31: number\n

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t${Name}_00: number\n\t${Name}_01: number\n\t${Name}_02: number\n\t${Name}_03: number\n\t${Name}_04: number\n\t${Name}_05: number\n\t${Name}_06: number\n\t${Name}_07: number\n\t${Name}_08: number\n\t${Name}_09: number\n\t${Name}_10: number\n\t${Name}_11: number\n\t${Name}_12: number\n\t${Name}_13: number\n\t${Name}_14: number\n\t${Name}_15: number\n\t${Name}_16: number\n

*/

export type VariablesSchema = {
	connected: boolean

	// Feedback mappings:
	AllowPortals: number
	Blackout: number
	BlinderIntensity: number
	CleanLight: number
	DiscoBall: number
	Flasher: number
	FlasherIntensity: number
	FlasherSpeed: number
	GlobalIntensity: number
	LaserIntensity: number
	MirrorBallInner: number
	MirrorBallMiddle: number
	MirrorBallOuter: number
	MovementSpeed: number
	MovingHeadStrobe: number
	MovingHeadStrobeSpeed: number
	Random: number
	ScreenMapping: number
	SpotIntensity: number
	SpotMovement: number
	VeryPoorSign: number
	WallLineBrightness: number
	WallLineColors: number
	WallLineSpeed: number
	WallLineTension: number
	WallLines: number
	WashIntensity: number
	WashMovement: number
	MidiFeedback: number
	MidiLog: number
	MacroBypassApply: number
	MacroApplyManually: number
	MacroSet: number

	// Logical Feedback Mappings:
	Gobo_00: number
	Gobo_01: number
	Gobo_02: number
	Gobo_03: number
	Gobo_04: number
	Gobo_05: number
	Gobo_06: number
	Gobo_07: number
	Gobo_08: number
	Gobo_09: number
	Gobo_10: number
	Gobo_11: number
	Gobo_12: number
	Gobo_13: number
	Gobo_14: number
	Gobo_15: number
	Gobo_16: number
	Gobo_17: number
	Gobo_18: number
	Gobo_19: number
	Gobo_20: number
	Gobo_21: number
	Gobo_22: number
	Gobo_23: number
	Gobo_24: number
	Gobo_25: number
	Gobo_26: number
	Gobo_27: number
	Gobo_28: number
	Gobo_29: number
	Gobo_30: number
	Gobo_31: number
	GoboSpinSpeed_00: number
	GoboSpinSpeed_01: number
	GoboSpinSpeed_02: number
	GoboSpinSpeed_03: number
	GoboSpinSpeed_04: number
	GoboSpinSpeed_05: number
	GoboSpinSpeed_06: number
	GoboSpinSpeed_07: number
	GoboSpinSpeed_08: number
	GoboSpinSpeed_09: number
	GoboSpinSpeed_10: number
	GoboSpinSpeed_11: number
	GoboSpinSpeed_12: number
	GoboSpinSpeed_13: number
	GoboSpinSpeed_14: number
	GoboSpinSpeed_15: number
	GoboSpinSpeed_16: number
	GoboSpinSpeed_17: number
	GoboSpinSpeed_18: number
	GoboSpinSpeed_19: number
	GoboSpinSpeed_20: number
	GoboSpinSpeed_21: number
	GoboSpinSpeed_22: number
	GoboSpinSpeed_23: number
	GoboSpinSpeed_24: number
	GoboSpinSpeed_25: number
	GoboSpinSpeed_26: number
	GoboSpinSpeed_27: number
	GoboSpinSpeed_28: number
	GoboSpinSpeed_29: number
	GoboSpinSpeed_30: number
	GoboSpinSpeed_31: number
	GoboSpinSpeedReverse_00: number
	GoboSpinSpeedReverse_01: number
	GoboSpinSpeedReverse_02: number
	GoboSpinSpeedReverse_03: number
	GoboSpinSpeedReverse_04: number
	GoboSpinSpeedReverse_05: number
	GoboSpinSpeedReverse_06: number
	GoboSpinSpeedReverse_07: number
	GoboSpinSpeedReverse_08: number
	GoboSpinSpeedReverse_09: number
	GoboSpinSpeedReverse_10: number
	GoboSpinSpeedReverse_11: number
	GoboSpinSpeedReverse_12: number
	GoboSpinSpeedReverse_13: number
	GoboSpinSpeedReverse_14: number
	GoboSpinSpeedReverse_15: number
	GoboSpinSpeedReverse_16: number
	GoboSpinSpeedReverse_17: number
	GoboSpinSpeedReverse_18: number
	GoboSpinSpeedReverse_19: number
	GoboSpinSpeedReverse_20: number
	GoboSpinSpeedReverse_21: number
	GoboSpinSpeedReverse_22: number
	GoboSpinSpeedReverse_23: number
	GoboSpinSpeedReverse_24: number
	GoboSpinSpeedReverse_25: number
	GoboSpinSpeedReverse_26: number
	GoboSpinSpeedReverse_27: number
	GoboSpinSpeedReverse_28: number
	GoboSpinSpeedReverse_29: number
	GoboSpinSpeedReverse_30: number
	GoboSpinSpeedReverse_31: number
	LaserBand_00: number
	LaserBand_01: number
	LaserBand_02: number
	LaserBand_03: number
	LaserBand_04: number
	LaserBand_05: number
	LaserBand_06: number
	LaserBand_07: number
	LaserBand_08: number
	LaserBand_09: number
	LaserBand_10: number
	LaserBand_11: number
	LaserBand_12: number
	LaserBand_13: number
	LaserBand_14: number
	LaserBand_15: number
	LaserBand_16: number
	LaserBand_17: number
	LaserBand_18: number
	LaserBand_19: number
	LaserBand_20: number
	LaserBand_21: number
	LaserBand_22: number
	LaserBand_23: number
	LaserBand_24: number
	LaserBand_25: number
	LaserBand_26: number
	LaserBand_27: number
	LaserBand_28: number
	LaserBand_29: number
	LaserBand_30: number
	LaserBand_31: number
	LaserColor_00: number
	LaserColor_01: number
	LaserColor_02: number
	LaserColor_03: number
	LaserColor_04: number
	LaserColor_05: number
	LaserColor_06: number
	LaserColor_07: number
	LaserColor_08: number
	LaserColor_09: number
	LaserColor_10: number
	LaserColor_11: number
	LaserColor_12: number
	LaserColor_13: number
	LaserColor_14: number
	LaserColor_15: number
	LaserColor_16: number
	LaserColor_17: number
	LaserColor_18: number
	LaserColor_19: number
	LaserColor_20: number
	LaserColor_21: number
	LaserColor_22: number
	LaserColor_23: number
	LaserColor_24: number
	LaserColor_25: number
	LaserColor_26: number
	LaserColor_27: number
	LaserColor_28: number
	LaserColor_29: number
	LaserColor_30: number
	LaserColor_31: number
	LaserEnabled_00: number
	LaserEnabled_01: number
	LaserEnabled_02: number
	LaserEnabled_03: number
	LaserEnabled_04: number
	LaserEnabled_05: number
	LaserEnabled_06: number
	LaserEnabled_07: number
	LaserEnabled_08: number
	LaserEnabled_09: number
	LaserEnabled_10: number
	LaserEnabled_11: number
	LaserEnabled_12: number
	LaserEnabled_13: number
	LaserEnabled_14: number
	LaserEnabled_15: number
	LaserEnabled_16: number
	LaserEnabled_17: number
	LaserEnabled_18: number
	LaserEnabled_19: number
	LaserEnabled_20: number
	LaserEnabled_21: number
	LaserEnabled_22: number
	LaserEnabled_23: number
	LaserEnabled_24: number
	LaserEnabled_25: number
	LaserEnabled_26: number
	LaserEnabled_27: number
	LaserEnabled_28: number
	LaserEnabled_29: number
	LaserEnabled_30: number
	LaserEnabled_31: number
	SectionEnabled_00: number
	SectionEnabled_01: number
	SectionEnabled_02: number
	SectionEnabled_03: number
	SectionEnabled_04: number
	SectionEnabled_05: number
	SectionEnabled_06: number
	SectionEnabled_07: number
	SectionEnabled_08: number
	SectionEnabled_09: number
	SectionEnabled_10: number
	SectionEnabled_11: number
	SectionEnabled_12: number
	SectionEnabled_13: number
	SectionEnabled_14: number
	SectionEnabled_15: number
	SectionEnabled_16: number
	SectionEnabled_17: number
	SectionEnabled_18: number
	SectionEnabled_19: number
	SectionEnabled_20: number
	SectionEnabled_21: number
	SectionEnabled_22: number
	SectionEnabled_23: number
	SectionEnabled_24: number
	SectionEnabled_25: number
	SectionEnabled_26: number
	SectionEnabled_27: number
	SectionEnabled_28: number
	SectionEnabled_29: number
	SectionEnabled_30: number
	SectionEnabled_31: number
	SpotBand_00: number
	SpotBand_01: number
	SpotBand_02: number
	SpotBand_03: number
	SpotBand_04: number
	SpotBand_05: number
	SpotBand_06: number
	SpotBand_07: number
	SpotBand_08: number
	SpotBand_09: number
	SpotBand_10: number
	SpotBand_11: number
	SpotBand_12: number
	SpotBand_13: number
	SpotBand_14: number
	SpotBand_15: number
	SpotBand_16: number
	SpotBand_17: number
	SpotBand_18: number
	SpotBand_19: number
	SpotBand_20: number
	SpotBand_21: number
	SpotBand_22: number
	SpotBand_23: number
	SpotBand_24: number
	SpotBand_25: number
	SpotBand_26: number
	SpotBand_27: number
	SpotBand_28: number
	SpotBand_29: number
	SpotBand_30: number
	SpotBand_31: number
	SpotColor_00: number
	SpotColor_01: number
	SpotColor_02: number
	SpotColor_03: number
	SpotColor_04: number
	SpotColor_05: number
	SpotColor_06: number
	SpotColor_07: number
	SpotColor_08: number
	SpotColor_09: number
	SpotColor_10: number
	SpotColor_11: number
	SpotColor_12: number
	SpotColor_13: number
	SpotColor_14: number
	SpotColor_15: number
	SpotColor_16: number
	SpotColor_17: number
	SpotColor_18: number
	SpotColor_19: number
	SpotColor_20: number
	SpotColor_21: number
	SpotColor_22: number
	SpotColor_23: number
	SpotColor_24: number
	SpotColor_25: number
	SpotColor_26: number
	SpotColor_27: number
	SpotColor_28: number
	SpotColor_29: number
	SpotColor_30: number
	SpotColor_31: number
	SpotEnabled_00: number
	SpotEnabled_01: number
	SpotEnabled_02: number
	SpotEnabled_03: number
	SpotEnabled_04: number
	SpotEnabled_05: number
	SpotEnabled_06: number
	SpotEnabled_07: number
	SpotEnabled_08: number
	SpotEnabled_09: number
	SpotEnabled_10: number
	SpotEnabled_11: number
	SpotEnabled_12: number
	SpotEnabled_13: number
	SpotEnabled_14: number
	SpotEnabled_15: number
	SpotEnabled_16: number
	SpotEnabled_17: number
	SpotEnabled_18: number
	SpotEnabled_19: number
	SpotEnabled_20: number
	SpotEnabled_21: number
	SpotEnabled_22: number
	SpotEnabled_23: number
	SpotEnabled_24: number
	SpotEnabled_25: number
	SpotEnabled_26: number
	SpotEnabled_27: number
	SpotEnabled_28: number
	SpotEnabled_29: number
	SpotEnabled_30: number
	SpotEnabled_31: number
	SpotWidth_00: number
	SpotWidth_01: number
	SpotWidth_02: number
	SpotWidth_03: number
	SpotWidth_04: number
	SpotWidth_05: number
	SpotWidth_06: number
	SpotWidth_07: number
	SpotWidth_08: number
	SpotWidth_09: number
	SpotWidth_10: number
	SpotWidth_11: number
	SpotWidth_12: number
	SpotWidth_13: number
	SpotWidth_14: number
	SpotWidth_15: number
	SpotWidth_16: number
	SpotWidth_17: number
	SpotWidth_18: number
	SpotWidth_19: number
	SpotWidth_20: number
	SpotWidth_21: number
	SpotWidth_22: number
	SpotWidth_23: number
	SpotWidth_24: number
	SpotWidth_25: number
	SpotWidth_26: number
	SpotWidth_27: number
	SpotWidth_28: number
	SpotWidth_29: number
	SpotWidth_30: number
	SpotWidth_31: number
	WashBand_00: number
	WashBand_01: number
	WashBand_02: number
	WashBand_03: number
	WashBand_04: number
	WashBand_05: number
	WashBand_06: number
	WashBand_07: number
	WashBand_08: number
	WashBand_09: number
	WashBand_10: number
	WashBand_11: number
	WashBand_12: number
	WashBand_13: number
	WashBand_14: number
	WashBand_15: number
	WashBand_16: number
	WashBand_17: number
	WashBand_18: number
	WashBand_19: number
	WashBand_20: number
	WashBand_21: number
	WashBand_22: number
	WashBand_23: number
	WashBand_24: number
	WashBand_25: number
	WashBand_26: number
	WashBand_27: number
	WashBand_28: number
	WashBand_29: number
	WashBand_30: number
	WashBand_31: number
	WashColor_00: number
	WashColor_01: number
	WashColor_02: number
	WashColor_03: number
	WashColor_04: number
	WashColor_05: number
	WashColor_06: number
	WashColor_07: number
	WashColor_08: number
	WashColor_09: number
	WashColor_10: number
	WashColor_11: number
	WashColor_12: number
	WashColor_13: number
	WashColor_14: number
	WashColor_15: number
	WashColor_16: number
	WashColor_17: number
	WashColor_18: number
	WashColor_19: number
	WashColor_20: number
	WashColor_21: number
	WashColor_22: number
	WashColor_23: number
	WashColor_24: number
	WashColor_25: number
	WashColor_26: number
	WashColor_27: number
	WashColor_28: number
	WashColor_29: number
	WashColor_30: number
	WashColor_31: number
	WashEnabled_00: number
	WashEnabled_01: number
	WashEnabled_02: number
	WashEnabled_03: number
	WashEnabled_04: number
	WashEnabled_05: number
	WashEnabled_06: number
	WashEnabled_07: number
	WashEnabled_08: number
	WashEnabled_09: number
	WashEnabled_10: number
	WashEnabled_11: number
	WashEnabled_12: number
	WashEnabled_13: number
	WashEnabled_14: number
	WashEnabled_15: number
	WashEnabled_16: number
	WashEnabled_17: number
	WashEnabled_18: number
	WashEnabled_19: number
	WashEnabled_20: number
	WashEnabled_21: number
	WashEnabled_22: number
	WashEnabled_23: number
	WashEnabled_24: number
	WashEnabled_25: number
	WashEnabled_26: number
	WashEnabled_27: number
	WashEnabled_28: number
	WashEnabled_29: number
	WashEnabled_30: number
	WashEnabled_31: number
	WashWidth_00: number
	WashWidth_01: number
	WashWidth_02: number
	WashWidth_03: number
	WashWidth_04: number
	WashWidth_05: number
	WashWidth_06: number
	WashWidth_07: number
	WashWidth_08: number
	WashWidth_09: number
	WashWidth_10: number
	WashWidth_11: number
	WashWidth_12: number
	WashWidth_13: number
	WashWidth_14: number
	WashWidth_15: number
	WashWidth_16: number
	WashWidth_17: number
	WashWidth_18: number
	WashWidth_19: number
	WashWidth_20: number
	WashWidth_21: number
	WashWidth_22: number
	WashWidth_23: number
	WashWidth_24: number
	WashWidth_25: number
	WashWidth_26: number
	WashWidth_27: number
	WashWidth_28: number
	WashWidth_29: number
	WashWidth_30: number
	WashWidth_31: number

	// Other mappings
	SectionToggles_00: number
	SectionToggles_01: number
	SectionToggles_02: number
	SectionToggles_03: number
	SectionToggles_04: number
	SectionToggles_05: number
	SectionToggles_06: number
	SectionToggles_07: number
	SectionToggles_08: number
	SectionToggles_09: number
	SectionToggles_10: number
	SectionToggles_11: number
	SectionToggles_12: number
	SectionToggles_13: number
	SectionToggles_14: number
	SectionToggles_15: number
	SectionToggles_16: number
	SideToggles_00: number
	SideToggles_01: number
	SideToggles_02: number
	SideToggles_03: number
	SideToggles_04: number
	SideToggles_05: number
	SideToggles_06: number
	SideToggles_07: number
	SideToggles_08: number
	SideToggles_09: number
	SideToggles_10: number
	SideToggles_11: number
	SideToggles_12: number
	SideToggles_13: number
	SideToggles_14: number
	SideToggles_15: number
	SideToggles_16: number
	SetColor_00: number
	SetColor_01: number
	SetColor_02: number
	SetColor_03: number
	SetColor_04: number
	SetColor_05: number
	SetColor_06: number
	SetColor_07: number
	SetColor_08: number
	SetColor_09: number
	SetColor_10: number
	SetColor_11: number
	SetColor_12: number
	SetColor_13: number
	SetColor_14: number
	SetColor_15: number
	SetColor_16: number
	Color_00: number
	Color_01: number
	Color_02: number
	Color_03: number
	Color_04: number
	Color_05: number
	Color_06: number
	Color_07: number
	Color_08: number
	Color_09: number
	Color_10: number
	Color_11: number
	Color_12: number
	Color_13: number
	Color_14: number
	Color_15: number
	Color_16: number
	AudioLink_00: number
	AudioLink_01: number
	AudioLink_02: number
	AudioLink_03: number
	AudioLink_04: number
	AudioLink_05: number
	AudioLink_06: number
	AudioLink_07: number
	AudioLink_08: number
	AudioLink_09: number
	AudioLink_10: number
	AudioLink_11: number
	AudioLink_12: number
	AudioLink_13: number
	AudioLink_14: number
	AudioLink_15: number
	AudioLink_16: number
}

/*
Feedback mappings:

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|(?<HasSections>[^\|\n]+)\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t$Name: -1,\n


NEW:

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|None\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t$Name: -1,\n

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|Logical\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t${Name}_00: -1,\n\t${Name}_01: -1,\n\t${Name}_02: -1,\n\t${Name}_03: -1,\n\t${Name}_04: -1,\n\t${Name}_05: -1,\n\t${Name}_06: -1,\n\t${Name}_07: -1,\n\t${Name}_08: -1,\n\t${Name}_09: -1,\n\t${Name}_10: -1,\n\t${Name}_11: -1,\n\t${Name}_12: -1,\n\t${Name}_13: -1,\n\t${Name}_14: -1,\n\t${Name}_15: -1,\n\t${Name}_16: -1,\n\t${Name}_17: -1,\n\t${Name}_18: -1,\n\t${Name}_19: -1,\n\t${Name}_20: -1,\n\t${Name}_21: -1,\n\t${Name}_22: -1,\n\t${Name}_23: -1,\n\t${Name}_24: -1,\n\t${Name}_25: -1,\n\t${Name}_26: -1,\n\t${Name}_27: -1,\n\t${Name}_28: -1,\n\t${Name}_29: -1,\n\t${Name}_30: -1,\n\t${Name}_31: -1,\n

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t${Name}_00: -1,\n\t${Name}_01: -1,\n\t${Name}_02: -1,\n\t${Name}_03: -1,\n\t${Name}_04: -1,\n\t${Name}_05: -1,\n\t${Name}_06: -1,\n\t${Name}_07: -1,\n\t${Name}_08: -1,\n\t${Name}_09: -1,\n\t${Name}_10: -1,\n\t${Name}_11: -1,\n\t${Name}_12: -1,\n\t${Name}_13: -1,\n\t${Name}_14: -1,\n\t${Name}_15: -1,\n\t${Name}_16: -1,\n


*/

export const defaultValues = {
	AllowPortals: -1,
	Blackout: -1,
	BlinderIntensity: -1,
	CleanLight: -1,
	DiscoBall: -1,
	Flasher: -1,
	FlasherIntensity: -1,
	FlasherSpeed: -1,
	GlobalIntensity: -1,
	LaserIntensity: -1,
	MirrorBallInner: -1,
	MirrorBallMiddle: -1,
	MirrorBallOuter: -1,
	MovementSpeed: -1,
	MovingHeadStrobe: -1,
	MovingHeadStrobeSpeed: -1,
	Random: -1,
	ScreenMapping: -1,
	SpotIntensity: -1,
	SpotMovement: -1,
	VeryPoorSign: -1,
	WallLineBrightness: -1,
	WallLineColors: -1,
	WallLineSpeed: -1,
	WallLineTension: -1,
	WallLines: -1,
	WashIntensity: -1,
	WashMovement: -1,
	MidiFeedback: -1,
	MidiLog: -1,
	MacroBypassApply: -1,
	MacroApplyManually: -1,
	MacroSet: -1,

	// Logical
	Gobo_00: -1,
	Gobo_01: -1,
	Gobo_02: -1,
	Gobo_03: -1,
	Gobo_04: -1,
	Gobo_05: -1,
	Gobo_06: -1,
	Gobo_07: -1,
	Gobo_08: -1,
	Gobo_09: -1,
	Gobo_10: -1,
	Gobo_11: -1,
	Gobo_12: -1,
	Gobo_13: -1,
	Gobo_14: -1,
	Gobo_15: -1,
	Gobo_16: -1,
	Gobo_17: -1,
	Gobo_18: -1,
	Gobo_19: -1,
	Gobo_20: -1,
	Gobo_21: -1,
	Gobo_22: -1,
	Gobo_23: -1,
	Gobo_24: -1,
	Gobo_25: -1,
	Gobo_26: -1,
	Gobo_27: -1,
	Gobo_28: -1,
	Gobo_29: -1,
	Gobo_30: -1,
	Gobo_31: -1,
	GoboSpinSpeed_00: -1,
	GoboSpinSpeed_01: -1,
	GoboSpinSpeed_02: -1,
	GoboSpinSpeed_03: -1,
	GoboSpinSpeed_04: -1,
	GoboSpinSpeed_05: -1,
	GoboSpinSpeed_06: -1,
	GoboSpinSpeed_07: -1,
	GoboSpinSpeed_08: -1,
	GoboSpinSpeed_09: -1,
	GoboSpinSpeed_10: -1,
	GoboSpinSpeed_11: -1,
	GoboSpinSpeed_12: -1,
	GoboSpinSpeed_13: -1,
	GoboSpinSpeed_14: -1,
	GoboSpinSpeed_15: -1,
	GoboSpinSpeed_16: -1,
	GoboSpinSpeed_17: -1,
	GoboSpinSpeed_18: -1,
	GoboSpinSpeed_19: -1,
	GoboSpinSpeed_20: -1,
	GoboSpinSpeed_21: -1,
	GoboSpinSpeed_22: -1,
	GoboSpinSpeed_23: -1,
	GoboSpinSpeed_24: -1,
	GoboSpinSpeed_25: -1,
	GoboSpinSpeed_26: -1,
	GoboSpinSpeed_27: -1,
	GoboSpinSpeed_28: -1,
	GoboSpinSpeed_29: -1,
	GoboSpinSpeed_30: -1,
	GoboSpinSpeed_31: -1,
	GoboSpinSpeedReverse_00: -1,
	GoboSpinSpeedReverse_01: -1,
	GoboSpinSpeedReverse_02: -1,
	GoboSpinSpeedReverse_03: -1,
	GoboSpinSpeedReverse_04: -1,
	GoboSpinSpeedReverse_05: -1,
	GoboSpinSpeedReverse_06: -1,
	GoboSpinSpeedReverse_07: -1,
	GoboSpinSpeedReverse_08: -1,
	GoboSpinSpeedReverse_09: -1,
	GoboSpinSpeedReverse_10: -1,
	GoboSpinSpeedReverse_11: -1,
	GoboSpinSpeedReverse_12: -1,
	GoboSpinSpeedReverse_13: -1,
	GoboSpinSpeedReverse_14: -1,
	GoboSpinSpeedReverse_15: -1,
	GoboSpinSpeedReverse_16: -1,
	GoboSpinSpeedReverse_17: -1,
	GoboSpinSpeedReverse_18: -1,
	GoboSpinSpeedReverse_19: -1,
	GoboSpinSpeedReverse_20: -1,
	GoboSpinSpeedReverse_21: -1,
	GoboSpinSpeedReverse_22: -1,
	GoboSpinSpeedReverse_23: -1,
	GoboSpinSpeedReverse_24: -1,
	GoboSpinSpeedReverse_25: -1,
	GoboSpinSpeedReverse_26: -1,
	GoboSpinSpeedReverse_27: -1,
	GoboSpinSpeedReverse_28: -1,
	GoboSpinSpeedReverse_29: -1,
	GoboSpinSpeedReverse_30: -1,
	GoboSpinSpeedReverse_31: -1,
	LaserBand_00: -1,
	LaserBand_01: -1,
	LaserBand_02: -1,
	LaserBand_03: -1,
	LaserBand_04: -1,
	LaserBand_05: -1,
	LaserBand_06: -1,
	LaserBand_07: -1,
	LaserBand_08: -1,
	LaserBand_09: -1,
	LaserBand_10: -1,
	LaserBand_11: -1,
	LaserBand_12: -1,
	LaserBand_13: -1,
	LaserBand_14: -1,
	LaserBand_15: -1,
	LaserBand_16: -1,
	LaserBand_17: -1,
	LaserBand_18: -1,
	LaserBand_19: -1,
	LaserBand_20: -1,
	LaserBand_21: -1,
	LaserBand_22: -1,
	LaserBand_23: -1,
	LaserBand_24: -1,
	LaserBand_25: -1,
	LaserBand_26: -1,
	LaserBand_27: -1,
	LaserBand_28: -1,
	LaserBand_29: -1,
	LaserBand_30: -1,
	LaserBand_31: -1,
	LaserColor_00: -1,
	LaserColor_01: -1,
	LaserColor_02: -1,
	LaserColor_03: -1,
	LaserColor_04: -1,
	LaserColor_05: -1,
	LaserColor_06: -1,
	LaserColor_07: -1,
	LaserColor_08: -1,
	LaserColor_09: -1,
	LaserColor_10: -1,
	LaserColor_11: -1,
	LaserColor_12: -1,
	LaserColor_13: -1,
	LaserColor_14: -1,
	LaserColor_15: -1,
	LaserColor_16: -1,
	LaserColor_17: -1,
	LaserColor_18: -1,
	LaserColor_19: -1,
	LaserColor_20: -1,
	LaserColor_21: -1,
	LaserColor_22: -1,
	LaserColor_23: -1,
	LaserColor_24: -1,
	LaserColor_25: -1,
	LaserColor_26: -1,
	LaserColor_27: -1,
	LaserColor_28: -1,
	LaserColor_29: -1,
	LaserColor_30: -1,
	LaserColor_31: -1,
	LaserEnabled_00: -1,
	LaserEnabled_01: -1,
	LaserEnabled_02: -1,
	LaserEnabled_03: -1,
	LaserEnabled_04: -1,
	LaserEnabled_05: -1,
	LaserEnabled_06: -1,
	LaserEnabled_07: -1,
	LaserEnabled_08: -1,
	LaserEnabled_09: -1,
	LaserEnabled_10: -1,
	LaserEnabled_11: -1,
	LaserEnabled_12: -1,
	LaserEnabled_13: -1,
	LaserEnabled_14: -1,
	LaserEnabled_15: -1,
	LaserEnabled_16: -1,
	LaserEnabled_17: -1,
	LaserEnabled_18: -1,
	LaserEnabled_19: -1,
	LaserEnabled_20: -1,
	LaserEnabled_21: -1,
	LaserEnabled_22: -1,
	LaserEnabled_23: -1,
	LaserEnabled_24: -1,
	LaserEnabled_25: -1,
	LaserEnabled_26: -1,
	LaserEnabled_27: -1,
	LaserEnabled_28: -1,
	LaserEnabled_29: -1,
	LaserEnabled_30: -1,
	LaserEnabled_31: -1,
	SectionEnabled_00: -1,
	SectionEnabled_01: -1,
	SectionEnabled_02: -1,
	SectionEnabled_03: -1,
	SectionEnabled_04: -1,
	SectionEnabled_05: -1,
	SectionEnabled_06: -1,
	SectionEnabled_07: -1,
	SectionEnabled_08: -1,
	SectionEnabled_09: -1,
	SectionEnabled_10: -1,
	SectionEnabled_11: -1,
	SectionEnabled_12: -1,
	SectionEnabled_13: -1,
	SectionEnabled_14: -1,
	SectionEnabled_15: -1,
	SectionEnabled_16: -1,
	SectionEnabled_17: -1,
	SectionEnabled_18: -1,
	SectionEnabled_19: -1,
	SectionEnabled_20: -1,
	SectionEnabled_21: -1,
	SectionEnabled_22: -1,
	SectionEnabled_23: -1,
	SectionEnabled_24: -1,
	SectionEnabled_25: -1,
	SectionEnabled_26: -1,
	SectionEnabled_27: -1,
	SectionEnabled_28: -1,
	SectionEnabled_29: -1,
	SectionEnabled_30: -1,
	SectionEnabled_31: -1,
	SpotBand_00: -1,
	SpotBand_01: -1,
	SpotBand_02: -1,
	SpotBand_03: -1,
	SpotBand_04: -1,
	SpotBand_05: -1,
	SpotBand_06: -1,
	SpotBand_07: -1,
	SpotBand_08: -1,
	SpotBand_09: -1,
	SpotBand_10: -1,
	SpotBand_11: -1,
	SpotBand_12: -1,
	SpotBand_13: -1,
	SpotBand_14: -1,
	SpotBand_15: -1,
	SpotBand_16: -1,
	SpotBand_17: -1,
	SpotBand_18: -1,
	SpotBand_19: -1,
	SpotBand_20: -1,
	SpotBand_21: -1,
	SpotBand_22: -1,
	SpotBand_23: -1,
	SpotBand_24: -1,
	SpotBand_25: -1,
	SpotBand_26: -1,
	SpotBand_27: -1,
	SpotBand_28: -1,
	SpotBand_29: -1,
	SpotBand_30: -1,
	SpotBand_31: -1,
	SpotColor_00: -1,
	SpotColor_01: -1,
	SpotColor_02: -1,
	SpotColor_03: -1,
	SpotColor_04: -1,
	SpotColor_05: -1,
	SpotColor_06: -1,
	SpotColor_07: -1,
	SpotColor_08: -1,
	SpotColor_09: -1,
	SpotColor_10: -1,
	SpotColor_11: -1,
	SpotColor_12: -1,
	SpotColor_13: -1,
	SpotColor_14: -1,
	SpotColor_15: -1,
	SpotColor_16: -1,
	SpotColor_17: -1,
	SpotColor_18: -1,
	SpotColor_19: -1,
	SpotColor_20: -1,
	SpotColor_21: -1,
	SpotColor_22: -1,
	SpotColor_23: -1,
	SpotColor_24: -1,
	SpotColor_25: -1,
	SpotColor_26: -1,
	SpotColor_27: -1,
	SpotColor_28: -1,
	SpotColor_29: -1,
	SpotColor_30: -1,
	SpotColor_31: -1,
	SpotEnabled_00: -1,
	SpotEnabled_01: -1,
	SpotEnabled_02: -1,
	SpotEnabled_03: -1,
	SpotEnabled_04: -1,
	SpotEnabled_05: -1,
	SpotEnabled_06: -1,
	SpotEnabled_07: -1,
	SpotEnabled_08: -1,
	SpotEnabled_09: -1,
	SpotEnabled_10: -1,
	SpotEnabled_11: -1,
	SpotEnabled_12: -1,
	SpotEnabled_13: -1,
	SpotEnabled_14: -1,
	SpotEnabled_15: -1,
	SpotEnabled_16: -1,
	SpotEnabled_17: -1,
	SpotEnabled_18: -1,
	SpotEnabled_19: -1,
	SpotEnabled_20: -1,
	SpotEnabled_21: -1,
	SpotEnabled_22: -1,
	SpotEnabled_23: -1,
	SpotEnabled_24: -1,
	SpotEnabled_25: -1,
	SpotEnabled_26: -1,
	SpotEnabled_27: -1,
	SpotEnabled_28: -1,
	SpotEnabled_29: -1,
	SpotEnabled_30: -1,
	SpotEnabled_31: -1,
	SpotWidth_00: -1,
	SpotWidth_01: -1,
	SpotWidth_02: -1,
	SpotWidth_03: -1,
	SpotWidth_04: -1,
	SpotWidth_05: -1,
	SpotWidth_06: -1,
	SpotWidth_07: -1,
	SpotWidth_08: -1,
	SpotWidth_09: -1,
	SpotWidth_10: -1,
	SpotWidth_11: -1,
	SpotWidth_12: -1,
	SpotWidth_13: -1,
	SpotWidth_14: -1,
	SpotWidth_15: -1,
	SpotWidth_16: -1,
	SpotWidth_17: -1,
	SpotWidth_18: -1,
	SpotWidth_19: -1,
	SpotWidth_20: -1,
	SpotWidth_21: -1,
	SpotWidth_22: -1,
	SpotWidth_23: -1,
	SpotWidth_24: -1,
	SpotWidth_25: -1,
	SpotWidth_26: -1,
	SpotWidth_27: -1,
	SpotWidth_28: -1,
	SpotWidth_29: -1,
	SpotWidth_30: -1,
	SpotWidth_31: -1,
	WashBand_00: -1,
	WashBand_01: -1,
	WashBand_02: -1,
	WashBand_03: -1,
	WashBand_04: -1,
	WashBand_05: -1,
	WashBand_06: -1,
	WashBand_07: -1,
	WashBand_08: -1,
	WashBand_09: -1,
	WashBand_10: -1,
	WashBand_11: -1,
	WashBand_12: -1,
	WashBand_13: -1,
	WashBand_14: -1,
	WashBand_15: -1,
	WashBand_16: -1,
	WashBand_17: -1,
	WashBand_18: -1,
	WashBand_19: -1,
	WashBand_20: -1,
	WashBand_21: -1,
	WashBand_22: -1,
	WashBand_23: -1,
	WashBand_24: -1,
	WashBand_25: -1,
	WashBand_26: -1,
	WashBand_27: -1,
	WashBand_28: -1,
	WashBand_29: -1,
	WashBand_30: -1,
	WashBand_31: -1,
	WashColor_00: -1,
	WashColor_01: -1,
	WashColor_02: -1,
	WashColor_03: -1,
	WashColor_04: -1,
	WashColor_05: -1,
	WashColor_06: -1,
	WashColor_07: -1,
	WashColor_08: -1,
	WashColor_09: -1,
	WashColor_10: -1,
	WashColor_11: -1,
	WashColor_12: -1,
	WashColor_13: -1,
	WashColor_14: -1,
	WashColor_15: -1,
	WashColor_16: -1,
	WashColor_17: -1,
	WashColor_18: -1,
	WashColor_19: -1,
	WashColor_20: -1,
	WashColor_21: -1,
	WashColor_22: -1,
	WashColor_23: -1,
	WashColor_24: -1,
	WashColor_25: -1,
	WashColor_26: -1,
	WashColor_27: -1,
	WashColor_28: -1,
	WashColor_29: -1,
	WashColor_30: -1,
	WashColor_31: -1,
	WashEnabled_00: -1,
	WashEnabled_01: -1,
	WashEnabled_02: -1,
	WashEnabled_03: -1,
	WashEnabled_04: -1,
	WashEnabled_05: -1,
	WashEnabled_06: -1,
	WashEnabled_07: -1,
	WashEnabled_08: -1,
	WashEnabled_09: -1,
	WashEnabled_10: -1,
	WashEnabled_11: -1,
	WashEnabled_12: -1,
	WashEnabled_13: -1,
	WashEnabled_14: -1,
	WashEnabled_15: -1,
	WashEnabled_16: -1,
	WashEnabled_17: -1,
	WashEnabled_18: -1,
	WashEnabled_19: -1,
	WashEnabled_20: -1,
	WashEnabled_21: -1,
	WashEnabled_22: -1,
	WashEnabled_23: -1,
	WashEnabled_24: -1,
	WashEnabled_25: -1,
	WashEnabled_26: -1,
	WashEnabled_27: -1,
	WashEnabled_28: -1,
	WashEnabled_29: -1,
	WashEnabled_30: -1,
	WashEnabled_31: -1,
	WashWidth_00: -1,
	WashWidth_01: -1,
	WashWidth_02: -1,
	WashWidth_03: -1,
	WashWidth_04: -1,
	WashWidth_05: -1,
	WashWidth_06: -1,
	WashWidth_07: -1,
	WashWidth_08: -1,
	WashWidth_09: -1,
	WashWidth_10: -1,
	WashWidth_11: -1,
	WashWidth_12: -1,
	WashWidth_13: -1,
	WashWidth_14: -1,
	WashWidth_15: -1,
	WashWidth_16: -1,
	WashWidth_17: -1,
	WashWidth_18: -1,
	WashWidth_19: -1,
	WashWidth_20: -1,
	WashWidth_21: -1,
	WashWidth_22: -1,
	WashWidth_23: -1,
	WashWidth_24: -1,
	WashWidth_25: -1,
	WashWidth_26: -1,
	WashWidth_27: -1,
	WashWidth_28: -1,
	WashWidth_29: -1,
	WashWidth_30: -1,
	WashWidth_31: -1,

	// Other mappings:
	SectionToggles_00: -1,
	SectionToggles_01: -1,
	SectionToggles_02: -1,
	SectionToggles_03: -1,
	SectionToggles_04: -1,
	SectionToggles_05: -1,
	SectionToggles_06: -1,
	SectionToggles_07: -1,
	SectionToggles_08: -1,
	SectionToggles_09: -1,
	SectionToggles_10: -1,
	SectionToggles_11: -1,
	SectionToggles_12: -1,
	SectionToggles_13: -1,
	SectionToggles_14: -1,
	SectionToggles_15: -1,
	SectionToggles_16: -1,
	SideToggles_00: -1,
	SideToggles_01: -1,
	SideToggles_02: -1,
	SideToggles_03: -1,
	SideToggles_04: -1,
	SideToggles_05: -1,
	SideToggles_06: -1,
	SideToggles_07: -1,
	SideToggles_08: -1,
	SideToggles_09: -1,
	SideToggles_10: -1,
	SideToggles_11: -1,
	SideToggles_12: -1,
	SideToggles_13: -1,
	SideToggles_14: -1,
	SideToggles_15: -1,
	SideToggles_16: -1,
	SetColor_00: -1,
	SetColor_01: -1,
	SetColor_02: -1,
	SetColor_03: -1,
	SetColor_04: -1,
	SetColor_05: -1,
	SetColor_06: -1,
	SetColor_07: -1,
	SetColor_08: -1,
	SetColor_09: -1,
	SetColor_10: -1,
	SetColor_11: -1,
	SetColor_12: -1,
	SetColor_13: -1,
	SetColor_14: -1,
	SetColor_15: -1,
	SetColor_16: -1,
	Color_00: -1,
	Color_01: -1,
	Color_02: -1,
	Color_03: -1,
	Color_04: -1,
	Color_05: -1,
	Color_06: -1,
	Color_07: -1,
	Color_08: -1,
	Color_09: -1,
	Color_10: -1,
	Color_11: -1,
	Color_12: -1,
	Color_13: -1,
	Color_14: -1,
	Color_15: -1,
	Color_16: -1,
	AudioLink_00: -1,
	AudioLink_01: -1,
	AudioLink_02: -1,
	AudioLink_03: -1,
	AudioLink_04: -1,
	AudioLink_05: -1,
	AudioLink_06: -1,
	AudioLink_07: -1,
	AudioLink_08: -1,
	AudioLink_09: -1,
	AudioLink_10: -1,
	AudioLink_11: -1,
	AudioLink_12: -1,
	AudioLink_13: -1,
	AudioLink_14: -1,
	AudioLink_15: -1,
	AudioLink_16: -1,
}

/*
Feedback mappings:

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|(?<HasSections>[^\|\n]+)\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t\t$Name: { name: '$Name' },\n


NEW:

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|None\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t\t$Name: { name: '$Name' },\n

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|Logical\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t\t${Name}_00: { name: '${Name} Logical 00' },\n\t\t${Name}_01: { name: '${Name} Logical 01' },\n\t\t${Name}_02: { name: '${Name} Logical 02' },\n\t\t${Name}_03: { name: '${Name} Logical 03' },\n\t\t${Name}_04: { name: '${Name} Logical 04' },\n\t\t${Name}_05: { name: '${Name} Logical 05' },\n\t\t${Name}_06: { name: '${Name} Logical 06' },\n\t\t${Name}_07: { name: '${Name} Logical 07' },\n\t\t${Name}_08: { name: '${Name} Logical 08' },\n\t\t${Name}_09: { name: '${Name} Logical 09' },\n\t\t${Name}_10: { name: '${Name} Logical 10' },\n\t\t${Name}_11: { name: '${Name} Logical 11' },\n\t\t${Name}_12: { name: '${Name} Logical 12' },\n\t\t${Name}_13: { name: '${Name} Logical 13' },\n\t\t${Name}_14: { name: '${Name} Logical 14' },\n\t\t${Name}_15: { name: '${Name} Logical 15' },\n\t\t${Name}_16: { name: '${Name} Logical 16' },\n\t\t${Name}_17: { name: '${Name} Logical 17' },\n\t\t${Name}_18: { name: '${Name} Logical 18' },\n\t\t${Name}_19: { name: '${Name} Logical 19' },\n\t\t${Name}_20: { name: '${Name} Logical 20' },\n\t\t${Name}_21: { name: '${Name} Logical 21' },\n\t\t${Name}_22: { name: '${Name} Logical 22' },\n\t\t${Name}_23: { name: '${Name} Logical 23' },\n\t\t${Name}_24: { name: '${Name} Logical 24' },\n\t\t${Name}_25: { name: '${Name} Logical 25' },\n\t\t${Name}_26: { name: '${Name} Logical 26' },\n\t\t${Name}_27: { name: '${Name} Logical 27' },\n\t\t${Name}_28: { name: '${Name} Logical 28' },\n\t\t${Name}_29: { name: '${Name} Logical 29' },\n\t\t${Name}_30: { name: '${Name} Logical 30' },\n\t\t${Name}_31: { name: '${Name} Logical 31' },\n

^(?<Number>[^\|\n]+)\|(?<Name>[^\|\n]+)\|(?:Section|Side|SetColor|Color|AudioLink)\|(?<Type>[^\|\n]+)\|(?<Data>[^\|\n]+)
\t\t${Name}_00: { name: '${Name} Index 00' },\n\t\t${Name}_01: { name: '${Name} Index 01' },\n\t\t${Name}_02: { name: '${Name} Index 02' },\n\t\t${Name}_03: { name: '${Name} Index 03' },\n\t\t${Name}_04: { name: '${Name} Index 04' },\n\t\t${Name}_05: { name: '${Name} Index 05' },\n\t\t${Name}_06: { name: '${Name} Index 06' },\n\t\t${Name}_07: { name: '${Name} Index 07' },\n\t\t${Name}_08: { name: '${Name} Index 08' },\n\t\t${Name}_09: { name: '${Name} Index 09' },\n\t\t${Name}_10: { name: '${Name} Index 10' },\n\t\t${Name}_11: { name: '${Name} Index 11' },\n\t\t${Name}_12: { name: '${Name} Index 12' },\n\t\t${Name}_13: { name: '${Name} Index 13' },\n\t\t${Name}_14: { name: '${Name} Index 14' },\n\t\t${Name}_15: { name: '${Name} Index 15' },\n\t\t${Name}_16: { name: '${Name} Index 16' },\n

*/

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions({
		connected: { name: 'Connected to VRChat World' },

		// Feedback mappings:
		AllowPortals: { name: 'AllowPortals' },
		Blackout: { name: 'Blackout' },
		BlinderIntensity: { name: 'BlinderIntensity' },
		CleanLight: { name: 'CleanLight' },
		DiscoBall: { name: 'DiscoBall' },
		Flasher: { name: 'Flasher' },
		FlasherIntensity: { name: 'FlasherIntensity' },
		FlasherSpeed: { name: 'FlasherSpeed' },
		GlobalIntensity: { name: 'GlobalIntensity' },
		LaserIntensity: { name: 'LaserIntensity' },
		MirrorBallInner: { name: 'MirrorBallInner' },
		MirrorBallMiddle: { name: 'MirrorBallMiddle' },
		MirrorBallOuter: { name: 'MirrorBallOuter' },
		MovementSpeed: { name: 'MovementSpeed' },
		MovingHeadStrobe: { name: 'MovingHeadStrobe' },
		MovingHeadStrobeSpeed: { name: 'MovingHeadStrobeSpeed' },
		Random: { name: 'Random' },
		ScreenMapping: { name: 'ScreenMapping' },
		SpotIntensity: { name: 'SpotIntensity' },
		SpotMovement: { name: 'SpotMovement' },
		VeryPoorSign: { name: 'VeryPoorSign' },
		WallLineBrightness: { name: 'WallLineBrightness' },
		WallLineColors: { name: 'WallLineColors' },
		WallLineSpeed: { name: 'WallLineSpeed' },
		WallLineTension: { name: 'WallLineTension' },
		WallLines: { name: 'WallLines' },
		WashIntensity: { name: 'WashIntensity' },
		WashMovement: { name: 'WashMovement' },
		MidiFeedback: { name: 'MidiFeedback' },
		MidiLog: { name: 'MidiLog' },
		MacroBypassApply: { name: 'MacroBypassApply' },
		MacroApplyManually: { name: 'MacroApplyManually' },
		MacroSet: { name: 'MacroSet' },

		// Logical Feedback Mappings
		Gobo_00: { name: 'Gobo Logical 00' },
		Gobo_01: { name: 'Gobo Logical 01' },
		Gobo_02: { name: 'Gobo Logical 02' },
		Gobo_03: { name: 'Gobo Logical 03' },
		Gobo_04: { name: 'Gobo Logical 04' },
		Gobo_05: { name: 'Gobo Logical 05' },
		Gobo_06: { name: 'Gobo Logical 06' },
		Gobo_07: { name: 'Gobo Logical 07' },
		Gobo_08: { name: 'Gobo Logical 08' },
		Gobo_09: { name: 'Gobo Logical 09' },
		Gobo_10: { name: 'Gobo Logical 10' },
		Gobo_11: { name: 'Gobo Logical 11' },
		Gobo_12: { name: 'Gobo Logical 12' },
		Gobo_13: { name: 'Gobo Logical 13' },
		Gobo_14: { name: 'Gobo Logical 14' },
		Gobo_15: { name: 'Gobo Logical 15' },
		Gobo_16: { name: 'Gobo Logical 16' },
		Gobo_17: { name: 'Gobo Logical 17' },
		Gobo_18: { name: 'Gobo Logical 18' },
		Gobo_19: { name: 'Gobo Logical 19' },
		Gobo_20: { name: 'Gobo Logical 20' },
		Gobo_21: { name: 'Gobo Logical 21' },
		Gobo_22: { name: 'Gobo Logical 22' },
		Gobo_23: { name: 'Gobo Logical 23' },
		Gobo_24: { name: 'Gobo Logical 24' },
		Gobo_25: { name: 'Gobo Logical 25' },
		Gobo_26: { name: 'Gobo Logical 26' },
		Gobo_27: { name: 'Gobo Logical 27' },
		Gobo_28: { name: 'Gobo Logical 28' },
		Gobo_29: { name: 'Gobo Logical 29' },
		Gobo_30: { name: 'Gobo Logical 30' },
		Gobo_31: { name: 'Gobo Logical 31' },
		GoboSpinSpeed_00: { name: 'GoboSpinSpeed Logical 00' },
		GoboSpinSpeed_01: { name: 'GoboSpinSpeed Logical 01' },
		GoboSpinSpeed_02: { name: 'GoboSpinSpeed Logical 02' },
		GoboSpinSpeed_03: { name: 'GoboSpinSpeed Logical 03' },
		GoboSpinSpeed_04: { name: 'GoboSpinSpeed Logical 04' },
		GoboSpinSpeed_05: { name: 'GoboSpinSpeed Logical 05' },
		GoboSpinSpeed_06: { name: 'GoboSpinSpeed Logical 06' },
		GoboSpinSpeed_07: { name: 'GoboSpinSpeed Logical 07' },
		GoboSpinSpeed_08: { name: 'GoboSpinSpeed Logical 08' },
		GoboSpinSpeed_09: { name: 'GoboSpinSpeed Logical 09' },
		GoboSpinSpeed_10: { name: 'GoboSpinSpeed Logical 10' },
		GoboSpinSpeed_11: { name: 'GoboSpinSpeed Logical 11' },
		GoboSpinSpeed_12: { name: 'GoboSpinSpeed Logical 12' },
		GoboSpinSpeed_13: { name: 'GoboSpinSpeed Logical 13' },
		GoboSpinSpeed_14: { name: 'GoboSpinSpeed Logical 14' },
		GoboSpinSpeed_15: { name: 'GoboSpinSpeed Logical 15' },
		GoboSpinSpeed_16: { name: 'GoboSpinSpeed Logical 16' },
		GoboSpinSpeed_17: { name: 'GoboSpinSpeed Logical 17' },
		GoboSpinSpeed_18: { name: 'GoboSpinSpeed Logical 18' },
		GoboSpinSpeed_19: { name: 'GoboSpinSpeed Logical 19' },
		GoboSpinSpeed_20: { name: 'GoboSpinSpeed Logical 20' },
		GoboSpinSpeed_21: { name: 'GoboSpinSpeed Logical 21' },
		GoboSpinSpeed_22: { name: 'GoboSpinSpeed Logical 22' },
		GoboSpinSpeed_23: { name: 'GoboSpinSpeed Logical 23' },
		GoboSpinSpeed_24: { name: 'GoboSpinSpeed Logical 24' },
		GoboSpinSpeed_25: { name: 'GoboSpinSpeed Logical 25' },
		GoboSpinSpeed_26: { name: 'GoboSpinSpeed Logical 26' },
		GoboSpinSpeed_27: { name: 'GoboSpinSpeed Logical 27' },
		GoboSpinSpeed_28: { name: 'GoboSpinSpeed Logical 28' },
		GoboSpinSpeed_29: { name: 'GoboSpinSpeed Logical 29' },
		GoboSpinSpeed_30: { name: 'GoboSpinSpeed Logical 30' },
		GoboSpinSpeed_31: { name: 'GoboSpinSpeed Logical 31' },
		GoboSpinSpeedReverse_00: { name: 'GoboSpinSpeedReverse Logical 00' },
		GoboSpinSpeedReverse_01: { name: 'GoboSpinSpeedReverse Logical 01' },
		GoboSpinSpeedReverse_02: { name: 'GoboSpinSpeedReverse Logical 02' },
		GoboSpinSpeedReverse_03: { name: 'GoboSpinSpeedReverse Logical 03' },
		GoboSpinSpeedReverse_04: { name: 'GoboSpinSpeedReverse Logical 04' },
		GoboSpinSpeedReverse_05: { name: 'GoboSpinSpeedReverse Logical 05' },
		GoboSpinSpeedReverse_06: { name: 'GoboSpinSpeedReverse Logical 06' },
		GoboSpinSpeedReverse_07: { name: 'GoboSpinSpeedReverse Logical 07' },
		GoboSpinSpeedReverse_08: { name: 'GoboSpinSpeedReverse Logical 08' },
		GoboSpinSpeedReverse_09: { name: 'GoboSpinSpeedReverse Logical 09' },
		GoboSpinSpeedReverse_10: { name: 'GoboSpinSpeedReverse Logical 10' },
		GoboSpinSpeedReverse_11: { name: 'GoboSpinSpeedReverse Logical 11' },
		GoboSpinSpeedReverse_12: { name: 'GoboSpinSpeedReverse Logical 12' },
		GoboSpinSpeedReverse_13: { name: 'GoboSpinSpeedReverse Logical 13' },
		GoboSpinSpeedReverse_14: { name: 'GoboSpinSpeedReverse Logical 14' },
		GoboSpinSpeedReverse_15: { name: 'GoboSpinSpeedReverse Logical 15' },
		GoboSpinSpeedReverse_16: { name: 'GoboSpinSpeedReverse Logical 16' },
		GoboSpinSpeedReverse_17: { name: 'GoboSpinSpeedReverse Logical 17' },
		GoboSpinSpeedReverse_18: { name: 'GoboSpinSpeedReverse Logical 18' },
		GoboSpinSpeedReverse_19: { name: 'GoboSpinSpeedReverse Logical 19' },
		GoboSpinSpeedReverse_20: { name: 'GoboSpinSpeedReverse Logical 20' },
		GoboSpinSpeedReverse_21: { name: 'GoboSpinSpeedReverse Logical 21' },
		GoboSpinSpeedReverse_22: { name: 'GoboSpinSpeedReverse Logical 22' },
		GoboSpinSpeedReverse_23: { name: 'GoboSpinSpeedReverse Logical 23' },
		GoboSpinSpeedReverse_24: { name: 'GoboSpinSpeedReverse Logical 24' },
		GoboSpinSpeedReverse_25: { name: 'GoboSpinSpeedReverse Logical 25' },
		GoboSpinSpeedReverse_26: { name: 'GoboSpinSpeedReverse Logical 26' },
		GoboSpinSpeedReverse_27: { name: 'GoboSpinSpeedReverse Logical 27' },
		GoboSpinSpeedReverse_28: { name: 'GoboSpinSpeedReverse Logical 28' },
		GoboSpinSpeedReverse_29: { name: 'GoboSpinSpeedReverse Logical 29' },
		GoboSpinSpeedReverse_30: { name: 'GoboSpinSpeedReverse Logical 30' },
		GoboSpinSpeedReverse_31: { name: 'GoboSpinSpeedReverse Logical 31' },
		LaserBand_00: { name: 'LaserBand Logical 00' },
		LaserBand_01: { name: 'LaserBand Logical 01' },
		LaserBand_02: { name: 'LaserBand Logical 02' },
		LaserBand_03: { name: 'LaserBand Logical 03' },
		LaserBand_04: { name: 'LaserBand Logical 04' },
		LaserBand_05: { name: 'LaserBand Logical 05' },
		LaserBand_06: { name: 'LaserBand Logical 06' },
		LaserBand_07: { name: 'LaserBand Logical 07' },
		LaserBand_08: { name: 'LaserBand Logical 08' },
		LaserBand_09: { name: 'LaserBand Logical 09' },
		LaserBand_10: { name: 'LaserBand Logical 10' },
		LaserBand_11: { name: 'LaserBand Logical 11' },
		LaserBand_12: { name: 'LaserBand Logical 12' },
		LaserBand_13: { name: 'LaserBand Logical 13' },
		LaserBand_14: { name: 'LaserBand Logical 14' },
		LaserBand_15: { name: 'LaserBand Logical 15' },
		LaserBand_16: { name: 'LaserBand Logical 16' },
		LaserBand_17: { name: 'LaserBand Logical 17' },
		LaserBand_18: { name: 'LaserBand Logical 18' },
		LaserBand_19: { name: 'LaserBand Logical 19' },
		LaserBand_20: { name: 'LaserBand Logical 20' },
		LaserBand_21: { name: 'LaserBand Logical 21' },
		LaserBand_22: { name: 'LaserBand Logical 22' },
		LaserBand_23: { name: 'LaserBand Logical 23' },
		LaserBand_24: { name: 'LaserBand Logical 24' },
		LaserBand_25: { name: 'LaserBand Logical 25' },
		LaserBand_26: { name: 'LaserBand Logical 26' },
		LaserBand_27: { name: 'LaserBand Logical 27' },
		LaserBand_28: { name: 'LaserBand Logical 28' },
		LaserBand_29: { name: 'LaserBand Logical 29' },
		LaserBand_30: { name: 'LaserBand Logical 30' },
		LaserBand_31: { name: 'LaserBand Logical 31' },
		LaserColor_00: { name: 'LaserColor Logical 00' },
		LaserColor_01: { name: 'LaserColor Logical 01' },
		LaserColor_02: { name: 'LaserColor Logical 02' },
		LaserColor_03: { name: 'LaserColor Logical 03' },
		LaserColor_04: { name: 'LaserColor Logical 04' },
		LaserColor_05: { name: 'LaserColor Logical 05' },
		LaserColor_06: { name: 'LaserColor Logical 06' },
		LaserColor_07: { name: 'LaserColor Logical 07' },
		LaserColor_08: { name: 'LaserColor Logical 08' },
		LaserColor_09: { name: 'LaserColor Logical 09' },
		LaserColor_10: { name: 'LaserColor Logical 10' },
		LaserColor_11: { name: 'LaserColor Logical 11' },
		LaserColor_12: { name: 'LaserColor Logical 12' },
		LaserColor_13: { name: 'LaserColor Logical 13' },
		LaserColor_14: { name: 'LaserColor Logical 14' },
		LaserColor_15: { name: 'LaserColor Logical 15' },
		LaserColor_16: { name: 'LaserColor Logical 16' },
		LaserColor_17: { name: 'LaserColor Logical 17' },
		LaserColor_18: { name: 'LaserColor Logical 18' },
		LaserColor_19: { name: 'LaserColor Logical 19' },
		LaserColor_20: { name: 'LaserColor Logical 20' },
		LaserColor_21: { name: 'LaserColor Logical 21' },
		LaserColor_22: { name: 'LaserColor Logical 22' },
		LaserColor_23: { name: 'LaserColor Logical 23' },
		LaserColor_24: { name: 'LaserColor Logical 24' },
		LaserColor_25: { name: 'LaserColor Logical 25' },
		LaserColor_26: { name: 'LaserColor Logical 26' },
		LaserColor_27: { name: 'LaserColor Logical 27' },
		LaserColor_28: { name: 'LaserColor Logical 28' },
		LaserColor_29: { name: 'LaserColor Logical 29' },
		LaserColor_30: { name: 'LaserColor Logical 30' },
		LaserColor_31: { name: 'LaserColor Logical 31' },
		LaserEnabled_00: { name: 'LaserEnabled Logical 00' },
		LaserEnabled_01: { name: 'LaserEnabled Logical 01' },
		LaserEnabled_02: { name: 'LaserEnabled Logical 02' },
		LaserEnabled_03: { name: 'LaserEnabled Logical 03' },
		LaserEnabled_04: { name: 'LaserEnabled Logical 04' },
		LaserEnabled_05: { name: 'LaserEnabled Logical 05' },
		LaserEnabled_06: { name: 'LaserEnabled Logical 06' },
		LaserEnabled_07: { name: 'LaserEnabled Logical 07' },
		LaserEnabled_08: { name: 'LaserEnabled Logical 08' },
		LaserEnabled_09: { name: 'LaserEnabled Logical 09' },
		LaserEnabled_10: { name: 'LaserEnabled Logical 10' },
		LaserEnabled_11: { name: 'LaserEnabled Logical 11' },
		LaserEnabled_12: { name: 'LaserEnabled Logical 12' },
		LaserEnabled_13: { name: 'LaserEnabled Logical 13' },
		LaserEnabled_14: { name: 'LaserEnabled Logical 14' },
		LaserEnabled_15: { name: 'LaserEnabled Logical 15' },
		LaserEnabled_16: { name: 'LaserEnabled Logical 16' },
		LaserEnabled_17: { name: 'LaserEnabled Logical 17' },
		LaserEnabled_18: { name: 'LaserEnabled Logical 18' },
		LaserEnabled_19: { name: 'LaserEnabled Logical 19' },
		LaserEnabled_20: { name: 'LaserEnabled Logical 20' },
		LaserEnabled_21: { name: 'LaserEnabled Logical 21' },
		LaserEnabled_22: { name: 'LaserEnabled Logical 22' },
		LaserEnabled_23: { name: 'LaserEnabled Logical 23' },
		LaserEnabled_24: { name: 'LaserEnabled Logical 24' },
		LaserEnabled_25: { name: 'LaserEnabled Logical 25' },
		LaserEnabled_26: { name: 'LaserEnabled Logical 26' },
		LaserEnabled_27: { name: 'LaserEnabled Logical 27' },
		LaserEnabled_28: { name: 'LaserEnabled Logical 28' },
		LaserEnabled_29: { name: 'LaserEnabled Logical 29' },
		LaserEnabled_30: { name: 'LaserEnabled Logical 30' },
		LaserEnabled_31: { name: 'LaserEnabled Logical 31' },
		SectionEnabled_00: { name: 'SectionEnabled Logical 00' },
		SectionEnabled_01: { name: 'SectionEnabled Logical 01' },
		SectionEnabled_02: { name: 'SectionEnabled Logical 02' },
		SectionEnabled_03: { name: 'SectionEnabled Logical 03' },
		SectionEnabled_04: { name: 'SectionEnabled Logical 04' },
		SectionEnabled_05: { name: 'SectionEnabled Logical 05' },
		SectionEnabled_06: { name: 'SectionEnabled Logical 06' },
		SectionEnabled_07: { name: 'SectionEnabled Logical 07' },
		SectionEnabled_08: { name: 'SectionEnabled Logical 08' },
		SectionEnabled_09: { name: 'SectionEnabled Logical 09' },
		SectionEnabled_10: { name: 'SectionEnabled Logical 10' },
		SectionEnabled_11: { name: 'SectionEnabled Logical 11' },
		SectionEnabled_12: { name: 'SectionEnabled Logical 12' },
		SectionEnabled_13: { name: 'SectionEnabled Logical 13' },
		SectionEnabled_14: { name: 'SectionEnabled Logical 14' },
		SectionEnabled_15: { name: 'SectionEnabled Logical 15' },
		SectionEnabled_16: { name: 'SectionEnabled Logical 16' },
		SectionEnabled_17: { name: 'SectionEnabled Logical 17' },
		SectionEnabled_18: { name: 'SectionEnabled Logical 18' },
		SectionEnabled_19: { name: 'SectionEnabled Logical 19' },
		SectionEnabled_20: { name: 'SectionEnabled Logical 20' },
		SectionEnabled_21: { name: 'SectionEnabled Logical 21' },
		SectionEnabled_22: { name: 'SectionEnabled Logical 22' },
		SectionEnabled_23: { name: 'SectionEnabled Logical 23' },
		SectionEnabled_24: { name: 'SectionEnabled Logical 24' },
		SectionEnabled_25: { name: 'SectionEnabled Logical 25' },
		SectionEnabled_26: { name: 'SectionEnabled Logical 26' },
		SectionEnabled_27: { name: 'SectionEnabled Logical 27' },
		SectionEnabled_28: { name: 'SectionEnabled Logical 28' },
		SectionEnabled_29: { name: 'SectionEnabled Logical 29' },
		SectionEnabled_30: { name: 'SectionEnabled Logical 30' },
		SectionEnabled_31: { name: 'SectionEnabled Logical 31' },
		SpotBand_00: { name: 'SpotBand Logical 00' },
		SpotBand_01: { name: 'SpotBand Logical 01' },
		SpotBand_02: { name: 'SpotBand Logical 02' },
		SpotBand_03: { name: 'SpotBand Logical 03' },
		SpotBand_04: { name: 'SpotBand Logical 04' },
		SpotBand_05: { name: 'SpotBand Logical 05' },
		SpotBand_06: { name: 'SpotBand Logical 06' },
		SpotBand_07: { name: 'SpotBand Logical 07' },
		SpotBand_08: { name: 'SpotBand Logical 08' },
		SpotBand_09: { name: 'SpotBand Logical 09' },
		SpotBand_10: { name: 'SpotBand Logical 10' },
		SpotBand_11: { name: 'SpotBand Logical 11' },
		SpotBand_12: { name: 'SpotBand Logical 12' },
		SpotBand_13: { name: 'SpotBand Logical 13' },
		SpotBand_14: { name: 'SpotBand Logical 14' },
		SpotBand_15: { name: 'SpotBand Logical 15' },
		SpotBand_16: { name: 'SpotBand Logical 16' },
		SpotBand_17: { name: 'SpotBand Logical 17' },
		SpotBand_18: { name: 'SpotBand Logical 18' },
		SpotBand_19: { name: 'SpotBand Logical 19' },
		SpotBand_20: { name: 'SpotBand Logical 20' },
		SpotBand_21: { name: 'SpotBand Logical 21' },
		SpotBand_22: { name: 'SpotBand Logical 22' },
		SpotBand_23: { name: 'SpotBand Logical 23' },
		SpotBand_24: { name: 'SpotBand Logical 24' },
		SpotBand_25: { name: 'SpotBand Logical 25' },
		SpotBand_26: { name: 'SpotBand Logical 26' },
		SpotBand_27: { name: 'SpotBand Logical 27' },
		SpotBand_28: { name: 'SpotBand Logical 28' },
		SpotBand_29: { name: 'SpotBand Logical 29' },
		SpotBand_30: { name: 'SpotBand Logical 30' },
		SpotBand_31: { name: 'SpotBand Logical 31' },
		SpotColor_00: { name: 'SpotColor Logical 00' },
		SpotColor_01: { name: 'SpotColor Logical 01' },
		SpotColor_02: { name: 'SpotColor Logical 02' },
		SpotColor_03: { name: 'SpotColor Logical 03' },
		SpotColor_04: { name: 'SpotColor Logical 04' },
		SpotColor_05: { name: 'SpotColor Logical 05' },
		SpotColor_06: { name: 'SpotColor Logical 06' },
		SpotColor_07: { name: 'SpotColor Logical 07' },
		SpotColor_08: { name: 'SpotColor Logical 08' },
		SpotColor_09: { name: 'SpotColor Logical 09' },
		SpotColor_10: { name: 'SpotColor Logical 10' },
		SpotColor_11: { name: 'SpotColor Logical 11' },
		SpotColor_12: { name: 'SpotColor Logical 12' },
		SpotColor_13: { name: 'SpotColor Logical 13' },
		SpotColor_14: { name: 'SpotColor Logical 14' },
		SpotColor_15: { name: 'SpotColor Logical 15' },
		SpotColor_16: { name: 'SpotColor Logical 16' },
		SpotColor_17: { name: 'SpotColor Logical 17' },
		SpotColor_18: { name: 'SpotColor Logical 18' },
		SpotColor_19: { name: 'SpotColor Logical 19' },
		SpotColor_20: { name: 'SpotColor Logical 20' },
		SpotColor_21: { name: 'SpotColor Logical 21' },
		SpotColor_22: { name: 'SpotColor Logical 22' },
		SpotColor_23: { name: 'SpotColor Logical 23' },
		SpotColor_24: { name: 'SpotColor Logical 24' },
		SpotColor_25: { name: 'SpotColor Logical 25' },
		SpotColor_26: { name: 'SpotColor Logical 26' },
		SpotColor_27: { name: 'SpotColor Logical 27' },
		SpotColor_28: { name: 'SpotColor Logical 28' },
		SpotColor_29: { name: 'SpotColor Logical 29' },
		SpotColor_30: { name: 'SpotColor Logical 30' },
		SpotColor_31: { name: 'SpotColor Logical 31' },
		SpotEnabled_00: { name: 'SpotEnabled Logical 00' },
		SpotEnabled_01: { name: 'SpotEnabled Logical 01' },
		SpotEnabled_02: { name: 'SpotEnabled Logical 02' },
		SpotEnabled_03: { name: 'SpotEnabled Logical 03' },
		SpotEnabled_04: { name: 'SpotEnabled Logical 04' },
		SpotEnabled_05: { name: 'SpotEnabled Logical 05' },
		SpotEnabled_06: { name: 'SpotEnabled Logical 06' },
		SpotEnabled_07: { name: 'SpotEnabled Logical 07' },
		SpotEnabled_08: { name: 'SpotEnabled Logical 08' },
		SpotEnabled_09: { name: 'SpotEnabled Logical 09' },
		SpotEnabled_10: { name: 'SpotEnabled Logical 10' },
		SpotEnabled_11: { name: 'SpotEnabled Logical 11' },
		SpotEnabled_12: { name: 'SpotEnabled Logical 12' },
		SpotEnabled_13: { name: 'SpotEnabled Logical 13' },
		SpotEnabled_14: { name: 'SpotEnabled Logical 14' },
		SpotEnabled_15: { name: 'SpotEnabled Logical 15' },
		SpotEnabled_16: { name: 'SpotEnabled Logical 16' },
		SpotEnabled_17: { name: 'SpotEnabled Logical 17' },
		SpotEnabled_18: { name: 'SpotEnabled Logical 18' },
		SpotEnabled_19: { name: 'SpotEnabled Logical 19' },
		SpotEnabled_20: { name: 'SpotEnabled Logical 20' },
		SpotEnabled_21: { name: 'SpotEnabled Logical 21' },
		SpotEnabled_22: { name: 'SpotEnabled Logical 22' },
		SpotEnabled_23: { name: 'SpotEnabled Logical 23' },
		SpotEnabled_24: { name: 'SpotEnabled Logical 24' },
		SpotEnabled_25: { name: 'SpotEnabled Logical 25' },
		SpotEnabled_26: { name: 'SpotEnabled Logical 26' },
		SpotEnabled_27: { name: 'SpotEnabled Logical 27' },
		SpotEnabled_28: { name: 'SpotEnabled Logical 28' },
		SpotEnabled_29: { name: 'SpotEnabled Logical 29' },
		SpotEnabled_30: { name: 'SpotEnabled Logical 30' },
		SpotEnabled_31: { name: 'SpotEnabled Logical 31' },
		SpotWidth_00: { name: 'SpotWidth Logical 00' },
		SpotWidth_01: { name: 'SpotWidth Logical 01' },
		SpotWidth_02: { name: 'SpotWidth Logical 02' },
		SpotWidth_03: { name: 'SpotWidth Logical 03' },
		SpotWidth_04: { name: 'SpotWidth Logical 04' },
		SpotWidth_05: { name: 'SpotWidth Logical 05' },
		SpotWidth_06: { name: 'SpotWidth Logical 06' },
		SpotWidth_07: { name: 'SpotWidth Logical 07' },
		SpotWidth_08: { name: 'SpotWidth Logical 08' },
		SpotWidth_09: { name: 'SpotWidth Logical 09' },
		SpotWidth_10: { name: 'SpotWidth Logical 10' },
		SpotWidth_11: { name: 'SpotWidth Logical 11' },
		SpotWidth_12: { name: 'SpotWidth Logical 12' },
		SpotWidth_13: { name: 'SpotWidth Logical 13' },
		SpotWidth_14: { name: 'SpotWidth Logical 14' },
		SpotWidth_15: { name: 'SpotWidth Logical 15' },
		SpotWidth_16: { name: 'SpotWidth Logical 16' },
		SpotWidth_17: { name: 'SpotWidth Logical 17' },
		SpotWidth_18: { name: 'SpotWidth Logical 18' },
		SpotWidth_19: { name: 'SpotWidth Logical 19' },
		SpotWidth_20: { name: 'SpotWidth Logical 20' },
		SpotWidth_21: { name: 'SpotWidth Logical 21' },
		SpotWidth_22: { name: 'SpotWidth Logical 22' },
		SpotWidth_23: { name: 'SpotWidth Logical 23' },
		SpotWidth_24: { name: 'SpotWidth Logical 24' },
		SpotWidth_25: { name: 'SpotWidth Logical 25' },
		SpotWidth_26: { name: 'SpotWidth Logical 26' },
		SpotWidth_27: { name: 'SpotWidth Logical 27' },
		SpotWidth_28: { name: 'SpotWidth Logical 28' },
		SpotWidth_29: { name: 'SpotWidth Logical 29' },
		SpotWidth_30: { name: 'SpotWidth Logical 30' },
		SpotWidth_31: { name: 'SpotWidth Logical 31' },
		WashBand_00: { name: 'WashBand Logical 00' },
		WashBand_01: { name: 'WashBand Logical 01' },
		WashBand_02: { name: 'WashBand Logical 02' },
		WashBand_03: { name: 'WashBand Logical 03' },
		WashBand_04: { name: 'WashBand Logical 04' },
		WashBand_05: { name: 'WashBand Logical 05' },
		WashBand_06: { name: 'WashBand Logical 06' },
		WashBand_07: { name: 'WashBand Logical 07' },
		WashBand_08: { name: 'WashBand Logical 08' },
		WashBand_09: { name: 'WashBand Logical 09' },
		WashBand_10: { name: 'WashBand Logical 10' },
		WashBand_11: { name: 'WashBand Logical 11' },
		WashBand_12: { name: 'WashBand Logical 12' },
		WashBand_13: { name: 'WashBand Logical 13' },
		WashBand_14: { name: 'WashBand Logical 14' },
		WashBand_15: { name: 'WashBand Logical 15' },
		WashBand_16: { name: 'WashBand Logical 16' },
		WashBand_17: { name: 'WashBand Logical 17' },
		WashBand_18: { name: 'WashBand Logical 18' },
		WashBand_19: { name: 'WashBand Logical 19' },
		WashBand_20: { name: 'WashBand Logical 20' },
		WashBand_21: { name: 'WashBand Logical 21' },
		WashBand_22: { name: 'WashBand Logical 22' },
		WashBand_23: { name: 'WashBand Logical 23' },
		WashBand_24: { name: 'WashBand Logical 24' },
		WashBand_25: { name: 'WashBand Logical 25' },
		WashBand_26: { name: 'WashBand Logical 26' },
		WashBand_27: { name: 'WashBand Logical 27' },
		WashBand_28: { name: 'WashBand Logical 28' },
		WashBand_29: { name: 'WashBand Logical 29' },
		WashBand_30: { name: 'WashBand Logical 30' },
		WashBand_31: { name: 'WashBand Logical 31' },
		WashColor_00: { name: 'WashColor Logical 00' },
		WashColor_01: { name: 'WashColor Logical 01' },
		WashColor_02: { name: 'WashColor Logical 02' },
		WashColor_03: { name: 'WashColor Logical 03' },
		WashColor_04: { name: 'WashColor Logical 04' },
		WashColor_05: { name: 'WashColor Logical 05' },
		WashColor_06: { name: 'WashColor Logical 06' },
		WashColor_07: { name: 'WashColor Logical 07' },
		WashColor_08: { name: 'WashColor Logical 08' },
		WashColor_09: { name: 'WashColor Logical 09' },
		WashColor_10: { name: 'WashColor Logical 10' },
		WashColor_11: { name: 'WashColor Logical 11' },
		WashColor_12: { name: 'WashColor Logical 12' },
		WashColor_13: { name: 'WashColor Logical 13' },
		WashColor_14: { name: 'WashColor Logical 14' },
		WashColor_15: { name: 'WashColor Logical 15' },
		WashColor_16: { name: 'WashColor Logical 16' },
		WashColor_17: { name: 'WashColor Logical 17' },
		WashColor_18: { name: 'WashColor Logical 18' },
		WashColor_19: { name: 'WashColor Logical 19' },
		WashColor_20: { name: 'WashColor Logical 20' },
		WashColor_21: { name: 'WashColor Logical 21' },
		WashColor_22: { name: 'WashColor Logical 22' },
		WashColor_23: { name: 'WashColor Logical 23' },
		WashColor_24: { name: 'WashColor Logical 24' },
		WashColor_25: { name: 'WashColor Logical 25' },
		WashColor_26: { name: 'WashColor Logical 26' },
		WashColor_27: { name: 'WashColor Logical 27' },
		WashColor_28: { name: 'WashColor Logical 28' },
		WashColor_29: { name: 'WashColor Logical 29' },
		WashColor_30: { name: 'WashColor Logical 30' },
		WashColor_31: { name: 'WashColor Logical 31' },
		WashEnabled_00: { name: 'WashEnabled Logical 00' },
		WashEnabled_01: { name: 'WashEnabled Logical 01' },
		WashEnabled_02: { name: 'WashEnabled Logical 02' },
		WashEnabled_03: { name: 'WashEnabled Logical 03' },
		WashEnabled_04: { name: 'WashEnabled Logical 04' },
		WashEnabled_05: { name: 'WashEnabled Logical 05' },
		WashEnabled_06: { name: 'WashEnabled Logical 06' },
		WashEnabled_07: { name: 'WashEnabled Logical 07' },
		WashEnabled_08: { name: 'WashEnabled Logical 08' },
		WashEnabled_09: { name: 'WashEnabled Logical 09' },
		WashEnabled_10: { name: 'WashEnabled Logical 10' },
		WashEnabled_11: { name: 'WashEnabled Logical 11' },
		WashEnabled_12: { name: 'WashEnabled Logical 12' },
		WashEnabled_13: { name: 'WashEnabled Logical 13' },
		WashEnabled_14: { name: 'WashEnabled Logical 14' },
		WashEnabled_15: { name: 'WashEnabled Logical 15' },
		WashEnabled_16: { name: 'WashEnabled Logical 16' },
		WashEnabled_17: { name: 'WashEnabled Logical 17' },
		WashEnabled_18: { name: 'WashEnabled Logical 18' },
		WashEnabled_19: { name: 'WashEnabled Logical 19' },
		WashEnabled_20: { name: 'WashEnabled Logical 20' },
		WashEnabled_21: { name: 'WashEnabled Logical 21' },
		WashEnabled_22: { name: 'WashEnabled Logical 22' },
		WashEnabled_23: { name: 'WashEnabled Logical 23' },
		WashEnabled_24: { name: 'WashEnabled Logical 24' },
		WashEnabled_25: { name: 'WashEnabled Logical 25' },
		WashEnabled_26: { name: 'WashEnabled Logical 26' },
		WashEnabled_27: { name: 'WashEnabled Logical 27' },
		WashEnabled_28: { name: 'WashEnabled Logical 28' },
		WashEnabled_29: { name: 'WashEnabled Logical 29' },
		WashEnabled_30: { name: 'WashEnabled Logical 30' },
		WashEnabled_31: { name: 'WashEnabled Logical 31' },
		WashWidth_00: { name: 'WashWidth Logical 00' },
		WashWidth_01: { name: 'WashWidth Logical 01' },
		WashWidth_02: { name: 'WashWidth Logical 02' },
		WashWidth_03: { name: 'WashWidth Logical 03' },
		WashWidth_04: { name: 'WashWidth Logical 04' },
		WashWidth_05: { name: 'WashWidth Logical 05' },
		WashWidth_06: { name: 'WashWidth Logical 06' },
		WashWidth_07: { name: 'WashWidth Logical 07' },
		WashWidth_08: { name: 'WashWidth Logical 08' },
		WashWidth_09: { name: 'WashWidth Logical 09' },
		WashWidth_10: { name: 'WashWidth Logical 10' },
		WashWidth_11: { name: 'WashWidth Logical 11' },
		WashWidth_12: { name: 'WashWidth Logical 12' },
		WashWidth_13: { name: 'WashWidth Logical 13' },
		WashWidth_14: { name: 'WashWidth Logical 14' },
		WashWidth_15: { name: 'WashWidth Logical 15' },
		WashWidth_16: { name: 'WashWidth Logical 16' },
		WashWidth_17: { name: 'WashWidth Logical 17' },
		WashWidth_18: { name: 'WashWidth Logical 18' },
		WashWidth_19: { name: 'WashWidth Logical 19' },
		WashWidth_20: { name: 'WashWidth Logical 20' },
		WashWidth_21: { name: 'WashWidth Logical 21' },
		WashWidth_22: { name: 'WashWidth Logical 22' },
		WashWidth_23: { name: 'WashWidth Logical 23' },
		WashWidth_24: { name: 'WashWidth Logical 24' },
		WashWidth_25: { name: 'WashWidth Logical 25' },
		WashWidth_26: { name: 'WashWidth Logical 26' },
		WashWidth_27: { name: 'WashWidth Logical 27' },
		WashWidth_28: { name: 'WashWidth Logical 28' },
		WashWidth_29: { name: 'WashWidth Logical 29' },
		WashWidth_30: { name: 'WashWidth Logical 30' },
		WashWidth_31: { name: 'WashWidth Logical 31' },

		// Other mappings:
		SectionToggles_00: { name: 'SectionToggles Index 00' },
		SectionToggles_01: { name: 'SectionToggles Index 01' },
		SectionToggles_02: { name: 'SectionToggles Index 02' },
		SectionToggles_03: { name: 'SectionToggles Index 03' },
		SectionToggles_04: { name: 'SectionToggles Index 04' },
		SectionToggles_05: { name: 'SectionToggles Index 05' },
		SectionToggles_06: { name: 'SectionToggles Index 06' },
		SectionToggles_07: { name: 'SectionToggles Index 07' },
		SectionToggles_08: { name: 'SectionToggles Index 08' },
		SectionToggles_09: { name: 'SectionToggles Index 09' },
		SectionToggles_10: { name: 'SectionToggles Index 10' },
		SectionToggles_11: { name: 'SectionToggles Index 11' },
		SectionToggles_12: { name: 'SectionToggles Index 12' },
		SectionToggles_13: { name: 'SectionToggles Index 13' },
		SectionToggles_14: { name: 'SectionToggles Index 14' },
		SectionToggles_15: { name: 'SectionToggles Index 15' },
		SectionToggles_16: { name: 'SectionToggles Index 16' },
		SideToggles_00: { name: 'SideToggles Index 00' },
		SideToggles_01: { name: 'SideToggles Index 01' },
		SideToggles_02: { name: 'SideToggles Index 02' },
		SideToggles_03: { name: 'SideToggles Index 03' },
		SideToggles_04: { name: 'SideToggles Index 04' },
		SideToggles_05: { name: 'SideToggles Index 05' },
		SideToggles_06: { name: 'SideToggles Index 06' },
		SideToggles_07: { name: 'SideToggles Index 07' },
		SideToggles_08: { name: 'SideToggles Index 08' },
		SideToggles_09: { name: 'SideToggles Index 09' },
		SideToggles_10: { name: 'SideToggles Index 10' },
		SideToggles_11: { name: 'SideToggles Index 11' },
		SideToggles_12: { name: 'SideToggles Index 12' },
		SideToggles_13: { name: 'SideToggles Index 13' },
		SideToggles_14: { name: 'SideToggles Index 14' },
		SideToggles_15: { name: 'SideToggles Index 15' },
		SideToggles_16: { name: 'SideToggles Index 16' },
		SetColor_00: { name: 'SetColor Index 00' },
		SetColor_01: { name: 'SetColor Index 01' },
		SetColor_02: { name: 'SetColor Index 02' },
		SetColor_03: { name: 'SetColor Index 03' },
		SetColor_04: { name: 'SetColor Index 04' },
		SetColor_05: { name: 'SetColor Index 05' },
		SetColor_06: { name: 'SetColor Index 06' },
		SetColor_07: { name: 'SetColor Index 07' },
		SetColor_08: { name: 'SetColor Index 08' },
		SetColor_09: { name: 'SetColor Index 09' },
		SetColor_10: { name: 'SetColor Index 10' },
		SetColor_11: { name: 'SetColor Index 11' },
		SetColor_12: { name: 'SetColor Index 12' },
		SetColor_13: { name: 'SetColor Index 13' },
		SetColor_14: { name: 'SetColor Index 14' },
		SetColor_15: { name: 'SetColor Index 15' },
		SetColor_16: { name: 'SetColor Index 16' },
		Color_00: { name: 'Color Index 00' },
		Color_01: { name: 'Color Index 01' },
		Color_02: { name: 'Color Index 02' },
		Color_03: { name: 'Color Index 03' },
		Color_04: { name: 'Color Index 04' },
		Color_05: { name: 'Color Index 05' },
		Color_06: { name: 'Color Index 06' },
		Color_07: { name: 'Color Index 07' },
		Color_08: { name: 'Color Index 08' },
		Color_09: { name: 'Color Index 09' },
		Color_10: { name: 'Color Index 10' },
		Color_11: { name: 'Color Index 11' },
		Color_12: { name: 'Color Index 12' },
		Color_13: { name: 'Color Index 13' },
		Color_14: { name: 'Color Index 14' },
		Color_15: { name: 'Color Index 15' },
		Color_16: { name: 'Color Index 16' },
		AudioLink_00: { name: 'AudioLink Index 00' },
		AudioLink_01: { name: 'AudioLink Index 01' },
		AudioLink_02: { name: 'AudioLink Index 02' },
		AudioLink_03: { name: 'AudioLink Index 03' },
		AudioLink_04: { name: 'AudioLink Index 04' },
		AudioLink_05: { name: 'AudioLink Index 05' },
		AudioLink_06: { name: 'AudioLink Index 06' },
		AudioLink_07: { name: 'AudioLink Index 07' },
		AudioLink_08: { name: 'AudioLink Index 08' },
		AudioLink_09: { name: 'AudioLink Index 09' },
		AudioLink_10: { name: 'AudioLink Index 10' },
		AudioLink_11: { name: 'AudioLink Index 11' },
		AudioLink_12: { name: 'AudioLink Index 12' },
		AudioLink_13: { name: 'AudioLink Index 13' },
		AudioLink_14: { name: 'AudioLink Index 14' },
		AudioLink_15: { name: 'AudioLink Index 15' },
		AudioLink_16: { name: 'AudioLink Index 16' },
	})
	self.setVariableValues({
		connected: false,

		// Feedback mappings:
		...defaultValues,
	})
}
