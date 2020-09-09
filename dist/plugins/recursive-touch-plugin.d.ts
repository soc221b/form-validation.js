import { Validator } from '../validator';
export default class RecursiveTouchPlugin {
    applied: boolean;
    apply(validator: Validator): void;
}
