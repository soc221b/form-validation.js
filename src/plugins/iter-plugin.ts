import { isArray } from '../util'
import { Validator } from '../validator'

declare module '../validator' {
  interface ValidationWrapper {
    $iter: any
  }
}

const setIter = (validator: Validator) => {
  const path = validator.$path
  if (path.length === 0) return

  const parentPath = path.slice()
  const key = parentPath.pop()!
  const parentForm = validator.getForm(parentPath)
  const parentWrapper = validator.getWrapper(parentPath)

  const isParentFormArray = isArray(parentForm)
  if (parentWrapper.$iter === undefined || isArray(parentWrapper.$iter) !== isParentFormArray) {
    parentWrapper.$iter = isParentFormArray ? [] : {}
  }

  parentWrapper.$iter[key] = parentWrapper[key]
}

const Tap = {
  name: 'iter-plugin',
}

export default class IterPlugin {
  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, setIter)
  }
}
