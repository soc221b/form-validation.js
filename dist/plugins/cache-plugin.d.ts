import { Validator } from '../validator';
export default class CachePlugin {
    applied: boolean;
    apply(this: CachePlugin, validator: Validator): void;
}
