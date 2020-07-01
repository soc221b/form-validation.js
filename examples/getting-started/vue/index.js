const deepCopy = value => JSON.parse(JSON.stringify(value))
new Vue({
  data() {
    const proxiedForm = FormValidation.proxy({ form, schema, validator })
    return {
      state: proxiedForm,
      validator,
      djt: {},
      isMounted: false,
    }
  },

  watch: {
    state: {
      immediate: true,
      deep: true,
      handler() {
        this.validator.$v.validate()
        logInfo(this.state, this.validator)
        this.renderDomJsonTree()
      },
    },
  },

  mounted() {
    this.isMounted = true
    this.renderDomJsonTree()
  },

  methods: {
    renderDomJsonTree() {
      if (this.isMounted === false) return

      this.$refs.self.innerHTML = ''
      this.djt.self = new DomJsonTree(deepCopy(this.validator.$v), this.$refs.self)
      this.djt.self.render()

      for (const key in this.state) {
        this.$refs[key].innerHTML = ''
        this.djt[key] = new DomJsonTree(deepCopy(this.validator[key].$v), this.$refs[key])
        this.djt[key].render()
      }
    },
  },
}).$mount('#app')
