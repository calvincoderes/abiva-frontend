import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  password: '',
  confirm_password: ''
}

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    cp: s.cp
  }))

  // Actions
  const actions = useStoreActions(a => ({
    postCp: a.postCp,
    setCp: a.setCp
  }))

  const history = useHistory()
  // Initial Form Values
  const [initialValues] = useState(defaultFormValues)
  const [search] = useState(useLocation().search)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        const token = new URLSearchParams(search).get('token')
        actions.postCp({ token, password: values.password })
      }
    }
  })

  useEffect(() => {
    const { status, payload } = state.cp
    if (status === 2 && payload) {
      actions.setCp({ status: 0, payload: null })
      history.push('/new-password/success')
    } else if (status === 3) {
      message.error('Invalid Token')
      actions.setCp({ status: 0, payload: null })
    }
  }, [state.cp])

  return children({ state, formik })
}

export default Container
