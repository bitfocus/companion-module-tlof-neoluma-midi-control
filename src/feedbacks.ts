import type ModuleInstance from './main.js'
import LogicalMappingsEnum, { LogicalMappingsDropdownOptions } from './mapping/logical_mappings_enum.js'

export type FeedbacksSchema = {
	connected: {
		type: 'boolean'
		options: Record<string, never>
	}

	// Feedback Mappings:
	AllowPortals: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	Blackout: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	BlinderIntensity: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	CleanLight: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	DiscoBall: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	Flasher: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	FlasherIntensity: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	FlasherSpeed: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	GlobalIntensity: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	LaserIntensity: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MirrorBallInner: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MirrorBallMiddle: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MirrorBallOuter: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MovementSpeed: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MovingHeadStrobe: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MovingHeadStrobeSpeed: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	Random: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	ScreenMapping: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	SpotIntensity: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	SpotMovement: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	VeryPoorSign: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WallLineBrightness: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WallLineColors: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WallLineSpeed: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WallLineTension: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WallLines: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WashIntensity: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	WashMovement: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MidiFeedback: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MidiLog: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MacroBypassApply: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MacroApplyManually: {
		type: 'boolean'
		options: {
			value: number
		}
	}
	MacroSet: {
		type: 'boolean'
		options: {
			value: number
		}
	}

	// Logical Feedback Mappings:
	Gobo: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	GoboSpinSpeed: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	GoboSpinSpeedReverse: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	LaserBand: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	LaserColor: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	LaserEnabled: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	SectionEnabled: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	SpotBand: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	SpotColor: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	SpotEnabled: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	SpotWidth: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	WashBand: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	WashColor: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	WashEnabled: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}
	WashWidth: {
		type: 'boolean'
		options: {
			value: number
			logical: LogicalMappingsEnum
		}
	}

	// Other Mappings:
	SectionToggles: {
		type: 'boolean'
		options: {
			value: number
			index: number
		}
	}
	SideToggles: {
		type: 'boolean'
		options: {
			value: number
			index: number
		}
	}
	SetColor: {
		type: 'boolean'
		options: {
			value: number
			index: number
		}
	}
	Color: {
		type: 'boolean'
		options: {
			value: number
			index: number
		}
	}
	AudioLink: {
		type: 'boolean'
		options: {
			value: number
			index: number
		}
	}
}

