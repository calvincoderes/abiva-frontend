import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
// import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  category_id: '',
  name: '',
  description: ''
}

const Container = ({ children, setCreateModal }) => {
  // State
  const state = useStoreState(s => ({
    createdSubCategory: s.createdSubCategory
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSubCategories: a.getSubCategories,
    createSubCategory: a.createSubCategory,
    setCreatedSubCategory: a.setCreatedSubCategory
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
        actions.createSubCategory(values)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.createdSubCategory
    if (status === 2) {
      setInitialValues({ name: '', description: '' })
      formik.resetForm()
      closeDefaultModals()
      setCreateModal(false)
      actions.setCreatedSubCategory({ status: 0, payload: null })
      actions.getSubCategories()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setCreatedSubCategory({ status: 0, payload: null })
    }
  }, [state.createdSubCategory])

  return children({ isLoading, formik })
}

export default Container
