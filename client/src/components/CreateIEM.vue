<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue accent-2">
              <v-toolbar-title>Create IEM</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" autocomplete="off">
                <v-text-field
                  prepend-icon="email"
                  label="Brand"
                  v-model="iem.brand"
                  :rules="[v => !!v || 'Brand is required']"
                  required
                >
                </v-text-field>
                <v-text-field
                  prepend-icon="email"
                  label="Name"
                  v-model="iem.name"
                  :rules="[v => !!v || 'Name is required']"
                  required
                >
                </v-text-field>
                <v-text-field
                  prepend-icon="email"
                  label="Price"
                  v-model="iem.price"
                  :rules="[v => !!v || 'Price is required']"
                  required
                >
                </v-text-field>
                <v-text-field
                  prepend-icon="email"
                  label="Image URL"
                  v-model="iem.imageUrl"
                  :rules="[v => !!v || 'Image URL is required']"
                  required
                >
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-toolbar
                v-if="error"
                dense
                dark
                v-model="error"
                color="error"
              >
                {{ error }}
              </v-toolbar>
            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn color="success" @click="createIEM" :disabled="!valid">Create</v-btn>
                <v-btn @click="clear">Clear</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import IEMService from '@/services/IEMService'

export default {
  data () {
    return {
      iem: {
        brand: null,
        name: null,
        price: null,
        imageUrl: null
      },
      error: null,
      valid: false
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
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
