import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const defaultFormValues = {
  school_profile_data: '',
  account_quantity_data: '',
  books_data: [],
  school_data: ''
}

const Container = ({ children }) => {
  // State
  const state = useStoreState(s => ({
    schoolDetails: s.schoolDetails
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchoolDetails: a.getSchoolDetails,
    setSchoolDetails: a.setSchoolDetails
  }))

  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [current, setCurrent] = useState(0)
  const [initialValues] = useState(defaultFormValues)

  const handleCancel = () => {
    history.push({ pathname: '/school/', search: location.search })
  }

  const handleBack = () => {
    setCurrent(current - 1)
  }

  const handleSteps = (step) => {
    setCurrent(step)
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema // From validations
  })

  useEffect(() => {
    actions.getSchoolDetails({ id })
  }, [])

  useEffect(() => {
    const { status, payload } = state.schoolDetails
    if (status === 2) {
      // eslint-disable-next-line camelcase
      const { name, website, phone_number, address, province_id, city_id, address_barangay, accounts, books } = payload

      // School/Organization Profile Tab Data
      formik.setFieldValue('school_profile_data', {
        name,
        website,
        phone_number,
        address,
        province_id,
        city_id,
        address_barangay
      })

      // Account Quantity Tab Data
      formik.setFieldValue('account_quantity_data', {
        sa_quantity: accounts.admin_quantity,
        ssa_quantity: accounts.sub_school_admin_quantity,
        teacher_quantity: accounts.teacher_quantity,
        student_quantity: accounts.student_quantity
      })

      // Books/Content Tab Data
      formik.setFieldValue('books_data', books)

      actions.setSchoolDetails(clearState)
    } else if (status === 3) {
      actions.setSchoolDetails(clearState)
    }
  }, [state.schoolDetails])

  return children({ formik, handleCancel, handleBack, handleSteps, current })
}

export default Container
