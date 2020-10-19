import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Article from '@/views/article.vue'
import Fans from '@/views/fans.vue'
import Fault from '@/views/fault.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/article', component: Article },
        { path: '/fans', component: Fans }
      ]
    },
    { path: '*', component: Fault }
  ]
})
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('userInfo')
  if (to.path === '/login' || userInfo) {
    next()
  } else {
    next('/login')
  }
})
export default router
