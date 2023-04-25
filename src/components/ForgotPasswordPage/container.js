import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import validationSchema from './validations'

const defaultFormValues = {
  email: ''
}

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    fpr: s.fpr
  }))

  // Actions
  const actions = useStoreActions(a => ({
    postFpr: a.postFpr,
    setFpr: a.setFpr
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
        actions.postFpr({ email: values.email, link: process.env.REACT_APP_FRONTEND_URL + '/new-password' })
      }
    }
  })

  useEffect(() => {
    const { status, payload } = state.fpr
    if (status === 2 && payload) {
      actions.setFpr({ status: 0, payload: null })
      history.push('/check-email')
    } else if (status === 3) {
      actions.setFpr({ status: 0, payload: null })
    }
  }, [state.fpr])

  return children({ state, formik })
}

export default Container
