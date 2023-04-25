/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import moment from 'moment'
import { Button, Switch } from 'antd'
import { CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    categories: s.categories,
    subCategories: s.subCategories,
    createdSubCategory: s.createdSubCategory,
    deletedSubCategory: s.deletedSubCategory,
    updatedSubCategory: s.updatedSubCategory
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getCategories: a.getCategories,
    setCategories: a.setCategories,
    getSubCategories: a.getSubCategories,
    setSubCategories: a.setSubCategories,
    deleteSubCategory: a.deleteSubCategory,
    setDeletedSubCategory: a.setDeletedSubCategory,
    updateSubCategory: a.updateSubCategory,
    setUpdatedSubCategory: a.setUpdatedSubCategory
  }))

  const [pageLimit] = useState(10)
  const [createModal, setCreateModal] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [categories, setCategories] = useState([])
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
    actions.deleteSubCategory(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateSubCategory({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'Sub-Category',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Category',
      dataIndex: 'category_name'
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
    actions.getCategories()
  }, [])

  useEffect(() => {
    const { status, payload } = state.categories
    if (status === 2 && payload) {
      const { results } = payload
      setCategories(results)
      actions.getSubCategories()
      if (Object.keys(results).length > 0) actions.setCategories({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setCategories({ status: 0, payload: null })
    }
  }, [state.categories])

  useEffect(() => {
    const { status, payload } = state.subCategories
    if (status === 2 && payload) {
      const { results } = payload
      if (Object.keys(results).length > 0) {
        const pushedData = []
        results.map(c => {
          const category = categories.filter(x => x.id === c.category_id)
          pushedData.push({
            key: c.id,
            category_name: category[0] ? category[0].name : '',
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
      actions.setSubCategories({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setSubCategories({ status: 0, payload: null })
    }
  }, [state.subCategories])

  useEffect(() => {
    const { status } = state.deletedSubCategory
    if (status === 2) {
      actions.getCategories()
      actions.setDeletedSubCategory({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setDeletedSubCategory({ status: 0, payload: null })
    }
  }, [state.deletedSubCategory])

  useEffect(() => {
    const { status } = state.updatedSubCategory
    if (status === 2) {
      actions.setUpdatedSubCategory({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setUpdatedSubCategory({ status: 0, payload: null })
    }
  }, [state.updatedSubCategory])

  // Side effect of queries
  useEffect(() => {
    actions.getSubCategories({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    pagination,
    data,
    categories,
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
