import * as Yup from 'yup'

export default Yup.object().shape({
  subject: Yup
    .string()
    .nullable()
    .required('Subject is required'),
  teacher: Yup
    .string()
    .nullable()
    .required('Teacher is required')
})
