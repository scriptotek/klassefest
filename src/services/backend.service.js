import { assign } from 'lodash/object'
import { http } from '@/services'

export default {

  async request(method, path, options = {}) {
    let response = await http.request(assign({
      baseURL: process.env.VUE_APP_BACKEND_URL,
      url: path,
      method: method,
    }, options))

    return response.data
  },

}
