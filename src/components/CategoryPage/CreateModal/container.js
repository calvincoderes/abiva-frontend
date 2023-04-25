import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
// import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  name: '',
  description: ''
}

const Container = ({ children, setCreateModal }) => {
  // State
  const state = useStoreState(s => ({
    createdCategory: s.createdCategory
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getCategories: a.getCategories,
    createCategory: a.createCategory,
    setCreatedCategory: a.setCreatedCategory
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
        actions.createCategory(values)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.createdCategory
    if (status === 2) {
      setInitialValues({ name: '', description: '' })
      formik.resetForm()
      closeDefaultModals()
      setCreateModal(false)
      actions.setCreatedCategory({ status: 0, payload: null })
      actions.getCategories()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setCreatedCategory({ status: 0, payload: null })
    }
  }, [state.createdCategory])

  return children({ isLoading, formik })
}

export default Container
