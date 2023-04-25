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

const Container = ({ children, selectedData, setSelectedData }) => {
  // State
  const state = useStoreState(s => ({
    updatedSubCategory: s.updatedSubCategory
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSubCategories: a.getSubCategories,
    updateSubCategory: a.updateSubCategory,
    setUpdatedSubCategory: a.setUpdatedSubCategory
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
        actions.updateSubCategory(values, selectedData.id)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.updatedSubCategory
    if (status === 2) {
      setInitialValues({ name: '', description: '' })
      formik.resetForm()
      closeDefaultModals()
      setSelectedData(null)
      actions.setUpdatedSubCategory({ status: 0, payload: null })
      actions.getSubCategories()
    } else if (status === 3) {
      // if (Object.keys(payload).length > 0) {
      //   const k = Object.keys(payload)[0]
      //   if (k) {
      //     message.error(payload[k][0])
      //   }
      // }
      closeDefaultModals()
      actions.setUpdatedSubCategory({ status: 0, payload: null })
    }
  }, [state.updatedSubCategory])

  useEffect(() => {
    selectedData && setInitialValues({ category_id: selectedData.category_id, name: selectedData.name, description: selectedData.description })
  }, [selectedData])

  return children({ isLoading, formik })
}

export default Container
