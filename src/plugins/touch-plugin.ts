import { Validator } from '../validator'
import Tapable from 'tapable'

declare module '../validator' {
  interface Validator {
    touch(): void
    doTouch(): void
  }
  interface Hooks {
    onTouched: any
    onDoTouched: any
  }
}

function touch(this: Validator) {
  this.doTouch()
  this.$hooks.onTouched.call(this)
}

function doTouch(this: Validator) {
  this.$hooks.onDoTouched.call(this)
}

export default class TouchPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    validator.$hooks.onTouched = new Tapable.SyncHook(['validator'])
    validator.$hooks.onDoTouched = new Tapable.SyncHook(['validator'])

    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.touch = touch
    validator.constructor.prototype.doTouch = doTouch
  }
}
