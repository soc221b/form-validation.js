import { ValidationWrapper, Validator, VALIDATOR_KEY } from '../validator'

interface Alias {
  path: string[]
  aliasPath: string[]
}

const Tap = {
  name: 'alias-plugin',
  stage: -999,
}

export default class AliasPlugin {
  aliases: Alias[]

  constructor(aliases: Alias[]) {
    this.aliases = aliases
  }

  apply(validator: Validator) {
    validator.$hooks.onCreated.tap(Tap, () => this.alias(validator.getWrapper(validator.$path)))
    validator.$hooks.onUpdated.tap(Tap, () => this.alias(validator.getWrapper(validator.$path)))
  }

  alias(this: AliasPlugin, validationWrapper: ValidationWrapper) {
    const currentPath = validationWrapper[VALIDATOR_KEY]?.$path!
    for (const { path, aliasPath } of this.aliases) {
      const parentWrapper = validationWrapper[VALIDATOR_KEY]?.getWrapper(currentPath.concat(path.slice(0, -1)))
      const key = path[path.length - 1]

      let lastValue = parentWrapper[key]
      const aliasParentWrapper = validationWrapper[VALIDATOR_KEY]?.getWrapper(
        currentPath.concat(aliasPath.slice(0, -1)),
      )
      const aliasKey = aliasPath[aliasPath.length - 1]
      aliasParentWrapper[aliasKey] = lastValue

      Object.defineProperty(parentWrapper, key, {
        configurable: true,
        enumerable: true,
        set(value) {
          lastValue = value
          const aliasParentWrapper = validationWrapper[VALIDATOR_KEY]?.getWrapper(
            currentPath.concat(aliasPath.slice(0, -1)),
          )
          const aliasKey = aliasPath[aliasPath.length - 1]
          aliasParentWrapper[aliasKey] = lastValue
          return lastValue
        },
        get() {
          return lastValue
        },
      })
    }
  }
}
