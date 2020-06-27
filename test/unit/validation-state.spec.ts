import { getNested, wrapState, IStatableValidator } from '../../src/validation-state'
import { IBaseValidator, publicKey, privateKey, pathKey, listenerKey } from '../../src/proxy'

let validationState: IStatableValidator

function reset() {
  validationState = ({
    [publicKey]: {},
    [privateKey]: {
      [pathKey]: [],
      [listenerKey]: [],
    },
  } as IBaseValidator) as IStatableValidator
  wrapState(validationState)
}

test('getNested', () => {
  reset()
  expect(getNested(validationState)).toStrictEqual([])

  reset()
  validationState.nested = {}
  expect(getNested(validationState)).toStrictEqual([validationState.nested])
})

test('pending', () => {
  reset()
  validationState[privateKey].setPending(true)
  expect(validationState[publicKey].pending).toBe(true)

  reset()
  validationState[privateKey].setPending(true)
  validationState[privateKey].setPending(true)
  expect(validationState[publicKey].pending).toBe(true)
  validationState[privateKey].setPending(false)
  expect(validationState[publicKey].pending).toBe(true)
  validationState[privateKey].setPending(false)
  expect(validationState[publicKey].pending).toBe(false)

  reset()
  validationState[privateKey].setPending(true)
  validationState[privateKey].setPending(true)
  expect(validationState[publicKey].pending).toBe(true)
  validationState[privateKey].resetPending()
  expect(validationState[publicKey].pending).toBe(false)
})

test('invalid', () => {
  reset()
  validationState[privateKey].setInvalid(true)
  expect(validationState[publicKey].invalid).toBe(true)

  reset()
  validationState[privateKey].setInvalid(true)
  validationState[privateKey].setPending(true)
  expect(validationState[publicKey].invalid).toBe(false)
})

test('dirty', () => {
  reset()
  validationState[privateKey].setDirty(true)
  expect(validationState[publicKey].dirty).toBe(true)
})

test('anyDirty', () => {
  reset()
  validationState[privateKey].setDirty(true)
  expect(validationState[publicKey].anyDirty).toBe(true)
})

test('error', () => {
  reset()
  validationState[privateKey].setInvalid(true)
  expect(validationState[publicKey].error).toBe(false)

  reset()
  validationState[privateKey].setDirty(true)
  validationState[privateKey].setInvalid(true)
  expect(validationState[publicKey].error).toBe(true)

  reset()
  validationState[privateKey].setDirty(true)
  validationState[privateKey].setInvalid(true)
  validationState[privateKey].setPending(true)
  expect(validationState[publicKey].error).toBe(false)
})

test('anyError', () => {
  reset()
  validationState[privateKey].setInvalid(true)
  expect(validationState[publicKey].anyError).toBe(false)

  reset()
  validationState[privateKey].setDirty(true)
  validationState[privateKey].setInvalid(true)
  expect(validationState[publicKey].anyError).toBe(true)

  reset()
  validationState[privateKey].setDirty(true)
  validationState[privateKey].setInvalid(true)
  validationState[privateKey].setPending(true)
  expect(validationState[publicKey].anyError).toBe(false)
})
