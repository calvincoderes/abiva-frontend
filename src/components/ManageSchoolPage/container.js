/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Button, Switch } from 'antd'
import { CloseOutlined, CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    schools: s.schools,
    createdSchool: s.createdSchool,
    deletedSchool: s.deletedSchool,
    updatedSchool: s.updatedSchool
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    deleteSchool: a.deleteSchool,
    setDeletedSchool: a.setDeletedSchool,
    updateSchool: a.updateSchool,
    setUpdatedSchool: a.setUpdatedSchool
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
    history.push({ pathname: '/school/create', search: location.search })
  }

  const handleEdit = (id) => {
    history.push({ pathname: '/school/' + id + '/edit', search: location.search })
  }

  const handleDelete = (id) => {
    actions.deleteSchool(id)
  }

  const handleStatus = (checked, c) => {
    actions.updateSchool({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'School Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Total School Admin',
      dataIndex: 'total_school_admin'
    },
    {
      title: 'Total School Sub-Admin',
      dataIndex: 'total_school_sub_admin'
    },
    {
      title: 'Total Teacher',
      dataIndex: 'total_teacher'
    },
    {
      title: 'Total Student',
      dataIndex: 'total_student'
    },
    {
      title: 'Activate/Deactivate',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: value => (<>
        {/* <Button
          onClick={() => handleShow(value.id)}
          className='m-1'
          size='large'
          icon={<EyeOutlined />}
        /> */}
        <Button
          onClick={() => handleEdit(value.id)}
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
    actions.getSchools()
  }, [])

  useEffect(() => {
    const { status, payload } = state.schools
    if (status === 2 && payload) {
      if (Object.keys(payload).length > 0) {
        const { results } = payload
        const pushedData = []
        results.map(c => {
          pushedData.push({
            key: c.id,
            id: c.id,
            name: c.name,
            total_school_admin: c.accounts.admin_quantity ? c.accounts.admin_quantity : 0,
            total_school_sub_admin: c.accounts.sub_school_admin_quantity ? c.accounts.sub_school_admin_quantity : 0,
            total_teacher: c.accounts.teacher_quantity ? c.accounts.teacher_quantity : 0,
            total_student: c.accounts.student_quantity ? c.accounts.student_quantity : 0,
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
      actions.setSchools({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setSchools({ status: 0, payload: null })
    }
  }, [state.schools])

  useEffect(() => {
    const { status } = state.deletedSchool
    if (status === 2) {
      actions.getSchools()
      actions.setDeletedSchool({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setDeletedSchool({ status: 0, payload: null })
    }
  }, [state.deletedSchool])

  // Side effect of queries
  useEffect(() => {
    actions.getSchools({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    pagination,
    data,
    handleTableOnChange,
    handlesearchTable,
    handleCreate
  })
}

export default Container
