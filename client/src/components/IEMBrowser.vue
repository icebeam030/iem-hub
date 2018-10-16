<template>
  <v-container v-if="$store.state.isUserLoggedIn" grid-list-xl>
    <v-card class="elevation-3">
      <v-toolbar dark color="blue accent-4">
        <v-icon>menu</v-icon>
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
        <v-flex v-for="iem in iems" :key="iem.id" sm12 md6 lg4>
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
      error: null
    }
  },
  // TODO: refactor this to computed property
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (search) {
        this.error = null
        if (this.$store.state.isUserLoggedIn) {
          // fetch IEMs from backend
          try {
            this.iems = (await IEMService.index(search)).data
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
