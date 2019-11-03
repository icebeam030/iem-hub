<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="pink accent-4" dark>
            <v-toolbar-title>Create IEM</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="$router.push({ name: 'iem-browser' })">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" v-model="valid" autocomplete="off">
              <v-text-field
                v-model="iem.brand"
                color="blue-grey darken-3"
                label="Brand"
                prepend-icon="list"
                :rules="[(v) => !!v || 'This field is required']"
              ></v-text-field>
              <v-text-field
                v-model="iem.name"
                color="blue-grey darken-3"
                label="Name"
                prepend-icon="info"
                :rules="[(v) => !!v || 'This field is required']"
              ></v-text-field>
              <v-text-field
                v-model="iem.price"
                color="blue-grey darken-3"
                label="Price"
                prepend-icon="attach_money"
                :rules="priceRules"
              ></v-text-field>
              <v-text-field
                v-model="iem.imageUrl"
                color="blue-grey darken-3"
                label="Image URL"
                prepend-icon="link"
                :rules="[(v) => !!v || 'This field is required']"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="error" block color="error" large>
              {{ error }}
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="pink accent-4"
              :dark="valid"
              :disabled="!valid"
              @click="createIEM"
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
import IEMService from '@/services/IEMService'

export default {
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
    async createIEM() {
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
