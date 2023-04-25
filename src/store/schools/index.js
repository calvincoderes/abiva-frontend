import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Schools
  schools: { status: 0, payload: null },
  setSchools: action((state, payload = null) => {
    state.schools = payload
  }),
  getSchools: thunk(async (actions, params = {}) => {
    actions.setSchools({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/school`, { params })
      .then(response => actions.setSchools({ status: 2, payload: response.data }))
      .catch(e => actions.setSchools({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get School Details
  schoolDetails: { status: 0, payload: null },
  setSchoolDetails: action((state, payload = null) => {
    state.schoolDetails = payload
  }),
  getSchoolDetails: thunk(async (actions, params = {}) => {
    actions.setSchoolDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/school/${params.id}`, { params })
      .then(response => actions.setSchoolDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setSchoolDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create School
  createdSchool: { status: 0, payload: null },
  setCreatedSchool: action((state, payload = null) => {
    state.createdSchool = payload
  }),
  createSchool: thunk(async (actions, data = {}) => {
    actions.setCreatedSchool({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/school/`, data)
      .then(response => actions.setCreatedSchool({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedSchool({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update School
  updatedSchool: { status: 0, payload: null },
  setUpdatedSchool: action((state, payload = null) => {
    state.updatedSchool = payload
  }),
  updateSchool: thunk(async (actions, data = {}) => {
    actions.setUpdatedSchool({ status: 1, payload: null })
    // axios.patch(`${API_URL}/api/v1/school/${data.id}`, data)
    axios.put(`${API_URL}/api/v1/school/${data.id}`, data)
      .then(response => actions.setUpdatedSchool({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedSchool({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete School
  deletedSchool: { status: 0, payload: null },
  setDeletedSchool: action((state, payload = null) => {
    state.deletedSchool = payload
  }),
  deleteSchool: thunk(async (actions, id) => {
    actions.setDeletedSchool({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/school/${id}`)
      .then(response => actions.setDeletedSchool({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedSchool({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
