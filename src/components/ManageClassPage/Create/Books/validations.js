import * as Yup from 'yup'

export default Yup.object().shape({
  school: Yup
    .string()
    .required('Email is required'),
  website: Yup
    .string()
    .required('Website is required')
})
