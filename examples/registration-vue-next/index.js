const { createApp, reactive, watch } = Vue

createApp({
  setup() {
    const form = {
      account: '',
      password: '',
      emails: ['', ''],
    }
    const validator = reactive({})
    const state = reactive(FormValidation.proxy({ form, schema, validator }))

    watch(
      () => state.account,
      () => validator.account.$v.validate(),
    )
    watch(
      () => state.password,
      () => validator.password.$v.validate(),
    )
    let oldEmails = []
    watch(
      () => state.emails,
      emails => {
        for (const index in emails) {
          if (emails[index] !== oldEmails[index]) {
            validator.emails[index].$v.validate()
          }
        }
        oldEmails = JSON.parse(JSON.stringify(emails))
      },
      { deep: true },
    )

    watch(
      () => state,
      () => logInfo(state, validator),
      { deep: true, immediate: true },
    )

    function addEmail() {
      state.emails.push('')
    }
    function removeEmail(index) {
      state.emails.splice(index, 1)
    }

    return {
      state,
      validator,
      addEmail,
      removeEmail,
    }
  },
}).mount('#app')
