<template>
  <v-layout row wrap>
    <v-flex v-for="item in items" :key="item.id" xs4 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ item.name }}</h3>
            <div>$ {{ item.price }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Bookmark</v-btn>
          <v-btn flat color="orange">Comment</v-btn>
          <v-rating v-model="rating"></v-rating>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          id: 1,
          name: 'flamenco',
          price: 2000
        },
        {
          id: 2,
          name: 'u18t',
          price: 3000
        }
      ]
    }
  }
}
</script>

<style>

</style>
