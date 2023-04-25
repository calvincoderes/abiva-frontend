import * as Yup from 'yup'

export default Yup.object().shape({
  password: Yup
    .string()
    .required('Password is required'),
  confirm_password: Yup
    .string()
    .required('Confirm password is required')
    .when('password', {
      is: val => (!!(val && val.length > 0)),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same'
      )
    })
})
