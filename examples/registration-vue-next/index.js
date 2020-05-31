const schema = {
  account: {
    $rules: {
      required({ value }) {
        if (value === '') return false
      },
    },
    $errors: {
      required() {
        return 'Please enter an account.'
      },
    },
  },
  password: {
    $rules: {
      required({ value }) {
        if (value === '') return false
      },
    },
    $errors: {
      required() {
        return 'Please enter a passowrd.'
      },
    },
  },
}

const { createApp, reactive, shallowReactive, watch, watchEffect } = Vue
function reactiveForValidator(validator, cache = new WeakMap()) {
  if (typeof validator !== 'object') return
  if (cache.has(validator)) return

  Object.keys(validator).forEach(key => {
    if (typeof validator[key] !== 'object') return
    reactiveForValidator(validator[key])
    validator[key] = shallowReactive(validator[key])
  })
}

let renderCount = 0
createApp({
  setup() {
    const validator = FormValidation.createInstance(schema)
    reactiveForValidator(validator)
    const state = reactive({
      account: '',
      password: '',
      $v: reactive(validator),
    })
    validator.$bind(state)

    watch(
      () => state.account,
      () => validator.account.$validate(),
    )
    watch(
      () => state.password,
      () => validator.password.$validate(),
    )

    watch(
      () => state,
      function renderValidatorInfo() {
        console.clear()
        console.log('state: ', JSON.stringify({ ...state, $v: undefined }, null, 2))
        console.log('validator.account: ', JSON.stringify(getValidatorInfo(state.$v.account), null, 2))
        console.log('validator.password: ', JSON.stringify(getValidatorInfo(state.$v.password), null, 2))
        console.log(renderCount++)
      },
      { deep: true, immediate: true },
    )

    return {
      state,
    }
  },
}).mount('#app')
