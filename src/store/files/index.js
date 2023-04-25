import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Create File
  createdFile: { status: 0, payload: null },
  setCreatedFile: action((state, payload = null) => {
    state.createdFile = payload
  }),
  createFile: thunk(async (actions, data = {}) => {
    actions.setCreatedFile({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/files`, data)
      .then(response => actions.setCreatedFile({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedFile({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
