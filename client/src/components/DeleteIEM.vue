<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="pink accent-4" dark>
            <v-toolbar-title>Delete this IEM?</v-toolbar-title>
          </v-toolbar>

          <v-card-actions></v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink accent-4" dark @click="deleteIEM">
              Yes
            </v-btn>
            <v-btn color="pink accent-4" text @click="$router.push({ name: 'iem-browser' })">
              Cancel
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn v-if="error" block color="error" large>
              {{ error }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IEMService from '@/services/IEMService'
import RatingService from '@/services/RatingService'

export default {
  data: () => ({
    error: null
  }),
  methods: {
    async deleteIEM() {
      this.error = null
      const iemId = this.$route.params.iemId
      try {
        await IEMService.delete(iemId)
        await RatingService.delete(iemId)
        this.$router.push({ name: 'iem-browser' })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style>

</style>
