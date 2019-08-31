<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue accent-4">
            <v-toolbar-title>Create IEM</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="$router.go(-1)">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" ref="form" autocomplete="off">
              <v-text-field
                v-model="iem.brand"
                label="Brand"
                prepend-icon="list"
                :rules="[(v) => !!v || 'Brand is required']"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="iem.name"
                label="Name"
                prepend-icon="info"
                :rules="[(v) => !!v || 'Name is required']"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="iem.price"
                label="Price"
                prepend-icon="attach_money"
                :rules="priceRules"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="iem.imageUrl"
                label="Image URL"
                prepend-icon="link"
                :rules="[(v) => !!v || 'Image URL is required']"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="error" block large color="error">{{ error }}</v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
                :dark="valid"
                :disabled="!valid"
                color="blue accent-4"
                @click="createIEM"
              >
                Create
              </v-btn>
              <v-btn @click="clear">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import IEMService from '@/services/IEMService'

export default {
  data () {
    return {
      iem: {},
      error: null,
      valid: false,
      priceRules: [
        (v) => !!v || 'Price is required',
        (v) => v && parseInt(v) >= 0 || 'Price should be a positive integer'
      ]
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    async createIEM () {
      this.error = null
      try {
        await IEMService.post(this.iem)
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
