import { lazy } from 'react'

import {
  USER_TYPE_SCHOOL_ADMIN,
  USER_TYPE_SCHOOL_SUB_ADMIN,
  USER_TYPE_TEACHER,
  USER_TYPE_STUDENT,
  USER_TYPE_SUPER_ADMIN,

  STATUS_ON_GOING,
  STATUS_FOR_CHECKING,
  STATUS_COMPLETED
} from './constants'

const DashboardPage = lazy(() => import('../components/DashboardPage'))
const LoginPage = lazy(() => import('../components/LoginPage'))
const StudentContentPage = lazy(() => import('../components/StudentContentPage'))

export const pageHandler = (user, isLoggedIn) => {
  const type = user ? user.type : ''
  let page = LoginPage

  if (type && isLoggedIn) {
    if (type === USER_TYPE_SUPER_ADMIN || type === USER_TYPE_SCHOOL_ADMIN || type === USER_TYPE_SCHOOL_SUB_ADMIN || type === USER_TYPE_TEACHER) {
      page = DashboardPage
    } else if (type === USER_TYPE_STUDENT) {
      page = StudentContentPage
    }
  }

  return page
}

export const userType = (user) => {
  const type = user ? user.type : ''
  if (type) {
    if (type === USER_TYPE_SUPER_ADMIN || type === USER_TYPE_SCHOOL_ADMIN || type === USER_TYPE_SCHOOL_SUB_ADMIN) {
      return USER_TYPE_SUPER_ADMIN
    } else if (type === USER_TYPE_TEACHER) {
      return USER_TYPE_TEACHER
    } else if (type === USER_TYPE_STUDENT) {
      return USER_TYPE_STUDENT
    }
  }

  return false
}

export const gradeStatus = (status) => {
  let statusData = { tag: 'default', label: 'Not yet started' }
  if (status) {
    if (status === STATUS_ON_GOING) {
      statusData = { tag: 'processing', label: 'On going' }
    } else if (status === STATUS_FOR_CHECKING) {
      statusData = { tag: 'warning', label: 'For Checking' }
    } else if (status === STATUS_COMPLETED) {
      statusData = { tag: 'success', label: 'Completed' }
    }
  }

  return statusData
}
