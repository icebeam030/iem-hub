import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],

  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    isUserAdmin: false
  },

  mutations: {
    setUser(state, payload) {
      const { token, user } = payload
      state.token = token
      state.isUserLoggedIn = !!token

      state.user = user
      state.isUserAdmin = (user && user.email === 'admin@admin.com')
    }
  },

  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload)
    }
  }
})
