<template>
  <v-content>
    <v-container v-if="$store.state.isUserLoggedIn" grid-list-xl>
      <v-card>
        <v-toolbar dark color="blue accent-4">
          <v-icon>menu</v-icon>
          <v-toolbar-title>IEM Hub</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn light :to="{ name: 'iem-create' }">Create</v-btn>
        </v-toolbar>

        <v-layout row wrap>
          <v-flex v-for="iem in iems" :key="iem.id" xs4 sm6 md4>
            <i-e-m-card :iem="iem"></i-e-m-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import IEMService from '@/services/IEMService'
import IEMCard from '@/components/IEMCard'

export default {
  data () {
    return {
      iems: []
    }
  },
  // TODO: refactor this to computed property
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        // fetch IEMs from backend
        this.iems = (await IEMService.index(value)).data
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
