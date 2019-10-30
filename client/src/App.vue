<template>
  <v-app>
    <v-app-bar app dark dense color="pink darken-3">
      <v-app-bar-nav-icon @click="returnToHome">
        <v-icon>home</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>IEM-Hub</v-toolbar-title>

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
        <v-btn text v-if="!$store.state.isUserLoggedIn" to="login">Login</v-btn>
        <v-btn text v-if="!$store.state.isUserLoggedIn" to="register">Sign Up</v-btn>
        <v-btn text v-if="$store.state.isUserLoggedIn" @click="logout">Log Out</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto">
      <v-col cols="12">
        <v-card>
          <v-card-actions class="grey darken-3 white--text justify-center">
            &copy;2018 —&nbsp;<strong>icebeam030</strong>
          </v-card-actions>
        </v-card>
      </v-col>
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
      if (query !== '') {
        route.query = { search: query }
      }
      this.$router.push(route)
    }, 1000)
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    },
    returnToHome () {
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
