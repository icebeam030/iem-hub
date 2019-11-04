import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Register = () => import('@/components/Register')
const Login = () => import('@/components/Login')
const IemHub = () => import('@/components/IemHub')
const IemCreate = () => import('@/components/IemCreate')
const IemEdit = () => import('@/components/IemEdit')
const IemDelete = () => import('@/components/IemDelete')

Vue.use(VueRouter)

// define navigation guards
const userNotAuthenticated = (to, from, next) => {
  if (store.state.isUserLoggedIn) {
    return next({ name: 'iem-hub' })
  }
  next()
}

const userAuthenticated = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    return next({ name: 'login' })
  }
  next()
}

const userIsAdmin = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    return next({ name: 'login' })
  } else if (store.state.isUserLoggedIn && !store.state.isUserAdmin) {
    return next({ name: 'iem-hub' })
  }
  next()
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
    },
    {
      path: '/iem/delete/:iemId',
      name: 'iem-delete',
      component: IemDelete,
      beforeEnter: userIsAdmin
    }
  ]
})
