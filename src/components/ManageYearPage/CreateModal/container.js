import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
// import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  school: '',
  name: '',
  description: ''
}

const Container = ({ children, setCreateModal }) => {
  // State
  const state = useStoreState(s => ({
    createdYear: s.createdYear
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getYears: a.getYears,
    createYear: a.createYear,
    setCreatedYear: a.setCreatedYear
  }))

  const [isLoading, setIsLoading] = useState(false)

  // Initial Form Values
  const [initialValues, setInitialValues] = useState(defaultFormValues)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        setIsLoading(true)
        actions.createYear(values)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.createdYear
    if (status === 2) {
      setInitialValues({ school: '', name: '', description: '' })
      formik.resetForm()
      closeDefaultModals()
      setCreateModal(false)
      actions.setCreatedYear({ status: 0, payload: null })
      actions.getYears()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setCreatedYear({ status: 0, payload: null })
    }
  }, [state.createdYear])

  return children({ isLoading, formik })
}

export default Container
