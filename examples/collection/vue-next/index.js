const { createApp, reactive, ref, watch, onMounted, nextTick } = Vue

createApp({
  setup() {
    const reactiveValidator = reactive(validator)
    const proxiedForm = FormValidation.proxy({ form, schema, validator: reactiveValidator })
    const state = reactive(proxiedForm)

    let isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
      renderDomJsonTree()
    })

    const refs = []
    const djt = {}
    const renderDomJsonTree = () => {
      if (isMounted.value === false) return

      for (const key in refs) {
        if (refs[key].value === undefined) continue
        refs[key].value.innerHTML = ''
        djt[key] = new DomJsonTree(deepCopy({ $v: reactiveValidator.accountList[key].$v }), refs[key].value)
        djt[key].render()
      }
    }
    watch(
      () => state.accountList,
      async () => {
        Object.keys(state.accountList).forEach(key => {
          if (refs[key] === undefined) refs[key] = ref(undefined)
        })
        Object.keys(refs).forEach(key => {
          if (state.accountList[key] === undefined) delete refs[key]
        })
        await nextTick()
        renderDomJsonTree()
      },
      { deep: true, immediate: true },
    )

    const push = () => state.accountList.push('')
    const pop = () => state.accountList.pop()
    const shift = () => state.accountList.shift()
    const unshift = () => state.accountList.unshift('')
    const splice = () => console.log('use this value to splice', state.accountList)
    const reverse = () => state.accountList.reverse()

    const blur = key => {
      reactiveValidator.accountList[key].$v.touch()
      renderDomJsonTree()
    }
    const reset = key => {
      reactiveValidator.accountList[key].$v.reset()
      renderDomJsonTree()
    }

    let oldAccountList = JSON.parse(JSON.stringify(state.accountList))
    watch(
      () => state.accountList,
      () => {
        for (const index of Object.keys(state.accountList)) {
          if (oldAccountList[index] === undefined || oldAccountList[index] !== state.accountList[index]) {
            reactiveValidator.accountList[index].$v.validate()
          }
        }
        oldAccountList = JSON.parse(JSON.stringify(state.accountList))
        renderDomJsonTree()
      },
      { deep: true },
    )

    watch(
      () => state,
      () => logInfo(state, reactiveValidator),
      { deep: true, immediate: true },
    )

    return {
      state,
      validator: reactiveValidator,
      push,
      pop,
      shift,
      unshift,
      splice,
      reverse,
      reset,
      blur,
      refs,
    }
  },
}).mount('#app')
