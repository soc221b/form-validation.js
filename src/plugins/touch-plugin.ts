import { Validator } from '../validator'
import Tapable from 'tapable'

declare module '../validator' {
  interface Validator {
    touch(): void
  }
  interface Hooks {
    onTouched: any
  }
}

function touch(this: Validator) {
  this.$hooks.onTouched.call(this)
}

export default class TouchPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    validator.$hooks.onTouched = new Tapable.SyncHook(['validator'])

    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.touch = touch
  }
}
