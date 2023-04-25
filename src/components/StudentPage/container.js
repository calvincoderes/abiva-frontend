/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import moment from 'moment'
import { Switch, Button } from 'antd'
import { CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { USER_TYPE_STUDENT } from '@/utils/constants'

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    schools: s.schools,
    users: s.users,
    createdUser: s.createdUser,
    deletedUser: s.deletedUser,
    updatedUser: s.updatedUser
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    getUsers: a.getUsers,
    setUsers: a.setUsers,
    createUser: a.createUser,
    setCreatedUser: a.setCreatedUser,
    deleteUser: a.deleteUser,
    setDeletedUser: a.setDeletedUser,
    updateUser: a.updateUser,
    setUpdatedUser: a.setUpdatedUser
  }))

  const [pageLimit] = useState(10)
  const [createModal, setCreateModal] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [data, setData] = useState([])
  const [schools, setSchools] = useState(null)
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({
    ...qs.parse(location.search),
    // ordering: 'email',
    per_page: pageLimit,
    type: USER_TYPE_STUDENT
  })

  const handleCreate = () => {
    setCreateModal(!createModal)
  }

  const handleEdit = (data) => {
    setSelectedData(data)
  }

  const handleDelete = (id) => {
    actions.deleteUser(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateUser({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'School Name',
      dataIndex: 'school'
    },
    {
      title: 'Employee No.',
      dataIndex: 'user_number'
    },
    {
      title: 'First Name',
      dataIndex: 'first_name'
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name'
    },
    {
      title: 'Email Address',
      dataIndex: 'email'
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile'
    },
    {
      title: 'Activate/Deactivate',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      render: value =>
        <>
          <Button
            onClick={() => handleEdit(value)}
            className='m-1'
            ghost
            type='primary'
            size='large'
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => handleDelete(value.id)}
            className='m-1'
            danger
            size='large'
            icon={<DeleteOutlined />}
          />
        </>
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

  useEffect(() => {
    actions.getSchools()
  }, [])

  useEffect(() => {
    const { status, payload } = state.schools
    if (status === 2 && payload) {
      const { results } = payload
      setSchools(results)
      actions.setSchools({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setSchools({ status: 0, payload: null })
    }
  }, [state.schools])

  useEffect(() => {
    const { status, payload } = state.users
    if (status === 2 && payload && schools) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          pushedData.push({
            key: c.id,
            school: schools.filter(x => x.id === c.school)[0].name,
            user_number: c.user_number,
            first_name: c.first_name,
            last_name: c.last_name,
            email: c.email,
            mobile: c.mobile,
            created_at: moment(c.created_at).format('LL'),
            status: (<Switch
              onChange={(v) => handleStatus(v, c)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={c.is_active}
            />),
            action: c
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
      actions.setUsers({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setUsers({ status: 0, payload: null })
    }
  }, [state.users, schools])

  useEffect(() => {
    const { status } = state.deletedUser
    if (status === 2) {
      actions.getUsers({ type: USER_TYPE_STUDENT })
      actions.setDeletedUser({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setDeletedUser({ status: 0, payload: null })
    }
  }, [state.deletedUser])

  useEffect(() => {
    const { status } = state.updatedUser
    if (status === 2) {
      actions.setUpdatedUser({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setUpdatedUser({ status: 0, payload: null })
    }
  }, [state.updatedUser])

  // Side effect of queries
  useEffect(() => {
    actions.getUsers({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    data,
    schools,
    pagination,
    handleSchool,
    handleTableOnChange,
    handlesearchTable,
    handleCreate,
    selectedData,
    setSelectedData,
    createModal,
    setCreateModal
  })
}

export default Container
