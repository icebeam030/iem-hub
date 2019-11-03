<template>
  <v-card class="elevation-8">
    <v-img
      aspect-ratio="2.75"
      :src="iem.imageUrl"
    ></v-img>

    <v-card-text class="text--primary">
      <div class="headline">
        {{ iem.brand }}  {{ iem.name }}
      </div>
      <div class="subtitle-1">
        AUD ${{ iem.price }}
      </div>
      <div>Average rating: {{ averageRating }}</div>
    </v-card-text>

    <v-card-actions>
      <v-rating
        v-model="rating"
        background-color="orange lighten-3"
        color="orange lighten-1"
        half-increments
      ></v-rating>
      <v-spacer></v-spacer>
      <v-btn color="pink lighten-1" dark small @click="rateIEM">
        Rate this IEM
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="$store.state.isUserAdmin">
      <v-spacer></v-spacer>
      <v-btn
        color="pink lighten-1"
        text
        :to="{ name: 'iem-delete', params: { iemId: iem.id }}"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn
        color="pink lighten-1"
        text
        :to="{ name: 'iem-edit', params: { iemId: iem.id }}"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="successMessage">
      <v-btn block color="success" large>
        {{ successMessage }}
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="error">
      <v-btn block color="error" large>
        {{ error }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RatingService from '@/services/RatingService'

export default {
  props: {
    iem: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    rating: null,
    averageRating: 'Loading...',
    error: null,
    successMessage: null
  }),
  watch: {
    iem: {
      immediate: true,
      async handler(iem) {
        if (!iem.id) {
          return
        }

        this.error = null
        try {
          const rating = { iemId: iem.id }
          this.rating = (await RatingService.index(rating)).data.rating
          this.averageRating = (await RatingService.show(iem.id)).data.averageRating
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    }
  },
  methods: {
    async rateIEM() {
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
