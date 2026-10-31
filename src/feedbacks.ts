import type ModuleInstance from './main.js'
import type {
	CompanionFeedbackDefinition,
	CompanionFeedbackDefinitions,
	SomeCompanionFeedbackInputField,
} from '@companion-module/base'
import type { AdditionalFeedback, Feedback, FeedbacksSchema, FullFeedback } from './typing/feedback.js'
import feedbackMappings from './mapping/feedback_mappings.js'
import { LogicalMappingsDropdownOptions } from './mapping/logical_mappings_enum.js'
import { maxLogicalIndex } from './mapping/buttons.js'
import { isEqual } from './typing/isEqual.js'
import mappings from './mapping/mappings.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	const definitions: CompanionFeedbackDefinitions<Feedback> = Object.fromEntries(
		feedbackMappings.map((feedbackMapping) => {
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

			if (feedbackMapping.sectionType === 'Logical') {
				const value: SomeCompanionFeedbackInputField<'value'> = {
					type: 'dropdown',
					id: 'value',
					label: 'Value',
					default: 0,
					choices: LogicalMappingsDropdownOptions,
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
						options: [value, logical],
						callback: (feedback) =>
							self.getVariableValue(feedbackMapping.name + '_' + feedback.options.logical) === feedback.options.value,
					},
				]
				return ret
			}
			if (feedbackMapping.sectionType !== 'None') {
				//There'd need to be additional handling code for these, but right now those cases don't need to be handled.
				isEqual<typeof feedbackMapping.type & 'Enum', never>()
				isEqual<
					typeof feedbackMapping.name &
						(typeof mappings)['indexedMappings' | 'enumMappings'][number]['type']['feedback'],
					never
				>()
				isEqual<
					Extract<
						(typeof mappings)['indexedMappings' | 'enumMappings'][number],
						{ type: { feedback: typeof feedbackMapping.name } }
					>['values']['name'],
					never
				>()

				const value: SomeCompanionFeedbackInputField<'value'> = {
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: feedbackMapping.data.start,
					max: feedbackMapping.data.end,
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
						options: [value, index],
						callback: (feedback) =>
							self.getVariableValue(feedbackMapping.name + '_' + feedback.options.index) === feedback.options.value,
					},
				]
				return ret
			}

			const value: SomeCompanionFeedbackInputField<'value'> = {
				type: 'number',
				id: 'value',
				label: 'Value',
				default: 1,
				min: feedbackMapping.data.start,
				max: feedbackMapping.data.end,
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
