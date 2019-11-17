<template>
  <v-card class="elevation-8">
    <v-img
      :src="iem.imageUrl"
      aspect-ratio="2.75"
    />

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
      />
      <v-spacer />
      <v-btn color="pink lighten-1" dark small @click="rateIem">
        Rate this IEM
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="$store.state.isUserAdmin">
      <v-spacer />
      <v-btn
        :to="{ name: 'iem-delete', params: { iemId: iem.id }}"
        color="pink lighten-1"
        text
      >
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'iem-edit', params: { iemId: iem.id }}"
        color="pink lighten-1"
        text
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
    successMessage: null,
    error: null
  }),
  async mounted() {
    this.error = null
    const iemId = this.iem.id
    if (!iemId) {
      this.error = 'Something went wrong'
      return
    }

    try {
      this.rating = (await RatingService.index(iemId)).data.rating
      this.averageRating = (await RatingService.show(iemId)).data.averageRating
    } catch (err) {
      this.error = err.response.data.error
    }
  },
  methods: {
    async rateIem() {
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
