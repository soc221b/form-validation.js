const { createApp, reactive, watch } = Vue

createApp({
  setup() {
    const reactiveValidator = reactive(validator)
    const proxiedForm = FormValidation.proxy({ form, schema, validator: reactiveValidator })
    const state = reactive(proxiedForm)

    watch(
      () => state.account1,
      () => validator.account1.$v.validate(),
    )
    watch(
      () => state.account2,
      () => validator.account2.$v.validate(),
    )
    watch(
      () => state.account3,
      () => validator.account3.$v.validate(),
    )
    watch(
      () => state.account4,
      () => validator.account4.$v.validate(),
    )
    watch(
      () => state,
      () => logInfo(state, reactiveValidator),
      { deep: true, immediate: true },
    )

    return {
      state,
      validator: reactiveValidator,
    }
  },
}).mount('#app')
