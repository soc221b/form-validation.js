const { createApp, reactive, ref, onMounted, watch } = Vue

createApp({
  setup() {
    const reactiveValidator = reactive(validator)
    const proxiedForm = FormValidation.proxy({ form, schema, validator: reactiveValidator })
    const state = reactive(proxiedForm)
    const isMounted = ref(false)
    const djt = {
      account1: null,
      account2: null,
      account3: null,
      account4: null,
    }
    const refs = {
      account1: ref(undefined),
      account2: ref(undefined),
      account3: ref(undefined),
      account4: ref(undefined),
    }

    const renderDomJsonTree = () => {
      if (isMounted.value === false) return

      for (const key in state) {
        refs[key].value.innerHTML = ''
        djt[key] = new DomJsonTree(deepCopy({ $v: reactiveValidator[key].$v }), refs[key].value)
        djt[key].render()
      }
    }

    onMounted(() => {
      isMounted.value = true
      renderDomJsonTree()
    })

    const blur = key => {
      reactiveValidator[key].$v.touch()
      renderDomJsonTree()
    }

    const reset = key => {
      reactiveValidator[key].$v.reset()
      renderDomJsonTree()
    }

    watch(
      () => state,
      () => {
        validator.$v.validate()
        logInfo(state, reactiveValidator)
        renderDomJsonTree()
      },
      { deep: true, immediate: true },
    )

    watch(
      () => reactiveValidator.account4.$v.pending,
      () => {
        logInfo(state, reactiveValidator)
        renderDomJsonTree()
      },
    )

    return {
      state,
      validator: reactiveValidator,
      ...refs,
      blur,
      reset,
    }
  },
}).mount('#app')
