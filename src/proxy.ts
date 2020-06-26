const validationWrapper = (value: any): any => {
  return { [modelKey]: value }
}

export const modelKey = '_model'
export const pathKey = '_path'
export const obSymbol = Symbol('__form_validation_ob__')

export const proxyStructure = ({
  object,
  clone,
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
}) => {
  clone[modelKey] = object
  clone[pathKey] = []
  return _proxyStructure({ object, clone, path: [], wrapper: validationWrapper })
}

const _proxyStructure = ({
  object,
  clone,
  path,
  wrapper,
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
  path: string[]
  wrapper: { (value: any): any }
}) => {
  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      return Reflect.deleteProperty(target, key)
    },
    set(target: any, key: string, value: any, receiver: any) {
      const result = Reflect.set(target, key, value, receiver)

      clone[key] = wrapper(value)
      clone[key][pathKey] = [...path, key]

      const representingType = Object.prototype.toString.call(receiver[key])
      if (
        (representingType === '[object Object]' || representingType === '[object Array]') &&
        clone[key][obSymbol] === undefined
      ) {
        if (representingType === '[object Array]') {
          if (clone[key].length === undefined) {
            clone[key].length = wrapper(clone[key][modelKey].length)
            clone[key].length[pathKey] = clone[key][pathKey].concat('length')
          }
        }

        for (const index in clone[key][modelKey]) {
          if (clone[key][index] === undefined) {
            clone[key][index] = wrapper(clone[key][modelKey][index])
            clone[key][index][pathKey] = clone[key][pathKey].concat(index)
          }
        }

        Object.defineProperty(clone[key], obSymbol, {
          enumerable: false,
          writable: false,
          value: obSymbol,
        })

        Reflect.set(
          target,
          key,
          _proxyStructure({ object: receiver[key], clone: clone[key], path: clone[key][pathKey], wrapper }),
          receiver,
        )
      }

      return result
    },
  })
}
