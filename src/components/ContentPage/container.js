/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import moment from 'moment'
import { Button, Switch } from 'antd'
import { CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    content: s.content,
    createdContent: s.createdContent,
    deletedContent: s.deletedContent,
    updatedContent: s.updatedContent
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getContent: a.getContent,
    setContent: a.setContent,
    createContent: a.createContent,
    setCreatedContent: a.setCreatedContent,
    deleteContent: a.deleteContent,
    setDeletedContent: a.setDeletedContent,
    updateContent: a.updateContent,
    setUpdatedContent: a.setUpdatedContent
  }))

  const [pageLimit] = useState(10)
  const [createModal, setCreateModal] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
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
    setCreateModal(!createModal)
  }

  const handleEdit = (data) => {
    setSelectedData(data)
  }

  const handleDelete = (id) => {
    actions.deleteContent(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateContent({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'Book/Content Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Category',
      dataIndex: 'category_name'
    },
    {
      title: 'Sub-Category',
      dataIndex: 'sub_category_name'
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
      render: value => (<>
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
    actions.getContent()
  }, [])

  // Side effect of queries
  useEffect(() => {
    actions.getContent({ ...queries })
  }, [queries])

  useEffect(() => {
    const { status, payload } = state.content
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          pushedData.push({
            key: c.id,
            name: c.name,
            category_name: c.category_name,
            sub_category_name: c.sub_category_name,
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
      actions.setContent(clearState)
    } else if (status === 3) {
      actions.setContent(clearState)
    }
  }, [state.content])

  useEffect(() => {
    const { status } = state.deletedContent
    if (status === 2) {
      actions.getContent()
      actions.setDeletedContent(clearState)
    } else if (status === 3) {
      actions.setDeletedContent(clearState)
    }
  }, [state.deletedContent])

  useEffect(() => {
    const { status } = state.updatedContent
    if (status === 2) {
      actions.setUpdatedContent(clearState)
    } else if (status === 3) {
      actions.setUpdatedContent(clearState)
    }
  }, [state.updatedContent])

  return children({
    state,
    columns,
    pagination,
    data,
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
