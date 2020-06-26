const validationWrapper = (value: any): any => {
  return { [modelKey]: value }
}

export const modelKey = '$model'
export const obSymbol = Symbol('__form_validation_ob__')

export const proxyStructure = ({
  object,
  clone,
  wrapper,
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
  wrapper?: { (value: any): any }
}) => {
  wrapper = wrapper === undefined ? validationWrapper : wrapper

  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      return Reflect.deleteProperty(target, key)
    },
    set(target: any, key: string, value: any, receiver: any) {
      const result = Reflect.set(target, key, value, receiver)

      clone[key] = wrapper!(value)

      const representingType = Object.prototype.toString.call(receiver[key])
      if (
        (representingType === '[object Object]' || representingType === '[object Array]') &&
        clone[key][obSymbol] === undefined
      ) {
        if (representingType === '[object Array]') {
          if (clone[key].length === undefined) {
            clone[key].length = wrapper!(clone[key][modelKey].length)
          }
        }

        for (const index in clone[key][modelKey]) {
          if (clone[key][index] === undefined) {
            clone[key][index] = wrapper!(clone[key][modelKey][index])
          }
        }

        Object.defineProperty(clone[key], obSymbol, {
          enumerable: false,
          writable: false,
          value: obSymbol,
        })

        Reflect.set(target, key, proxyStructure({ object: receiver[key], clone: clone[key] }), receiver)
      }

      return result
    },
  })
}
