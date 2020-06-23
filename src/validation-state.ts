interface IPrivateState {
  _invalid: boolean
  _pending: boolean
  _dirty: boolean
  _parent?: IValidationState
}

export interface IValidationState {
  _invalid: boolean
  _pending: boolean
  _dirty: boolean

  $pending: boolean
  $invalid: boolean
  $dirty: boolean
  $anyDirty: boolean
  $error: boolean
  $anyError: boolean

  [key: string]: any
}

export function ValidationState(parent?: IValidationState): IValidationState {
  const privateState: IPrivateState = {
    _invalid: false,
    _pending: false,
    _dirty: false,
    _parent: parent,
  }

  const validationState: IValidationState = {
    _invalid: false,
    _pending: false,
    _dirty: false,

    $pending: false,
    $invalid: false,
    $dirty: false,
    $anyDirty: false,
    $error: false,
    $anyError: false,
  }

  defineInvalid(validationState, privateState)
  definePending(validationState, privateState)
  defineDirty(validationState, privateState)

  return validationState
}

const pending = (that: IValidationState): boolean => {
  return that._pending || getNested(that).some(nested => nested.$pending)
}

const invalid = (that: IValidationState): boolean => {
  return (that._invalid && that._pending === false) || getNested(that).some(nested => nested.$invalid)
}

const dirty = (that: IValidationState): boolean => {
  return that._dirty || (getNested(that).length !== 0 && getNested(that).every(nested => nested.$dirty))
}

const anyDirty = (that: IValidationState): boolean => {
  return that._dirty || getNested(that).some(nested => nested.$anyDirty)
}

const error = (that: IValidationState): boolean => {
  return that._dirty && that._invalid && that._pending === false
}

const anyError = (that: IValidationState): boolean => {
  return (that._dirty && that._invalid && that._pending === false) || getNested(that).some(nested => nested.$anyError)
}

const defineInvalid = (validationState: IValidationState, privateState: IPrivateState) => {
  Object.defineProperty(validationState, '_invalid', {
    set(value) {
      privateState._invalid = value
      validationState.$invalid = invalid(validationState)
      validationState.$error = error(validationState)
      validationState.$anyError = anyError(validationState)
      if (privateState._parent) {
        privateState._parent._invalid = privateState._parent._invalid
      }
    },
    get() {
      return privateState._invalid
    },
  })
}

const definePending = (validationState: IValidationState, privateState: IPrivateState) => {
  Object.defineProperty(validationState, '_pending', {
    set(value) {
      privateState._pending = value
      validationState.$pending = pending(validationState)
      validationState.$invalid = invalid(validationState)
      validationState.$error = error(validationState)
      validationState.$anyError = anyError(validationState)
      if (privateState._parent) {
        privateState._parent._pending = privateState._parent._pending
      }
    },
    get() {
      return privateState._pending
    },
  })
}
const defineDirty = (validationState: IValidationState, privateState: IPrivateState) => {
  Object.defineProperty(validationState, '_dirty', {
    set(value) {
      privateState._dirty = value
      validationState.$dirty = dirty(validationState)
      validationState.$anyDirty = anyDirty(validationState)
      validationState.$error = error(validationState)
      validationState.$anyError = anyError(validationState)
      if (privateState._parent) {
        privateState._parent._dirty = privateState._parent._dirty
      }
    },
    get() {
      return privateState._dirty
    },
  })
}

const builtInKeySet = new Set(Object.keys(ValidationState()))

export const getNested = (that: IValidationState): IValidationState[] => {
  return Object.keys(that)
    .filter(key => builtInKeySet.has(key) === false)
    .map(key => (that as any)[key])
}
