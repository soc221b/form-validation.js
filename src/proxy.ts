import { isPlainObject, isArray, hasKey } from './util'

export const privateKey = '__form_validation__'
export const publicKey = '$v'
export const pathKey = 'path'
export const proxyKey = '__form_validation_reactive'
export const collectedKey = '__form_validation_collecting'

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

const operations: Set<string | null> = new Set(['shift', 'unshift', 'reverse'])

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

  let operation: string | null = null
  let totalOperationCount: number = 0
  let operationCount: number = 0
  const gettingValues: any = []
  const settingKeys: any = []

  return new Proxy(object, {
    deleteProperty(target, key) {
      Reflect.deleteProperty(clone, key)
      return Reflect.deleteProperty(target, key)
    },

    set(target: any, key: string, value: any) {
      const result = Reflect.set(target, key, value)
      if (hasKey(target, key) === false) return result

      if (isArray(target)) {
        if (key === 'length') {
          if (operation === 'shift') {
            gettingValues.shift()
            gettingValues.reverse()
            clone.length = 0
            for (const key of settingKeys) {
              const value = gettingValues.pop()
              value[privateKey][pathKey] = value[privateKey][pathKey].slice(0, -1).concat(key)
              clone[key] = value
            }
          } else if (operation === 'unshift') {
            gettingValues.shift()
            gettingValues.push(clone[0])
            gettingValues.reverse()
            clone.length = 0
            for (const key of settingKeys) {
              const value = gettingValues.pop()
              value[privateKey][pathKey] = value[privateKey][pathKey].slice(0, -1).concat(key)
              clone[key] = value
            }
          }

          clone[key] = value
          operation = null

          for (const key in clone) {
            callback(clone[key] as IBaseValidator)
          }
          return result
        } else if (operation === 'reverse') {
          if (/^\d+$/.test(key)) {
            const value = gettingValues.pop()
            value[privateKey][pathKey] = value[privateKey][pathKey].slice(0, -1).concat(key)
            clone[key] = value
            ++operationCount
            if (operationCount === totalOperationCount) {
              for (const key in clone) {
                callback(clone[key] as IBaseValidator)
              }
              operation = null
            }
            return result
          }
        } else if (operations.has(operation) && /^\d+$/.test(key)) {
          settingKeys.push(key)
          ++operationCount
          clone[key] = isArray(value) ? [] : {}
        }
      }
      clone[key] = clone[key] || (isArray(value) ? [] : {})

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

    get(target: any, key: string) {
      const result = Reflect.get(target, key)

      if (isArray(target)) {
        if (operations.has(key)) {
          operation = key
          operationCount = 0
          gettingValues.length = 0
          settingKeys.length = 0

          for (const key in clone) {
            delete clone[key][collectedKey]
          }
        } else if (operation === 'reverse') {
          if (key === 'length') {
            if (clone[key] <= 1) {
              operation = null
              totalOperationCount = 0
            } else {
              totalOperationCount = result % 2 === 0 ? result : result - 1
            }
          } else if (/^\d+$/.test(key)) {
            if (clone[key][collectedKey] === undefined) {
              gettingValues.push(clone[key])
              Object.defineProperty(clone[key], collectedKey, {
                enumerable: false,
                configurable: true,
                value: clone[key],
              })
            }
          }
        } else if (operations.has(operation)) {
          if (key === 'length') {
            operationCount = 0
            totalOperationCount = result
          } else if (/^\d+$/.test(key)) {
            gettingValues[operationCount] = clone[key]
          }
        }
      }

      return result
    },
  })
}
