/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import moment from 'moment'
import { Switch, Button } from 'antd'
import {
  CloseOutlined,
  CheckOutlined,
  CheckSquareFilled,
  EditOutlined,
  DeleteOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    assessments: s.assessments,
    patchedAssessment: s.patchedAssessment,
    publishedAssessment: s.publishedAssessment,
    deletedAssessment: s.deletedAssessment
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getAssessments: a.getAssessments,
    setAssessments: a.setAssessments,
    patchAssessment: a.patchAssessment,
    setPatchedAssessment: a.setPatchedAssessment,
    publishAssessment: a.publishAssessment,
    setPublishedAssessment: a.setPublishedAssessment,
    deleteAssessment: a.deleteAssessment,
    setDeletedAssessment: a.setDeletedAssessment
  }))

  const [pageLimit] = useState(10)
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
    history.push({ pathname: '/assessment/create', search: location.search })
  }

  const handleEdit = (id) => {
    history.push({ pathname: '/assessment/' + id + '/edit', search: location.search })
  }

  const handleDelete = (id) => {
    actions.deleteAssessment(id)
  }

  const handleStatus = (checked, c) => {
    actions.patchAssessment({ id: c.id, is_active: checked })
  }

  const handlePublish = (id) => {
    actions.publishAssessment({ id })
  }

  const [columns] = useState([
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend']
    },
    {
      title: 'Description',
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
      title: 'Published',
      dataIndex: 'is_published',
      key: 'x',
      render: value =>
        <>
          {!value.is_published && <Button
            onClick={() => handlePublish(value.id)}
            className='m-1'
            ghost
            type='primary'
            size='large'
            icon={<ToolOutlined />}
          />}
          {value.is_published && <span style={{ fontSize: '42px', color: '#06BC39' }}><CheckSquareFilled /></span>}
        </>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      render: value =>
        <>
          <Button
            onClick={() => handleEdit(value.id)}
            disabled={value.is_published}
            className='m-1'
            ghost
            type='primary'
            size='large'
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => handleDelete(value.id)}
            disabled={value.is_published}
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
    actions.getAssessments()
  }, [])

  useEffect(() => {
    const { status, payload } = state.assessments
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          pushedData.push({
            key: c.id,
            title: c.title,
            description: c.description,
            created_at: moment(c.created_at).format('LL'),
            status: (<Switch
              onChange={(v) => handleStatus(v, c)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={c.is_active}
            />),
            is_published: c,
            action: c
          })
          return setData(pushedData)
        })
      } else {
        setData([])
      }

      setPagination(prev => ({ ...prev, total: payload.count }))
      actions.setAssessments(clearState)
    } else if (status === 3) {
      actions.setAssessments(clearState)
    }
  }, [state.assessments])

  useEffect(() => {
    const { status } = state.deletedAssessment
    if (status === 2) {
      actions.getAssessments()
      actions.setDeletedAssessment(clearState)
    } else if (status === 3) {
      actions.setDeletedAssessment(clearState)
    }
  }, [state.deletedAssessment])

  useEffect(() => {
    const { status } = state.patchedAssessment
    if (status === 2) {
      actions.setPatchedAssessment(clearState)
    } else if (status === 3) {
      actions.setPatchedAssessment(clearState)
    }
  }, [state.patchedAssessment])

  useEffect(() => {
    const { status } = state.publishedAssessment
    if (status === 2) {
      actions.getAssessments()
      actions.setPublishedAssessment(clearState)
    } else if (status === 3) {
      actions.setPublishedAssessment(clearState)
    }
  }, [state.publishedAssessment])

  // Side effect of queries
  useEffect(() => {
    actions.getAssessments({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    data,
    pagination,
    handleTableOnChange,
    handlesearchTable,
    handleCreate
  })
}

export default Container
