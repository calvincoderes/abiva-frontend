/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    studentM: s.studentM,
    users: s.users
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getStudentM: a.getStudentM,
    setStudentM: a.setStudentM,
    getUsers: a.getUsers,
    setUsers: a.setUsers
  }))

  const [data, setData] = useState(null)
  const [pageLimit] = useState(5)
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({
    ...qs.parse(location.search),
    // ordering: 'name',
    per_page: pageLimit
  })

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

  // Pagination
  const handleOnChange = (page) => {
    const current = Number(page)
    // Update Pagination Data
    setPagination(prev => ({ ...prev, current }))

    // Prepare Query Strings Filters
    const query = {
      ...queries,
      page: current
    }

    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  useEffect(() => {
    const { status, payload } = state.studentM
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          const { id, teacher_name, status, title, description, stats } = c
          pushedData.push({
            id,
            status,
            title: title,
            description,
            teacher: teacher_name,
            stats
          })
          return setData(pushedData)
        })
      } else {
        setData(null)
      }
      setPagination(prev => ({
        ...prev,
        total: payload.count
      }))
      actions.setStudentM(clearState)
    } else if (status === 3) {
      actions.setStudentM(clearState)
    }
  }, [state.studentM])

  // Side effect of queries
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) actions.getStudentM({ ...queries, student_id: user.id })
  }, [queries])

  return children({ state, data, pagination, handlesearchTable, handleOnChange })
}

export default Container
