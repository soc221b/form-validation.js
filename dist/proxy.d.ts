export declare const privateKey = "__form_validation__";
export declare const publicKey = "$v";
export declare const pathKey = "path";
export declare const listenerKey = "listener";
export declare const proxyKey = "__form_reactive";
export declare type IPath = string[];
export interface IBaseValidator {
    [privateKey]: {
        [pathKey]: IPath;
        [listenerKey]: ((...args: any) => any)[];
        [key: string]: any;
    };
    [publicKey]: {
        [key: string]: any;
    };
    [key: string]: any;
}
interface IWrapCallback {
    (wrapper: IBaseValidator): any;
}
export declare const proxyStructure: ({ object, clone, callback, }: {
    object: {
        [key: string]: any;
    };
    clone: {
        [key: string]: any;
    };
    callback?: IWrapCallback | undefined;
}) => {
    [key: string]: any;
};
export {};
