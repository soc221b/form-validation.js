import { hasOwnKey, getOwnKeys, isPlainObject, isArray } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallParent } from './util'

declare module '../validator' {
  interface States {
    anyPending: boolean
  }
}

const init = (validator: Validator) => {
  recursiveCallParent({
    validator: validator,
    callback: parentWrapper => {
      const parentValidator = parentWrapper[VALIDATOR_KEY]
      const parentForm = validator.getForm(parentValidator.$path)
      parentValidator.$states.anyPending =
        parentValidator.$states.pending === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.pending === true || parentValidator.$states.anyPending === true,
          )

      return false
    },
    shouldCallSelf: true,
  })
}

const update = (validator: Validator) => {
  recursiveCallParent({
    validator: validator,
    callback: parentWrapper => {
      const parentValidator = parentWrapper[VALIDATOR_KEY]
      const parentForm = validator.getForm(parentValidator.$path)
      parentValidator.$states.anyPending =
        parentValidator.$states.pending === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.pending === true || parentValidator.$states.anyPending === true,
          )

      return false
    },
    shouldCallSelf: true,
  })
}

export default class AnyPendingPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap('any-pending-plugin', init)

    validator.$hooks.onDoBeforeValidate.tap('any-pending-plugin', update)

    validator.$hooks.onDoValidated.tap('any-pending-plugin', update)

    validator.$hooks.onDoReseted.tap('any-pending-plugin', update)
  }
}
