/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { USER_TYPE_TEACHER } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    assessments: s.assessments,
    users: s.users,
    schools: s.schools,
    years: s.years,
    subjects: s.subjects,
    sections: s.sections
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getAssessments: a.getAssessments,
    setAssessments: a.setAssessments,
    getUsers: a.getUsers,
    setUsers: a.setUsers,
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    getYears: a.getYears,
    setYears: a.setYears,
    getSubjects: a.getSubjects,
    setSubjects: a.setSubjects,
    getSections: a.getSections,
    setSections: a.setSections
  }))

  const [pageLimit] = useState(10)
  const [data, setData] = useState([])
  const [users, setUsers] = useState(null)
  const [schools, setSchools] = useState(null)
  const [years, setYears] = useState(null)
  const [subjects, setSubjects] = useState(null)
  const [sections, setSections] = useState(null)
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({
    ...qs.parse(location.search),
    // ordering: 'email',
    per_page: pageLimit
  })

  const handleSchool = (v) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      school_id: v
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  const handleUser = (v) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      user_id: v
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  const handleYear = (v) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      year_id: v
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  const handleSubject = (v) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      subject_id: v
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  const handleSection = (v) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      section_id: v
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  // On Search
  const handlesearchTable = (obj) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      search: obj.target.value,
      page: 1
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  useEffect(() => {
    actions.getAssessments()
    actions.getSchools()
    actions.getYears()
    actions.getSubjects()
    actions.getSections()
    actions.getUsers({ type: USER_TYPE_TEACHER })
  }, [])

  useEffect(() => {
    const { status, payload } = state.assessments
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          const { id, subject_name, title, description, teacher, stats } = c
          const { completed, for_checking, on_going, not_yet_started } = stats
          pushedData.push({
            id,
            subject: subject_name,
            title,
            description,
            teacher: teacher.name,
            completed,
            for_checking,
            on_going,
            not_yet_started
          })
          return setData(pushedData)
        })
        setPagination(prev => ({
          ...prev,
          total: payload.count
        }))
      } else {
        setData([])
      }
      if (Object.keys(payload).length > 0) actions.setAssessments({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setAssessments({ status: 0, payload: null })
    }
  }, [state.assessments])

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
    const { status, payload } = state.subjects
    if (status === 2 && payload) {
      const { results } = payload
      setSubjects(results)
      actions.setSubjects(clearState)
    } else if (status === 3) {
      actions.setSubjects(clearState)
    }
  }, [state.subjects])

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
    const { status, payload } = state.users
    if (status === 2 && payload) {
      const { results } = payload
      setUsers(results)
      actions.setUsers(clearState)
    } else if (status === 3) {
      actions.setUsers(clearState)
    }
  }, [state.users])

  // Side effect of queries
  useEffect(() => {
    actions.getAssessments({ ...queries })
  }, [queries])

  return children({
    state,
    data,
    users,
    schools,
    years,
    subjects,
    sections,
    pagination,
    handleUser,
    handleSchool,
    handleYear,
    handleSubject,
    handleSection,
    handlesearchTable
  })
}

export default Container
