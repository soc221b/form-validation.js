interface IPrivateState {
  _invalid: boolean
  _pending: boolean
  _dirty: boolean
}

export interface IValidationState extends IPrivateState {
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
  }

  const validationState: IValidationState = {
    ...privateState,

    $pending: false,
    $invalid: false,
    $dirty: false,
    $anyDirty: false,
    $error: false,
    $anyError: false,
  }

  defineInvalid(validationState, privateState, parent)
  definePending(validationState, privateState, parent)
  defineDirty(validationState, privateState, parent)

  return validationState
}

ValidationState.prototype.pending = (that: IValidationState): boolean => {
  return that._pending || getNested(that).some(nested => nested.$pending)
}

ValidationState.prototype.invalid = (that: IValidationState): boolean => {
  return (that._invalid && that._pending === false) || getNested(that).some(nested => nested.$invalid)
}

ValidationState.prototype.dirty = (that: IValidationState): boolean => {
  return that._dirty || (getNested(that).length !== 0 && getNested(that).every(nested => nested.$dirty))
}

ValidationState.prototype.anyDirty = (that: IValidationState): boolean => {
  return that._dirty || getNested(that).some(nested => nested.$anyDirty)
}

ValidationState.prototype.error = (that: IValidationState): boolean => {
  return that._dirty && that._invalid && that._pending === false
}

ValidationState.prototype.anyError = (that: IValidationState): boolean => {
  return (that._dirty && that._invalid && that._pending === false) || getNested(that).some(nested => nested.$anyError)
}

const defineInvalid = (validationState: IValidationState, privateState: IPrivateState, parent?: IValidationState) => {
  Object.defineProperty(validationState, '_invalid', {
    set(value) {
      privateState._invalid = value
      validationState.$invalid = ValidationState.prototype.invalid(validationState)
      validationState.$error = ValidationState.prototype.error(validationState)
      validationState.$anyError = ValidationState.prototype.anyError(validationState)
      if (parent) {
        parent._invalid = parent._invalid
      }
    },
    get() {
      return privateState._invalid
    },
  })
}

const definePending = (validationState: IValidationState, privateState: IPrivateState, parent?: IValidationState) => {
  Object.defineProperty(validationState, '_pending', {
    set(value) {
      privateState._pending = value
      validationState.$pending = ValidationState.prototype.pending(validationState)
      validationState.$invalid = ValidationState.prototype.invalid(validationState)
      validationState.$error = ValidationState.prototype.error(validationState)
      validationState.$anyError = ValidationState.prototype.anyError(validationState)
      if (parent) {
        parent._pending = parent._pending
      }
    },
    get() {
      return privateState._pending
    },
  })
}
const defineDirty = (validationState: IValidationState, privateState: IPrivateState, parent?: IValidationState) => {
  Object.defineProperty(validationState, '_dirty', {
    set(value) {
      privateState._dirty = value
      validationState.$dirty = ValidationState.prototype.dirty(validationState)
      validationState.$anyDirty = ValidationState.prototype.anyDirty(validationState)
      validationState.$error = ValidationState.prototype.error(validationState)
      validationState.$anyError = ValidationState.prototype.anyError(validationState)
      if (parent) {
        parent._dirty = parent._dirty
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
