import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Update Password
  up: { status: 0, payload: null },
  setUp: action((state, payload = null) => {
    state.up = payload
  }),
  postUp: thunk(async (actions, data = {}) => {
    actions.setUp({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/me`, data)
      .then(response => actions.setUp({ status: 2, payload: response.data }))
      .catch(e => actions.setUp({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
