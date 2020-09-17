import { hasOwnKey, getOwnKeys, isPlainObject, isArray, time, timeEnd, log } from '../util'
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
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
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
  log('any-dirty', validator)
  time('any-dirty')
  recursiveCallParent({
    validator: validator,
    callback: parentWrapper => {
      const parentValidator = parentWrapper[VALIDATOR_KEY]
      const parentForm = validator.getForm(parentValidator.$path)
      parentValidator.$states.anyDirty =
        parentValidator.$states.dirty === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.dirty === true || parentValidator.$states.anyDirty === true,
          )

      return false
    },
    shouldCallSelf: true,
  })
  timeEnd('any-dirty')
}

export default class AnyDirtyPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap('any-dirty-plugin', init)

    validator.$hooks.onTouched.tap('any-dirty-plugin', update)

    validator.$hooks.onReseted.tap('any-dirty-plugin', update)
  }
}
