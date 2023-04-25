import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  samples: { status: 0, payload: null },
  setSamples: action((state, payload = null) => {
    state.samples = payload
  }),
  getSamples: thunk(async (actions, params = {}) => {
    actions.setSamples({ status: 1, payload: null })
    axios.get(`${API_URL}/api/users`, { params })
      .then(response => actions.setSamples({ status: 2, payload: response.data }))
      .catch(e => actions.setSamples({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Sample
  createdSample: { status: 0, payload: null },
  setCreatedSample: action((state, payload = null) => {
    state.createdSample = payload
  }),
  createSample: thunk(async (actions, data = {}) => {
    actions.setCreatedSample({ status: 1, payload: null })
    axios.post(`${API_URL}/api/users`, data)
      .then(response => actions.setCreatedSample({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedSample({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
