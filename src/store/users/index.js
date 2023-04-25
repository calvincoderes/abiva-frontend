import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Users
  users: { status: 0, payload: null },
  setUsers: action((state, payload = null) => {
    state.users = payload
  }),
  getUsers: thunk(async (actions, params = {}) => {
    actions.setUsers({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/users`, { params })
      .then(response => actions.setUsers({ status: 2, payload: response.data }))
      .catch(e => actions.setUsers({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  userDetails: { status: 0, payload: null },
  setUserDetails: action((state, payload = null) => {
    state.userDetails = payload
  }),
  getUserDetails: thunk(async (actions, params = {}) => {
    actions.setUserDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/users/${params.id}`, { params })
      .then(response => actions.setUserDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setUserDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create User
  createdUser: { status: 0, payload: null },
  setCreatedUser: action((state, payload = null) => {
    state.createdUser = payload
  }),
  createUser: thunk(async (actions, data = {}) => {
    actions.setCreatedUser({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/users/`, data)
      .then(response => actions.setCreatedUser({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedUser({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update User
  updatedUser: { status: 0, payload: null },
  setUpdatedUser: action((state, payload = null) => {
    state.updatedUser = payload
  }),
  updateUser: thunk(async (actions, data = {}) => {
    actions.setUpdatedUser({ status: 1, payload: null })
    axios.patch(`${API_URL}/api/v1/users/${data.id}`, data)
      .then(response => actions.setUpdatedUser({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedUser({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Delete User
  deletedUser: { status: 0, payload: null },
  setDeletedUser: action((state, payload = null) => {
    state.deletedUser = payload
  }),
  deleteUser: thunk(async (actions, id) => {
    actions.setDeletedUser({ status: 1, payload: null })
    axios.delete(`${API_URL}/api/v1/users/${id}`)
      .then(response => actions.setDeletedUser({ status: 2, payload: response.data }))
      .catch(e => actions.setDeletedUser({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
