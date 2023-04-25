import * as Yup from 'yup'

export default Yup.object().shape({
  school: Yup
    .string()
    .required('School/Organization Name is required')
    .nullable(),
  user_number: Yup
    .string()
    .required('Employee No. is required'),
  first_name: Yup
    .string()
    .required('First Name is required'),
  last_name: Yup
    .string()
    .required('Last Name is required'),
  email: Yup
    .string()
    .required('Email Address is required')
    .email('Enter a valid email address'),
  mobile: Yup
    .string()
    .required('Mobile Number is required')
})
