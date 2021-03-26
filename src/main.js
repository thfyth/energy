import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'


import wl from "wl-vue-select";
import "wl-vue-select/lib/wl-vue-select.css"
Vue.use(wl);

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
