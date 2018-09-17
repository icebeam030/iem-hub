<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue darken-1">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" autocomplete="off">
                <v-text-field
                  prepend-icon="email"
                  label="Email"
                  v-model="email"
                  :rules="emailRules"
                  required
                >
                </v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  label="Password"
                  v-model="password"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  hint="8 to 20 characters in length"
                  @click:append="showPassword = !showPassword"
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
                <v-btn color="success" @click="login" :disabled="!valid">Login</v-btn>
                <v-btn @click="clear">Clear</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable */
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      showPassword: false,
      error: null,
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 8 || 'Password should be more than 8 characters',
        (v) => v && v.length <= 20 || 'Password should be less than 20 characters'
      ]
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
