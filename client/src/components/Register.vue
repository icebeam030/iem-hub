<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="pink accent-4">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" ref="form" autocomplete="off">
              <v-text-field
                v-model="email"
                label="Email"
                color="blue-grey darken-3"
                prepend-icon="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                color="blue-grey darken-3"
                prepend-icon="lock"
                counter
                maxlength="20"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                color="blue-grey darken-3"
                prepend-icon="lock"
                counter
                maxlength="20"
                :error-messages="isPasswordMatched()"
                required
              ></v-text-field>
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
                @click="register"
              >
                Register
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
import AuthenticationService from '@/services/AuthenticationService'
import _ from 'lodash'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      error: null,
      valid: false,
      emailRules: [
        (v) => !!v || 'Required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid email'
      ],
      passwordRules: [
        (v) => !!v || 'Required',
        (v) => v && v.length >= 8 || 'At least 8 characters',
        (v) => v && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(v) ||
          'At least:<br>1 lowercase letter<br>1 uppercase letter<br>1 number'
      ]
    }
  },
  watch: {
    email: _.debounce(function () {
      this.error = null
    }, 500)
  },
  methods: {
    async register () {
      if (this.$refs.form.validate()) {
        this.error = null
        try {
          const response = await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({ name: 'iem-browser' })
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    isPasswordMatched () {
      return (this.password === this.confirmPassword) ? '' : 'Your passwords do not match'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
