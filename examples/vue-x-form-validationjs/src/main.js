import Vue from 'vue'
import FormValidation from './install'

import App from './App.vue'

Vue.use(FormValidation)

new Vue({
  render: h => h(App),
}).$mount('#app')
