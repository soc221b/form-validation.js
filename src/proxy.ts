import { isPlainObject, isArray, hasKey } from './util'

export const privateKey = '__form_validation__'
export const publicKey = '$v'
export const pathKey = 'path'
export const proxyKey = '__form_validation_reactive'

export interface IBaseValidator {
  [key: string]: any

  [privateKey]: {
    [key: string]: any

    [pathKey]: string[]
  }
  [publicKey]: {
    [key: string]: any
  }
}

const validationWrap: (object: any, clone: any, path: string[]) => void = (object, clone, path): void => {
  if (isPlainObject(object) || isArray(object)) {
    Object.defineProperty(object, proxyKey, {
      enumerable: false,
      configurable: true,
      value: object,
    })
  }

  if (isPlainObject(clone) || isArray(clone)) {
    Object.defineProperty(clone, proxyKey, {
      enumerable: false,
      configurable: true,
      value: clone,
    })
    Object.defineProperty(clone, privateKey, {
      enumerable: false,
      configurable: true,
      value: clone[privateKey] || {
        [pathKey]: path,
      },
    })
    Object.defineProperty(clone, publicKey, {
      enumerable: false,
      configurable: true,
      value: clone[publicKey] || {},
    })
  }
}

export const proxyStructure = ({
  object,
  clone,
  path = [],
  wrap = validationWrap,
  callback = () => {},
}: {
  object: { [key: string]: any }
  clone: { [key: string]: any }
  path?: string[]
  wrap?: (object: any, clone: any, path: string[]) => void
  callback?: (wrapper: IBaseValidator) => void
}): any => {
  wrap(object, clone, path)
  if (isPlainObject(clone) || isArray(clone)) callback(clone as IBaseValidator)

  if (isPlainObject(object) === false && isArray(object) === false) return object

  for (const key of Object.keys(object)) {
    Reflect.set(clone, key, clone[key] || (isArray(object[key]) ? [] : {}))
    Reflect.set(
      object,
      key,
      proxyStructure({
        object: object[key],
        clone: clone[key],
        path: path.concat(key),
        wrap,
        callback,
      }),
    )
  }
  for (const key in clone) {
    if (hasKey(object, key) === false) {
      delete clone[key]
    }
  }

  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      return Reflect.deleteProperty(target, key)
    },

    set(target: any, key: string, value: any) {
      const result = Reflect.set(target, key, value)
      if (hasKey(target, key) === false) return result
      if (isArray(target) && key === 'length') {
        Reflect.set(clone, key, value)
        return result
      }

      Reflect.set(clone, key, clone[key] || (isArray(value) ? [] : {}))
      return Reflect.set(
        target,
        key,
        proxyStructure({
          object: value,
          clone: clone[key],
          path: path.concat(key),
          wrap,
          callback,
        }),
      )
    },
  })
}
