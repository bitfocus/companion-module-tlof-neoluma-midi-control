import type { IntRange, UnionLength } from 'type-fest'
import { type FeedbacksSchema } from './feedback.js'
import { type FeedbackMappings } from '../mapping/feedback_mappings.js'
import { type LogicalMappingsEnum } from '../mapping/logical_mappings_enum.js'
import mappings from '../mapping/mappings.js'

type FeedbackIndexMapping<T extends M['feedbackNames'][number], M extends typeof mappings = typeof mappings> = Extract<
	M['mappings'][number],
	{ type: { feedback: T } }
>
type FeedbackIndexIndexedMapping<
	T extends M['feedbackNames'][number],
	M extends typeof mappings = typeof mappings,
> = Extract<M['indexedMappings' | 'enumMappings'][number], { type: { feedback: T } }>

type FeedbackIndexRange<T extends M['feedbackNames'][number], M extends typeof mappings = typeof mappings> =
	FeedbackIndexMapping<T, M> extends never
		? FeedbackIndexIndexedMapping<T, M> extends never
			? never
			: UnionLength<FeedbackIndexIndexedMapping<T, M>['values'][number]>
		: UnionLength<FeedbackIndexMapping<T, M>>

type VariableKeys<T extends keyof FeedbacksSchema, M extends FeedbackMappings = FeedbackMappings> = T extends M['name']
	? M extends { name: T; sectionType: 'Logical' }
		? `${T}_${LogicalMappingsEnum}`
		: M extends { name: T; sectionType: 'None' }
			? T
			: `${T}_${IntRange<0, FeedbackIndexRange<T>>}`
	: T

type SchemaVariableMappings = {
	[P in keyof FeedbacksSchema]: VariableKeys<P>
}

export type VariableSchema =
	| {
			[p in SchemaVariableMappings[FeedbackMappings['name']]]: number
	  }
	| {
			connected: boolean
	  }
