<template>
  <v-container class="grid-list">
    <v-card class="elevation-3">
      <v-toolbar color="blue-grey darken-4" dark dense>
        <v-icon class="mr-2">
          list
        </v-icon>
        <v-toolbar-title>Your Collection</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$store.state.isUserAdmin"
          light
          small
          :to="{ name: 'iem-create' }"
        >
          Add
        </v-btn>
      </v-toolbar>

      <div v-if="error">
        <br>
        <v-btn block color="error" large>
          {{ error }}
        </v-btn>
      </div>

      <v-row justify="center">
        <v-col v-for="iem in iems" :key="iem.id" cols="12" sm="8" md="6" lg="4">
          <i-e-m-card :iem="iem"></i-e-m-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import IEMService from '@/services/IEMService'
import IEMCard from '@/components/IEMCard'

export default {
  components: {
    IEMCard
  },
  data: () => ({
    iems: [],
    error: null
  }),
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler(search) {
        this.error = null
        try {
          this.iems = (await IEMService.index(search)).data
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    }
  }
}
</script>

<style>

</style>
