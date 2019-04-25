<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue accent-4">
            <v-toolbar-title>Delete this IEM?</v-toolbar-title>
          </v-toolbar>

          <v-card-actions></v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue accent-4" dark @click="deleteIEM">Yes</v-btn>
            <v-btn color="blue accent-4" flat @click="$router.go(-1)">Cancel</v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn v-if="error" block large color="error">{{ error }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import IEMService from '@/services/IEMService'
import RatingService from '@/services/RatingService'

export default {
  data () {
    return {
      error: null
    }
  },
  methods: {
    async deleteIEM () {
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
