const { createApp, reactive, watch } = Vue

createApp({
  setup() {
    const reactiveValidator = reactive(validator)
    const proxiedForm = FormValidation.proxy({ form, schema, validator: reactiveValidator })
    const state = reactive(proxiedForm)

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
      },
      { deep: true },
    )

    const push = () => state.accountList.push('')
    const pop = () => state.accountList.pop()
    const shift = () => state.accountList.shift()
    const unshift = () => state.accountList.unshift('')
    const splice = () => console.log('use this value to splice', state.accountList)
    const reverse = () => state.accountList.reverse()
    const sort = () => state.accountList.sort()

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
      sort,
    }
  },
}).mount('#app')
