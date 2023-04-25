import axios from 'axios'
import { API_URL } from './constants'

const excludedRoutes = [
  `${API_URL}/api/oauth/token`
]

export default {
  setupInterceptors (store) {
    // Request
    axios.interceptors.request.use(async (config) => {
      const oauth = JSON.parse(sessionStorage.getItem('oauth')) // Convert this to cookie
      if (excludedRoutes.indexOf(config.url) === -1 && oauth) {
        config.headers.Authorization = `${oauth.token_type} ${oauth.access_token}`
      }
      return config
    }, (err) => {
      return Promise.reject(err)
    })

    // Response
    axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      return Promise.reject(error)
    })
  }
}
