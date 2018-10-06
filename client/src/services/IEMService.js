// post various endpoints to the server

import Api from '@/services/Api'

export default {
  index () {
    return Api().get('iems')
  },
  show (iemId) {
    return Api().get(`iems/${iemId}`)
  },
  post (iem) {
    return Api().post('iems', iem)
  },
  put (iem) {
    return Api().put(`iems/${iem.id}`, iem)
  }
}
