import { useState } from 'react'
import { useFormik } from 'formik'
import { useLocation, useHistory } from 'react-router-dom'
import validationSchema from './validations'

const Container = ({ children }) => {
  const defaultFormValues = { school_data: '', teacher_data: '', assessment_types_data: '' }
  const history = useHistory()
  const location = useLocation()
  const [current, setCurrent] = useState(0)
  const [initialValues] = useState(defaultFormValues)

  const handleCancel = () => {
    history.push({ pathname: '/module/', search: location.search })
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

  return children({ formik, handleCancel, handleBack, handleSteps, current })
}

export default Container
