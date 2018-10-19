import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import IEMBrowser from '@/components/IEMBrowser.vue'
import CreateIEM from '@/components/CreateIEM.vue'
import EditIEM from '@/components/EditIEM.vue'
import DeleteIEM from '@/components/DeleteIEM.vue'
import store from '@/store'

Vue.use(Router)

// define navigation guards
const userNotAuthenticated = (to, from, next) => {
  if (store.state.isUserLoggedIn) {
    next({ name: 'iem-browser' })
    return
  }
  next()
}

const userAuthenticated = (to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    next({ name: 'login' })
    return
  }
  next()
}

const userIsAdmin = (to, from, next) => {
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
