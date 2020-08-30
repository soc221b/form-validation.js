import { privateKey, pathKey, IBaseValidator, publicKey } from './proxy'
import { getByPath } from './util'

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

export function wrapState(rootValidator: IBaseValidator, path: string[]) {
  const theValidator = getByPath(rootValidator, path) as IStatableValidator

  if (theValidator[privateKey].invalid !== undefined) return

  theValidator[privateKey].invalid = false
  theValidator[privateKey].validated = false
  theValidator[privateKey].pending = 0
  theValidator[privateKey].dirty = false
  theValidator[privateKey].setValidated = setPrivateValidated(rootValidator as IStatableValidator, path)
  theValidator[privateKey].setInvalid = setPrivateInvalid(rootValidator as IStatableValidator, path)
  theValidator[privateKey].setDirty = setPrivateDirty(rootValidator as IStatableValidator, path)
  theValidator[privateKey].setPending = setPrivatePending(rootValidator as IStatableValidator, path)
  theValidator[privateKey].resetPending = resetPrivatePending(rootValidator as IStatableValidator, path)
  theValidator[publicKey].errors = {}

  theValidator[privateKey].setValidated(false)
  theValidator[privateKey].setInvalid(false)
  theValidator[privateKey].setDirty(false)
  theValidator[privateKey].resetPending()
}

const setPrivateValidated = (rootValidator: IStatableValidator, path: string[]) => (value: boolean) => {
  const validator = getByPath(rootValidator, path)
  validator[privateKey].validated = value
}

const setPrivateInvalid = (rootValidator: IStatableValidator, path: string[]) => (value: boolean) => {
  const validator = getByPath(rootValidator, path)
  validator[privateKey].invalid = value
  setPublicInvalid(rootValidator, path)
  setPublicError(rootValidator, path)
  setPublicAnyError(rootValidator, path)
}

const setPrivateDirty = (rootValidator: IStatableValidator, path: string[]) => (value: boolean) => {
  const validator = getByPath(rootValidator, path)
  validator[privateKey].dirty = value
  setPublicDirty(rootValidator, path)
  setPublicAnyDirty(rootValidator, path)
  setPublicError(rootValidator, path)
  setPublicAnyError(rootValidator, path)
}

const setPrivatePending = (rootValidator: IStatableValidator, path: string[]) => (value: boolean) => {
  const validator = getByPath(rootValidator, path)
  validator[privateKey].pending += value === true ? 1 : -1
  setPublicPending(rootValidator, path)
  setPublicInvalid(rootValidator, path)
  setPublicError(rootValidator, path)
  setPublicAnyError(rootValidator, path)
}

const resetPrivatePending = (rootValidator: IStatableValidator, path: string[]) => () => {
  const validator = getByPath(rootValidator, path)
  validator[privateKey].pending = 0
  setPublicPending(rootValidator, path)
  setPublicInvalid(rootValidator, path)
  setPublicError(rootValidator, path)
  setPublicAnyError(rootValidator, path)
}

const setPublicPending = (rootValidator: IStatableValidator, path: string[]) => {
  let index = path.length + 1
  while (--index >= 0) {
    const validator = getByPath(rootValidator, path.slice(0, index))
    validator[publicKey].pending =
      validator[privateKey].pending !== 0 ||
      getNested(validator).some(nestedValidator => nestedValidator[publicKey].pending)
  }
}

const setPublicInvalid = (rootValidator: IStatableValidator, path: string[]) => {
  let index = path.length + 1
  while (--index >= 0) {
    const validator = getByPath(rootValidator, path.slice(0, index))
    validator[publicKey].invalid =
      (validator[privateKey].invalid && validator[privateKey].pending === 0) ||
      getNested(validator).some(nestedValidator => nestedValidator[publicKey].invalid)
  }
}

const setPublicDirty = (rootValidator: IStatableValidator, path: string[]) => {
  const validator = getByPath(rootValidator, path)
  validator[publicKey].dirty = validator[privateKey].dirty
}

const setPublicAnyDirty = (rootValidator: IStatableValidator, path: string[]) => {
  let index = path.length + 1
  while (--index >= 0) {
    const validator = getByPath(rootValidator, path.slice(0, index))
    validator[publicKey].anyDirty =
      validator[privateKey].dirty || getNested(validator).some(nestedValidator => nestedValidator[publicKey].anyDirty)
  }
}

const setPublicError = (rootValidator: IStatableValidator, path: string[]) => {
  const validator = getByPath(rootValidator, path)
  validator[publicKey].error =
    validator[privateKey].dirty && validator[privateKey].invalid && validator[privateKey].pending === 0
}

const setPublicAnyError = (rootValidator: IStatableValidator, path: string[]) => {
  let index = path.length + 1
  while (--index >= 0) {
    const validator = getByPath(rootValidator, path.slice(0, index))
    validator[publicKey].anyError =
      (validator[privateKey].dirty && validator[privateKey].invalid && validator[privateKey].pending === 0) ||
      getNested(validator).some(nestedValidator => nestedValidator[publicKey].anyError)
  }
}

export const getNested = (validator: IStatableValidator): IStatableValidator[] => {
  return Object.keys(validator)
    .filter(key => key !== privateKey && key !== publicKey)
    .map(key => (validator as any)[key])
}
