/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const defaultFormValues = { school_data: '', teacher_data: '', title: '', description: '', pages: '', assessment_types_data: '' }

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    moduleDetails: s.moduleDetails
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getModuleDetails: a.getModuleDetails,
    setModuleDetails: a.setModuleDetails
  }))
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [current, setCurrent] = useState(0)
  const [initialValues] = useState(defaultFormValues)

  const handleCancel = () => {
    history.push({ pathname: '/module/', search: location.search })
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
    actions.getModuleDetails({ id })
  }, [])

  useEffect(() => {
    const { status, payload } = state.moduleDetails
    if (status === 2) {
      const { school, year_level, class_section, subject, teacher, title, description, pages } = payload

      // School/Organization Tab Data
      formik.setFieldValue('school_data', { school })

      // Teacher Tab Data
      formik.setFieldValue('teacher_data', { year_level, class_section, subject, teacher })

      // Create Module Tab Data
      formik.setFieldValue('title', title)
      formik.setFieldValue('description', description)
      formik.setFieldValue('pages', pages)

      // Build assessments data
      const assessments = []
      if (pages) {
        pages.map(p => {
          if (!p.is_content && p.assessments) {
            p.assessments.map(a => {
              a.page = p.page
              assessments.push(a)
              return a
            })
          }
          return p
        })
      }
      formik.setFieldValue('assessment_types_data', assessments)
      // End of building assessments data

      actions.setModuleDetails(clearState)
    } else if (status === 3) {
      actions.setModuleDetails(clearState)
    }
  }, [state.moduleDetails])

  return children({ formik, handleCancel, handleBack, handleSteps, current })
}

export default Container
