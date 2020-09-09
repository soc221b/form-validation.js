import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        invalid: boolean;
    }
}
export default class InvalidPlugin {
    apply(validator: Validator): void;
}
