import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Student Assessments
  studentA: { status: 0, payload: null },
  setStudentA: action((state, payload = null) => {
    state.studentA = payload
  }),
  getStudentA: thunk(async (actions, params = {}) => {
    actions.setStudentA({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/user_assessments`, { params })
      .then(response => actions.setStudentA({ status: 2, payload: response.data }))
      .catch(e => actions.setStudentA({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Student Assessment Details
  studentAD: { status: 0, payload: null },
  setStudentAD: action((state, payload = null) => {
    state.studentAD = payload
  }),
  getStudentAD: thunk(async (actions, params = {}) => {
    actions.setStudentAD({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/user_assessments/${params.id}`, { params })
      .then(response => actions.setStudentAD({ status: 2, payload: response.data }))
      .catch(e => actions.setStudentAD({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Update Student Assessment Details
  updatedStudentAD: { status: 0, payload: null },
  setUpdatedStudentAD: action((state, payload = null) => {
    state.updatedStudentAD = payload
  }),
  updateStudentAD: thunk(async (actions, data = {}) => {
    actions.setUpdatedStudentAD({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/user_assessments/${data.id}`, data)
      .then(response => actions.setUpdatedStudentAD({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedStudentAD({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
