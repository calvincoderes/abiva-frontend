import * as Yup from 'yup'

export default Yup.object().shape({
  year_level: Yup
    .string()
    .nullable()
    .required('Year/Level is required'),
  class_section: Yup
    .string()
    .nullable()
    .required('Class/Section is required'),
  subject: Yup
    .string()
    .nullable()
    .required('Subject is required'),
  teacher: Yup
    .string()
    .nullable()
    .required('Teacher is required')
})
