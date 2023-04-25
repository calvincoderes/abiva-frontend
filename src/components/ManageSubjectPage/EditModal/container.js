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

const Container = ({ children, selectedData, setSelectedData }) => {
  // State
  const state = useStoreState(s => ({
    updatedSubject: s.updatedSubject
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSubjects: a.getSubjects,
    updateSubject: a.updateSubject,
    setUpdatedSubject: a.setUpdatedSubject
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
        actions.updateSubject(values, selectedData.id)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const { status } = state.updatedSubject
    if (status === 2) {
      setInitialValues({ school: '', name: '', code: '' })
      formik.resetForm()
      closeDefaultModals()
      setSelectedData(null)
      actions.setUpdatedSubject({ status: 0, payload: null })
      actions.getSubjects()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setUpdatedSubject({ status: 0, payload: null })
    }
  }, [state.updatedSubject])

  useEffect(() => {
    selectedData && setInitialValues({ school: selectedData.school, name: selectedData.name, code: selectedData.code })
  }, [selectedData])

  return children({ isLoading, formik })
}

export default Container
