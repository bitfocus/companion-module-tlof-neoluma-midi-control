import { type LogicalMappingsEnum } from '../mapping/logical_mappings_enum.js'

import { type FeedbackMappings } from '../mapping/feedback_mappings.js'
import type { CompanionFeedbackSchema } from '@companion-module/base'
import { isEqual } from '../typing/isEqual.js'

export type FeedbackOptions<T extends string> =
	Extract<FeedbackMappings, { name: T }> extends never
		? never
		: Extract<FeedbackMappings, { sectionType: 'Logical'; name: T }> extends never
			? Extract<FeedbackMappings, { sectionType: 'None'; name: T } | { type: 'Enum'; name: T }> extends never
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
	[P in T['name']]: FullFeedback<P>
}

export type AdditionalFeedback = {
	connected: {
		type: 'boolean'
		options: Record<string, never>
	}
}

export type FeedbacksSchema = Feedback & AdditionalFeedback
