<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="pink accent-4" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <ValidationObserver ref="form" v-slot="{ valid }">
            <v-card-text>
              <ValidationProvider v-slot="{ errors }" mode="eager" rules="required|email">
                <v-text-field
                  v-model="email"
                  :error-messages="errors[0]"
                  autofocus
                  color="blue-grey darken-3"
                  label="Email"
                  prepend-icon="email"
                />
              </ValidationProvider>

              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :error-messages="errors[0]"
                  :type="showPassword ? 'text' : 'password'"
                  color="blue-grey darken-3"
                  counter
                  label="Password"
                  maxlength="20"
                  prepend-icon="lock"
                  @click:append="showPassword = !showPassword"
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
                @click="login"
              >
                Login
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
import { debounce } from 'lodash-es'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { email, required } from 'vee-validate/dist/rules'
import AuthenticationService from '@/services/AuthenticationService'

extend('email', {
  ...email,
  message: 'Invalid email address'
})

extend('required', {
  ...required,
  message: 'This field is required'
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    error: null
  }),

  watch: {
    email: debounce(function () {
      this.error = null
    }, 1000, { leading: true }),

    password: debounce(function () {
      this.error = null
    }, 1000, { leading: true })
  },

  methods: {
    async login() {
      this.error = null
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        }).data
        this.$store.dispatch('setUser', {
          token: response.token,
          user: response.user
        })
        this.$router.push({ name: 'iem-hub' })
      } catch (err) {
        this.error = err.response.data.error
      }
    },

    clear() {
      this.email = ''
      this.password = ''
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
