import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const Register = () => import('@/components/Register')
const Login = () => import('@/components/Login')
const IEMBrowser = () => import('@/components/IEMBrowser')
const CreateIEM = () => import('@/components/CreateIEM')
const EditIEM = () => import('@/components/EditIEM')
const DeleteIEM = () => import('@/components/DeleteIEM')

Vue.use(Router)

// define navigation guards
const userNotAuthenticated = (to, from, next) => {
  if (store.state.isUserLoggedIn) {
    return next({ name: 'iem-browser' })
  }
  return next()
}

const userAuthenticated = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    return next({ name: 'login' })
  }
  return next()
}

const userIsAdmin = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    return next({ name: 'login' })
  } else if (store.state.isUserLoggedIn && !store.state.isUserAdmin) {
    return next({ name: 'iem-browser' })
  }
  return next()
}

export default new Router({
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
      name: 'iem-browser',
      component: IEMBrowser,
      beforeEnter: userAuthenticated
    },
    {
      path: '/iem/create',
      name: 'iem-create',
      component: CreateIEM,
      beforeEnter: userIsAdmin
    },
    {
      path: '/iem/edit/:iemId',
      name: 'iem-edit',
      component: EditIEM,
      beforeEnter: userIsAdmin
    },
    {
      path: '/iem/delete/:iemId',
      name: 'iem-delete',
      component: DeleteIEM,
      beforeEnter: userIsAdmin
    }
  ]
})
