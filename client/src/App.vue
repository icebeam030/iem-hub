<template>
  <v-app>
    <v-app-bar app dark dense color="pink darken-3">
      <v-toolbar-items>
        <v-btn text @click="returnToHome">
          Home
        </v-btn>
      </v-toolbar-items>

      <v-text-field
        v-if="$store.state.isUserLoggedIn"
        v-model="search"
        placeholder="Search"
        class="mx-6"
        clearable
        hide-details
        prepend-inner-icon="search"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" text to="login">
          Login
        </v-btn>
        <v-btn v-if="!$store.state.isUserLoggedIn" text to="register">
          Sign Up
        </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" text @click="logout">
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer>
      <v-card width="100%">
        <v-card-actions class="grey darken-3 white--text justify-center">
          <div>
            &copy; {{ new Date().getFullYear() }} - <strong>icebeam030</strong>
          </div>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { debounce } from 'lodash-es'

export default {
  name: 'App',
  data: () => ({
    search: ''
  }),
  watch: {
    // only send request to server 1 second after user finishes typing
    search: debounce(function (query) {
      const route = { name: 'iem-browser' }
      if (query) {
        route.query = { search: query }
      } else {
        route.query = {}
      }
      this.$router.push(route)
    }, 1000)
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    },
    returnToHome() {
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push({ name: 'iem-browser' })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
