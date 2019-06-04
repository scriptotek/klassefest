import { assign } from 'lodash/object'
import { http } from '@/services'
import { BibRecord } from '@/models'

export default {

  request(method, path, options = {}) {
    return http.request(assign({
      baseURL: process.env.VUE_APP_LSM_URL,
      url: path,
      method: method,
    }, options))
  },

  async get(id, nz=true) {
    const response = await this.request('get', `/alma/records/${id}`, {
      params: {
        nz: nz && 'true' || 'false',
      }
    })
    return new BibRecord(response.data)
  },

  find(query, operator = 'alma.all_for_ui') {
    return this.request('get', '/alma/search', {
      params: {
        query: `${operator}=${query}`,
        expand_items: 'true',
      }
    })
  }
}
