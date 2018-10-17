<template>
  <v-card class="elevation-8">
    <v-img
      :src="iem.imageUrl"
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
      <v-rating
        color="orange lighten-1"
        background-color="orange lighten-3"
        v-model="rating"
        half-increments>
      </v-rating>
      <v-spacer></v-spacer>
      <v-btn dark color="blue accent-4" @click="rateIEM">
        Rate it!
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="$store.state.isUserAdmin">
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="blue accent-4"
        :to="{ name: 'iem-delete', params: { iemId: iem.id }}"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn
        flat
        color="blue accent-4"
        :to="{ name: 'iem-edit', params: { iemId: iem.id }}"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="error">
      <v-btn block large color="error">{{ error }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RatingService from '@/services/RatingService'

export default {
  props: {
    iem: Object
  },
  data () {
    return {
      rating: 0,
      averageRating: 'loading...',
      error: null
    }
  },
  watch: {
    iem: {
      immediate: true,
      async handler (iem) {
        if (!iem.id || !this.$store.state.isUserLoggedIn) {
          return
        }

        this.error = null
        try {
          const rating = {
            userId: this.$store.state.user.id,
            iemId: iem.id
          }
          this.rating = (await RatingService.index(rating)).data.rating
          this.averageRating = (await RatingService.show(iem.id)).data.averageRating
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    }
  },
  methods: {
    async rateIEM () {
      try {
        this.error = null
        const rating = {
          userId: this.$store.state.user.id,
          iemId: this.iem.id,
          rating: this.rating
        }
        await RatingService.put(rating)
        this.averageRating = (await RatingService.show(this.iem.id)).data.averageRating
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style>

</style>
