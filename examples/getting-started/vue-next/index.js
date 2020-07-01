const { createApp, reactive, ref, onMounted, watch } = Vue

createApp({
  setup() {
    const reactiveValidator = reactive(validator)
    const proxiedForm = FormValidation.proxy({ form, schema, validator: reactiveValidator })
    const state = reactive(proxiedForm)
    const isMounted = ref(false)
    const djt = {
      self: null,
      account1: null,
      account2: null,
      account3: null,
      account4: null,
    }
    const refs = {
      self: ref(undefined),
      account1: ref(undefined),
      account2: ref(undefined),
      account3: ref(undefined),
      account4: ref(undefined),
    }

    const renderDomJsonTree = () => {
      if (isMounted.value === false) return

      refs.self.value.innerHTML = ''
      djt.self = new DomJsonTree(deepCopy(reactiveValidator), refs.self.value)
      djt.self.render()

      for (const key in state) {
        refs[key].value.innerHTML = ''
        djt[key] = new DomJsonTree(deepCopy(reactiveValidator[key]), refs[key].value)
        djt[key].render()
      }
    }

    onMounted(() => {
      isMounted.value = true
      renderDomJsonTree()
    })

    watch(
      () => state,
      () => {
        validator.$v.validate()
        logInfo(state, reactiveValidator)
        renderDomJsonTree()
      },
      { deep: true, immediate: true },
    )

    return {
      state,
      validator: reactiveValidator,
      ...refs,
    }
  },
}).mount('#app')
