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

          <ValidationObserver ref="form" v-slot="{ valid }">
            <v-card-text>
              <ValidationProvider v-slot="{ errors }" mode="eager" rules="required">
                <v-text-field
                  v-model="iem.brand"
                  :error-messages="errors[0]"
                  autofocus
                  color="blue-grey darken-3"
                  label="Brand"
                  prepend-icon="list"
                />
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="eager" rules="required">
                <v-text-field
                  v-model="iem.name"
                  :error-messages="errors[0]"
                  color="blue-grey darken-3"
                  label="Name"
                  prepend-icon="info"
                />
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" mode="eager" rules="required|numeric">
                <v-text-field
                  v-model="iem.price"
                  :error-messages="errors[0]"
                  color="blue-grey darken-3"
                  label="Price"
                  prepend-icon="attach_money"
                />
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  v-model="iem.imageUrl"
                  :error-messages="errors[0]"
                  color="blue-grey darken-3"
                  label="Image URL"
                  prepend-icon="link"
                />
              </ValidationProvider>
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
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, numeric } from 'vee-validate/dist/rules'
import IemService from '@/services/IemService'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('numeric', {
  ...numeric,
  message: 'Price should be a numeric value'
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    iem: {},
    error: null
  }),
  methods: {
    clear() {
      this.iem.brand = ''
      this.iem.name = ''
      this.iem.price = ''
      this.iem.imageUrl = ''
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
