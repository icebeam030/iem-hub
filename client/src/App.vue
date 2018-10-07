<template>
  <v-app>
    <v-navigation-drawer
      temporary
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      :clipped-left="clipped"
      dark
      color="blue accent-3"
    >
      <v-icon @click.stop="drawer = !drawer">apps</v-icon>

      <v-btn flat large @click="homeButton">
        <v-icon>home</v-icon>
      </v-btn>

      <v-text-field
        class="mt-2"
        flat
        label="Search"
        v-model="search"
        clearable
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn light v-if="!$store.state.isUserLoggedIn" to="login">Login</v-btn>
      <v-btn light v-if="!$store.state.isUserLoggedIn" to="register">Sign Up</v-btn>
      <v-btn flat v-if="$store.state.isUserLoggedIn">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn light v-if="$store.state.isUserLoggedIn" @click="logout">Log Out</v-btn>
    </v-toolbar>

    <v-content>
      <v-toolbar v-if="!$store.state.isUserLoggedIn">
        <v-toolbar-title>Login to start your IEM journey</v-toolbar-title>
      </v-toolbar>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'App',
  data () {
    return {
      clipped: true,
      drawer: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      search: ''
    }
  },
  watch: {
    // only requests to server 1 seconds after finish typing
    search: _.debounce(async function (value) {
      const route = { name: 'iem-browser' }
      if (this.search !== '') {
        route.query = { search: this.search }
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
    homeButton () {
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push({ name: 'iem-browser' })
      } else {
        this.$router.push({ name: 'root' })
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
