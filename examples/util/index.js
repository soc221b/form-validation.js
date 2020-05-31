function getValidatorInfo(validator, info = {}) {
  if (typeof validator !== 'object') return

  for (const key of Object.keys(validator)) {
    if (key === '_target') continue
    if (key === '_schema') continue
    info[key] = validator[key]
    getValidatorInfo(validator[key], info[key])
  }

  return info
}
