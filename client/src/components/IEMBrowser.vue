<template>
  <v-container grid-list-xl>
    <v-card class="elevation-3">
      <v-toolbar dark dense color="blue accent-4">
        <v-icon>list</v-icon>
        <v-toolbar-title>IEM Hub</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$store.state.isUserAdmin"
          light
          small
          :to="{ name: 'iem-create' }"
        >
          New
        </v-btn>
      </v-toolbar>

      <div v-if="error">
        <br>
        <v-btn block large color="error">{{ error }}</v-btn>
      </div>

      <v-layout row wrap justify-center>
        <v-flex v-for="iem in iems" :key="iem.id" xs12 sm8 md6 lg4>
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
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (search) {
        this.error = null
        try {
          this.iems = (await IEMService.index(search)).data
        } catch (err) {
          this.error = err.response.data.error
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
