import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Grading
  gradings: { status: 0, payload: null },
  setGradings: action((state, payload = null) => {
    state.gradings = payload
  }),
  getGradings: thunk(async (actions, params = {}) => {
    actions.setGradings({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/grading_management`, { params })
      .then(response => actions.setGradings({ status: 2, payload: response.data }))
      .catch(e => actions.setGradings({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Grading Details
  gradingDetails: { status: 0, payload: null },
  setGradingDetails: action((state, payload = null) => {
    state.gradingDetails = payload
  }),
  getGradingDetails: thunk(async (actions, params = {}) => {
    actions.setGradingDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/grading_management/${params.id}`, { params })
      .then(response => actions.setGradingDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setGradingDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  })
}
