import Api from '@/services/Api'

export default {
  // post a register endpoint to the server
  register (credentials) {
    return Api().post('register', credentials)
  }
}
