<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue accent-4">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" ref="form" autocomplete="off">
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="email"
                :rules="emailRules"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="lock"
                hint="8 to 20 characters in length"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                @click:append="showPassword = !showPassword"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                prepend-icon="lock"
                :error-messages="isPasswordMatched()"
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
                @click="register"
              >
                Register
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
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 8 && v.length <= 20 || 'Password should be 8 to 20 characters long',
        (v) => v && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(v) || 'Your password should contain:<br>1. At least 1 lowercase letter<br>2. At least 1 uppercase letter<br>3. At least 1 number'
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
