import Api from '@/services/Api'

export default {
  // show current user's rating of a certain IEM
  index(iemId) {
    return Api().get('ratings', {
      params: { iemId: iemId }
    })
  },

  // show average rating of an IEM
  show(iemId) {
    return Api().get(`ratings/${iemId}`)
  },

  // rate a certain IEM for the current user
  put(rating) {
    return Api().put('ratings', rating)
  },

  // delete all rating entries of a certain IEM
  delete(iemId) {
    return Api().delete(`ratings/${iemId}`)
  }
}
