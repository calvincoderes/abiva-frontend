import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Student Modules
  studentM: { status: 0, payload: null },
  setStudentM: action((state, payload = null) => {
    state.studentM = payload
  }),
  getStudentM: thunk(async (actions, params = {}) => {
    actions.setStudentM({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/student_modules`, { params })
      .then(response => actions.setStudentM({ status: 2, payload: response.data }))
      .catch(e => actions.setStudentM({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Student Module Details
  studentMD: { status: 0, payload: null },
  setStudentMD: action((state, payload = null) => {
    state.studentMD = payload
  }),
  getStudentMD: thunk(async (actions, params = {}) => {
    actions.setStudentMD({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/student_modules/${params.id}`, { params })
      .then(response => actions.setStudentMD({ status: 2, payload: response.data }))
      .catch(e => actions.setStudentMD({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Update Student Assessment Details
  updatedStudentMD: { status: 0, payload: null },
  setUpdatedStudentMD: action((state, payload = null) => {
    state.updatedStudentMD = payload
  }),
  updateStudentMD: thunk(async (actions, data = {}) => {
    actions.setUpdatedStudentMD({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/student_modules/${data.id}`, data)
      .then(response => actions.setUpdatedStudentMD({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedStudentMD({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
