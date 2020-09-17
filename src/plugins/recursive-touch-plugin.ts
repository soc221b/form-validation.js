import { log, time, timeEnd } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createTouch = (originalTouch: Function) =>
  function touch(this: Validator) {
    log('touch', this)
    time('touch')
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        originalTouch.call(childWrapper[VALIDATOR_KEY])
        return false
      },
      shouldCallSelf: true,
    })
    timeEnd('touch')
  }

export default class RecursiveTouchPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.touch = createTouch(validator.constructor.prototype.touch)
  }
}
