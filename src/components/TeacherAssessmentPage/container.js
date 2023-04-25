/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

import { USER_TYPE_STUDENT, STATUS_FOR_CHECKING } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    me: s.me,
    studentA: s.studentA,
    users: s.users
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getStudentA: a.getStudentA,
    setStudentA: a.setStudentA,
    getUsers: a.getUsers,
    setUsers: a.setUsers
  }))

  const [data, setData] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [pageLimit] = useState(5)
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({
    ...qs.parse(location.search),
    // ordering: 'name',
    per_page: pageLimit,
    status: STATUS_FOR_CHECKING
  })

  // Filtered Users
  const filteredUsers = (id) => {
    return allUsers ? allUsers.filter(x => x.id === id) : []
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

  // Pagination
  const handleOnChange = (page) => {
    const current = Number(page)
    // Update Pagination Data
    setPagination(prev => ({ ...prev, current }))

    // Prepare Query Strings Filters
    const query = { ...queries, page: current }

    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  useEffect(() => {
    actions.getUsers({ per_page: 9999, type: USER_TYPE_STUDENT })
  }, [])

  useEffect(() => {
    const { status, payload } = state.users
    if (status === 2 && payload) {
      const { results } = payload

      // For all list reference
      setAllUsers(results)

      // Clear State
      actions.setUsers(clearState)
    } else if (status === 3) {
      actions.setUsers(clearState)
    }
  }, [state.users])

  useEffect(() => {
    const { status, payload } = state.studentA
    if (status === 2 && payload && allUsers) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          const { id, user, status, subject_name, description, total_items } = c
          const { first_name, last_name } = filteredUsers(user)[0]
          pushedData.push({
            id,
            status,
            subject: subject_name,
            description,
            student: `${first_name} ${last_name}`,
            total_items
          })
          return setData(pushedData)
        })
      } else {
        setData([])
      }
      setPagination(prev => ({ ...prev, total: payload.count }))
      actions.setStudentA(clearState)
    } else if (status === 3) {
      actions.setStudentA(clearState)
    }
  }, [state.studentA, allUsers])

  // Side effect of queries
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) actions.getStudentA({ ...queries, teacher_id: user.id })
  }, [queries])

  return children({ state, data, pagination, handlesearchTable, handleOnChange })
}

export default Container
