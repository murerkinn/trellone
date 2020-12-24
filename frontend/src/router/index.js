import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'

import Dashboard from '../views/Dashboard.vue'
import Panel from '../views/Panel.vue'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/register',
        name: 'register',
        meta: { layout: 'auth' },
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/dashboard')
          return next()
        }
      },
      {
        path: '/login',
        name: 'login',
        meta: { layout: 'auth' },
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.account.user) return next('/dashboard')
          return next()
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { layout: 'dashboard' },
        component: Dashboard,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next('/login')
          return next()
        }
      },
      {
        path: '/panels/:panelId',
        name: 'panel',
        meta: { layout: 'panel' },
        component: Panel,
        beforeEnter(to, from, next) {
          if (!store.state.account.user) return next('/login')
          return next()
        }
      }
    ]
  })
}
