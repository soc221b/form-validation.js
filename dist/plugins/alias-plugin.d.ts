import { ValidationWrapper, Validator } from '../validator';
interface Alias {
    path: string[];
    aliasPath: string[];
}
export default class AliasPlugin {
    aliases: Alias[];
    constructor(aliases: Alias[]);
    apply(validator: Validator): void;
    alias(this: AliasPlugin, validationWrapper: ValidationWrapper): void;
}
export {};
