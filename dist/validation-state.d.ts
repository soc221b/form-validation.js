import { privateKey, pathKey, IBaseValidator, publicKey } from './proxy';
export interface IStatableValidator extends IBaseValidator {
    [privateKey]: {
        [pathKey]: string[];
        [key: string]: any;
        invalid: boolean;
        validated: boolean;
        pending: number;
        dirty: boolean;
        setValidated: (value: boolean) => void;
        setInvalid: (value: boolean) => void;
        setDirty: (value: boolean) => void;
        setPending: (value: boolean) => void;
        resetPending: () => void;
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
    [key: string]: any;
}
export declare function wrapState(rootValidator: IBaseValidator, path: string[]): void;
export declare const getNested: (validator: IStatableValidator) => IStatableValidator[];
