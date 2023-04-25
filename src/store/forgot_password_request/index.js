import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Forgot Password Request
  fpr: { status: 0, payload: null },
  setFpr: action((state, payload = null) => {
    state.fpr = payload
  }),
  postFpr: thunk(async (actions, data = {}) => {
    actions.setFpr({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/forgot_password_request`, data)
      .then(response => actions.setFpr({ status: 2, payload: response.data }))
      .catch(e => actions.setFpr({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
