import { privateKey, pathKey, IBaseValidator, publicKey } from './proxy'

export interface IStatableValidator extends IBaseValidator {
  [privateKey]: {
    [pathKey]: string[]
    [key: string]: any

    invalid: boolean
    validated: boolean
    pending: number
    dirty: boolean
    setValidated: (value: boolean) => void
    setInvalid: (value: boolean) => void
    setDirty: (value: boolean) => void
    setPending: (value: boolean) => void
    resetPending: () => void
  }
  [publicKey]: {
    [key: string]: any

    pending: boolean
    invalid: boolean
    dirty: boolean
    anyDirty: boolean
    error: boolean
    anyError: boolean
    errors: {
      [key: string]: any
    }
  }

  [key: string]: any
}

export function wrapState(validator: IBaseValidator) {
  const theValidator = validator as IStatableValidator

  if (theValidator[privateKey].invalid !== undefined) return

  theValidator[privateKey].invalid = false
  theValidator[privateKey].validated = false
  theValidator[privateKey].pending = 0
  theValidator[privateKey].dirty = false
  theValidator[privateKey].setValidated = setPrivateValidated(theValidator)
  theValidator[privateKey].setInvalid = setPrivateInvalid(theValidator)
  theValidator[privateKey].setDirty = setPrivateDirty(theValidator)
  theValidator[privateKey].setPending = setPrivatePending(theValidator)
  theValidator[privateKey].resetPending = resetPrivatePending(theValidator)

  theValidator[publicKey].pending = false
  theValidator[publicKey].invalid = false
  theValidator[publicKey].dirty = false
  theValidator[publicKey].anyDirty = false
  theValidator[publicKey].error = false
  theValidator[publicKey].anyError = false
  theValidator[publicKey].errors = {}
}

const setPrivateValidated = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].validated = value
}

const setPrivateInvalid = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].invalid = value

  updateInvalid(validator)
  updateError(validator)
  updateAnyError(validator)
}

const setPrivateDirty = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].dirty = value

  updateDirty(validator)
  updateAnyDirty(validator)
  updateError(validator)
  updateAnyError(validator)
}

const setPrivatePending = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].pending += value === true ? 1 : -1

  updatePending(validator)
  updateInvalid(validator)
  updateError(validator)
  updateAnyError(validator)
}

const resetPrivatePending = (validator: IStatableValidator) => () => {
  validator[privateKey].pending = 0

  updatePending(validator)
  updateInvalid(validator)
  updateError(validator)
  updateAnyError(validator)
}

const updatePending = (validator: IStatableValidator) => {
  validator[publicKey].pending =
    validator[privateKey].pending !== 0 ||
    getNested(validator).some(nestedValidator => nestedValidator[publicKey].pending)
}

const updateInvalid = (validator: IStatableValidator) => {
  validator[publicKey].invalid =
    (validator[privateKey].invalid && validator[privateKey].pending === 0) ||
    getNested(validator).some(nestedValidator => nestedValidator[publicKey].invalid)
}

const updateDirty = (validator: IStatableValidator) => {
  validator[publicKey].dirty =
    validator[privateKey].dirty ||
    (getNested(validator).length !== 0 &&
      getNested(validator).every(nestedValidator => nestedValidator[publicKey].dirty))
}

const updateAnyDirty = (validator: IStatableValidator) => {
  validator[publicKey].anyDirty =
    validator[privateKey].dirty || getNested(validator).some(nestedValidator => nestedValidator[publicKey].anyDirty)
}

const updateError = (validator: IStatableValidator) => {
  validator[publicKey].error =
    validator[privateKey].dirty && validator[privateKey].invalid && validator[privateKey].pending === 0
}

const updateAnyError = (validator: IStatableValidator) => {
  validator[publicKey].anyError =
    (validator[privateKey].dirty && validator[privateKey].invalid && validator[privateKey].pending === 0) ||
    getNested(validator).some(nestedValidator => nestedValidator[publicKey].anyError)
}

export const getNested = (validator: IStatableValidator): IStatableValidator[] => {
  return Object.keys(validator)
    .filter(key => key !== privateKey && key !== publicKey)
    .map(key => (validator as any)[key])
}
