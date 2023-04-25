import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Please enter name')
    .nullable(),
  job: Yup.string()
    .required('Please enter job')
    .nullable()
})
