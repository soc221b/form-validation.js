const observeValidator = validator => {
  if (typeof validator !== "object") return;
  Vue.observable(validator.$v);
  for (const key in validator) {
    observeValidator(validator[key]);
  }
};


new Vue({
  data() {
    const proxiedForm = FormValidation.proxy({ form, schema, validator })
    observeValidator(validator)
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
    'validator.account4.$v.pending': {
      handler() {
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

      for (const key in this.state) {
        this.$refs[key].innerHTML = ''
        this.djt[key] = new DomJsonTree(deepCopy({ $v: this.validator[key].$v }), this.$refs[key])
        this.djt[key].render()
      }
    },
    reset(key) {
      this.validator[key].$v.reset()
      this.renderDomJsonTree()
    },
    blur(key) {
      this.validator[key].$v.touch()
      this.renderDomJsonTree()
    },
  },
}).$mount('#app')
