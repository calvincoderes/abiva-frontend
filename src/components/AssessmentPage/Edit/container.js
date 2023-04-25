/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const defaultFormValues = { school_data: '', teacher_data: '', title: '', description: '', assessment_types_data: '' }

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    assessmentDetails: s.assessmentDetails
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getAssessmentDetails: a.getAssessmentDetails,
    setAssessmentDetails: a.setAssessmentDetails
  }))
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [current, setCurrent] = useState(0)
  const [initialValues] = useState(defaultFormValues)

  const handleCancel = () => {
    history.push({ pathname: '/assessment/', search: location.search })
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
    actions.getAssessmentDetails({ id })
  }, [])

  useEffect(() => {
    const { status, payload } = state.assessmentDetails
    if (status === 2) {
      const { school, year_level, class_section, subject, teacher, title, description, assessment_types, is_published } = payload

      if (is_published) history.push('/assessment')

      // School/Organization Tab Data
      formik.setFieldValue('school_data', { school })

      // Teacher Tab Data
      formik.setFieldValue('teacher_data', { year_level, class_section, subject, teacher: teacher.id })

      // Create Assessments Tab Data
      formik.setFieldValue('title', title)
      formik.setFieldValue('description', description)
      formik.setFieldValue('assessment_types_data', assessment_types)

      actions.setAssessmentDetails(clearState)
    } else if (status === 3) {
      actions.setAssessmentDetails(clearState)
    }
  }, [state.assessmentDetails])

  return children({ formik, handleCancel, handleBack, handleSteps, current })
}

export default Container
