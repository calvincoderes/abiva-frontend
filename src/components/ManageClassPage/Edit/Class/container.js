import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import validationSchema from './validations'

const defaultFormValues = {
  school: '',
  year_level: '',
  name: '',
  description: ''
}

const Container = ({ children, current, handleSteps, mainFormik }) => {
  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [schools, setSchools] = useState(null)
  const [years, setYears] = useState(null)

  // State
  const state = useStoreState(s => ({
    years: s.years,
    schools: s.schools
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    getYears: a.getYears,
    setYears: a.setYears
  }))

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        mainFormik.values.class_data = values
        handleSteps(current + 1)
      }
    }
  })

  useEffect(() => {
    actions.getSchools({ per_page: 9999 })
    actions.getYears({ per_page: 9999 })
  }, [])

  useEffect(() => {
    if (mainFormik.values.class_data) {
      const mf = mainFormik.values.class_data
      setInitialValues({
        school: mf.school,
        year_level: mf.year_level,
        name: mf.name,
        description: mf.description
      })
    }
  }, [mainFormik.values.class_data])

  useEffect(() => {
    const { status, payload } = state.schools
    if (status === 2 && payload) {
      const { results } = payload
      setSchools(results)
      actions.setSchools({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setSchools({ status: 0, payload: null })
    }
  }, [state.schools])

  useEffect(() => {
    const { status, payload } = state.years
    if (status === 2 && payload) {
      const { results } = payload
      setYears(results)
      actions.setYears({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setYears({ status: 0, payload: null })
    }
  }, [state.years])

  return children({ formik, schools, years })
}

export default Container
