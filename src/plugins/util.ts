import { Validator, ValidationWrapper, VALIDATOR_KEY } from '../validator'
import { isArray, isPlainObject, getOwnKeys, log, time, timeEnd } from '../util'

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
  callback: (childWrapper: Required<ValidationWrapper>) => boolean
  shouldCallSelf?: boolean
}) => {
  log('recursiveCallChildren getWrapper')
  time('recursiveCallChildren getWrapper')
  const wrapper: ValidationWrapper = validator.getWrapper(validator.$path)
  timeEnd('recursiveCallChildren getWrapper')

  let currentValidators: Validator[] = [wrapper[VALIDATOR_KEY] as Validator]
  let childValidators: Validator[] = []

  if (shouldCallSelf) {
    log('recursiveCallChildren self')
    time('recursiveCallChildren self')
    callback(wrapper as Required<ValidationWrapper>)
    timeEnd('recursiveCallChildren self')
  }

  while (currentValidators.length) {
    log('recursiveCallChildren')
    time('recursiveCallChildren')
    const validator: Validator = currentValidators.pop() as Validator
    const form: any = validator.getForm(validator.$path)
    const wrapper: ValidationWrapper = validator.getWrapper(validator.$path)
    if (isPlainObject(form) || isArray(form)) {
      for (const key of getOwnKeys(form)) {
        const childWrapper: ValidationWrapper = wrapper[key]
        if (childWrapper === undefined) continue
        if (childWrapper[VALIDATOR_KEY] === undefined) continue
        if (callback(childWrapper as Required<ValidationWrapper>)) {
          timeEnd('recursiveCallChildren')
          return
        }
        childValidators.push(childWrapper[VALIDATOR_KEY] as Validator)
      }
    }

    if (currentValidators.length === 0) {
      currentValidators = childValidators.reverse()
      childValidators = []
    }
    timeEnd('recursiveCallChildren')
  }
}
