// post various endpoints to the server

import Api from '@/services/Api'

export default {
  index (rating) {
    return Api().get('ratings', {
      params: {
        userId: rating.userId,
        iemId: rating.iemId
      }
    })
  },
  show (iemId) {
    return Api().get(`ratings/${iemId}`)
  },
  put (rating) {
    return Api().put('ratings', rating)
  }
}
