import { IValidationState, getNested, ValidationState } from '../../src/validation-state'

let validationState: IValidationState

function reset() {
  validationState = ValidationState()
  validationState.nested1 = ValidationState(validationState)
  validationState.nested2 = ValidationState(validationState)
  validationState.nested1.nested11 = ValidationState(validationState.nested1)
  validationState.nested1.nested12 = ValidationState(validationState.nested1)
}

test('getNested', () => {
  reset()
  expect(getNested(validationState)).toStrictEqual([validationState.nested1, validationState.nested2])
})

test('pending', () => {
  reset()
  validationState._pending = true
  expect(validationState.$pending).toBe(true)

  reset()
  validationState.nested1._pending = true
  expect(validationState.$pending).toBe(true)

  reset()
  validationState.nested1.nested11._pending = true
  expect(validationState.$pending).toBe(true)
})

test('invalid', () => {
  reset()
  validationState._invalid = true
  expect(validationState.$invalid).toBe(true)

  reset()
  validationState._invalid = true
  validationState._pending = true
  expect(validationState.$invalid).toBe(false)

  reset()
  validationState.nested1._invalid = true
  expect(validationState.$invalid).toBe(true)

  reset()
  validationState.nested1._invalid = true
  validationState.nested1._pending = true
  expect(validationState.$invalid).toBe(false)

  reset()
  validationState.nested1.nested11._invalid = true
  expect(validationState.$invalid).toBe(true)

  reset()
  validationState.nested1.nested11._invalid = true
  validationState.nested1.nested11._pending = true
  expect(validationState.$invalid).toBe(false)
})

test('dirty', () => {
  reset()
  validationState._dirty = true
  expect(validationState.$dirty).toBe(true)

  reset()
  validationState.nested1._dirty = true
  expect(validationState.$dirty).toBe(false)

  reset()
  validationState.nested1._dirty = true
  validationState.nested2._dirty = true
  expect(validationState.$dirty).toBe(true)

  reset()
  validationState.nested1.nested11._dirty = true
  expect(validationState.$dirty).toBe(false)

  reset()
  validationState.nested1.nested11._dirty = true
  validationState.nested1.nested12._dirty = true
  expect(validationState.$dirty).toBe(false)

  reset()
  validationState.nested1.nested11._dirty = true
  validationState.nested1.nested12._dirty = true
  validationState.nested2._dirty = true
  expect(validationState.$dirty).toBe(true)
})

test('anyDirty', () => {
  reset()
  validationState._dirty = true
  expect(validationState.$anyDirty).toBe(true)

  reset()
  validationState.nested1._dirty = true
  expect(validationState.$anyDirty).toBe(true)

  reset()
  validationState.nested1.nested11._dirty = true
  expect(validationState.$anyDirty).toBe(true)
})

test('error', () => {
  reset()
  validationState._invalid = true
  expect(validationState.$error).toBe(false)

  reset()
  validationState._dirty = true
  validationState._invalid = true
  expect(validationState.$error).toBe(true)

  reset()
  validationState._dirty = true
  validationState._invalid = true
  validationState._pending = true
  expect(validationState.$error).toBe(false)

  reset()
  validationState.nested1._dirty = true
  validationState.nested1._invalid = true
  expect(validationState.$error).toBe(false)
})

test('anyError', () => {
  reset()
  validationState._invalid = true
  expect(validationState.$anyError).toBe(false)

  reset()
  validationState._dirty = true
  validationState._invalid = true
  expect(validationState.$anyError).toBe(true)

  reset()
  validationState._dirty = true
  validationState._invalid = true
  validationState._pending = true
  expect(validationState.$anyError).toBe(false)

  reset()
  validationState.nested1._dirty = true
  validationState.nested1._invalid = true
  expect(validationState.$anyError).toBe(true)

  reset()
  validationState.nested1.nested11._dirty = true
  validationState.nested1.nested11._invalid = true
  expect(validationState.$anyError).toBe(true)
})
