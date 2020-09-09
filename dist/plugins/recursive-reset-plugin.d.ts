import { Validator } from '../validator';
export default class RecursiveResetPlugin {
    applied: boolean;
    apply(validator: Validator): void;
}
