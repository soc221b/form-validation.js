function defineReactiveForValidator(validator) {
  Object.keys(validator).forEach(key => {
    if (typeof validator[key] !== 'object') return
    validator[key] = Vue.observable(validator[key])
  })
  return validator
}

Vue.mixin({
  computed: {
    $v() {
      if (this.$options.schema === undefined) return
      return defineReactiveForValidator(FormValidation.createInstance(this.$options.schema))
    },
  },
  created() {
    this.$v.$bind(this.$data)
  },
})
new Vue({
  el: '#app',
  data() {
    return {
      account: '',
      password: '',
    }
  },
  watch: {
    '$v.acccount.$errors': {
      deep: true,
      handler() {
        console.log(123)
      },
    },
    async account() {
      await this.$v.account.$validate()
      this.renderValidatorInfo()
    },
    async password() {
      await this.$v.password.$validate()
      this.renderValidatorInfo()
    },
  },
  created() {
    this.renderValidatorInfo()
  },
  methods: {
    renderValidatorInfo() {
      console.clear()
      console.log(this.$v)
      console.log('form: ', JSON.stringify(this.$data, null, 2))
      console.log('validator: ', getValidatorInfo(this.$v))
    },
  },
  schema: {
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
  },
})
