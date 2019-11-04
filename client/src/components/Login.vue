<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="pink accent-4" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                color="blue-grey darken-3"
                label="Email"
                prepend-icon="email"
              />
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                color="blue-grey darken-3"
                counter
                label="Password"
                maxlength="20"
                prepend-icon="lock"
                @click:append="showPassword = !showPassword"
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
              @click="login"
            >
              Login
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
import AuthenticationService from '@/services/AuthenticationService'
import { debounce } from 'lodash-es'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    error: null,
    valid: false,
    emailRules: [
      (v) => !!v || 'This field is required',
      (v) => /^\w+([.-_]?\w+)*@\w+([.-_]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid email'
    ],
    passwordRules: [
      (v) => !!v || 'This field is required',
      (v) => (v && v.length >= 8) || 'At least 8 characters'
    ]
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
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'iem-hub' })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
