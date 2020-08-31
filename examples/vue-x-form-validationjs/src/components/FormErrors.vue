<template>
  <div class="form-errors" v-if="validator.$v.error">
    <div v-for="(error, key) in validator.$v.errors" :key="key">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'form-errors',
  props: {
    validator: {
      required: true,
    },
  },
}
</script>

<style>
.form-errors {
  color: red;
}
</style>
