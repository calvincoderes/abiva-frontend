import { action, thunk } from 'easy-peasy'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

export default {
  // Get Modules
  modules: { status: 0, payload: null },
  setModules: action((state, payload = null) => {
    state.modules = payload
  }),
  getModules: thunk(async (actions, params = {}) => {
    actions.setModules({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/module_management`, { params })
      .then(response => actions.setModules({ status: 2, payload: response.data }))
      .catch(e => actions.setModules({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Get Modules Details
  moduleDetails: { status: 0, payload: null },
  setModuleDetails: action((state, payload = null) => {
    state.moduleDetails = payload
  }),
  getModuleDetails: thunk(async (actions, params = {}) => {
    actions.setModuleDetails({ status: 1, payload: null })
    axios.get(`${API_URL}/api/v1/module_management/${params.id}`, { params })
      .then(response => actions.setModuleDetails({ status: 2, payload: response.data }))
      .catch(e => actions.setModuleDetails({
        status: 3,
        payload: typeof e.response !== 'undefined' ? e.response.data : e
      }))
  }),
  // Create Module
  createdModule: { status: 0, payload: null },
  setCreatedModule: action((state, payload = null) => {
    state.createdModule = payload
  }),
  createModule: thunk(async (actions, data = {}) => {
    actions.setCreatedModule({ status: 1, payload: null })
    axios.post(`${API_URL}/api/v1/module_management/`, data)
      .then(response => actions.setCreatedModule({ status: 2, payload: response.data }))
      .catch(e => actions.setCreatedModule({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  }),
  // Update Module
  updatedModule: { status: 0, payload: null },
  setUpdatedModule: action((state, payload = null) => {
    state.updatedModule = payload
  }),
  updateModule: thunk(async (actions, data = {}) => {
    actions.setUpdatedModule({ status: 1, payload: null })
    axios.put(`${API_URL}/api/v1/module_management/${data.id}`, data)
      .then(response => actions.setUpdatedModule({ status: 2, payload: response.data }))
      .catch(e => actions.setUpdatedModule({ status: 3, payload: typeof e.response !== 'undefined' ? e.response.data : e }))
  })
}
