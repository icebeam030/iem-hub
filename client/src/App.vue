<template>
  <v-app>
    <v-toolbar app dark color="blue accent-3">
      <v-toolbar-side-icon large @click="returnToHome">
        <v-icon>home</v-icon>
      </v-toolbar-side-icon>

      <v-btn flat small icon disabled></v-btn>

      <v-text-field
        v-if="$store.state.isUserLoggedIn"
        class="mt-2"
        flat
        label="Search"
        v-model="search"
        clearable
        prepend-inner-icon="search"
        solo-inverted
      >
      </v-text-field>

      <v-spacer></v-spacer>

      <v-btn light v-if="!$store.state.isUserLoggedIn" to="login">Login</v-btn>
      <v-btn light v-if="!$store.state.isUserLoggedIn" to="register">Sign Up</v-btn>
      <v-btn light v-if="$store.state.isUserLoggedIn" @click="logout">Log Out</v-btn>
    </v-toolbar>

    <v-content>
      <div v-if="!$store.state.isUserLoggedIn">
        <br>
        <v-toolbar block large>
          <v-toolbar-title>
            Sign up or Login to start your IEM journey
          </v-toolbar-title>
        </v-toolbar>
      </div>

      <router-view></router-view>
    </v-content>

    <v-footer height="auto">
      <v-flex blue accent-2 white--text text-xs-center py-3 xs12>
        &copy;2018 — <strong>icebeam030</strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'App',
  data () {
    return {
      search: ''
    }
  },
  watch: {
    // only requests to server 1 seconds after finish typing
    search: _.debounce(async function (search) {
      const route = { name: 'iem-browser' }
      if (this.search !== '') {
        route.query = { search: search }
      }
      this.$router.push(route)
    }, 1000)
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'root' })
    },
    returnToHome () {
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push({ name: 'iem-browser' })
      } else {
        this.$router.push({ name: 'root' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
