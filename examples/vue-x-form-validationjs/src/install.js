import { proxy } from '../../../dist/form-validation.es'

function getByPath(object, path) {
  return path.reduce((value, key) => value[key], object)
}

function initData(Vue, vm, options) {
  const mergedDataFn = vm.$options.data
  vm.$options.data = () => {
    vm._form_validation_vm = new Vue({
      data: () => ({ instance: {} }),
    })

    return proxy({
      form: mergedDataFn.call(vm),
      schema: vm.$options[options.schemaKey],
      validator: vm._form_validation_vm.instance,
      hooks: {
        onChanged: validator => {
          Vue.observable(validator)
          watch(vm, vm._form_validation_vm.instance, validator.__form_validation__.path)
        },
      },
    })
  }
}

function watch(vm, $v, path = []) {
  console.log($v)
  const keys = Object.keys(getByPath($v, path))
  console.log(keys)
  for (const key of keys) {
    if (key === '$v') continue
    console.log(vm)
    // vm.$watch(path.concat(key).join('.'), (value) => {
    //   console.log(123, value)
    // })
    watch(vm, $v, path.concat(key))
  }
}

function getFormValidationInstance() {
  return this._form_validation_vm.instance
}

export default {
  install: (Vue, options = {}) => {
    options.globalKey = options.globalKey || '$v'
    options.schemaKey = options.schemaKey || 'schema'

    Vue.mixin({
      beforeCreate() {
        if (this.$options[options.schemaKey] === undefined) return

        initData(Vue, this, options)

        this.$options.computed = this.$options.computed || {}
        this.$options.computed[options.globalKey] = getFormValidationInstance
      },

      created() {
        if (this.$options[options.schemaKey] === undefined) return

        // watch(this, this._form_validation_vm.instance)
      },

      beforeDestroy() {
        if (this.$options[options.schemaKey] === undefined) return

        this._form_validation_vm.$destroy()
        this._form_validation_vm = null
      },
    })
  },
}
