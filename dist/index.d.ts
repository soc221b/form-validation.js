import { publicKey } from './proxy';
import { IStatableValidator } from './validation-state';
export interface IValidator extends IStatableValidator {
    [publicKey]: {
        pending: boolean;
        invalid: boolean;
        dirty: boolean;
        anyDirty: boolean;
        error: boolean;
        anyError: boolean;
        errors: {
            [key: string]: any;
        };
        validate: () => void;
        reset: () => void;
        touch: () => void;
    };
}
export declare const proxy: ({ form, schema, validator, hooks }: any) => any;
