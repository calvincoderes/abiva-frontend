import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Contents
  content: { status: 0, payload: null },
  setContent: action((state, payload = null) => {
    state.content = payload
  }),
  getContent: thunk(async (actions, params = {}) => {
    actions.setContent({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/content`, { params })
      .then(response => actions.setContent({ status: 2, payload: response.data }))
      .catch(e => actions.setContent({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Content Details
  contentDetails: { status: 0, payload: null },
  setContentDetails: action((state, payload = null) => {
    state.contentDetails = payload
  }),
  getContentDetails: thunk(async (actions, params = {}) => {
    actions.setContentDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/content/${params.id}`, { params })
      .then(response => actions.setContentDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setContentDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Content
  createdContent: { status: 0, payload: null },
  setCreatedContent: action((state, payload = null) => {
    state.createdContent = payload
  }),
  createContent: thunk(async (actions, data = {}) => {
    actions.setCreatedContent({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/content/`, data)
      .then(response => actions.setCreatedContent({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedContent({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Content
  updatedContent: { status: 0, payload: null },
  setUpdatedContent: action((state, payload = null) => {
    state.updatedContent = payload
  }),
  updateContent: thunk(async (actions, data = {}) => {
    actions.setUpdatedContent({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/content/${data.id}`, data)
      .then(response => actions.setUpdatedContent({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedContent({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Content
  deletedContent: { status: 0, payload: null },
  setDeletedContent: action((state, payload = null) => {
    state.deletedContent = payload
  }),
  deleteContent: thunk(async (actions, id) => {
    actions.setDeletedContent({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/content/${id}`)
      .then(response => actions.setDeletedContent({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedContent({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
