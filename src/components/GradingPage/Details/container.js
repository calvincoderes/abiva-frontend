/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import qs from 'query-string'
import { EditOutlined } from '@ant-design/icons'
import { Tag, Button } from 'antd'

import { gradeStatus } from '@/utils/helpers'
import { USER_TYPE_STUDENT, STATUS_FOR_CHECKING } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()

  // State
  const state = useStoreState(s => ({
    gradingDetails: s.gradingDetails,
    users: s.users
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getGradingDetails: a.getGradingDetails,
    setGradingDetails: a.setGradingDetails,
    getUsers: a.getUsers,
    setUsers: a.setUsers
  }))

  const handleBack = () => {
    history.push('/grading')
  }

  // Filtered Users
  // const filteredUsers = (id) => {
  //   return allUsers ? allUsers.filter(x => x.id === id) : []
  // }

  // const [allUsers, setAllUsers] = useState(null)
  const [pageLimit] = useState(10)
  const [details, setDetails] = useState(null)
  const [data, setData] = useState(null)
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({ ...qs.parse(location.search), id, per_page: pageLimit })
  const [columns] = useState([
    {
      title: 'Student No.',
      dataIndex: 'student_number',
      key: 'student_number'
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name'
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <>
          <Tag color={gradeStatus(status).tag}>
            {gradeStatus(status).label}
          </Tag>
        </>
      )
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score'
    },
    {
      title: 'Action',
      key: 'action',
      render: v => (<>
        {v.action.status === STATUS_FOR_CHECKING && <Button
          className='m-1'
          ghost
          type='primary'
          size='large'
          icon={<EditOutlined />}
          onClick={() => {
            sessionStorage.setItem('assessment-back-link', `/grading/${id}`)
            history.push(`/assessments-for-checking/${v.action.user_assessment_id}`)
          }}
        />}
      </>)
    }
  ])

  // antd Table component's handleTableChange event function
  const handleTableOnChange = (paginate, filters, sorter) => {
    // Update Pagination Data
    setPagination(paginate)

    // Prepare Query Strings Filters
    const query = {
      ...queries,
      page: paginate.current
    }

    if (typeof sorter.field !== 'undefined') {
      query.ordering = `${(sorter.order === 'descend' ? '-' : '')}${sorter.field}`
    } else {
      delete query.ordering
    }

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
      // const { results } = payload

      // For all list reference
      // setAllUsers(results)

      // Clear State
      actions.setUsers(clearState)
    } else if (status === 3) {
      actions.setUsers(clearState)
    }
  }, [state.users])

  useEffect(() => {
    const { status, payload } = state.gradingDetails
    if (status === 2 && payload) {
      if (Object.keys(payload).length > 0) {
        setDetails(payload)
        const pushedData = []
        payload.students && payload.students.map((c, key) => {
          const { status, scores, student_number, last_name, first_name } = c
          // const student = filteredUsers(c.user)[0]
          pushedData.push({
            id: key,
            key,
            student_number,
            last_name,
            first_name,
            status,
            score: scores,
            action: c
          })
          return setData(pushedData)
        })
        setPagination(prev => ({ ...prev, total: payload.count }))
      } else {
        setData(null)
      }
      actions.setGradingDetails(clearState)
    } else if (status === 3) {
      actions.setGradingDetails(clearState)
    }
  }, [state.gradingDetails])

  // Side effect of queries
  useEffect(() => {
    actions.getGradingDetails({ ...queries })
  }, [queries])

  return children({ state, handleBack, columns, details, data, pagination, handleTableOnChange })
}

export default Container
