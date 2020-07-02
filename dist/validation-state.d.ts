import { privateKey, pathKey, listenerKey, IPath, IBaseValidator, publicKey } from './proxy';
export interface IStatableValidator extends IBaseValidator {
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
export declare function wrapState(validator: IBaseValidator): void;
export declare const getNested: (validator: IStatableValidator) => IStatableValidator[];
