<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex v-for="iem in iems" :key="iem.id" xs4 sm6>
        <v-card class="elevation-8">
          <v-img
            :src=iem.imageUrl
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline mb-0">{{ iem.name }}</div>
              <div class="subheading mb-0">$ {{ iem.price }}</div>
              <div>Average Rating: {{ averageRating }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">
              <v-icon>favorite_border</v-icon>
            </v-btn>
            <v-btn flat color="orange">
              <v-icon>comment</v-icon>
            </v-btn>
            <v-rating v-model="rating" half-increments></v-rating>
            <v-spacer></v-spacer>
            <v-btn dark color="blue accent-2"
              :to="{ name: 'iem-edit', params: { iemId: iem.id }}">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import IEMService from '@/services/IEMService'

export default {
  data () {
    return {
      iems: [],
      rating: 3.5,
      averageRating: 0
    }
  },
  async mounted () {
    // fetch all iems from backend
    this.iems = (await IEMService.index()).data
  }
}
</script>

<style>

</style>
