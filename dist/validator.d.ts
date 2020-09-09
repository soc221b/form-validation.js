import { Schema } from '../type';
export declare const VALIDATOR_KEY = "$v";
export interface ValidationWrapper {
    [VALIDATOR_KEY]?: Validator;
    [key: string]: any;
}
export interface States {
    messages: {
        [key: string]: any;
    };
}
export interface Hooks {
    onCreated: any;
    onBeforeValidate: any;
    onDoBeforeValidate: any;
    onValidated: any;
    onDoValidated: any;
    onValidatedEach: any;
    onDoValidatedEach: any;
    onBeforeReset: any;
    onDoBeforeReset: any;
    onReseted: any;
    onDoReseted: any;
}
export declare type Plugin = Function | {
    apply(validator: Validator): void;
};
interface Validator {
    $rootForm: any;
    $rootWrapper: ValidationWrapper;
    $rootSchema: Schema;
    $path: string[];
    $states: States;
    $lastRuleResults: {
        [key: string]: any;
    };
    $hooks: Hooks;
}
declare class Validator {
    constructor(rootForm: any, rootWrapper: ValidationWrapper, rootSchema: Schema, path: string[], plugins?: Plugin[]);
    validate(this: Validator): any;
    doValidate(this: Validator): any;
    reset(this: Validator): any;
    doReset(this: Validator): any;
    getWrapper(path: string[]): any;
    getForm(path: string[]): any;
    getSchema(path: string[]): any;
}
export { Validator };
