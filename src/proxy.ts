import { noop } from './util'

export const privateKey = '__form_validation__'
export const publicKey = '$v'
export const pathKey = 'path'
export const listenerKey = 'listener'

export type IKey = string
export type IPath = IKey[]

export interface IBaseValidator {
  [privateKey]: {
    [pathKey]: IPath
    [listenerKey]: ((...args: any) => any)[]

    [key: string]: any
  }
  [publicKey]: {
    [key: string]: any
  }

  [key: string]: any
}

interface IWrapCallback {
  (wrapper: IBaseValidator): any
}

interface IWrap {
  (path: IPath, callback: IWrapCallback): IBaseValidator
}

const wrap: IWrap = (path, callback) => {
  const wrapper: IBaseValidator = {
    [privateKey]: {
      [pathKey]: path,
      [listenerKey]: [],
    },
    [publicKey]: {},
  }
  callback(wrapper)
  return wrapper
}

export const proxyStructure = ({
  object,
  clone,
  callback = noop,
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
  callback?: IWrapCallback
}) => {
  const wrapper = wrap([], callback)
  clone[privateKey] = wrapper[privateKey]
  clone[publicKey] = wrapper[publicKey]

  return _proxyStructure({ object, clone, path: [], callback })
}

const _proxyStructure = ({
  object,
  clone,
  path,
  callback,
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
  path: IPath
  callback: IWrapCallback
}) => {
  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      const result = Reflect.deleteProperty(target, key)
      for (const listener of clone[privateKey][listenerKey]) {
        listener(clone[privateKey][pathKey].concat(key))
      }
      return result
    },

    set(target: object, key: IKey, value: any, receiver: any) {
      const result = Reflect.set(target, key, value, receiver)

      for (const listener of clone[privateKey][listenerKey]) {
        listener(clone[privateKey][pathKey].concat(key))
      }

      clone[key] = wrap(path.concat(key), callback)

      const representingType = Object.prototype.toString.call(receiver[key])
      if (representingType === '[object Object]' || representingType === '[object Array]') {
        if (representingType === '[object Array]') {
          if (clone[key].length === undefined) {
            clone[key].length = wrap(clone[key][privateKey][pathKey].concat('length'), callback)
          }
        }

        for (const innerKey in receiver[key]) {
          if (clone[key][innerKey] === undefined) {
            clone[key][innerKey] = wrap(clone[key][privateKey][pathKey].concat(innerKey), callback)
          }
        }

        Reflect.set(
          target,
          key,
          _proxyStructure({
            object: receiver[key],
            clone: clone[key],
            path: clone[key][privateKey][pathKey],
            callback,
          }),
          receiver,
        )
      }

      return result
    },
  })
}
