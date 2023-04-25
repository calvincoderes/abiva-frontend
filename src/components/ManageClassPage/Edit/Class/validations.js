import * as Yup from 'yup'

export default Yup.object().shape({
  school: Yup
    .string()
    .required('School/Organization Name is required'),
  year_level: Yup
    .string()
    .required('Year/Level is required'),
  name: Yup
    .string()
    .required('Class/Section Name is required'),
  description: Yup
    .string()
    .required('Class/Section Description is required')
})
