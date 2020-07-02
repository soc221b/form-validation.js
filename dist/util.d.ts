import { Path } from '../type/index';
export declare function toString(object: any): string;
export declare function isPlainObject(object: any): boolean;
export declare function isArray(object: any): boolean;
export declare function isFunction(object: any): boolean;
export declare function isPromise(object: any): boolean;
export declare function hasKey(object: {
    [key: string]: any;
}, key: string): boolean;
interface Cache<T> {
    object: T;
    copy: T;
}
export declare function deepCopy<T>(object: T, cache?: Cache<T>[]): T;
export declare function getByPath(object: object | any[], path: Path): any;
export declare function setByPath(object: object | unknown[], path: Path, value: unknown): unknown;
export declare function noop(...args: any): any;
export declare function identity<T>(any: T): T;
declare type Fn = (...args: Args) => any;
declare type Args = any[];
export declare function curry(fn: Fn, ...args1: Args): any;
export {};
