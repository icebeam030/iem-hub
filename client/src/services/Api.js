// the front-end calls services to post endpoints to the back-end

import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}
