import * as Yup from 'yup'

export default Yup.object().shape({
  category_id: Yup
    .number()
    .required('Category is required'),
  sub_category_id: Yup
    .number()
    .required('Sub Category is required'),
  name: Yup
    .string()
    .required('Book/Content Name is required'),
  author: Yup
    .string()
    .required('Author is required'),
  description: Yup
    .string()
    .required('Description is required')
})
