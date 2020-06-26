const validationWrapper = (value: any, path: string[]): any => {
  return {
    [modelKey]: value,
    [privateKey]: {
      [pathKey]: path,
      [listenerKey]: [],
    },
  }
}

export const privateKey = '__form_validation__'
export const modelKey = '$model'
export const pathKey = 'path'
export const listenerKey = 'listener'

export const proxyStructure = ({
  object,
  clone,
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
}) => {
  const wrapped = validationWrapper(object, [])
  for (const key in wrapped) {
    clone[key] = wrapped[key]
  }

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
  wrapper: { (...args: any): any }
}) => {
  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      for (const listener of clone[privateKey][listenerKey]) {
        listener([...clone[privateKey][pathKey], key])
      }
      return Reflect.deleteProperty(target, key)
    },
    set(target: any, key: string, value: any, receiver: any) {
      const result = Reflect.set(target, key, value, receiver)

      for (const listener of clone[privateKey][listenerKey]) {
        listener([...clone[privateKey][pathKey], key])
      }

      clone[key] = wrapper(value, [...path, key])

      const representingType = Object.prototype.toString.call(receiver[key])
      if (representingType === '[object Object]' || representingType === '[object Array]') {
        if (representingType === '[object Array]') {
          if (clone[key].length === undefined) {
            clone[key].length = wrapper(clone[key][modelKey].length, clone[key][privateKey][pathKey].concat('length'))
          }
        }

        for (const innerKey in clone[key][modelKey]) {
          if (clone[key][innerKey] === undefined) {
            clone[key][innerKey] = wrapper(
              clone[key][modelKey][innerKey],
              clone[key][privateKey][pathKey].concat(innerKey),
            )
          }
        }

        Reflect.set(
          target,
          key,
          _proxyStructure({ object: receiver[key], clone: clone[key], path: clone[key][privateKey][pathKey], wrapper }),
          receiver,
        )
      }

      return result
    },
  })
}
