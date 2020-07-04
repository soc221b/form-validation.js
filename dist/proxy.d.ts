export declare const privateKey = "__form_validation__";
export declare const publicKey = "$v";
export declare const pathKey = "path";
export declare const proxyKey = "__form_validation_reactive";
export interface IBaseValidator {
    [key: string]: any;
    [privateKey]: {
        [key: string]: any;
        [pathKey]: string[];
    };
    [publicKey]: {
        [key: string]: any;
    };
}
export declare const proxyStructure: ({ object, clone, path, wrap, callback, }: {
    object: {
        [key: string]: any;
    };
    clone: {
        [key: string]: any;
    };
    path?: string[] | undefined;
    wrap?: ((object: any, clone: any, path: string[]) => void) | undefined;
    callback?: ((wrapper: IBaseValidator) => void) | undefined;
}) => any;
