import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        pending: boolean;
    }
}
export default class PendingPlugin {
    apply(validator: Validator): void;
}
