import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const Container = ({ children, current, handleSteps, mainFormik }) => {
  const defaultFormValues = {
    school: ''
  }

  // State
  const state = useStoreState(s => ({
    schools: s.schools
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools
  }))

  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [schools, setSchools] = useState(null)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        mainFormik.values.school_data = values
        handleSteps(current + 1)
      }
    }
  })

  useEffect(() => {
    actions.getSchools({ per_page: 9999 })
  }, [])

  useEffect(() => {
    if (mainFormik.values.school_data) {
      // eslint-disable-next-line camelcase
      const { school } = mainFormik.values.school_data
      setInitialValues({ school })
    }
  }, [mainFormik.values.school_data])

  useEffect(() => {
    const { status, payload } = state.schools
    if (status === 2 && payload) {
      const { results } = payload
      setSchools(results)
      actions.setSchools(clearState)
    } else if (status === 3) {
      actions.setSchools(clearState)
    }
  }, [state.schools])

  return children({ state, formik, schools })
}

export default Container
