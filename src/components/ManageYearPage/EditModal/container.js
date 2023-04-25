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

const Container = ({ children, selectedData, setSelectedData }) => {
  // State
  const state = useStoreState(s => ({
    updatedYear: s.updatedYear
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getYears: a.getYears,
    updateYear: a.updateYear,
    setUpdatedYear: a.setUpdatedYear
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
        actions.updateYear(values, selectedData.id)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.updatedYear
    if (status === 2) {
      setInitialValues({ school: '', name: '', description: '' })
      formik.resetForm()
      closeDefaultModals()
      setSelectedData(null)
      actions.setUpdatedYear({ status: 0, payload: null })
      actions.getYears()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setUpdatedYear({ status: 0, payload: null })
    }
  }, [state.updatedYear])

  useEffect(() => {
    selectedData && setInitialValues({ school: selectedData.school, name: selectedData.name, description: selectedData.description })
  }, [selectedData])

  return children({ isLoading, formik })
}

export default Container
