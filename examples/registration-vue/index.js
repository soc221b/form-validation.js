Vue.mixin({
  data() {
    this._validator = {}
    return {}
  },
  computed: {
    validator() {
      return this._validator
    },
  },
  created() {
    if (this.$options.schema === undefined) return

    FormValidation.proxy({
      validator: this.$data.validator,
      schema: this.$options.schema,
      form: this.$data,
    })
  },
})

new Vue({
  el: '#app',
  data() {
    return {
      account: '',
      password: '',
      emails: ['', ''],
    }
  },
  watch: {
    async account() {
      // await this.validator.account.$validate()
    },
    async password() {
      // await this.validator.password.$validate()
    },
    $data: {
      deep: true,
      immediate: true,
      handler() {
        logInfo(this.$data, this.validator)
      },
    },
  },
  methods: {
    add() {
      console.log(this.$data)
      this.emails.push('')
    },
    remove(index) {
      this.emails.splice(index, 1)
    },
  },
  schema,
})
