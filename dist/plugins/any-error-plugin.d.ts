import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        anyError: boolean;
    }
}
export default class AnyErrorPlugin {
    apply(validator: Validator): void;
}
