// the front-end calls services to post endpoints to the back-end

import axios from 'axios'
import store from '@/store'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
