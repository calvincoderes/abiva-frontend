import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
// import { message } from 'antd'
import validationSchema from './validations'

const defaultFormValues = {
  name: '',
  description: ''
}

const Container = ({ children, selectedData, setSelectedData }) => {
  // State
  const state = useStoreState(s => ({
    updatedCategory: s.updatedCategory
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getCategories: a.getCategories,
    updateCategory: a.updateCategory,
    setUpdatedCategory: a.setUpdatedCategory
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
      if (values && selectedData.id) {
        setIsLoading(true)
        values.id = selectedData.id
        actions.updateCategory(values, selectedData.id)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.updatedCategory
    if (status === 2) {
      setInitialValues({ name: '', description: '' })
      formik.resetForm()
      closeDefaultModals()
      setSelectedData(null)
      actions.setUpdatedCategory({ status: 0, payload: null })
      actions.getCategories()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setUpdatedCategory({ status: 0, payload: null })
    }
  }, [state.updatedCategory])

  useEffect(() => {
    selectedData && setInitialValues({ name: selectedData.name, description: selectedData.description })
  }, [selectedData])

  return children({ isLoading, formik })
}

export default Container
