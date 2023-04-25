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
    years: s.years,
    createdYear: s.createdYear,
    deletedYear: s.deletedYear,
    updatedYear: s.updatedYear
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    getYears: a.getYears,
    setYears: a.setYears,
    createYear: a.createYear,
    setCreatedYear: a.setCreatedYear,
    deleteYear: a.deleteYear,
    setDeletedYear: a.setDeletedYear,
    updateYear: a.updateYear,
    setUpdatedYear: a.setUpdatedYear
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
    actions.deleteYear(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateYear({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'Year/Level Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Year/Level Description',
      dataIndex: 'description'
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
    actions.getYears()
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
    const { status, payload } = state.years
    if (status === 2 && payload) {
      if (Object.keys(payload).length > 0) {
        const { results } = payload
        const pushedData = []
        results.map(c => {
          pushedData.push({
            key: c.id,
            name: c.name,
            description: c.description,
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
      if (Object.keys(payload).length > 0) actions.setYears({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setYears({ status: 0, payload: null })
    }
  }, [state.years])

  useEffect(() => {
    const { status } = state.deletedYear
    if (status === 2) {
      actions.getYears()
      actions.setDeletedYear({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setDeletedYear({ status: 0, payload: null })
    }
  }, [state.deletedYear])

  useEffect(() => {
    const { status } = state.updatedYear
    if (status === 2) {
      actions.setUpdatedYear({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setUpdatedYear({ status: 0, payload: null })
    }
  }, [state.updatedYear])

  // Side effect of queries
  useEffect(() => {
    actions.getYears({ ...queries })
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
