<template>
  <div class="register">
    <h1>Register</h1>
    <input v-model="email" type="email" name="email" placeholder="Email" />
    <br>
    <input v-model="password" type="password" name="password" placeholder="Password" />
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import authenticationService from '@/services/authenticationService'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      await authenticationService.register({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
