const { createApp, reactive, watch } = Vue

createApp({
  setup() {
    const form = {
      account1: '',
      account2: '',
      account3: '',
      account4: '',
    }
    const validator = reactive({})
    const state = reactive(FormValidation.proxy({ form, schema, validator }))

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
      () => logInfo(state, validator),
      { deep: true, immediate: true },
    )

    return {
      state,
      validator,
    }
  },
}).mount('#app')
