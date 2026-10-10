import type ModuleInstance from './main.js'
import LogicalMappingsEnum, { LogicalMappingsDropdownOptions } from './mapping/logical_mappings_enum.js'

import { feedbackMappings, type FeedbackMappings } from './mapping/feedback_mappings.js'
import type {
	CompanionFeedbackDefinition,
	CompanionFeedbackSchema,
	CompanionFeedbackDefinitions,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import { isEqual } from './globals.js'
import { maxLogicalIndex } from './mapping/buttons.js'

type ExtractField<T, F extends keyof T> = Pick<T, F>[F]

export type FeedbackOptions<T extends string> =
	Extract<FeedbackMappings, { name: T }> extends never
		? never
		: Extract<FeedbackMappings, { hasSections: 'Logical'; name: T }> extends never
			? Extract<FeedbackMappings, { hasSections: 'None'; name: T } | { type: 'Enum'; name: T }> extends never
				? { value: number; index: number }
				: { value: number }
			: { value: number; logical: LogicalMappingsEnum }

isEqual<FeedbackOptions<'InvalidNameNotUsed'>, never>()
isEqual<FeedbackOptions<'AllowPortals'>, { value: number }>()
isEqual<FeedbackOptions<'WallLines'>, { value: number }>()
isEqual<FeedbackOptions<'SetColor'>, { value: number; index: number }>()
isEqual<FeedbackOptions<'Gobo'>, { value: number; logical: LogicalMappingsEnum }>()

export interface FullFeedback<T extends string> extends CompanionFeedbackSchema<FeedbackOptions<T>> {
	type: 'boolean'
	options: FeedbackOptions<T>
}

export type Feedback<T extends { name: string } = FeedbackMappings> = {
	[P in ExtractField<T, 'name'>]: FullFeedback<P>
}

type AdditionalFeedback = {
	connected: {
		type: 'boolean'
		options: Record<string, never>
	}
}

export type FeedbacksSchema = Feedback & AdditionalFeedback

export function UpdateFeedbacks(self: ModuleInstance): void {
	const definitions: CompanionFeedbackDefinitions<Feedback> = Object.fromEntries(
		feedbackMappings.map((feedbackMapping) => {
			const value: SomeCompanionFeedbackInputField<'value'> = {
				type: 'number',
				id: 'value',
				label: 'Value',
				default: 1,
				min: feedbackMapping.dataMin,
				max: feedbackMapping.dataMax,
			}
			const logical: SomeCompanionFeedbackInputField<'logical'> = {
				type: 'dropdown',
				id: 'logical',
				label: 'Logical',
				default: 0,
				choices: LogicalMappingsDropdownOptions,
			}
			const index: SomeCompanionFeedbackInputField<'index'> = {
				type: 'number',
				id: 'index',
				label: 'Index',
				default: 0,
				min: 0,
				max: maxLogicalIndex,
			}
			type definition<T extends string> = CompanionFeedbackDefinition<FullFeedback<T>>

			if (feedbackMapping.hasSections === 'Logical') {
				const ret: readonly [typeof feedbackMapping.name, definition<typeof feedbackMapping.name>] = [
					feedbackMapping.name,
					{
						name: feedbackMapping.name,
						description: feedbackMapping.name,
						type: 'boolean',
						defaultStyle: {
							color: 0xffffff,
							bgcolor: 0x00ff00,
						},
						options: [value, logical],
						callback: (feedback) =>
							self.getVariableValue(
								feedbackMapping.name +
									'_' +
									(feedback.options.logical < LogicalMappingsEnum.InScreen_Left
										? '0' + feedback.options.logical
										: feedback.options.logical),
							) === feedback.options.value,
					},
				]
				return ret
			}
			if (feedbackMapping.hasSections !== 'None') {
				isEqual<typeof feedbackMapping.type & 'Enum', never>()
				const ret: readonly [typeof feedbackMapping.name, definition<typeof feedbackMapping.name>] = [
					feedbackMapping.name,
					{
						name: feedbackMapping.name,
						description: feedbackMapping.name,
						type: 'boolean',
						defaultStyle: {
							color: 0xffffff,
							bgcolor: 0x00ff00,
						},
						options: [value, index],
						callback: (feedback) =>
							self.getVariableValue(
								feedbackMapping.name +
									'_' +
									(feedback.options.index < 10 ? '0' + feedback.options.index : feedback.options.index),
							) === feedback.options.value,
					},
				]
				return ret
			}

			const ret: readonly [typeof feedbackMapping.name, definition<typeof feedbackMapping.name>] = [
				feedbackMapping.name,
				{
					name: feedbackMapping.name,
					description: feedbackMapping.name,
					type: 'boolean',
					defaultStyle: {
						color: 0xffffff,
						bgcolor: 0x00ff00,
					},
					options: [value],
					callback: (feedback) => self.getVariableValue(feedbackMapping.name) === feedback.options.value,
				},
			]
			return ret
		}),
	)

	const additional: CompanionFeedbackDefinitions<AdditionalFeedback> = {
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
	}
	const feedbackDefinitions: CompanionFeedbackDefinitions<FeedbacksSchema> = {
		...definitions,
		...additional,
	}
	self.setFeedbackDefinitions(feedbackDefinitions)
}
