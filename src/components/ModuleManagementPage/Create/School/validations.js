import * as Yup from 'yup'

export default Yup.object().shape({
  school: Yup
    .string()
    .required('School/Organization Name is required')
})
