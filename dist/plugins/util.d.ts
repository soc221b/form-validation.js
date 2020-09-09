import { Validator, ValidationWrapper } from '../validator';
export declare const recursiveCallParent: ({ validator, callback, shouldCallSelf, }: {
    validator: Validator;
    callback: (parentWrapper: Required<ValidationWrapper>) => boolean;
    shouldCallSelf?: boolean | undefined;
}) => void;
export declare const recursiveCallChildren: ({ validator, callback, shouldCallSelf, }: {
    validator: Validator;
    callback: (parentWrapper: Required<ValidationWrapper>) => boolean;
    shouldCallSelf?: boolean | undefined;
}) => void;
