import { Normalizer, Rule, Error } from '../type';
import { IBaseValidator, publicKey, privateKey, pathKey } from './proxy';
import { IStatableValidator } from './validation-state';
export declare const schemaKey = "schema";
interface ISchema {
    $params: {
        [key: string]: any;
    };
    $normalizer: Normalizer;
    $rules: {
        [key: string]: Rule;
    };
    $errors: {
        [key: string]: Error;
    };
    [key: string]: any;
}
export interface ISchemaValidator extends IBaseValidator, IStatableValidator {
    [key: string]: any;
    [privateKey]: {
        [pathKey]: string[];
        invalid: boolean;
        validated: boolean;
        pending: number;
        dirty: boolean;
        setValidated: (value: boolean) => void;
        setInvalid: (value: boolean) => void;
        setDirty: (value: boolean) => void;
        setPending: (value: boolean) => void;
        resetPending: () => void;
        [key: string]: any;
        [schemaKey]: ISchema;
    };
    [publicKey]: {
        [key: string]: any;
        pending: boolean;
        invalid: boolean;
        dirty: boolean;
        anyDirty: boolean;
        error: boolean;
        anyError: boolean;
        errors: {
            [key: string]: any;
        };
    };
}
export declare const wrapSchema: ({ rootSchema, validator, }: {
    rootSchema: Partial<ISchema>;
    validator: IStatableValidator;
}) => void;
export {};
