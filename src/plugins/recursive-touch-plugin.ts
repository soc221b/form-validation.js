import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createTouch = (originalTouch: Function) =>
  function touch(this: Validator) {
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        originalTouch.call(childWrapper[VALIDATOR_KEY])
        return false
      },
      shouldCallSelf: true,
    })
  }

export default class RecursiveTouchPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.touch = createTouch(validator.constructor.prototype.touch)
  }
}
