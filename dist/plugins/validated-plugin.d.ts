import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        validated: boolean;
    }
}
export default class ValidatedPlugin {
    apply(validator: Validator): void;
}
