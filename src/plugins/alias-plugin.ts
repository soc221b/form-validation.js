import { ValidationWrapper, Validator, VALIDATOR_KEY } from '../validator'

interface Alias {
  path: string[]
  aliasPath: string[]
}

export default class AliasPlugin {
  aliases: Alias[]

  constructor(aliases: Alias[]) {
    this.aliases = aliases
  }

  apply(validator: Validator) {
    validator.$hooks.onCreated.tap('alias-plugin', () => this.alias(validator.getWrapper(validator.$path)))
  }

  alias(this: AliasPlugin, validationWrapper: ValidationWrapper) {
    for (const { path, aliasPath } of this.aliases) {
      const parentWrapper = validationWrapper[VALIDATOR_KEY]?.getWrapper(aliasPath.slice(0, -1))
      const key = aliasPath[aliasPath.length - 1]
      Object.defineProperty(parentWrapper, key, {
        configurable: true,
        enumerable: true,
        get() {
          return validationWrapper[VALIDATOR_KEY]?.getWrapper(path)
        },
      })
    }
  }
}
