import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import validationSchema from './validations'

const defaultFormValues = {
  sa_quantity: '',
  ssa_quantity: '',
  teacher_quantity: '',
  student_quantity: ''
}

const Container = ({ children, current, handleSteps, mainFormik }) => {
  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [data] = useState([
    {
      title: 'School Admin',
      name: 'sa_quantity'
    },
    {
      title: 'Sub School Admin',
      name: 'ssa_quantity'
    },
    {
      title: 'Teacher',
      name: 'teacher_quantity'
    },
    {
      title: 'Student',
      name: 'student_quantity'
    }
  ])
  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        mainFormik.values.account_quantity_data = values
        handleSteps(current + 1)
      }
    }
  })

  useEffect(() => {
    if (mainFormik.values.account_quantity_data) {
      const mf = mainFormik.values.account_quantity_data
      setInitialValues({
        sa_quantity: mf.sa_quantity,
        ssa_quantity: mf.ssa_quantity,
        teacher_quantity: mf.teacher_quantity,
        student_quantity: mf.student_quantity
      })
    }
  }, [mainFormik.values.account_quantity_data])

  return children({ formik, data })
}

export default Container
