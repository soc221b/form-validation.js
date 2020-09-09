import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        anyPending: boolean;
    }
}
export default class AnyPendingPlugin {
    apply(validator: Validator): void;
}
