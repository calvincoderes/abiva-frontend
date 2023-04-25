import * as Yup from 'yup'

export default Yup.object().shape({
  sa_quantity: Yup
    .number()
    .typeError('This field must be number')
    .required('This field is required')
    .test(
      'Is positive?',
      'Invalid quantity',
      (value) => value > 0
    ),
  ssa_quantity: Yup
    .number()
    .typeError('This field must be number')
    .required('This field is required')
    .test(
      'Is positive?',
      'Invalid quantity',
      (value) => value >= 0
    ),
  teacher_quantity: Yup
    .number()
    .typeError('This field must be number')
    .required('This field is required')
    .test(
      'Is positive?',
      'Invalid quantity',
      (value) => value >= 0
    ),
  student_quantity: Yup
    .number()
    .typeError('This field must be number')
    .required('This field is required')
    .test(
      'Is positive?',
      'Invalid quantity',
      (value) => value >= 0
    )
})
