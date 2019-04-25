<template>
  <v-app>
    <v-toolbar app dark dense color="blue accent-3">
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

      <v-btn light small v-if="!$store.state.isUserLoggedIn" to="login">Login</v-btn>
      <v-btn light small v-if="!$store.state.isUserLoggedIn" to="register">Sign Up</v-btn>
      <v-btn light small v-if="$store.state.isUserLoggedIn" @click="logout">Log Out</v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto">
      <v-flex xs12>
        <v-card>
          <v-card-actions class="grey darken-3 white--text justify-center">
            &copy;2018 —&nbsp;<strong>icebeam030</strong>
          </v-card-actions>
        </v-card>
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
    // only send request to server 1 seconds after finish typing
    search: _.debounce(async function (search) {
      let route = { name: 'iem-browser' }
      if (search !== '') {
        route.query = { search: search }
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
