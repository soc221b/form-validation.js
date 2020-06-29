import { noop, getByPath, isPlainObject, isArray } from './util'

export const privateKey = '__form_validation__'
export const publicKey = '$v'
export const pathKey = 'path'
export const listenerKey = 'listener'
export const proxyKey = '__form_reactive'

export type IPath = string[]

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
  (object: any, path: IPath, callback: IWrapCallback): IBaseValidator
}

const wrap: IWrap = (object, path, callback) => {
  object[privateKey] = {
    [pathKey]: path,
    [listenerKey]: [],
  }
  object[publicKey] = {}
  Object.defineProperty(object, proxyKey, {
    enumerable: false,
    value: object,
  })
  callback(object)
  return object
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
  // nested
  wrap(clone, path, callback)

  if (isPlainObject(object) === false && isArray(object) === false) return object

  for (const key of Object.keys(object)) {
    Reflect.set(clone, key, clone[key] || (isArray(object) ? [] : {}))

    object[key] = _proxyStructure({
      object: object[key],
      clone: clone[key],
      path: path.concat(key),
      callback,
    })
  }

  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      const result = Reflect.deleteProperty(target, key)
      for (const listener of clone[privateKey][listenerKey]) {
        listener(clone[privateKey][pathKey].concat(key))
      }
      return result
    },

    set(target: any, key: string, value: any) {
      const result = Reflect.set(target, key, value)

      Reflect.set(clone, key, clone[key] || (isArray(target) ? [] : {}))

      value = _proxyStructure({
        object: value,
        clone: clone[key],
        path: path.concat(key),
        callback,
      })

      for (const listener of clone[privateKey][listenerKey]) {
        listener(clone[privateKey][pathKey].concat(key))
      }

      return result
    },
  })
}
