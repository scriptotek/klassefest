import Vue from 'vue'
import Router from 'vue-router'
import { HomeView, RecordView } from './views'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/records/:id',
      name: 'record',
      component: RecordView,
      props: true
      // route level code-splitting
      // this generates a separate chunk (record.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "record" */ './views/Record.vue')
    },
    {
      path: '/user/settings',
      name: 'user-settings',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/UserSettings.view.vue')
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.view.vue')
    },
  ]
})
