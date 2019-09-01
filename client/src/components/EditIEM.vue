<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar dark color="pink accent-4">
            <v-toolbar-title>Edit IEM</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="$router.go(-1)">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" ref="form" autocomplete="off">
              <v-text-field
                v-model="iem.brand"
                label="Brand"
                color="blue-grey darken-3"
                prepend-icon="list"
                :rules="[(v) => !!v || 'Required']"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="iem.name"
                label="Name"
                color="blue-grey darken-3"
                prepend-icon="info"
                :rules="[(v) => !!v || 'Required']"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="iem.price"
                label="Price"
                color="blue-grey darken-3"
                prepend-icon="attach_money"
                :rules="priceRules"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="iem.imageUrl"
                label="Image URL"
                color="blue-grey darken-3"
                prepend-icon="link"
                :rules="[(v) => !!v || 'Required']"
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
                color="pink accent-4"
                @click="editIEM"
              >
                Save
              </v-btn>
              <v-btn @click="clear">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
        (v) => !!v || 'Required',
        (v) => v && parseInt(v) >= 0 || 'Price should be a positive integer'
      ]
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    async editIEM () {
      this.error = null
      try {
        await IEMService.put(this.iem)
        this.$router.push({ name: 'iem-browser' })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  async mounted () {
    this.error = null
    // fetch IEM info from backend
    try {
      const iemId = this.$route.params.iemId
      this.iem = (await IEMService.show(iemId)).data
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style>

</style>
