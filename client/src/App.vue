<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
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
      color="blue darken-1"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn flat large to="root">IEM-HUB</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat v-if="!$store.state.isUserLoggedIn" to="login">Login</v-btn>
      <v-btn flat v-if="!$store.state.isUserLoggedIn" to="register">Sign Up</v-btn>
      <v-btn flat v-if="$store.state.isUserLoggedIn" @click="logout">Log Out</v-btn>
    </v-toolbar>

    <v-content>
      <v-toolbar>
        <v-toolbar-title>Login to start using</v-toolbar-title>
      </v-toolbar>
      <iem-browser />
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 Zheyang Zheng</span>
    </v-footer>
  </v-app>
</template>

<script>
import IemBrowser from '@/components/IemBrowser.vue'

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'IEM Hub'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'root' })
    }
  },
  components: {
    IemBrowser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
