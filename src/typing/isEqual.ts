import type { IsEqual } from 'type-fest'

//https://stackoverflow.com/questions/77260345/how-to-use-isequal-to-create-a-utility-that-asserts-the-equality-of-type-types/77261320#77261320
export function isEqual<
	T extends (IsEqual<T, S> extends true ? unknown : never),
	S extends (IsEqual<T, S> extends true ? unknown : never),
>(): void {}
