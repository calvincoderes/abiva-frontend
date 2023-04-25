import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Change Password
  cp: { status: 0, payload: null },
  setCp: action((state, payload = null) => {
    state.cp = payload
  }),
  postCp: thunk(async (actions, data = {}) => {
    actions.setCp({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/change_password`, data)
      .then(response => actions.setCp({ status: 2, payload: response.data }))
      .catch(e => actions.setCp({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
