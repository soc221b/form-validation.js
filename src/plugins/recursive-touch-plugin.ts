import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createTouch = (originalTouch: Function) =>
  function doTouch(this: Validator) {
    const promises: any[] = []
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        promises.push(originalTouch.call(childWrapper[VALIDATOR_KEY]))
        return false
      },
      shouldCallSelf: true,
    })
    return Promise.all(promises)
  }

export default class RecursiveTouchPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.doTouch = createTouch(validator.constructor.prototype.doTouch)
  }
}
