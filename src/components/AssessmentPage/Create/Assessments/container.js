/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const Container = ({ children, mainFormik }) => {
  const defaultFormValues = {
    title: '',
    description: '',
    assessment_types: ''
  }

  const history = useHistory()

  // State
  const state = useStoreState(s => ({
    createdAssessment: s.createdAssessment
  }))

  // Actions
  const actions = useStoreActions(a => ({
    createAssessment: a.createAssessment,
    setCreatedAssessment: a.setCreatedAssessment
  }))

  const [initialValues] = useState(defaultFormValues)
  const [addAssessment, setAddAssessment] = useState(false)
  const [isStudentPreview, setIsStudentPreview] = useState(false)
  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        const { year_level, class_section, subject, teacher } = values.teacher = mainFormik.values.teacher_data
        values.school = mainFormik.values.school_data.school
        values.year_level = year_level
        values.class_section = class_section
        values.subject = subject
        values.teacher = teacher
        values.assessment_types = mainFormik.values.assessment_types_data
        actions.createAssessment(values)
      }
    }
  })

  const handlePreview = (checked) => {
    setIsStudentPreview(checked)
  }

  useEffect(() => {
    const { status } = state.createdAssessment
    if (status === 2) {
      actions.setCreatedAssessment(clearState)
      mainFormik.resetForm()
      history.push('/assessment')
    } else if (status === 3) {
      actions.setCreatedAssessment(clearState)
    }
  }, [state.createdAssessment])

  return children({ formik, state, addAssessment, setAddAssessment, handlePreview, isStudentPreview })
}

export default Container