export function UpdateFeedbacks(self: ModuleInstance): void {
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

		// Feedback Mappings:
		AllowPortals: {
			name: 'AllowPortals',
			description: 'AllowPortals',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('AllowPortals') === feedback.options.value
			},
		},
		Blackout: {
			name: 'Blackout',
			description: 'Blackout',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('Blackout') === feedback.options.value
			},
		},
		BlinderIntensity: {
			name: 'BlinderIntensity',
			description: 'BlinderIntensity',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('BlinderIntensity') === feedback.options.value
			},
		},
		CleanLight: {
			name: 'CleanLight',
			description: 'CleanLight',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('CleanLight') === feedback.options.value
			},
		},
		DiscoBall: {
			name: 'DiscoBall',
			description: 'DiscoBall',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('DiscoBall') === feedback.options.value
			},
		},
		Flasher: {
			name: 'Flasher',
			description: 'Flasher',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 7,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('Flasher') === feedback.options.value
			},
		},
		FlasherIntensity: {
			name: 'FlasherIntensity',
			description: 'FlasherIntensity',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('FlasherIntensity') === feedback.options.value
			},
		},
		FlasherSpeed: {
			name: 'FlasherSpeed',
			description: 'FlasherSpeed',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('FlasherSpeed') === feedback.options.value
			},
		},
		GlobalIntensity: {
			name: 'GlobalIntensity',
			description: 'GlobalIntensity',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('GlobalIntensity') === feedback.options.value
			},
		},
		LaserIntensity: {
			name: 'LaserIntensity',
			description: 'LaserIntensity',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('LaserIntensity') === feedback.options.value
			},
		},
		MirrorBallInner: {
			name: 'MirrorBallInner',
			description: 'MirrorBallInner',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MirrorBallInner') === feedback.options.value
			},
		},
		MirrorBallMiddle: {
			name: 'MirrorBallMiddle',
			description: 'MirrorBallMiddle',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MirrorBallMiddle') === feedback.options.value
			},
		},
		MirrorBallOuter: {
			name: 'MirrorBallOuter',
			description: 'MirrorBallOuter',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MirrorBallOuter') === feedback.options.value
			},
		},
		MovementSpeed: {
			name: 'MovementSpeed',
			description: 'MovementSpeed',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MovementSpeed') === feedback.options.value
			},
		},
		MovingHeadStrobe: {
			name: 'MovingHeadStrobe',
			description: 'MovingHeadStrobe',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MovingHeadStrobe') === feedback.options.value
			},
		},
		MovingHeadStrobeSpeed: {
			name: 'MovingHeadStrobeSpeed',
			description: 'MovingHeadStrobeSpeed',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MovingHeadStrobeSpeed') === feedback.options.value
			},
		},
		Random: {
			name: 'Random',
			description: 'Random',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('Random') === feedback.options.value
			},
		},
		ScreenMapping: {
			name: 'ScreenMapping',
			description: 'ScreenMapping',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('ScreenMapping') === feedback.options.value
			},
		},
		SpotIntensity: {
			name: 'SpotIntensity',
			description: 'SpotIntensity',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('SpotIntensity') === feedback.options.value
			},
		},
		SpotMovement: {
			name: 'SpotMovement',
			description: 'SpotMovement',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 7,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('SpotMovement') === feedback.options.value
			},
		},
		VeryPoorSign: {
			name: 'VeryPoorSign',
			description: 'VeryPoorSign',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('VeryPoorSign') === feedback.options.value
			},
		},
		WallLineBrightness: {
			name: 'WallLineBrightness',
			description: 'WallLineBrightness',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WallLineBrightness') === feedback.options.value
			},
		},
		WallLineColors: {
			name: 'WallLineColors',
			description: 'WallLineColors',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 15,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WallLineColors') === feedback.options.value
			},
		},
		WallLineSpeed: {
			name: 'WallLineSpeed',
			description: 'WallLineSpeed',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WallLineSpeed') === feedback.options.value
			},
		},
		WallLineTension: {
			name: 'WallLineTension',
			description: 'WallLineTension',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WallLineTension') === feedback.options.value
			},
		},
		WallLines: {
			name: 'WallLines',
			description: 'WallLines',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 7,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WallLines') === feedback.options.value
			},
		},
		WashIntensity: {
			name: 'WashIntensity',
			description: 'WashIntensity',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WashIntensity') === feedback.options.value
			},
		},
		WashMovement: {
			name: 'WashMovement',
			description: 'WashMovement',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('WashMovement') === feedback.options.value
			},
		},
		MidiFeedback: {
			name: 'MidiFeedback',
			description: 'MidiFeedback',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MidiFeedback') === feedback.options.value
			},
		},
		MidiLog: {
			name: 'MidiLog',
			description: 'MidiLog',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MidiLog') === feedback.options.value
			},
		},
		MacroBypassApply: {
			name: 'MacroBypassApply',
			description: 'MacroBypassApply',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MacroBypassApply') === feedback.options.value
			},
		},
		MacroApplyManually: {
			name: 'MacroApplyManually',
			description: 'MacroApplyManually',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MacroApplyManually') === feedback.options.value
			},
		},
		MacroSet: {
			name: 'MacroSet',
			description: 'MacroSet',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (feedback) => {
				return self.getVariableValue('MacroSet') === feedback.options.value
			},
		},

		// Logical Feedback Mappings:
		Gobo: {
			name: 'Gobo',
			description: 'Gobo',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 7,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'Gobo_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		GoboSpinSpeed: {
			name: 'GoboSpinSpeed',
			description: 'GoboSpinSpeed',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'GoboSpinSpeed_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		GoboSpinSpeedReverse: {
			name: 'GoboSpinSpeedReverse',
			description: 'GoboSpinSpeedReverse',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'GoboSpinSpeedReverse_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		LaserBand: {
			name: 'LaserBand',
			description: 'LaserBand',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'LaserBand_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		LaserColor: {
			name: 'LaserColor',
			description: 'LaserColor',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 15,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'LaserColor_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		LaserEnabled: {
			name: 'LaserEnabled',
			description: 'LaserEnabled',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'LaserEnabled_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		SectionEnabled: {
			name: 'SectionEnabled',
			description: 'SectionEnabled',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SectionEnabled_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		SpotBand: {
			name: 'SpotBand',
			description: 'SpotBand',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SpotBand_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		SpotColor: {
			name: 'SpotColor',
			description: 'SpotColor',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 15,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SpotColor_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		SpotEnabled: {
			name: 'SpotEnabled',
			description: 'SpotEnabled',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SpotEnabled_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		SpotWidth: {
			name: 'SpotWidth',
			description: 'SpotWidth',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SpotWidth_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		WashBand: {
			name: 'WashBand',
			description: 'WashBand',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 4,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'WashBand_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		WashColor: {
			name: 'WashColor',
			description: 'WashColor',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 15,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'WashColor_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		WashEnabled: {
			name: 'WashEnabled',
			description: 'WashEnabled',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'WashEnabled_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},
		WashWidth: {
			name: 'WashWidth',
			description: 'WashWidth',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
				{
					type: 'dropdown',
					id: 'logical',
					label: 'Logical',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'WashWidth_' +
							(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
								? '0' + feedback.options.logical
								: feedback.options.logical),
					) === feedback.options.value
				)
			},
		},

		// Other Mappings:
		SectionToggles: {
			name: 'SectionToggles',
			description: 'SectionToggles',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					default: 0,
					min: 0,
					max: 16,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SectionToggles_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),
					) === feedback.options.value
				)
			},
		},
		SideToggles: {
			name: 'SideToggles',
			description: 'SideToggles',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					default: 0,
					min: 0,
					max: 16,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SideToggles_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),
					) === feedback.options.value
				)
			},
		},
		SetColor: {
			name: 'SetColor',
			description: 'SetColor',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					default: 0,
					min: 0,
					max: 16,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'SetColor_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),
					) === feedback.options.value
				)
			},
		},
		Color: {
			name: 'Color',
			description: 'Color',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					default: 0,
					min: 0,
					max: 16,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'Color_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),
					) === feedback.options.value
				)
			},
		},
		AudioLink: {
			name: 'AudioLink',
			description: 'AudioLink',
			type: 'boolean',
			defaultStyle: {
				color: 0xffffff,
				bgcolor: 0x00ff00,
			},
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 127,
				},
				{
					type: 'number',
					id: 'index',
					label: 'Index',
					default: 0,
					min: 0,
					max: 16,
				},
			],
			callback: (feedback) => {
				return (
					self.getVariableValue(
						'AudioLink_' + (feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),
					) === feedback.options.value
				)
			},
		},
	})
}
