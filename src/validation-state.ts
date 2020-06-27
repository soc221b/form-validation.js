import { privateKey, pathKey, listenerKey, IPath, IBaseValidator, publicKey } from './proxy'

export interface IStatableValidator extends IBaseValidator {
  [privateKey]: {
    [pathKey]: IPath
    [listenerKey]: ((...args: any) => any)[]

    invalid: boolean
    pending: number
    dirty: boolean

    setInvalid: (value: boolean) => void
    setDirty: (value: boolean) => void
    setPending: (value: boolean) => void
    resetPending: () => void

    [key: string]: any
  }
  [publicKey]: {
    pending: boolean
    invalid: boolean
    dirty: boolean
    anyDirty: boolean
    error: boolean
    anyError: boolean

    [key: string]: any
  }

  [key: string]: any
}

export function wrapState(validator: IBaseValidator) {
  const theValidator = validator as IStatableValidator

  theValidator[privateKey].invalid = false
  theValidator[privateKey].pending = 0
  theValidator[privateKey].dirty = false
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
}

const setPrivateInvalid = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].invalid = value

  validator[publicKey].invalid = setInvalid(validator)
  validator[publicKey].error = setError(validator)
  validator[publicKey].anyError = setAnyError(validator)
}

const setPrivateDirty = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].dirty = value

  validator[publicKey].dirty = setDirty(validator)
  validator[publicKey].anyDirty = setAnyDirty(validator)
  validator[publicKey].error = setError(validator)
  validator[publicKey].anyError = setAnyError(validator)
}

const setPrivatePending = (validator: IStatableValidator) => (value: boolean) => {
  validator[privateKey].pending += value === true ? 1 : -1

  validator[publicKey].pending = setPending(validator)
  validator[publicKey].invalid = setInvalid(validator)
  validator[publicKey].error = setError(validator)
  validator[publicKey].anyError = setAnyError(validator)
}

const resetPrivatePending = (validator: IStatableValidator) => () => {
  validator[privateKey].pending = 0

  validator[publicKey].pending = setPending(validator)
  validator[publicKey].invalid = setInvalid(validator)
  validator[publicKey].error = setError(validator)
  validator[publicKey].anyError = setAnyError(validator)
}

const setPending = (validator: IStatableValidator): boolean => {
  return (
    validator[privateKey].pending !== 0 ||
    getNested(validator).some(nestedValidator => nestedValidator[publicKey].pending)
  )
}

const setInvalid = (validator: IStatableValidator): boolean => {
  return (
    (validator[privateKey].invalid && validator[privateKey].pending === 0) ||
    getNested(validator).some(nestedValidator => nestedValidator[publicKey].invalid)
  )
}

const setDirty = (validator: IStatableValidator): boolean => {
  return (
    validator[privateKey].dirty ||
    (getNested(validator).length !== 0 &&
      getNested(validator).every(nestedValidator => nestedValidator[publicKey].dirty))
  )
}

const setAnyDirty = (validator: IStatableValidator): boolean => {
  return (
    validator[privateKey].dirty || getNested(validator).some(nestedValidator => nestedValidator[publicKey].anyDirty)
  )
}

const setError = (validator: IStatableValidator): boolean => {
  return validator[privateKey].dirty && validator[privateKey].invalid && validator[privateKey].pending === 0
}

const setAnyError = (validator: IStatableValidator): boolean => {
  return (
    (validator[privateKey].dirty && validator[privateKey].invalid && validator[privateKey].pending === 0) ||
    getNested(validator).some(nestedValidator => nestedValidator[publicKey].anyError)
  )
}

export const getNested = (validator: IStatableValidator): IStatableValidator[] => {
  return Object.keys(validator)
    .filter(key => key !== privateKey && key !== publicKey)
    .map(key => (validator as any)[key])
}
