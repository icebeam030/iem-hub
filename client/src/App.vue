<template>
  <v-app>
    <v-app-bar app color="pink darken-3" dark dense>
      <v-toolbar-items>
        <v-btn text x-large @click="$router.push({ name: 'iem-hub' })">
          IEM HUB
        </v-btn>
      </v-toolbar-items>

      <v-text-field
        v-if="$store.state.isUserLoggedIn"
        v-model="query"
        class="mx-6"
        clearable
        flat
        hide-details
        placeholder="Search"
        prepend-inner-icon="search"
        solo-inverted
      />

      <v-spacer />

      <v-btn v-if="!($store.state.isUserLoggedIn)" :to="{ name: 'login' }" text>
        Login
      </v-btn>
      <v-btn v-if="!($store.state.isUserLoggedIn)" :to="{ name: 'register' }" text>
        Sign Up
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text @click="logout">
        Log Out
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer>
      <v-card width="100%">
        <v-card-actions class="grey darken-3 justify-center white--text">
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
  data: () => ({
    query: ''
  }),

  watch: {
    // only triggers searching 1 second after user finishes typing
    query: debounce(function (value) {
      const route = { name: 'iem-hub' }
      if (value) {
        route.query = { search: value }
      } else {
        route.query = {}
      }
      this.$router.push(route)
    }, 1000)
  },

  methods: {
    logout() {
      this.$store.dispatch('setUser', {
        token: null,
        user: null
      })
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
