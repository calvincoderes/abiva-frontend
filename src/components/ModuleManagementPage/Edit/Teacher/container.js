import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import validationSchema from './validations'

import { USER_TYPE_TEACHER } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children, current, handleSteps, mainFormik }) => {
  const defaultFormValues = {
    year_level: '',
    class_section: '',
    subject: '',
    teacher: ''
  }

  // State
  const state = useStoreState(s => ({
    subjects: s.subjects,
    users: s.users,
    years: s.years,
    sections: s.sections
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSubjects: a.getSubjects,
    setSubjects: a.setSubjects,
    getUsers: a.getUsers,
    setUsers: a.setUsers,
    getYears: a.getYears,
    setYears: a.setYears,
    getSections: a.getSections,
    setSections: a.setSections
  }))

  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [users, setUsers] = useState(null)
  const [years, setYears] = useState(null)
  const [sections, setSections] = useState(null)
  const [subjects, setSubjects] = useState(null)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        mainFormik.values.teacher_data = values
        handleSteps(current + 1)
      }
    }
  })

  useEffect(() => {
    actions.getYears({ per_page: 9999 })
    actions.getSections({ per_page: 9999 })
    actions.getSubjects({ per_page: 9999 })
    actions.getUsers({ per_page: 9999, type: USER_TYPE_TEACHER })
  }, [])

  useEffect(() => {
    if (mainFormik.values.teacher_data) {
      const mf = mainFormik.values.teacher_data
      setInitialValues({
        year_level: mf.year_level,
        class_section: mf.class_section,
        subject: mf.subject,
        teacher: mf.teacher
      })
    }
  }, [mainFormik.values.teacher_data])

  useEffect(() => {
    const { status, payload } = state.users
    if (status === 2 && payload) {
      const { results } = payload
      setUsers(results)
      actions.setUsers(clearState)
    } else if (status === 3) {
      actions.setUsers(clearState)
    }
  }, [state.users])

  useEffect(() => {
    const { status, payload } = state.years
    if (status === 2 && payload) {
      const { results } = payload
      setYears(results)
      actions.setYears(clearState)
    } else if (status === 3) {
      actions.setYears(clearState)
    }
  }, [state.years])

  useEffect(() => {
    const { status, payload } = state.sections
    if (status === 2 && payload) {
      const { results } = payload
      setSections(results)
      actions.setSections(clearState)
    } else if (status === 3) {
      actions.setSections(clearState)
    }
  }, [state.sections])

  useEffect(() => {
    const { status, payload } = state.subjects
    if (status === 2 && payload) {
      const { results } = payload
      setSubjects(results)
      actions.setSubjects(clearState)
    } else if (status === 3) {
      actions.setSubjects(clearState)
    }
  }, [state.subjects])

  return children({ state, formik, users, years, sections, subjects })
}

export default Container
