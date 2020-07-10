import { isPlainObject, isArray, hasKey } from './util'

export const privateKey = '__form_validation__'
export const publicKey = '$v'
export const pathKey = 'path'
export const proxyKey = '__form_validation_reactive'
export const collectedKey = '__form_validation_collected'

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

const updateNestedPath = (clone: any, path: string[]): void => {
  if (isPlainObject(clone) === false && isArray(clone) === false) return

  clone[privateKey][pathKey].splice(0, path.length, ...path)

  for (const key in clone) {
    updateNestedPath(clone[key], path.concat(key))
  }
}

const operations: Set<string | null> = new Set(['shift', 'unshift', 'reverse', 'splice'])

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
  const accessOrder: any = []
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
        if (operation === 'shift') {
          if (key === 'length') {
            gettingValues.reverse()
            gettingValues.pop()
            clone.length = 0
            let key = 0
            while (key < gettingValues.length) {
              const value = gettingValues[key]
              value[privateKey][pathKey] = value[privateKey][pathKey]
                .slice(0, -1)
                .concat(gettingValues.length - key - 1 + '')
              clone.push(value)
              ++key
            }
            clone.reverse()

            operation = null

            updateNestedPath(clone, clone[privateKey][pathKey])
            for (const key in clone) {
              callback(clone[key] as IBaseValidator)
            }
            return result
          } else if (/^\d+$/.test(key)) {
            clone[key] = isArray(value) ? [] : {}
          }
        } else if (operation === 'unshift') {
          if (key === 'length') {
            clone.length = 0
            let key = 0
            while (key < gettingValues.length) {
              const value = gettingValues[key]
              value[privateKey][pathKey] = value[privateKey][pathKey]
                .slice(0, -1)
                .concat(gettingValues.length - key - 1 + '')
              clone.push(value)
              ++key
            }
            clone.reverse()

            operation = null

            updateNestedPath(clone, clone[privateKey][pathKey])
            for (const key in clone) {
              callback(clone[key] as IBaseValidator)
            }
            return result
          } else if (/^\d+$/.test(key)) {
            clone[key] = isArray(value) ? [] : {}
            if (key === '0') {
              gettingValues.push(clone[0])
            }
          }
        } else if (operation === 'reverse') {
          if (/^\d+$/.test(key)) {
            const value = gettingValues.pop()
            value[privateKey][pathKey] = value[privateKey][pathKey].slice(0, -1).concat(key)
            clone[key] = value
            ++operationCount
            if (operationCount === totalOperationCount) {
              updateNestedPath(clone, clone[privateKey][pathKey])
              for (const key in clone) {
                callback(clone[key] as IBaseValidator)
              }
              operation = null
            }
            return result
          }
        } else if (operation === 'splice') {
          if (key === 'length') {
            operation = null
            clone[key] = value

            for (let index in accessOrder) {
              const { method, key, value } = accessOrder[index]
              const prevIndex = parseInt(index, 10) - 1
              if (method === 'set') {
                if (prevIndex >= 0 && accessOrder[prevIndex].method === 'get') {
                  clone[key] = accessOrder[prevIndex].value
                } else {
                  clone[key] = value
                }
              }
            }

            updateNestedPath(clone, clone[privateKey][pathKey])
            for (const key in clone) {
              clone[key][privateKey][pathKey] = clone[key][privateKey][pathKey].slice(0, -1).concat(key + '')
              callback(clone[key] as IBaseValidator)
            }

            return result
          } else if (/^\d+$/.test(key)) {
            clone[key] = isArray(value) ? [] : {}
            accessOrder.push({ method: 'set', key, value: clone[key] })
          }
        }
      }

      if (key === 'length') {
        clone.length = value
        return result
      }

      if (isArray(value)) {
        clone[key] = clone[key] || []
        clone[key].length = value.length
      } else {
        clone[key] = clone[key] || {}
      }

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
          accessOrder.length = 0
          settingKeys.length = 0

          for (const key in clone) {
            delete clone[key][collectedKey]
          }
        } else if (operation !== null) {
          if (operation === 'shift') {
            if (/^\d+$/.test(key)) {
              if (clone[key] && clone[key][collectedKey] === undefined) {
                Object.defineProperty(clone[key], collectedKey, {
                  enumerable: false,
                  configurable: true,
                  value: clone[key],
                })
                gettingValues.push(clone[key])
              }
            }
          } else if (operation === 'unshift') {
            if (/^\d+$/.test(key)) {
              if (clone[key] && clone[key][collectedKey] === undefined) {
                Object.defineProperty(clone[key], collectedKey, {
                  enumerable: false,
                  configurable: true,
                  value: clone[key],
                })
                gettingValues.push(clone[key])
              }
            }
          } else if (operation === 'reverse') {
            if (key === 'length') {
              if (target[key] <= 1) {
                operation = null
                totalOperationCount = 0
              } else {
                totalOperationCount = result % 2 === 0 ? result : result - 1
              }
            } else if (/^\d+$/.test(key)) {
              if (clone[key] && clone[key][collectedKey] === undefined) {
                Object.defineProperty(clone[key], collectedKey, {
                  enumerable: false,
                  configurable: true,
                  value: clone[key],
                })
                gettingValues.push(clone[key])
              }
            }
          } else if (operation === 'splice') {
            if (/^\d+$/.test(key)) {
              if (clone[key] && clone[key][collectedKey] === undefined) {
                Object.defineProperty(clone[key], collectedKey, {
                  enumerable: false,
                  configurable: true,
                  value: clone[key],
                })
                accessOrder.push({ method: 'get', key, value: clone[key] })
              }
            }
          }
        }
      }

      return result
    },
  })
}
