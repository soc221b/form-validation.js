import { Validator } from '../validator';
declare module '../validator' {
    interface ValidationWrapper {
        $iter: any;
    }
}
export default class IterPlugin {
    apply(validator: Validator): void;
}
