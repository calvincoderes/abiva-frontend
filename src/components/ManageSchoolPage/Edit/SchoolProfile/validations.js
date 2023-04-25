import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup
    .string()
    .required('School/Organization Name is required'),
  website: Yup
    .string()
    .required('Website is required'),
  phone_number: Yup
    .string()
    .required('Phone Number is required'),
  address: Yup
    .string()
    .required('School Address is required'),
  province_id: Yup
    .string()
    .required('Province is required'),
  city_id: Yup
    .string()
    .required('City is required'),
  address_barangay: Yup
    .string()
    .required('Barangay is required')
})
