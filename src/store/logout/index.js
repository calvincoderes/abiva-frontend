import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Logout
  logout: { status: 0, payload: null },
  setLogout: action((state, payload = null) => {
    state.logout = payload
  }),
  postLogout: thunk(async (actions, data = {}) => {
    actions.setLogout({ status: 1, payload: null })
    axios.post(`${API_URL}/api/oauth/revoke_token/`, data)
      .then(response => actions.setLogout({ status: 2, payload: response.data }))
      .catch(e => actions.setLogout({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
