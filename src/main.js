import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import 'axios-progress-bar/dist/nprogress.css'
import { loadProgressBar } from 'axios-progress-bar'

import '@/plugins/bootstrap-vue'
import '@/plugins/font-awesome'
import App from '@/App.vue'
import router from '@/router'
import { http } from '@/services'

Vue.config.productionTip = false

loadProgressBar({ parent: '#app' }, http)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
