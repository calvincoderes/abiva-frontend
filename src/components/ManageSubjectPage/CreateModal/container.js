import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
// import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  school: '',
  name: '',
  code: ''
}

const Container = ({ children, setCreateModal }) => {
  // State
  const state = useStoreState(s => ({
    createdSubject: s.createdSubject
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSubjects: a.getSubjects,
    createSubject: a.createSubject,
    setCreatedSubject: a.setCreatedSubject
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
        actions.createSubject(values)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.createdSubject
    if (status === 2) {
      setInitialValues({ school: '', name: '', code: '' })
      formik.resetForm()
      closeDefaultModals()
      setCreateModal(false)
      actions.setCreatedSubject({ status: 0, payload: null })
      actions.getSubjects()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setCreatedSubject({ status: 0, payload: null })
    }
  }, [state.createdSubject])

  return children({ isLoading, formik })
}

export default Container
