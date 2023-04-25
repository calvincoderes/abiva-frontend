import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()

  // State
  const state = useStoreState(s => ({
    me: s.me,
    logout: s.logout
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getMe: a.getMe,
    postLogout: a.postLogout,
    setLogout: a.setLogout
  }))

  const [isLoading, setIsLoading] = useState(false)
  const [me, setMe] = useState(null)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) setMe(user)
  }, [])

  useEffect(() => {
    const { status } = state.logout
    if (status === 2) {
      actions.setLogout(clearState)
      sessionStorage.removeItem('oauth')
      history.go(0)
    } else if (status === 3) {
      actions.setLogout(clearState)
    }
  }, [state.logout])

  const handleLogout = () => {
    setIsLoading(true)
    if (sessionStorage.getItem('oauth')) {
      const oauth = JSON.parse(sessionStorage.getItem('oauth'))
      actions.postLogout({
        token: oauth.access_token,
        client_id: process.env.REACT_APP_SECRET_ID,
        client_secret: process.env.REACT_APP_SECRET_KEY
      })
    }
  }

  return children({ isLoading, me, handleLogout })
}

export default Container
