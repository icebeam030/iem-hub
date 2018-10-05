<template>
  <v-layout row wrap>
    <v-flex v-for="iem in iems" :key="iem.id" xs4 sm6 offset-sm3>
      <v-card>
        <v-img
          :src=iem.imageUrl
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ iem.name }}</h3>
            <div>$ {{ iem.price }}</div>
            <div>Average Rating: {{ averageRating }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Bookmark</v-btn>
          <v-btn flat color="orange">Comment</v-btn>
          <v-rating v-model="rating" half-increments></v-rating>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import IEMService from '@/services/IEMService'

export default {
  data () {
    return {
      iems: [{
        brand: '64 audio',
        name: 'A18t',
        price: 2999,
        imageUrl: null
      }],
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
