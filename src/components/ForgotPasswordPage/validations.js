import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address')
})
