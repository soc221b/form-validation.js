import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        error: boolean;
    }
}
export default class ErrorPlugin {
    apply(validator: Validator): void;
}
