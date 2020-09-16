import { Validator } from '../validator'
import { getByPath } from '../util'
import { getSchema as doGetSchema } from '../schema'

const caches: WeakMap<any, Cache> = new WeakMap()

interface Cache {
  $rootForm: Map<string, any>
  $rootWrapper: Map<string, any>
  $rootSchema: Map<string, any>
}

function initCache(rootForm: any) {
  caches.set(rootForm, {
    $rootForm: new Map(),
    $rootWrapper: new Map(),
    $rootSchema: new Map(),
  })
}

function getForm(this: Validator, path: string[]) {
  const cache = caches.get(this.$rootForm)!
  const pathKey = path.join('.')

  if (cache.$rootForm.has(pathKey) === false) {
    cache.$rootForm.set(pathKey, getByPath(this.$rootForm, path))
  }

  const value = cache.$rootForm.get(pathKey)
  if (typeof value !== 'object' || value === null) {
    cache.$rootForm.delete(pathKey)
  }

  return value
}

function getWrapper(this: Validator, path: string[]) {
  const cache = caches.get(this.$rootForm)!
  const pathKey = path.join('.')

  if (cache.$rootWrapper.has(pathKey) === false) {
    cache.$rootWrapper.set(pathKey, getByPath(this.$rootWrapper, path))
  }

  return cache.$rootWrapper.get(pathKey)
}

function getSchema(this: Validator, path: string[]) {
  const cache = caches.get(this.$rootForm)!
  const pathKey = path.join('.')

  if (cache.$rootSchema.has(pathKey) === false) {
    cache.$rootSchema.set(pathKey, doGetSchema({ rootSchema: this.$rootSchema, path }))
  }

  return cache.$rootSchema.get(pathKey)
}

function clearCache(this: Validator) {
  const cache = caches.get(this.$rootForm)!
  const pathKey = this.$path.join('.')
  for (const existingPathKey of Array.from(cache.$rootForm.keys())) {
    if (existingPathKey.startsWith(pathKey + '.') || existingPathKey === pathKey) {
      cache.$rootForm.delete(existingPathKey)
    }
  }
  for (const existingPathKey of Array.from(cache.$rootWrapper.keys())) {
    if (existingPathKey.startsWith(pathKey + '.') || existingPathKey === pathKey) {
      cache.$rootWrapper.delete(existingPathKey)
    }
  }
}

const Tap = {
  name: 'cache-plugin',
}

export default class CachePlugin {
  applied: boolean = false

  apply(this: CachePlugin, validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, clearCache.bind(validator))
    validator.$hooks.onUpdated.tap(Tap, clearCache.bind(validator))

    if (this.applied) return
    this.applied = true
    initCache(validator.$rootForm)
    validator.constructor.prototype.getForm = getForm.bind(validator)
    validator.constructor.prototype.getWrapper = getWrapper.bind(validator)
    validator.constructor.prototype.getSchema = getSchema.bind(validator)
  }
}
