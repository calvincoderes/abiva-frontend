/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import validationSchema from './validations'
import { USER_TYPE_STUDENT } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const pushedData = []

const defaultFormValues = {
  student_id: null,
  user_number: '',
  last_name: '',
  first_name: ''
}

const Container = ({ children, mainFormik }) => {
  const history = useHistory()

  // State
  const state = useStoreState(s => ({
    users: s.users,
    createdSection: s.createdSection
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getUsers: a.getUsers,
    setUsers: a.setUsers,
    createSection: a.createSection,
    setCreatedSection: a.setCreatedSection
  }))

  const [initialValues] = useState(defaultFormValues)
  const [isListsLoaded, setIsListsLoaded] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [users, setUsers] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [columns] = useState([
    {
      title: 'Employee No.',
      dataIndex: 'user_number'
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name'
    },
    {
      title: 'First Name',
      dataIndex: 'first_name'
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

  const handleNext = () => {
    if (Object.keys(data).length > 0) {
      const f = mainFormik.values
      const { school, year_level, name, description } = f.class_data
      const studentIds = []
      if (f.students_data) {
        f.students_data.map((v) => studentIds.push(v.student_id))
      }
      actions.createSection({
        school,
        year_level,
        name,
        description,
        assigned_teachers: f.teachers_data,
        assigned_students: studentIds
      })
    }
  }

  const handleDelete = (id) => {
    const updatedFilteredData = []
    const filtered = pushedData.filter(x => x.key !== id)
    pushedData.length = 0 // Clear array
    if (Object.keys(filtered).length > 0) {
      filtered.map((v, k) => {
        const key = (k + 1)
        const currentData = {
          student_id: v.student_id,
          user_number: v.user_number,
          last_name: v.last_name,
          first_name: v.first_name,
          key: key,
          action: key
        }
        updatedFilteredData.push(currentData)
        return pushedData.push(currentData)
      })
      setData(updatedFilteredData)
    } else {
      setData([])
    }
  }

  // Filtered Users
  const filteredUsers = (id) => {
    return allUsers ? allUsers.filter(x => x.id === id) : []
  }

  const filteredSectionData = (data) => {
    const sections = []
    data.map((c) => {
      sections.push({
        key: c.key,
        student_id: c.student_id,
        user_number: c.user_number,
        last_name: c.last_name,
        first_name: c.first_name,
        action: c.key
      })
      return sections
    })

    mainFormik.values.students_data = sections

    return sections
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values && isFormSubmitted === false) {
        const k = (pushedData.length + 1)
        values.key = k
        values.action = k
        if (values.student_id) {
          const u = filteredUsers(values.student_id)[0] ? filteredUsers(values.student_id)[0] : ''
          values.user_number = u.user_number
          values.last_name = u.last_name
          values.first_name = u.first_name
        }
        pushedData.push(values)
        const scData = data
        scData.push(values)
        setData(filteredSectionData(scData))
        setIsFormSubmitted(true)
      }
    }
  })

  useEffect(() => {
    actions.getUsers({ per_page: 9999, type: USER_TYPE_STUDENT })
  }, [])

  // Handle preloaded data of Students
  useEffect(() => {
    if (Object.keys(mainFormik.values.students_data).length > 0 && isListsLoaded === false) {
      setData(filteredSectionData(mainFormik.values.students_data)) // Table Data
      setIsListsLoaded(true) // To make sure it only load once
    }
  }, [mainFormik.values.students_data])

  useEffect(() => {
    const { status, payload } = state.users
    if (status === 2 && payload) {
      const { results } = payload
      setAllUsers(results)
      if (Object.keys(results).length > 0) {
        setUsers(results)
      }
    } else if (status === 3) {
      actions.setUsers(clearState)
    }
  }, [state.users])

  useEffect(() => {
    if (isFormSubmitted === true) {
      formik.resetForm()
      setIsFormSubmitted(false)
    }
  }, [isFormSubmitted])

  useEffect(() => {
    const { status } = state.createdSection
    if (status === 2) {
      actions.setCreatedSection(clearState)
      history.push('/class')
    } else if (status === 3) {
      actions.setCreatedSection(clearState)
    }
  }, [state.createdSection])

  return children({
    state,
    formik,
    columns,
    data,
    users,
    handleNext
  })
}

export default Container
