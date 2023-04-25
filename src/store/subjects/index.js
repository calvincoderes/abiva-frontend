import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  subjects: { status: 0, payload: null },
  setSubjects: action((state, payload = null) => {
    state.subjects = payload
  }),
  getSubjects: thunk(async (actions, params = {}) => {
    actions.setSubjects({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/subject`, { params })
      .then(response => actions.setSubjects({ status: 2, payload: response.data }))
      .catch(e => actions.setSubjects({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Subject
  createdSubject: { status: 0, payload: null },
  setCreatedSubject: action((state, payload = null) => {
    state.createdSubject = payload
  }),
  createSubject: thunk(async (actions, data = {}) => {
    actions.setCreatedSubject({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/subject/`, data)
      .then(response => actions.setCreatedSubject({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedSubject({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Subject
  updatedSubject: { status: 0, payload: null },
  setUpdatedSubject: action((state, payload = null) => {
    state.updatedSubject = payload
  }),
  updateSubject: thunk(async (actions, data = {}) => {
    actions.setUpdatedSubject({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/subject/${data.id}`, data)
      .then(response => actions.setUpdatedSubject({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedSubject({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Subject
  deletedSubject: { status: 0, payload: null },
  setDeletedSubject: action((state, payload = null) => {
    state.deletedSubject = payload
  }),
  deleteSubject: thunk(async (actions, id) => {
    actions.setDeletedSubject({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/subject/${id}`)
      .then(response => actions.setDeletedSubject({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedSubject({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
