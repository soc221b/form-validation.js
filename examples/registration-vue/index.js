function defineReactiveForValidator(context, key) {
  Vue.observable(context[key]['$errors'])
  context = context[key]
  Object.keys(context).forEach(key => defineReactiveForValidator(context, key))
}
Vue.mixin({
  beforeCreate() {
    if (this.$options.schema) {
      const validator = FormValidation.createInstance(this.$options.schema)
      this.$v = validator
      defineReactiveForValidator(this, '$v')
    }
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
      // console.clear()
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
