import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  years: { status: 0, payload: null },
  setYears: action((state, payload = null) => {
    state.years = payload
  }),
  getYears: thunk(async (actions, params = {}) => {
    actions.setYears({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/year_level`, { params })
      .then(response => actions.setYears({ status: 2, payload: response.data }))
      .catch(e => actions.setYears({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Year/Level
  createdYear: { status: 0, payload: null },
  setCreatedYear: action((state, payload = null) => {
    state.createdYear = payload
  }),
  createYear: thunk(async (actions, data = {}) => {
    actions.setCreatedYear({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/year_level/`, data)
      .then(response => actions.setCreatedYear({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedYear({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Year/Level
  updatedYear: { status: 0, payload: null },
  setUpdatedYear: action((state, payload = null) => {
    state.updatedYear = payload
  }),
  updateYear: thunk(async (actions, data = {}) => {
    actions.setUpdatedYear({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/year_level/${data.id}`, data)
      .then(response => actions.setUpdatedYear({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedYear({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Year/Level
  deletedYear: { status: 0, payload: null },
  setDeletedYear: action((state, payload = null) => {
    state.deletedYear = payload
  }),
  deleteYear: thunk(async (actions, id) => {
    actions.setDeletedYear({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/year_level/${id}`)
      .then(response => actions.setDeletedYear({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedYear({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
