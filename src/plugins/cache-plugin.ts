import { Validator } from '../validator'
import { getSchema as doGetSchema } from '../schema'

const caches: WeakMap<any, Cache> = new WeakMap()

interface Cache {
  $rootSchema: Map<string, any>
}

function initCache(rootForm: any) {
  caches.set(rootForm, {
    $rootSchema: new Map(),
  })
}

function getSchema(this: Validator, path: string[]) {
  const cache = caches.get(this.$rootForm)!
  const pathKey = path.join('.')

  if (cache.$rootSchema.has(pathKey) === false) {
    cache.$rootSchema.set(pathKey, doGetSchema({ rootSchema: this.$rootSchema, path }))
  }

  return cache.$rootSchema.get(pathKey)
}

export default class CachePlugin {
  applied: boolean = false

  apply(this: CachePlugin, validator: Validator) {
    if (this.applied) return
    this.applied = true
    initCache(validator.$rootForm)
    validator.constructor.prototype.getSchema = getSchema.bind(validator)
  }
}
