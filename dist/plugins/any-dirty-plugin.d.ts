import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        anyDirty: boolean;
    }
}
export default class AnyDirtyPlugin {
    apply(validator: Validator): void;
}
