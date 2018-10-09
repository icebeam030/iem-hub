<template>
  <v-container v-if="$store.state.isUserLoggedIn" grid-list-xl>
    <v-card class="elevation-3">
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

      <v-toolbar dark color="blue accent-4">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>IEM Hub</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$store.state.isUserAdmin"
          light
          :to="{ name: 'iem-create' }"
        >
          Create
        </v-btn>
      </v-toolbar>

      <div v-if="error">
        <br>
        <v-btn block large color="error">{{ error }}</v-btn>
      </div>

      <v-layout row wrap>
        <v-flex v-for="iem in iems" :key="iem.id" xs4 sm6 md4>
          <i-e-m-card :iem="iem"></i-e-m-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import IEMService from '@/services/IEMService'
import IEMCard from '@/components/IEMCard'

export default {
  data () {
    return {
      iems: [],
      error: null,
      drawer: false,
      clipped: true,
      items: [
        {
          icon: 'favorite_border',
          title: 'Favourites'
        },
        {
          icon: 'scatter_plot',
          title: '64 Audio'
        },
        {
          icon: 'scatter_plot',
          title: 'Jomo Audio'
        }
      ]
    }
  },
  // TODO: refactor this to computed property
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.error = null
        if (this.$store.state.isUserLoggedIn) {
          // fetch IEMs from backend
          try {
            this.iems = (await IEMService.index(value)).data
          } catch (err) {
            this.error = err.response.data.error
          }
        }
      }
    }
  },
  components: {
    IEMCard
  }
}
</script>

<style>

</style>
