/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import moment from 'moment'
import { Switch, Button } from 'antd'
import { CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    schools: s.schools,
    subjects: s.subjects,
    createdSubject: s.createdSubject,
    deletedSubject: s.deletedSubject,
    updatedSubject: s.updatedSubject
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    getSubjects: a.getSubjects,
    setSubjects: a.setSubjects,
    createSubject: a.createSubject,
    setCreatedSubject: a.setCreatedSubject,
    deleteSubject: a.deleteSubject,
    setDeletedSubject: a.setDeletedSubject,
    updateSubject: a.updateSubject,
    setUpdatedSubject: a.setUpdatedSubject
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
    // ordering: 'name',
    per_page: pageLimit
  })

  const handleCreate = () => {
    setCreateModal(!createModal)
  }

  const handleEdit = (data) => {
    setSelectedData(data)
  }

  const handleDelete = (id) => {
    actions.deleteSubject(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateSubject({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'Subject Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Subject Code',
      dataIndex: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend']
    },
    {
      title: 'Date Created/Modified',
      dataIndex: 'created_at'
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

  useEffect(() => {
    actions.getSubjects()
    actions.getSchools({ per_page: 99999 })
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
    const { status, payload } = state.subjects
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          pushedData.push({
            key: c.id,
            name: c.name,
            code: c.code,
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
      if (Object.keys(payload).length > 0) actions.setSubjects({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setSubjects({ status: 0, payload: null })
    }
  }, [state.subjects])

  useEffect(() => {
    const { status } = state.deletedSubject
    if (status === 2) {
      actions.getSubjects()
      actions.setDeletedSubject({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setDeletedSubject({ status: 0, payload: null })
    }
  }, [state.deletedSubject])

  useEffect(() => {
    const { status } = state.updatedSubject
    if (status === 2) {
      actions.setUpdatedSubject({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setUpdatedSubject({ status: 0, payload: null })
    }
  }, [state.updatedSubject])

  // Side effect of queries
  useEffect(() => {
    actions.getSubjects({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    data,
    schools,
    pagination,
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
