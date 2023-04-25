/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import validationSchema from './validations'
import { USER_TYPE_TEACHER } from '@/utils/constants'

const clearState = { status: 0, payload: null }

const pushedData = []

const defaultFormValues = {
  subject: null,
  teacher: null,
  subject_name: '',
  user_number: '',
  last_name: '',
  first_name: ''
}

const Container = ({ children, current, handleSteps, mainFormik }) => {
  // State
  const state = useStoreState(s => ({
    subjects: s.subjects,
    users: s.users
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSubjects: a.getSubjects,
    setSubjects: a.setSubjects,
    getUsers: a.getUsers,
    setUsers: a.setUsers
  }))

  const [initialValues] = useState(defaultFormValues)
  const [isListsLoaded, setIsListsLoaded] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [subjects, setSubjects] = useState(null)
  const [allSubjects, setAllSubjects] = useState(null)
  const [users, setUsers] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [columns] = useState([
    {
      title: 'Subject',
      dataIndex: 'subject_name'
    },
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

  const handleNext = () => {
    if (Object.keys(data).length > 0) {
      handleSteps(current + 1)
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

  // Filtered Subjects
  const filteredSubjects = (id) => {
    return allSubjects ? allSubjects.filter(x => x.id === id) : []
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
          subject: c.subject,
          subject_name: c.subject_name,
          teacher: c.teacher,
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
    const teachers = []
    data.map((c, k) => {
      const subjectId = c.subject ? c.subject : c.suject
      const subject = filteredSubjects(subjectId)[0]
      const teacher = filteredUsers(c.teacher)[0]
      teachers.push({
        key: k,
        subject: subjectId,
        subject_name: subject.name,
        teacher: c.teacher,
        user_number: teacher && teacher.user_number,
        last_name: teacher && teacher.last_name,
        first_name: teacher && teacher.first_name,
        action: c
      })
      return teachers
    })

    mainFormik.values.teachers_data = teachers

    return teachers
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values && isFormSubmitted === false) {
        values.key = (mainFormik.values.teachers_data ? mainFormik.values.teachers_data.length : 0)
        values.action = values

        if (values.subject) {
          const s = filteredSubjects(values.subject)[0] ? filteredSubjects(values.subject)[0] : ''
          values.subject_name = s.name
        }
        if (values.teacher) {
          const u = filteredUsers(values.teacher)[0] ? filteredUsers(values.teacher)[0] : ''
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
    actions.getSubjects({ per_page: 9999 })
    actions.getUsers({ per_page: 9999, type: USER_TYPE_TEACHER })
  }, [])

  // Handle preloaded data of Subjects
  useEffect(() => {
    if (mainFormik.values.teachers_data && Object.keys(mainFormik.values.teachers_data).length > 0 && isListsLoaded === false && allSubjects && allUsers) {
      handlePushedData(filteredSectionData(mainFormik.values.teachers_data)) // Reference for Deleting per row
      setData(filteredSectionData(mainFormik.values.teachers_data)) // Table Data
      setIsListsLoaded(true) // To make sure it only load once
    }
  }, [mainFormik.values.teachers_data, allSubjects, allUsers])

  useEffect(() => {
    const { status, payload } = state.subjects
    if (status === 2 && payload) {
      const { results } = payload

      // For all list reference
      setAllSubjects(results)

      // For Dropdown purposes. The list might lessen based on dropdown combination
      if (Object.keys(results).length > 0) setSubjects(results)

      // Clear State
      actions.setSubjects(clearState)
    } else if (status === 3) {
      actions.setSubjects(clearState)
    }
  }, [state.subjects])

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

  return children({
    state,
    formik,
    columns,
    data,
    subjects,
    users,
    handleNext
  })
}

export default Container
