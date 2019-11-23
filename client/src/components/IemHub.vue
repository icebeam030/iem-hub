<template>
  <v-container class="grid-list">
    <v-card class="elevation-3">
      <v-toolbar color="blue-grey darken-4" dark dense>
        <v-icon class="mr-2">
          list
        </v-icon>
        <v-toolbar-title>Your Collection</v-toolbar-title>
        <v-spacer />
        <v-btn
          v-if="$store.state.isUserAdmin"
          :to="{ name: 'iem-create' }"
          light
          small
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
          <IemHubItems :iem="iem" @iem-deleted="removeIem" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import IemHubItems from '@/components/IemHubItems'
import IemService from '@/services/IemService'

export default {
  components: {
    IemHubItems
  },
  data: () => ({
    iems: [],
    error: null
  }),
  watch: {
    // when search is an empty object, the full list of IEMs is fetched.
    '$route.query.search': {
      immediate: true,
      async handler(search) {
        this.error = null
        try {
          this.iems = (await IemService.index(search)).data
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    }
  },
  methods: {
    removeIem(iemId) {
      const index = this.iems.findIndex((iem) => iem.id === iemId)
      if (index !== -1) {
        this.iems.splice(index, 1)
      }
    }
  }
}
</script>

<style>

</style>
