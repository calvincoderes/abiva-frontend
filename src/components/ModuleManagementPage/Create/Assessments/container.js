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
    createdModule: s.createdModule
  }))

  // Actions
  const actions = useStoreActions(a => ({
    createModule: a.createModule,
    setCreatedModule: a.setCreatedModule
  }))

  const [currentTab, setCurrentTab] = useState(0)
  const [tabs, setTabs] = useState({
    module: [{
      page: 1,
      is_content: true,
      content_title: '',
      content_description: '',
      assessments: []
    }]
  })

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
        // Handle pages data
        const pages = []
        tabs.module.filter(x => {
          const { page, is_content, content_title, content_description } = x
          pages.push({
            page,
            is_content,
            content_title,
            content_description,
            assessments: !is_content ? mainFormik.values.assessment_types_data.filter(y => y.page === x.page) : null
          })
          return x
        })
        // End of pages data

        const { year_level, class_section, subject, teacher } = values.teacher = mainFormik.values.teacher_data
        values.school = mainFormik.values.school_data.school
        values.year_level = year_level
        values.class_section = class_section
        values.subject = subject
        values.teacher = teacher
        values.pages = pages

        actions.createModule(values)
      }
    }
  })

  const handleTabsChanged = (v) => {
    setCurrentTab(parseInt(v))
  }

  const handleTabs = () => {
    tabs.module.push({
      page: (tabs.module.length + 1),
      is_content: true,
      content_title: '',
      content_description: '',
      assessments: []
    })
    setTabs({ ...tabs, module: [...tabs.module] })
  }

  const handlePreview = (checked) => {
    setIsStudentPreview(checked)
  }

  const handleOnChange = (key, i, v) => {
    tabs && tabs.module.map((t, tk) => {
      if (tk === i) t[key] = v
      return t
    })

    setTabs({ ...tabs, module: [...tabs.module] })
  }

  useEffect(() => {
    const { status } = state.createdModule
    if (status === 2) {
      actions.setCreatedModule(clearState)
      mainFormik.resetForm()
      history.push('/module')
    } else if (status === 3) {
      actions.setCreatedModule(clearState)
    }
  }, [state.createdModule])

  return children({
    formik,
    state,
    addAssessment,
    setAddAssessment,
    handlePreview,
    isStudentPreview,
    handleTabsChanged,
    handleTabs,
    currentTab,
    handleOnChange,
    tabs
  })
}

export default Container
