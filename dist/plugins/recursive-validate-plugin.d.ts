import { Validator } from '../validator';
export default class RecursiveValidatePlugin {
    applied: boolean;
    apply(validator: Validator): void;
}
