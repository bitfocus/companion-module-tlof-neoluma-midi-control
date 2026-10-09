///From https://web.archive.org/web/20260120040206/https://dev.to/svehla/typescript-object-fromentries-389c, with manual fixes
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }
type Cast<X, Y> = X extends Y ? X : Y
type FromEntries<T> = T extends [infer Key, any][]
	? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1] }
	: { [key in string]: any }

type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>

type Entry<T extends Record<string, unknown>> = {
	[K in keyof T]: [K, T[K]]
}[keyof T]

declare global {
	interface ObjectConstructor {
		fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>
		entries<const T extends Record<string, unknown>>(obj: T): Entry<T>[]
	}
}
