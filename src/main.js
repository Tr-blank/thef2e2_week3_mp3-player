import Vue from 'vue'
import App from './App.vue'

import * as filters from '@/filters'
import ga from 'vue-ga'

Vue.config.productionTip = false

ga(collect => {
  collect(location.pathname + location.hash)
}, 'UA-62416681-1')

Vue.config.productionTip = false

Object
  .keys(filters)
  .forEach(key => {
    Vue.filter(key, filters[key])
  })

new Vue({
  render: h => h(App)
}).$mount('#app')
