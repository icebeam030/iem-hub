// post various endpoints to the server

import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('iems', { params: { search: search } })
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
