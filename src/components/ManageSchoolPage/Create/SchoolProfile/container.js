import { useState, useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useFormik } from 'formik'
import validationSchema from './validations'

const defaultFormValues = {
  name: '',
  website: '',
  phone_number: '',
  address: '',
  province_id: '',
  city_id: '',
  address_barangay: ''
}

const Container = ({ children, current, handleSteps, mainFormik }) => {
  // State
  const state = useStoreState(s => ({
    provinces: s.provinces,
    cities: s.cities
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getProvinces: a.getProvinces,
    setProvinces: a.setProvinces,
    getCities: a.getCities,
    setCities: a.setCities
  }))

  const [initialValues, setInitialValues] = useState(defaultFormValues)
  const [provinces, setProvinces] = useState(null)
  const [cities, setCities] = useState(null)
  const [provinceChanged, setProvinceChanged] = useState(false)
  const [cityChanged, setCityChanged] = useState(false)
  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        mainFormik.values.school_profile_data = values
        handleSteps(current + 1)
      }
    }
  })

  useEffect(() => {
    actions.getProvinces()
    actions.getCities()
  }, [])

  useEffect(() => {
    if (mainFormik.values.school_profile_data) {
      const mf = mainFormik.values.school_profile_data
      setInitialValues({
        name: mf.name,
        website: mf.website,
        phone_number: mf.phone_number,
        address: mf.address,
        province_id: mf.province_id,
        city_id: mf.city_id,
        address_barangay: mf.address_barangay
      })
    }
  }, [mainFormik.values.school_profile_data])

  useEffect(() => {
    const { status, payload } = state.provinces
    if (status === 2) {
      if (cityChanged === true) {
        // Current Province
        const cc = cities.filter((i) => i.id === formik.values.city_id)[0]
        // Current Province
        const availableProvince = payload.filter((i) => i.id === cc.province)
        formik.setFieldValue('province_id', availableProvince[0].id)
        setCityChanged(false)
      } else {
        setProvinces(payload.sort((a, b) => a.name.localeCompare(b.name)))
      }
    }
  }, [state.provinces])

  useEffect(() => {
    const { status, payload } = state.cities
    if (status === 2) {
      if (provinceChanged === true) {
        // Current Province
        const availableCities = payload.filter((i) => i.province === formik.values.province_id)
        setCities(availableCities.sort((a, b) => a.name.localeCompare(b.name)))
        formik.setFieldValue('city_id', '')
        setProvinceChanged(false)
      } else {
        setCities(payload.sort((a, b) => a.name.localeCompare(b.name)))
      }
    }
  }, [state.cities])

  useEffect(() => {
    if (provinceChanged === true) {
      actions.getCities()
    }
  }, [provinceChanged])

  useEffect(() => {
    if (cityChanged === true) {
      actions.getProvinces()
    }
  }, [cityChanged])

  return children({ state, formik, provinces, cities, setProvinceChanged, setCityChanged })
}

export default Container
