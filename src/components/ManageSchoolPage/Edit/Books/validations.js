import * as Yup from 'yup'

export default Yup.object().shape({
  category_id: Yup
    .string()
    .required('Categories is required'),
  sub_category_id: Yup
    .string()
    .required('Sub Categories is required'),
  content_id: Yup
    .string()
    .required('Book/Content is required'),
  quantity: Yup
    .number()
    .typeError('This field must be number')
    .required('Quantity is required')
})
