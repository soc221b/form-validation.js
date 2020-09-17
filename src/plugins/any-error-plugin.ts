import { hasOwnKey, getOwnKeys, isPlainObject, isArray } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallParent } from './util'

declare module '../validator' {
  interface States {
    anyError: boolean
  }
}

const init = (validator: Validator) => {
  recursiveCallParent({
    validator: validator,
    callback: parentWrapper => {
      const parentValidator = parentWrapper[VALIDATOR_KEY]
      const parentForm = validator.getForm(parentValidator.$path)
      parentValidator.$states.anyError =
        parentValidator.$states.error === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.error === true || parentValidator.$states.anyError === true,
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
      parentValidator.$states.anyError =
        parentValidator.$states.error === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.error === true || parentValidator.$states.anyError === true,
          )

      return false
    },
    shouldCallSelf: true,
  })
}

export default class AnyErrorPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap('any-error-plugin', init)

    validator.$hooks.onTouched.tap('any-error-plugin', update)

    validator.$hooks.onValidated.tap('any-error-plugin', update)

    validator.$hooks.onReseted.tap('any-error-plugin', update)
  }
}
