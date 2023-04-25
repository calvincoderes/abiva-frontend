import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  name: '',
  job: ''
}

const Container = ({ children }) => {
  // History
  const history = useHistory()
  // Params
  const { id } = useParams()

  // Global state and actions
  const state = useStoreState(s => ({
    createdSample: s.createdSample
  }))

  const actions = useStoreActions(a => ({
    setCreatedSample: a.setCreatedSample,
    createSample: a.createSample
  }))

  // Initial Form Values
  const [initialValues, setInitialValues] = useState(defaultFormValues)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      actions.createSample(values)
    }
  })

  // Side effect of createdSample
  useEffect(() => {
    // code here will execute
    const { status } = state.createdSample
    if (status === 3) {
      message.error('Please check the form for errors')
      actions.setCreatedSample({ status: 0, payload: null })
    } else if (status === 2) {
      message.success('Successfully added new record')
      history.push('/samples-list')
      actions.setCreatedSample({ status: 0, payload: null })
      // Reset Form
      setInitialValues(defaultFormValues)
    }
  }, [state.createdSample])

  return children({
    id,
    state,
    formik
  })
}

export default Container
