import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import IEMBrowser from './components/IEMBrowser.vue'
import CreateIEM from './components/CreateIEM.vue'
import EditIEM from './components/EditIEM.vue'
import DeleteIEM from './components/DeleteIEM.vue'
import store from './store'

Vue.use(Router)

// define navigation guards
const ifNotAuthenticated = (to, from, next) => {
  if (store.state.isUserLoggedIn) {
    next({ name: 'iem-browser' })
    return
  }
  next()
}

const ifAuthenticated = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    next({ name: 'login' })
    return
  }
  next()
}

const ifUserIsAdmin = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    next({ name: 'login' })
    return
  } else if (store.state.isUserLoggedIn && !store.state.isUserAdmin) {
    next({ name: 'iem-browser' })
    return
  }
  next()
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
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/iem',
      name: 'iem-browser',
      component: IEMBrowser,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/iem/create',
      name: 'iem-create',
      component: CreateIEM,
      beforeEnter: ifUserIsAdmin
    },
    {
      path: '/iem/edit/:iemId',
      name: 'iem-edit',
      component: EditIEM,
      beforeEnter: ifUserIsAdmin
    },
    {
      path: '/iem/delete/:iemId',
      name: 'iem-delete',
      component: DeleteIEM,
      beforeEnter: ifUserIsAdmin
    }
  ]
})
