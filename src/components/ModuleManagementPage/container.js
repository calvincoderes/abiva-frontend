/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    modules: s.modules
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getModules: a.getModules,
    setModules: a.setModules
  }))

  const [pageLimit] = useState(5)
  const [data, setData] = useState([])
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

  const handleCreate = () => {
    history.push({ pathname: '/module/create', search: location.search })
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
    actions.getModules()
  }, [])

  useEffect(() => {
    const { status, payload } = state.modules
    if (status === 2 && payload) {
      const { results } = payload
      const pushedData = []
      if (Object.keys(results).length > 0) {
        results.map(c => {
          const { id, title, description, creator_name, stats } = c
          pushedData.push({
            id,
            title,
            description,
            creator_name,
            stats
          })
          return setData(pushedData)
        })
      } else {
        setData([])
      }

      setPagination(prev => ({ ...prev, total: payload.count }))
      actions.setModules(clearState)
    } else if (status === 3) {
      actions.setModules(clearState)
    }
  }, [state.modules])

  // Side effect of queries
  useEffect(() => {
    actions.getModules({ ...queries })
  }, [queries])

  return children({ state, data, pagination, handlesearchTable, handleOnChange, handleCreate })
}

export default Container
