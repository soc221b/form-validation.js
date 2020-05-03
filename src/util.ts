export function toString(object: unknown): string {
  return Object.prototype.toString.call(object)
}

export function isPlainObject(object: unknown): boolean {
  return toString(object) === '[object Object]'
}

export function isArray(object: unknown): boolean {
  return toString(object) === '[object Array]'
}

export function isFunction(object: unknown): boolean {
  return typeof object === 'function'
}

export function deepCopy<T>(object: T, cache = []): T {
  if (object === null || (isArray(object) === false && isPlainObject(object) === false)) {
    return object
  }

  const cachedIndex = cache.findIndex(item => item.object === object)
  if (cachedIndex !== -1) {
    return cache[cachedIndex].copy
  }

  const copy = isPlainObject(object) ? {} : []
  cache.push({
    object,
    copy,
  })

  Object.keys(object).forEach(key => {
    copy[key] = deepCopy(object[key], cache)
  })

  return copy as T
}

export function normalizePath(path: string | string[]): string[] {
  let normalizedPath: string[]
  if (typeof path === 'string') {
    if (path === '') normalizedPath = []
    else normalizedPath = path.split('.')
  } else {
    normalizedPath = deepCopy(path)
  }
  return normalizedPath
}

export function getByPath(object: object | any[], path: string | string[]) {
  const normalizedPath = normalizePath(path)

  if (normalizedPath.length === 0) return object

  let deepestParent: object = object
  while (normalizedPath.length > 1) {
    deepestParent = deepestParent[normalizedPath.shift()]
  }

  return deepestParent[normalizedPath.shift()]
}

export function setByPath(object: object | any[], path: string | string[], value: any) {
  const normalizedPath = normalizePath(path)

  let deepestParent: object = object
  while (normalizedPath.length > 1) {
    deepestParent = deepestParent[normalizedPath.shift()]
  }

  deepestParent[normalizedPath.shift()] = value
  return value
}

export function noop() {}

export function identity<T>(object: T): T {
  return object
}
