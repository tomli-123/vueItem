import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import http from '@/utlis/axi.js'
import router from '@/router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
