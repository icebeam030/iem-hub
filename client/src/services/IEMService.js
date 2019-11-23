import Api from '@/services/Api'

export default {
  // fetch the IEM list to be displayed
  // when search is falsy, fetch the full list
  index(search) {
    return Api().get('iems', {
      params: { search: search }
    })
  },

  // show info of a certain IEM to be edited
  show(iemId) {
    return Api().get(`iems/${iemId}`)
  },

  // add an IEM to the database
  post(iem) {
    return Api().post('iems', iem)
  },

  // update info of a certain IEM
  put(iem) {
    return Api().put(`iems/${iem.id}`, iem)
  },

  // delete a certain IEM
  delete(iemId) {
    return Api().delete(`iems/${iemId}`)
  }
}
