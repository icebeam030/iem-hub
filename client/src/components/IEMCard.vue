<template>
  <v-card class="elevation-8">
    <v-img
      :src="iem.imageUrl"
      aspect-ratio="2.75"
    ></v-img>

    <v-card-text>
      <div class="text--primary">
        <div class="headline">{{ iem.brand }}  {{ iem.name }}</div>
        <div class="subtitle-1">$ {{ iem.price }}</div>
        <div>Average Rating: {{ averageRating }}</div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-rating
        v-model="rating"
        color="orange lighten-1"
        background-color="orange lighten-3"
        half-increments
      >
      </v-rating>
      <v-spacer></v-spacer>
      <v-btn dark small color="pink accent-4" @click="rateIEM">
        Rate it!
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="$store.state.isUserAdmin">
      <v-spacer></v-spacer>
      <v-btn
        text
        color="pink accent-4"
        :to="{ name: 'iem-delete', params: { iemId: iem.id }}"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn
        text
        color="pink accent-4"
        :to="{ name: 'iem-edit', params: { iemId: iem.id }}"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="successMessage">
      <v-btn block large color="success">{{ successMessage }}</v-btn>
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
      rating: null,
      averageRating: 'loading...',
      error: null,
      successMessage: null
    }
  },
  watch: {
    iem: {
      immediate: true,
      async handler (iem) {
        if (!iem.id) {
          return
        }

        this.error = null
        try {
          const rating = {
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
      this.error = null
      this.successMessage = null
      const rating = {
        iemId: this.iem.id,
        rating: this.rating
      }
      try {
        await RatingService.put(rating)
        this.successMessage = 'Rating successful'
        setTimeout(() => {
          this.successMessage = null
        }, 1000)
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
