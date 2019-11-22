<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="pink accent-4" dark>
            <v-toolbar-title>Sign up</v-toolbar-title>
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

              <ValidationProvider
                v-slot="{ errors }"
                :rules="passwordRules"
                mode="eager"
                vid="password"
              >
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :error-messages="errors[0]"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  color="blue-grey darken-3"
                  counter
                  hint="At least 1 lower letter, 1 upper letter and 1 digit"
                  label="Password"
                  maxlength="20"
                  prepend-icon="lock"
                  @click:append="showPassword = !showPassword"
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required|confirmed:password"
              >
                <v-text-field
                  v-model="confirmPassword"
                  :error-messages="errors[0]"
                  color="blue-grey darken-3"
                  counter
                  label="Confirm Password"
                  maxlength="20"
                  prepend-icon="lock"
                  type="password"
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
                @click="register"
              >
                Sign up
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
import { confirmed, email, min, max, regex, required } from 'vee-validate/dist/rules'
import AuthenticationService from '@/services/AuthenticationService'

extend('confirmed', {
  ...confirmed,
  message: 'Your passwords do not match'
})

extend('email', {
  ...email,
  message: 'Invalid email address'
})

extend('min', {
  ...min,
  message: 'Password should have a minimum of {length} characters'
})

extend('max', {
  ...max,
  message: 'Password cannot exceed {length} characters'
})

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('regex', {
  ...regex,
  message: 'Your password does not meet the requirements'
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    passwordRules: {
      required: true,
      min: 8,
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      max: 20
    },
    error: null
  }),
  watch: {
    email: debounce(function () {
      this.error = null
    }, 1000, { leading: true })
  },
  methods: {
    async register() {
      this.error = null
      try {
        const response = await AuthenticationService.register({
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
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
