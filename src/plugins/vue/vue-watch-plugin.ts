import { Param } from '../../../type'
import { Validator } from '../../validator'

declare module '../../validator' {
  interface Validator {
    $unwatches: { [key: string]: any }
  }

  interface Schema {
    $watch?: ({ value, key, parent, path, root, params }: Param) => string[][]
  }
}

const watch = (vm: any) =>
  function watch(this: Validator) {
    const schema = this.getSchema(this.$path)
    if (schema.$watch === undefined) return

    const paths = schema.$watch({
      value: this.getForm(this.$path),
      key: this.$path.slice(-1)[0],
      parent: this.getForm(this.$path.slice(0, -1)),
      path: this.$path,
      root: this.$rootForm,
    })
    for (const path of paths) {
      _watch(vm, this, path, 0)
    }
  }

const _watch = async (vm: any, validator: Validator, path: string[], startIndex: number) => {
  if (startIndex === path.length) {
    if (path.join('.') === validator.$path.join('.')) return

    if (validator.$unwatches === undefined) validator.$unwatches = {}
    if (validator.$unwatches[path.join('.')]) return
    vm.$nextTick(() => {
      if (validator.$unwatches[path.join('.')]) return
      validator.$unwatches[path.join('.')] = vm.$watch(path.join('.'), () => {
        try {
          validator.validate()
        } catch (error) {
          console.log(error)
        }
      })
    })
    return
  }

  if (path[startIndex] === '$iter') {
    const form = getByPathWithFallback(validator.$rootForm, path.slice(0, startIndex), null)
    if (form === null) return

    for (const key of Object.keys(form)) {
      const path2 = path.slice()
      path2[startIndex] = key
      _watch(vm, validator, path2, startIndex + 1)
    }
  } else {
    _watch(vm, validator, path, startIndex + 1)
  }
}

export function getByPathWithFallback(object: any, path: string[], fallback: any) {
  if (path.length === 0) return object

  let deepestParent = object
  for (const p of path.slice(0, -1)) {
    deepestParent = deepestParent[p]
    if (typeof deepestParent !== 'object' || deepestParent === null) return fallback
  }

  return deepestParent[path[path.length - 1]]
}

export const Tap = {
  name: 'vue-watch-plugin',
}

export default class VueWatchPlugin {
  vm: any
  applied = false

  constructor(vm: any) {
    this.vm = vm
  }

  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, watch(this.vm).bind(validator))
  }
}
