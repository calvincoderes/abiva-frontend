import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup
    .string()
    .required('Test Title is required'),
  description: Yup
    .string()
    .required('Description is required')
})
