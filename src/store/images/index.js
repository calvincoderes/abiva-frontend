import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Create Image
  createdImage: { status: 0, payload: null },
  setCreatedImage: action((state, payload = null) => {
    state.createdImage = payload
  }),
  createImage: thunk(async (actions, data = {}) => {
    actions.setCreatedImage({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/images`, data)
      .then(response => actions.setCreatedImage({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedImage({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
