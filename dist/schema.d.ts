import { Normalizer, Rule, Error } from '../type';
import { IBaseValidator, publicKey, privateKey, pathKey, listenerKey, IPath } from './proxy';
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
    [privateKey]: {
        [pathKey]: IPath;
        [listenerKey]: ((...args: any) => any)[];
        invalid: boolean;
        pending: number;
        dirty: boolean;
        setInvalid: (value: boolean) => void;
        setDirty: (value: boolean) => void;
        setPending: (value: boolean) => void;
        resetPending: () => void;
        [schemaKey]: ISchema;
        [key: string]: any;
    };
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
        [key: string]: any;
    };
    [key: string]: any;
}
export declare const wrapSchema: ({ rootSchema, validator, }: {
    rootSchema: Partial<ISchema>;
    validator: IStatableValidator;
}) => void;
export {};
