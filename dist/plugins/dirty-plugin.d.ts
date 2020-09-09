import { Validator } from '../validator';
declare module '../validator' {
    interface States {
        dirty: boolean;
    }
}
export default class DirtyPlugin {
    apply(validator: Validator): void;
}
