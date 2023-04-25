import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Assessments
  assessments: { status: 0, payload: null },
  setAssessments: action((state, payload = null) => {
    state.assessments = payload
  }),
  getAssessments: thunk(async (actions, params = {}) => {
    actions.setAssessments({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/assessments`, { params })
      .then(response => actions.setAssessments({ status: 2, payload: response.data }))
      .catch(e => actions.setAssessments({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Assessment Details
  assessmentDetails: { status: 0, payload: null },
  setAssessmentDetails: action((state, payload = null) => {
    state.assessmentDetails = payload
  }),
  getAssessmentDetails: thunk(async (actions, params = {}) => {
    actions.setAssessmentDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/assessments/${params.id}`, { params })
      .then(response => actions.setAssessmentDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setAssessmentDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Assessment
  createdAssessment: { status: 0, payload: null },
  setCreatedAssessment: action((state, payload = null) => {
    state.createdAssessment = payload
  }),
  createAssessment: thunk(async (actions, data = {}) => {
    actions.setCreatedAssessment({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/assessments/`, data)
      .then(response => actions.setCreatedAssessment({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedAssessment({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Publish Assessment
  publishedAssessment: { status: 0, payload: null },
  setPublishedAssessment: action((state, payload = null) => {
    state.publishedAssessment = payload
  }),
  publishAssessment: thunk(async (actions, data = {}) => {
    actions.setPublishedAssessment({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/assessments/${data.id}/publish`)
      .then(response => actions.setPublishedAssessment({ status: 2, payload: response.data }))
      .catch(e => actions.setPublishedAssessment({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Patch Assessment
  patchedAssessment: { status: 0, payload: null },
  setPatchedAssessment: action((state, payload = null) => {
    state.patchedAssessment = payload
  }),
  patchAssessment: thunk(async (actions, data = {}) => {
    actions.setPatchedAssessment({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/assessments/${data.id}`, data)
      .then(response => actions.setPatchedAssessment({ status: 2, payload: response.data }))
      .catch(e => actions.setPatchedAssessment({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Assessment
  updatedAssessment: { status: 0, payload: null },
  setUpdatedAssessment: action((state, payload = null) => {
    state.updatedAssessment = payload
  }),
  updateAssessment: thunk(async (actions, data = {}) => {
    actions.setUpdatedAssessment({ status: 1, payload: null })
    axios.put(`${API_URL}/api/v1/assessments/${data.id}`, data)
      .then(response => actions.setUpdatedAssessment({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedAssessment({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Assessment
  deletedAssessment: { status: 0, payload: null },
  setDeletedAssessment: action((state, payload = null) => {
    state.deletedAssessment = payload
  }),
  deleteAssessment: thunk(async (actions, id) => {
    actions.setDeletedAssessment({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/assessments/${id}`)
      .then(response => actions.setDeletedAssessment({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedAssessment({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
