import * as Yup from 'yup'

export default Yup.object().shape({
  student_id: Yup
    .string()
    .nullable()
    .required('Student is required')
})
