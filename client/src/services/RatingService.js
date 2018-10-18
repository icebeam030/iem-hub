import Api from '@/services/Api'

export default {
  index (rating) {
    return Api().get('ratings', {
      params: {
        iemId: rating.iemId
      }
    })
  },
  show (iemId) {
    return Api().get(`ratings/${iemId}`)
  },
  put (rating) {
    return Api().put('ratings', rating)
  },
  delete (iemId) {
    return Api().delete(`ratings/${iemId}`)
  }
}
