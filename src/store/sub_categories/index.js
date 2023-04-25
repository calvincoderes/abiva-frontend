import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  subCategories: { status: 0, payload: null },
  setSubCategories: action((state, payload = null) => {
    state.subCategories = payload
  }),
  getSubCategories: thunk(async (actions, params = {}) => {
    actions.setSubCategories({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/sub_categories`, { params })
      .then(response => actions.setSubCategories({ status: 2, payload: response.data }))
      .catch(e => actions.setSubCategories({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Category
  createdSubCategory: { status: 0, payload: null },
  setCreatedSubCategory: action((state, payload = null) => {
    state.createdSubCategory = payload
  }),
  createSubCategory: thunk(async (actions, data = {}) => {
    actions.setCreatedSubCategory({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/sub_categories/`, data)
      .then(response => actions.setCreatedSubCategory({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedSubCategory({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Category
  updatedSubCategory: { status: 0, payload: null },
  setUpdatedSubCategory: action((state, payload = null) => {
    state.updatedSubCategory = payload
  }),
  updateSubCategory: thunk(async (actions, data = {}) => {
    actions.setUpdatedSubCategory({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/sub_categories/${data.id}`, data)
      .then(response => actions.setUpdatedSubCategory({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedSubCategory({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Category
  deletedSubCategory: { status: 0, payload: null },
  setDeletedSubCategory: action((state, payload = null) => {
    state.deletedSubCategory = payload
  }),
  deleteSubCategory: thunk(async (actions, id) => {
    actions.setDeletedSubCategory({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/sub_categories/${id}`)
      .then(response => actions.setDeletedSubCategory({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedSubCategory({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
