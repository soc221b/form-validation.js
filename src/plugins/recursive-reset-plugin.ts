import { log, time, timeEnd } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallChildren } from './util'

const createReset = (originalReset: Function) =>
  function $reset(this: Validator) {
    log('reset', this)
    time('reset')
    recursiveCallChildren({
      validator: this,
      callback: childWrapper => {
        originalReset.call(childWrapper[VALIDATOR_KEY])
        return false
      },
      shouldCallSelf: true,
    })
    timeEnd('reset')
  }

export default class RecursiveResetPlugin {
  applied: boolean = false

  apply(validator: Validator) {
    if (this.applied) return
    this.applied = true
    validator.constructor.prototype.$reset = createReset(validator.constructor.prototype.$reset)
  }
}
