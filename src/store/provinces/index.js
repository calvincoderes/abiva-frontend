import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  provinces: { status: 0, payload: null },
  setProvinces: action((state, payload = null) => {
    state.provinces = payload
  }),
  getProvinces: thunk(async (actions, params = {}) => {
    actions.setProvinces({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/provinces`, { params })
      .then(response => actions.setProvinces({ status: 2, payload: response.data }))
      .catch(e => actions.setProvinces({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  })
}
