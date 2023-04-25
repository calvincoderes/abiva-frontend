import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup
    .string()
    .required('Module Title is required'),
  description: Yup
    .string()
    .required('Module Description is required')
})
