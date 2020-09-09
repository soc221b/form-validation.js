import { Validator } from '../validator';
declare module '../validator' {
    interface Validator {
        touch(): void;
        doTouch(): void;
    }
    interface Hooks {
        onTouched: any;
        onDoTouched: any;
    }
}
export default class TouchPlugin {
    applied: boolean;
    apply(validator: Validator): void;
}
