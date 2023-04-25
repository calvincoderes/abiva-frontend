import * as Yup from 'yup'

export default Yup.object().shape({
  student: Yup
    .string()
    .nullable()
    .required('Student is required')
})
