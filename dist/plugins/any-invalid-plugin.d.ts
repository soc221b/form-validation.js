import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        anyInvalid: boolean;
    }
}
export default class AnyInvalidPlugin {
    apply(validator: Validator): void;
}
