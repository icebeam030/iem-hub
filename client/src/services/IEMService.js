// post various endpoints to the server

import Api from '@/services/Api'

export default {
  index () {
    return Api().get('iems')
  },
  post (iem) {
    return Api().get('iems', iem)
  }
}
