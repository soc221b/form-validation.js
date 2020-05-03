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

interface Cache<T> {
  object: T
  copy: T
}
export function deepCopy<T>(object: T, cache: Cache<T>[] = []): T {
  if (object === null || (isArray(object) === false && isPlainObject(object) === false)) {
    return object
  }

  const cachedIndex = cache.findIndex(item => item.object === object)
  if (cachedIndex !== -1) {
    return cache[cachedIndex].copy
  }

  const copy: T = (isPlainObject(object) ? {} : []) as T
  cache.push({
    object,
    copy,
  })

  Object.keys(object).forEach(key => {
    ;(copy as any)[key] = deepCopy((object as any)[key], cache)
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

  let deepestParent: any = object
  while (normalizedPath.length > 1) {
    deepestParent = deepestParent[normalizedPath.shift() as string]
  }

  return deepestParent[normalizedPath.shift() as string]
}

export function setByPath(object: object | unknown[], path: string | string[], value: unknown) {
  const normalizedPath = normalizePath(path)

  if (normalizedPath.length === 0) return value

  let deepestParent: any = object
  while (normalizedPath.length > 1) {
    deepestParent = deepestParent[normalizedPath.shift() as string]
  }

  deepestParent[normalizedPath.shift() as string] = value
  return value
}

export function noop() {}

export function identity<T>(object: T): T {
  return object
}
