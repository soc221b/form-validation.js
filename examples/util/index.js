function getValidatorInfo(validator, info = {}, cache = new WeakMap()) {
  if (cache.has(validator)) return cache.get(validator)
  else cache.set(validator, info)

  info.$hasValidated = validator.$hasValidated
  info.$hasError = validator.$hasError
  info.$errors = validator.$errors
  info.$isPending = validator.$isPending
  info.$params = validator.$params
  info.$iter = validator.$iter

  for (const key of Object.keys(validator)) {
    try {
      info[key] = {}
      getValidatorInfo(validator[key], info[key], cache)
    } catch (error) {}
  }

  return JSON.stringify(info, null, 2)
}
