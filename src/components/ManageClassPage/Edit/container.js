import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const defaultFormValues = {
  class_data: [],
  teachers_data: [],
  students_data: [],
  class_section_data: ''
}

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    sectionDetails: s.sectionDetails
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSectionDetails: a.getSectionDetails,
    setSectionDetails: a.setSectionDetails
  }))

  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [current, setCurrent] = useState(0)
  const [initialValues] = useState(defaultFormValues)

  const handleCancel = () => {
    history.push({ pathname: '/class/', search: location.search })
  }

  const handleBack = () => {
    setCurrent(current - 1)
  }

  const handleSteps = (step) => {
    setCurrent(step)
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema // From validations
  })

  useEffect(() => {
    actions.getSectionDetails({ id })
  }, [])

  useEffect(() => {
    const { status, payload } = state.sectionDetails
    if (status === 2) {
      // eslint-disable-next-line camelcase
      const { school, year_level, name, description, assigned_teachers, assigned_students } = payload

      // Create Class/Section Tab Data
      formik.setFieldValue('class_data', { school, year_level, name, description })

      // Assign Teacher Tab Data
      formik.setFieldValue('teachers_data', assigned_teachers)

      // Assign Students Tab Data
      formik.setFieldValue('students_data', assigned_students)

      actions.setSectionDetails(clearState)
    } else if (status === 3) {
      actions.setSectionDetails(clearState)
    }
  }, [state.sectionDetails])

  return children({ formik, handleCancel, handleBack, handleSteps, current })
}

export default Container
