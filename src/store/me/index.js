import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  me: { status: 0, payload: null },
  setMe: action((state, payload = null) => {
    state.me = payload
  }),
  getMe: thunk(async (actions, params = {}) => {
    actions.setMe({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/me`, { params })
      .then(response => actions.setMe({ status: 2, payload: response.data }))
      .catch(e => actions.setMe({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Contents
  meContents: { status: 0, payload: null },
  setMeContents: action((state, payload = null) => {
    state.meContents = payload
  }),
  getMeContents: thunk(async (actions, params = {}) => {
    actions.setMeContents({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/me/contents`, { params })
      .then(response => actions.setMeContents({ status: 2, payload: response.data }))
      .catch(e => actions.setMeContents({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  })
}
