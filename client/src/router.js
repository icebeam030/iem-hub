import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import IEMBrowser from './components/IEMBrowser.vue'
import CreateIEM from './components/CreateIEM.vue'
import EditIEM from './components/EditIEM.vue'
import DeleteIEM from './components/DeleteIEM.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'root'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/iem',
      name: 'iem-browser',
      component: IEMBrowser
    },
    {
      path: '/iem/create',
      name: 'iem-create',
      component: CreateIEM
    },
    {
      path: '/iem/edit/:iemId',
      name: 'iem-edit',
      component: EditIEM
    },
    {
      path: '/iem/delete/:iemId',
      name: 'iem-delete',
      component: DeleteIEM
    }
  ]
})
