import { Validator, ValidationWrapper, VALIDATOR_KEY } from '../validator'
import { isArray, isPlainObject, getOwnKeys } from '../util'

export const recursiveCallParent = ({
  validator,
  callback,
  shouldCallSelf = false,
}: {
  validator: Validator
  callback: (parentWrapper: Required<ValidationWrapper>) => boolean
  shouldCallSelf?: boolean
}) => {
  const rootWrapper = validator.$rootWrapper
  const path = validator.$path.slice().reverse()
  let currentWrapper = rootWrapper
  const parentWrappers = [currentWrapper]
  while (path.length) {
    const key: string = path.pop() as string
    currentWrapper = currentWrapper[key]
    parentWrappers.push(currentWrapper)
  }

  if (shouldCallSelf === false) {
    parentWrappers.pop()
  }

  for (const parentWrapper of parentWrappers.reverse()) {
    if (callback(parentWrapper as Required<ValidationWrapper>)) return
  }
}

// BFS
export const recursiveCallChildren = ({
  validator,
  callback,
  shouldCallSelf = false,
}: {
  validator: Validator
  callback: (parentWrapper: Required<ValidationWrapper>) => boolean
  shouldCallSelf?: boolean
}) => {
  const wrapper: ValidationWrapper = validator.getWrapper(validator.$path)

  let currentValidators: Validator[] = [wrapper[VALIDATOR_KEY] as Validator]
  let childValidators: Validator[] = []

  if (shouldCallSelf) {
    callback(wrapper as Required<ValidationWrapper>)
  }

  while (currentValidators.length) {
    const validator: Validator = currentValidators.pop() as Validator
    const form: any = validator.getForm(validator.$path)
    const wrapper: ValidationWrapper = validator.getWrapper(validator.$path)
    if (isPlainObject(form) || isArray(form)) {
      for (const key of getOwnKeys(form)) {
        const childWrapper: ValidationWrapper = wrapper[key]
        if (childWrapper[VALIDATOR_KEY] === undefined) continue
        if (callback(childWrapper as Required<ValidationWrapper>)) return
        childValidators.push(childWrapper[VALIDATOR_KEY] as Validator)
      }
    }

    if (currentValidators.length === 0) {
      currentValidators = childValidators.reverse()
      childValidators = []
    }
  }
}
