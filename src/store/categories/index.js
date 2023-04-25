import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  categories: { status: 0, payload: null },
  setCategories: action((state, payload = null) => {
    state.categories = payload
  }),
  getCategories: thunk(async (actions, params = {}) => {
    actions.setCategories({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/categories`, { params })
      .then(response => actions.setCategories({ status: 2, payload: response.data }))
      .catch(e => actions.setCategories({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Category
  createdCategory: { status: 0, payload: null },
  setCreatedCategory: action((state, payload = null) => {
    state.createdCategory = payload
  }),
  createCategory: thunk(async (actions, data = {}) => {
    actions.setCreatedCategory({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/categories/`, data)
      .then(response => actions.setCreatedCategory({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedCategory({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Category
  updatedCategory: { status: 0, payload: null },
  setUpdatedCategory: action((state, payload = null) => {
    state.updatedCategory = payload
  }),
  updateCategory: thunk(async (actions, data = {}) => {
    actions.setUpdatedCategory({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/categories/${data.id}`, data)
      .then(response => actions.setUpdatedCategory({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedCategory({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete Category
  deletedCategory: { status: 0, payload: null },
  setDeletedCategory: action((state, payload = null) => {
    state.deletedCategory = payload
  }),
  deleteCategory: thunk(async (actions, id) => {
    actions.setDeletedCategory({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/categories/${id}`)
      .then(response => actions.setDeletedCategory({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedCategory({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
