import * as Yup from 'yup'

export default Yup.object().shape({
  category_id: Yup
    .number()
    .required('Category is required'),
  name: Yup
    .string()
    .required('Sub Category is required'),
  description: Yup
    .string()
    .required('Description is required')
})
