import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Sections
  sections: { status: 0, payload: null },
  setSections: action((state, payload = null) => {
    state.sections = payload
  }),
  getSections: thunk(async (actions, params = {}) => {
    actions.setSections({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/class_section`, { params })
      .then(response => actions.setSections({ status: 2, payload: response.data }))
      .catch(e => actions.setSections({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  sectionDetails: { status: 0, payload: null },
  setSectionDetails: action((state, payload = null) => {
    state.sectionDetails = payload
  }),
  getSectionDetails: thunk(async (actions, params = {}) => {
    actions.setSectionDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/class_section/${params.id}`, { params })
      .then(response => actions.setSectionDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setSectionDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Section
  createdSection: { status: 0, payload: null },
  setCreatedSection: action((state, payload = null) => {
    state.createdSection = payload
  }),
  createSection: thunk(async (actions, data = {}) => {
    actions.setCreatedSection({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/class_section/`, data)
      .then(response => actions.setCreatedSection({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedSection({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Patch Section
  patchedSection: { status: 0, payload: null },
  setPatchedSection: action((state, payload = null) => {
    state.patchedSection = payload
  }),
  patchSection: thunk(async (actions, data = {}) => {
    actions.setPatchedSection({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/class_section/${data.id}`, data)
      .then(response => actions.setPatchedSection({ status: 2, payload: response.data }))
      .catch(e => actions.setPatchedSection({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Section
  updatedSection: { status: 0, payload: null },
  setUpdatedSection: action((state, payload = null) => {
    state.updatedSection = payload
  }),
  updateSection: thunk(async (actions, data = {}) => {
    actions.setUpdatedSection({ status: 1, payload: null })
    axios.put(`${API_URL}/api/v1/class_section/${data.id}`, data)
      .then(response => actions.setUpdatedSection({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedSection({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Section
  deletedSection: { status: 0, payload: null },
  setDeletedSection: action((state, payload = null) => {
    state.deletedSection = payload
  }),
  deleteSection: thunk(async (actions, id) => {
    actions.setDeletedSection({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/class_section/${id}`)
      .then(response => actions.setDeletedSection({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedSection({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
