import * as Yup from 'yup'

export default Yup.object().shape({
  school: Yup
    .number()
    .required('School/Organization is required')
    .nullable(),
  name: Yup
    .string()
    .required('Year/Level Name is required'),
  description: Yup
    .string()
    .required('Year/Level Description is required')
})
