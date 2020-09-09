import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createReset = (originalReset: Function) =>
  function doReset(this: Validator) {
    const promises: any[] = []
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        promises.push(originalReset.call(childWrapper[VALIDATOR_KEY]))
        return false
      },
      shouldCallSelf: true,
    })
    return Promise.all(promises)
  }

export default class RecursiveResetPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.doReset = createReset(validator.constructor.prototype.doReset)
  }
}
