import { hasOwnKey, getOwnKeys, isPlainObject, isArray } from '../util'
import { Validator, VALIDATOR_KEY } from '../validator'
import { recursiveCallParent } from './util'

declare module '../validator' {
  interface States {
    anyInvalid: boolean
  }
}

const init = (validator: Validator) => {
  recursiveCallParent({
    validator: validator,
    callback: parentWrapper => {
      const parentValidator = parentWrapper[VALIDATOR_KEY]
      const parentForm = validator.getForm(parentValidator.$path)
      parentValidator.$states.anyInvalid =
        parentValidator.$states.invalid === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.invalid === true || parentValidator.$states.anyInvalid === true,
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
      parentValidator.$states.anyInvalid =
        parentValidator.$states.invalid === true ||
        getOwnKeys(parentForm)
          .filter((key: string) => isPlainObject(parentWrapper[key]) || isArray(parentWrapper[key]))
          .filter((key: string) => hasOwnKey(parentWrapper[key], VALIDATOR_KEY))
          .map((key: string) => parentWrapper[key][VALIDATOR_KEY])
          .some(
            (parentValidator: Validator) =>
              parentValidator.$states.invalid === true || parentValidator.$states.anyInvalid === true,
          )

      return false
    },
    shouldCallSelf: true,
  })
}

const Tap = {
  name: 'any-invalid-plugin',
  before: ['any-error-plugin'],
}

export default class AnyInvalidPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, init)

    validator.$hooks.onBeforeValidate.tap(Tap, update)

    validator.$hooks.onValidated.tap(Tap, update)

    validator.$hooks.onReseted.tap(Tap, update)
  }
}
