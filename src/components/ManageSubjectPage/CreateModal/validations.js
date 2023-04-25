import * as Yup from 'yup'

export default Yup.object().shape({
  school: Yup
    .number()
    .required('School/Organization is required')
    .nullable(),
  name: Yup
    .string()
    .required('Subject Name is required'),
  code: Yup
    .string()
    .required('Subject Code is required')
})
