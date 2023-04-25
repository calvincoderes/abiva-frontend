/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { defaultErr } from '@/utils/errorHandler'
import { USER_TYPE_SCHOOL_SUB_ADMIN } from '@/utils/constants'
import validationSchema from './validations'

const pushedData = []

const defaultFormValues = {
  type: USER_TYPE_SCHOOL_SUB_ADMIN,
  school: '',
  user_number: '',
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  password: ''
}

const Container = ({ children, setCreateModal }) => {
  // State
  const state = useStoreState(s => ({
    content: s.content,
    createdUser: s.createdUser
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getContent: a.getContent,
    setContent: a.setContent,
    getUsers: a.getUsers,
    createUser: a.createUser,
    setCreatedUser: a.setCreatedUser
  }))

  const [pageLimit] = useState(5)
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({ per_page: 9999 })

  // Initial Form Values
  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [content, setContent] = useState(null)

  const [columns] = useState([
    {
      title: 'Content',
      dataIndex: 'name'
    },
    {
      title: 'Author',
      dataIndex: 'author'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      render: value => (<>
        <Button
          onClick={() => handleDelete(value)}
          className='m-1'
          danger
          size='large'
          icon={<DeleteOutlined />}
        />
      </>)
    }
  ])

  const [data, setData] = useState([])

  const handleDelete = (v) => {
    const id = v.id ? v.id : v.key
    const returnData = pushedData.filter(x => x.key === id)[0]

    // Return Deleted Content in Dropdown
    if (returnData) {
      setContent(prevState => [v, ...prevState])
    }

    // Set Data
    const filtered = pushedData.filter(x => x.key !== id)
    pushedData.length = 0 // Clear array
    if (Object.keys(filtered).length > 0) {
      filtered.map((c) => {
        pushedData.push({ key: c.key, name: c.name, author: c.author, action: c })
        return c
      })
      setData(filtered)
    } else {
      setData([])
    }
  }

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
  }

  const handleAddContent = () => {
    if (formik.values.content_id) {
      const id = formik.values.content_id
      const c = content.filter(x => x.id === id)[0]
      const { name, author } = c

      pushedData.push({ id, key: id, name, author, action: c })
      setData(prevState => [...prevState, { id, key: id, name, author, action: c }])
      setPagination(prev => ({
        ...prev,
        total: pushedData.length
      }))
      setContent(content.filter(x => x.id !== id))
      formik.setFieldValue('content_id', '')
    }
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        const contentIds = []
        if (data && Object.keys(data).length > 0) {
          data.map((v) => {
            contentIds.push(v.key)
            return v
          })
        }

        values.assigned_contents = contentIds
        values.username = values.email
        actions.createUser(values)
      }
    }
  })

  useEffect(() => {
    actions.getContent(queries)
  }, [])

  useEffect(() => {
    const { status, payload } = state.content
    if (status === 2 && payload) {
      const { results } = payload
      setContent(results)
      actions.setContent({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setContent({ status: 0, payload: null })
    }
  }, [state.content])

  useEffect(() => {
    const { status, payload } = state.createdUser
    if (status === 2) {
      setInitialValues({
        school: '',
        user_number: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        mobile: '',
        password: ''
      })
      formik.resetForm()
      setCreateModal(false)
      actions.setCreatedUser({ status: 0, payload: null })
      actions.getUsers({ type: USER_TYPE_SCHOOL_SUB_ADMIN })
    } else if (status === 3) {
      if (Object.keys(payload).length > 0) {
        defaultErr(payload)
      }
      actions.setCreatedUser({ status: 0, payload: null })
    }
  }, [state.createdUser])

  return children({ state, formik, content, columns, data, pagination, handleTableOnChange, handleAddContent })
}

export default Container
