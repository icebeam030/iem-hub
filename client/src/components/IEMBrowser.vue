<template>
  <v-container grid-list-xl>
    <v-card>
      <v-toolbar dark color="blue accent-4">
        <v-icon>menu</v-icon>
        <v-toolbar-title>IEM Hub</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn light :to="{ name: 'iem-create' }">Create</v-btn>
      </v-toolbar>

      <v-layout row wrap>
        <v-flex v-for="iem in iems" :key="iem.id" xs4 sm6 md4>
          <v-card class="elevation-8">
            <v-img
              :src=iem.imageUrl
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ iem.brand }}  {{ iem.name }}</div>
                <div class="subheading">$ {{ iem.price }}</div>
                <div>Average Rating: {{ averageRating }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <div class="title ml-2">Rate this IEM</div>
              <v-spacer></v-spacer>
              <v-rating
                color="orange lighten-1"
                background-color="orange lighten-3"
                v-model="rating"
                half-increments>
              </v-rating>
            </v-card-actions>

            <v-card-actions>
              <v-btn flat color="pink">
                <v-icon>favorite_border</v-icon>
              </v-btn>
              <v-btn flat color="blue accent-4">
                <v-icon>comment</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn dark color="blue accent-4"
                :to="{ name: 'iem-edit', params: { iemId: iem.id }}">
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import IEMService from '@/services/IEMService'

export default {
  data () {
    return {
      iems: [],
      rating: 0,
      averageRating: 0
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        // fetch all iems from backend
        this.iems = (await IEMService.index(value)).data
      }
    }
  }
}
</script>

<style>

</style>
