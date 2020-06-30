new Vue({
  data() {
    const proxiedForm = FormValidation.proxy({ form, schema, validator })
    return {
      state: proxiedForm,
      validator,
    }
  },

  watch: {
    'state.account1'() {
      this.validator.account1.$v.validate()
    },
    'state.account2'() {
      this.validator.account2.$v.validate()
    },
    'state.account3'() {
      this.validator.account3.$v.validate()
    },
    'state.account4'() {
      this.validator.account4.$v.validate()
    },
    state: {
      immediate: true,
      deep: true,
      handler() {
        logInfo(this.state, this.validator)
      },
    },
  },
}).$mount('#app')
