<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="pink accent-4" dark>
            <v-toolbar-title>Create IEM</v-toolbar-title>
            <v-spacer />
            <v-btn text @click="$router.push({ name: 'iem-hub' })">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="true"
              autocomplete="off"
            >
              <!-- <ValidationProvider v-slot="{ errors }" rules="required"> -->
              <v-text-field
                v-model="iem.brand"
                :rules="[(v) => !!v || 'This field is required']"
                color="blue-grey darken-3"
                label="Brand"
                prepend-icon="list"
              />
              <!-- </ValidationProvider> -->
              <v-text-field
                v-model="iem.name"
                :rules="[(v) => !!v || 'This field is required']"
                color="blue-grey darken-3"
                label="Name"
                prepend-icon="info"
              />
              <v-text-field
                v-model="iem.price"
                :rules="priceRules"
                color="blue-grey darken-3"
                label="Price"
                prepend-icon="attach_money"
              />
              <v-text-field
                v-model="iem.imageUrl"
                :rules="[(v) => !!v || 'This field is required']"
                color="blue-grey darken-3"
                label="Image URL"
                prepend-icon="link"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="error" block color="error" large>
              {{ error }}
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :dark="valid"
              :disabled="!valid"
              color="pink accent-4"
              @click="createIem"
            >
              Create
            </v-btn>
            <v-btn @click="clear">
              Clear
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { ValidationProvider, extend } from 'vee-validate'
// import { required } from 'vee-validate/dist/rules'
import IemService from '@/services/IemService'

// extend('required', {
//   ...required,
//   message: 'This field is required'
// })

export default {
  // components: {
  //   ValidationProvider
  // },
  data: () => ({
    iem: {},
    error: null,
    valid: false,
    priceRules: [
      (v) => !!v || 'This field is required',
      (v) => (v && parseInt(v) >= 0) || 'Price should be a positive integer'
    ]
  }),
  methods: {
    clear() {
      this.$refs.form.reset()
    },
    async createIem() {
      this.error = null
      try {
        await IemService.post(this.iem)
        this.$router.push({ name: 'iem-hub' })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style>

</style>
