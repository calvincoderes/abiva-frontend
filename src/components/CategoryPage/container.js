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
    categories: s.categories,
    createdCategory: s.createdCategory,
    deletedCategory: s.deletedCategory,
    updatedCategory: s.updatedCategory
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getCategories: a.getCategories,
    setCategories: a.setCategories,
    createCategory: a.createCategory,
    setCreatedCategory: a.setCreatedCategory,
    deleteCategory: a.deleteCategory,
    setDeletedCategory: a.setDeletedCategory,
    updateCategory: a.updateCategory,
    setUpdatedCategory: a.setUpdatedCategory
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
    actions.deleteCategory(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateCategory({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'Category Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
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
    actions.getCategories()
  }, [])

  useEffect(() => {
    const { status, payload } = state.categories
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
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
      if (Object.keys(payload).length > 0) actions.setCategories({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setCategories({ status: 0, payload: null })
    }
  }, [state.categories])

  useEffect(() => {
    const { status } = state.deletedCategory
    if (status === 2) {
      actions.getCategories()
      actions.setDeletedCategory({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setDeletedCategory({ status: 0, payload: null })
    }
  }, [state.deletedCategory])

  useEffect(() => {
    const { status } = state.updatedCategory
    if (status === 2) {
      actions.setUpdatedCategory({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setUpdatedCategory({ status: 0, payload: null })
    }
  }, [state.updatedCategory])

  // Side effect of queries
  useEffect(() => {
    actions.getCategories({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    data,
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
