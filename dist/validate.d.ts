import { IStatableValidator } from './validation-state';
export declare const rulesResultKey = "$rules";
export interface IFunctionParams {
    value: any;
    key?: string;
    parent: any;
    path: string[];
    root: any;
    params: {
        [key: string]: any;
    };
}
export interface IValidateParams {
    rootForm: any;
    validator: IStatableValidator;
}
export interface IValidateResult {
    [rulesResultKey]: {
        [key: string]: any;
    };
    [key: string]: any;
}
export declare const validate: ({ rootForm, validator }: IValidateParams) => IValidateResult;
