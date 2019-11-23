import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Register = () => import('@/components/Register')
const Login = () => import('@/components/Login')
const IemHub = () => import('@/components/IemHub')
const IemCreate = () => import('@/components/IemCreate')
const IemEdit = () => import('@/components/IemEdit')

Vue.use(VueRouter)

// define navigation guards
const userNotAuthenticated = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    next()
  } else {
    next({ name: 'iem-hub' })
  }
}

const userAuthenticated = (to, from, next) => {
  if (store.state.isUserLoggedIn) {
    next()
  } else {
    next({ name: 'login' })
  }
}

const userIsAdmin = (to, from, next) => {
  if (store.state.isUserLoggedIn && store.state.isUserAdmin) {
    next()
  } else if (store.state.isUserLoggedIn && !store.state.isUserAdmin) {
    next({ name: 'iem-hub' })
  } else {
    next({ name: 'login' })
  }
}

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: userNotAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: userNotAuthenticated
    },
    {
      path: '/iem',
      name: 'iem-hub',
      component: IemHub,
      beforeEnter: userAuthenticated
    },
    {
      path: '/iem/create',
      name: 'iem-create',
      component: IemCreate,
      beforeEnter: userIsAdmin
    },
    {
      path: '/iem/edit/:iemId',
      name: 'iem-edit',
      component: IemEdit,
      beforeEnter: userIsAdmin
    }
  ]
})
