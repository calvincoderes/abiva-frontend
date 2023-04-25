/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useParams } from 'react-router-dom'
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
  const { id } = useParams()

  // State
  const state = useStoreState(s => ({
    updatedAssessment: s.updatedAssessment
  }))

  // Actions
  const actions = useStoreActions(a => ({
    updateAssessment: a.updateAssessment,
    setUpdatedAssessment: a.setUpdatedAssessment
  }))

  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [addAssessment, setAddAssessment] = useState(false)
  const [isStudentPreview, setIsStudentPreview] = useState(false)
  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        values.id = id
        const { year_level, class_section, subject, teacher } = values.teacher = mainFormik.values.teacher_data
        values.school = mainFormik.values.school_data.school
        values.year_level = year_level
        values.class_section = class_section
        values.subject = subject
        values.teacher = teacher
        values.assessment_types = mainFormik.values.assessment_types_data
        actions.updateAssessment(values)
      }
    }
  })

  const handlePreview = (checked) => {
    setIsStudentPreview(checked)
  }

  useEffect(() => {
    if (mainFormik.values.assessment_types_data) {
      const mf = mainFormik.values
      const f = formik.values
      setInitialValues({
        title: (f.title ? f.title : mf.title),
        description: (f.description ? f.description : mf.description),
        assessment_types: mf.assessment_types_data
      })
    }
  }, [mainFormik.values.assessment_types_data])

  useEffect(() => {
    const { status } = state.updatedAssessment
    if (status === 2) {
      actions.setUpdatedAssessment(clearState)
      mainFormik.resetForm()
      history.push('/assessment')
    } else if (status === 3) {
      actions.setUpdatedAssessment(clearState)
    }
  }, [state.updatedAssessment])

  return children({ formik, state, addAssessment, setAddAssessment, handlePreview, isStudentPreview })
}

export default Container
