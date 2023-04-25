/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import validationSchema from './validations'
import { USER_TYPE_STUDENT } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const pushedData = []

const defaultFormValues = {
  student: null,
  user_number: '',
  last_name: '',
  first_name: ''
}

const Container = ({ children, mainFormik }) => {
  const history = useHistory()
  const { id } = useParams()

  // State
  const state = useStoreState(s => ({
    users: s.users,
    updatedSection: s.updatedSection
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getUsers: a.getUsers,
    setUsers: a.setUsers,
    updateSection: a.updateSection,
    setUpdatedSection: a.setUpdatedSection
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
          onClick={() => handleDelete(value.key)}
          className='m-1'
          danger
          size='large'
          icon={<DeleteOutlined />}
        />
      </>)
    }
  ])

  const [data, setData] = useState([])

  const handleSubmit = () => {
    if (Object.keys(data).length > 0) {
      const f = mainFormik.values
      const { school, year_level, name, description } = f.class_data
      const assigned_students = []
      const assigned_teachers = []
      if (f.students_data) {
        f.students_data.map((v) => assigned_students.push(v.student))
      }

      if (f.teachers_data) {
        f.teachers_data.map((v) => assigned_teachers.push({ subject: v.subject, teacher: v.teacher }))
      }

      mainFormik.values.class_section_data = { id, school, year_level, name, description, assigned_teachers, assigned_students }

      actions.updateSection(mainFormik.values.class_section_data)
    }
  }

  const handleDelete = (id) => {
    const filtered = pushedData.filter(x => x.key !== id)
    pushedData.length = 0 // Clear array
    if (Object.keys(filtered).length > 0) {
      handlePushedData(filtered)
      setData(filtered)
    } else {
      setData([])
    }
  }

  // Filtered Users
  const filteredUsers = (id) => {
    return allUsers ? allUsers.filter(x => x.id === id) : []
  }

  const handlePushedData = (data) => {
    pushedData.length = 0 // Clear array
    if (data && Object.keys(data).length > 0) {
      data.map(c => {
        pushedData.push({
          key: c.key,
          student: c.student,
          user_number: c.user_number,
          last_name: c.last_name,
          first_name: c.first_name,
          action: c
        })
        return c
      })
    }
  }

  const filteredSectionData = (data) => {
    const students = []
    data.map((c, k) => {
      const student = filteredUsers(c.student)[0]
      students.push({
        key: k,
        student: c.student,
        user_number: student.user_number,
        last_name: student.last_name,
        first_name: student.first_name,
        action: c
      })
      return students
    })

    mainFormik.values.students_data = students

    return students
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values && isFormSubmitted === false) {
        values.key = (mainFormik.values.students_data ? mainFormik.values.students_data.length : 0)
        values.action = values

        if (values.student) {
          const u = filteredUsers(values.student)[0] ? filteredUsers(values.student)[0] : ''
          values.user_number = u.user_number
          values.last_name = u.last_name
          values.first_name = u.first_name
        }

        // Pushed Data is used for deleting per row
        pushedData.push(values)

        const scData = data
        scData.push(values)

        // Data is used for antd table format
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
    if (mainFormik.values.students_data && Object.keys(mainFormik.values.students_data).length > 0 && isListsLoaded === false && allUsers) {
      handlePushedData(filteredSectionData(mainFormik.values.students_data)) // Reference for Deleting per row
      setData(filteredSectionData(mainFormik.values.students_data)) // Table Data
      setIsListsLoaded(true) // To make sure it only load once
    }
  }, [mainFormik.values.students_data, allUsers])

  useEffect(() => {
    const { status, payload } = state.users
    if (status === 2 && payload) {
      const { results } = payload

      // For all list reference
      setAllUsers(results)

      // For Dropdown purposes. The list might lessen based on dropdown combination
      if (Object.keys(results).length > 0) setUsers(results)

      // Clear State
      actions.setUsers(clearState)
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
    const { status } = state.updatedSection
    if (status === 2) {
      actions.setUpdatedSection(clearState)
      history.push('/class')
    } else if (status === 3) {
      actions.setUpdatedSection(clearState)
    }
  }, [state.updatedSection])

  return children({
    state,
    formik,
    columns,
    data,
    users,
    handleSubmit
  })
}

export default Container
