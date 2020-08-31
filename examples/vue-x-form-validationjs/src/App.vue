<template>
  <div>
    <div>
      <button @click="addDomain">Add</button>
    </div>

    <div v-for="(domain, index) of domains" :key="index">
      <input v-model="domain.value" @input="handleInput(index)" @blur="handleBlur(index)" />
      <button @click.prevent="removeDomain(index)">Delete</button>
      <form-errors :validator="$v.domains[index].value"></form-errors>
    </div>

    <div>
      <button @click="submitForm">Submit</button>
      <button @click="resetForm">Reset</button>
    </div>
  </div>
</template>

<script>
import FormErrors from './components/FormErrors'
import schema from './schema.js'

export default {
  name: 'App',
  components: {
    FormErrors,
  },
  schema,
  data: () => ({
    domains: [{ value: '' }],
  }),
  watch: {
    domains: {
      deep: true,
      handler() {
        // this.$v.$v.validate()
      },
    },
  },
  methods: {
    submitForm() {
      this.$v.$v.touch()
      this.$v.$v.validate()
      if (this.$v.$v.invalid) {
        alert('error submit!!')
        return
      }
      alert('submit!')
    },
    resetForm() {
      this.$v.$v.reset()
    },
    removeDomain(index) {
      this.domains.splice(index, 1)
    },
    addDomain() {
      this.domains.push({ value: '' })
    },
    handleInput(index) {
      this.$v.domains[index].value.$v.validate()
    },
    handleBlur(index) {
      this.$v.domains[index].value.$v.touch()
    },
  },
}
</script>
