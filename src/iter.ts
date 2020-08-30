import { publicKey, IBaseValidator } from './proxy'

export function wrapIter(validator: IBaseValidator) {
  Object.defineProperty(validator, '$iter', {
    enumerable: false,
    configurable: true,
    get() {
      return Object.keys(validator)
        .filter(key => key !== publicKey)
        .reduce((iter, key) => {
          ;(iter as any)[key] = validator[key]
          return iter
        }, {})
    },
  })
}
