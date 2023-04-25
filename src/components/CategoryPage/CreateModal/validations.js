import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup
    .string()
    .required('Category is required'),
  description: Yup
    .string()
    .required('Description is required')
})
