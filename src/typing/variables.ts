import type { IntRange, UnionLength } from 'type-fest'
import { isEqual } from './isEqual.js'
import { type FeedbacksSchema } from './feedback.js'
import { type FeedbackMappings } from '../mapping/feedback_mappings.js'
import { type LogicalMappingsEnum } from '../mapping/logical_mappings_enum.js'
import mappings from '../mapping/mappings.js'

type t0to10 = IntRange<0, 10>
type variableNumber<T extends number> = T extends t0to10 ? `_0${T & t0to10}` : `_${T}`

isEqual<variableNumber<0>, '_00'>()
isEqual<variableNumber<1>, '_01'>()
isEqual<variableNumber<2>, '_02'>()
isEqual<variableNumber<3>, '_03'>()
isEqual<variableNumber<4>, '_04'>()
isEqual<variableNumber<5>, '_05'>()
isEqual<variableNumber<6>, '_06'>()
isEqual<variableNumber<7>, '_07'>()
isEqual<variableNumber<8>, '_08'>()
isEqual<variableNumber<9>, '_09'>()
isEqual<variableNumber<10>, '_10'>()
isEqual<variableNumber<111>, '_111'>()
isEqual<variableNumber<0 | 1>, '_00' | '_01'>()

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
		? `${T}${variableNumber<LogicalMappingsEnum>}`
		: M extends { name: T; sectionType: 'None' }
			? T
			: `${T}${variableNumber<IntRange<0, FeedbackIndexRange<T>>>}`
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
