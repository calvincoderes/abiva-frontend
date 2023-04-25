import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { message } from 'antd'

const clearState = { status: 0, payload: null }

const defaultFormValues = {
  username: '',
  password: ''
}

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    me: s.me,
    login: s.login
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getMe: a.getMe,
    postLogin: a.postLogin,
    setLogin: a.setLogin
  }))

  const history = useHistory()
  const [initialValues] = useState(defaultFormValues)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        actions.postLogin({
          username: values.username,
          password: values.password,
          client_id: process.env.REACT_APP_SECRET_ID,
          client_secret: process.env.REACT_APP_SECRET_KEY,
          grant_type: 'password'
        })
      }
    }
  })

  useEffect(() => {
    const { status, payload } = state.login
    if (status === 2) {
      const oauthDetails = { token_type: payload.token_type, access_token: payload.access_token }
      sessionStorage.setItem('oauth', JSON.stringify(oauthDetails))
      actions.getMe()
      actions.setLogin(clearState)
    } else if (status === 3) {
      message.error('Invalid username and/or password combination')
      actions.setLogin(clearState)
    }
  }, [state.login])

  useEffect(() => {
    const { status, payload } = state.me
    if (status === 2) {
      sessionStorage.setItem('user', JSON.stringify(payload))
      history.go(0)
    }
  }, [state.me])

  return children({ state, formik })
}

export default Container
