import { hasOwnKey, getOwnKeys } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallParent } from './util'

declare module '../validator' {
  interface States {
    anyDirty: boolean
  }
}

const init = (validator: Validator) => {
  recursiveCallParent({
    validator: validator,
    callback: parentWrapper => {
      const parentValidator = parentWrapper[VALIDATOR_KEY]
      const parentForm = validator.getForm(parentValidator.$path)
      parentValidator.$states.anyDirty =
        parentValidator.$states.dirty === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => hasOwnKey(parentValidator, key))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.dirty === true || parentValidator.$states.anyDirty === true,
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
      parentValidator.$states.anyDirty =
        parentValidator.$states.dirty === true ||
        getOwnKeys(parentForm)
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.dirty === true || parentValidator.$states.anyDirty === true,
          )

      return false
    },
    shouldCallSelf: true,
  })
}

export default class AnyDirtyPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap('any-dirty-plugin', init)

    validator.$hooks.onDoTouched.tap('any-dirty-plugin', update)

    validator.$hooks.onDoReseted.tap('any-dirty-plugin', update)
  }
}
