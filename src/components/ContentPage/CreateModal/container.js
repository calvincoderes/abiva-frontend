import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { message } from 'antd'
import { useFormik } from 'formik'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const defaultFormValues = {
  category_id: '',
  sub_category_id: '',
  name: '',
  author: '',
  description: ''
}

const Container = ({ children, createModal, setCreateModal }) => {
  // State
  const state = useStoreState(s => ({
    categories: s.categories,
    subCategories: s.subCategories,
    createdContent: s.createdContent,
    createdImage: s.createdImage,
    createdFile: s.createdFile
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getContent: a.getContent,
    getCategories: a.getCategories,
    setCategories: a.setCategories,
    getSubCategories: a.getSubCategories,
    setSubCategories: a.setSubCategories,
    createContent: a.createContent,
    setCreatedContent: a.setCreatedContent,
    createImage: a.createImage,
    setCreatedImage: a.setCreatedImage,
    createFile: a.createFile,
    setCreatedFile: a.setCreatedFile
  }))

  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [categoryChanged, setCategoryChanged] = useState(false)
  const [subCategoryChanged, setSubCategoryChanged] = useState(false)
  const [categories, setCategories] = useState(null)
  const [subCategories, setSubCategories] = useState(null)

  // Initial Form Values
  const [initialValues] = useState(defaultFormValues)

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values) {
        setIsLoading(true)
        actions.createContent(values)
      }
    }
  })

  const closeDefaultModals = () => {
    setIsLoading(false)
  }

  const beforeImageUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }

    return isJpgOrPng
  }

  const handleImageUpload = ({ file }) => {
    const formData = new FormData()
    formData.append('image', file)
    actions.createImage(formData)
  }

  const beforeFileUpload = (file) => {
    const isEpub = file.type === 'application/epub+zip'
    if (!isEpub) {
      message.error('You can only upload JPG/PNG file!')
    }

    return isEpub
  }

  const handleFileUpload = ({ file }) => {
    const formData = new FormData()
    formData.append('image', file)
    actions.createFile(formData)
  }

  useEffect(() => {
    const { status, payload } = state.createdImage
    if (status === 2) {
      setImage(payload.image)
      formik.setFieldValue('cover_photo', payload.image)
      actions.setCreatedImage(clearState)
    } else if (status === 3) {
      actions.setCreatedImage(clearState)
    }
  }, [state.createdImage])

  useEffect(() => {
    const { status, payload } = state.createdFile
    if (status === 2) {
      setFile(payload.image)
      formik.setFieldValue('file_url', payload.image)
      actions.setCreatedFile(clearState)
    } else if (status === 3) {
      actions.setCreatedFile(clearState)
    }
  }, [state.createdFile])

  useEffect(() => {
    if (createModal === true) {
      actions.getCategories({ per_page: 9999 })
      actions.getSubCategories({ per_page: 9999 })
    } else {
      formik.resetForm()
      setSubCategories(null)
      setCategories(null)
    }
  }, [createModal])

  useEffect(() => {
    const { status, payload } = state.categories
    if (status === 2 && createModal === true) {
      const { results } = payload
      if (subCategoryChanged === true) {
        // Current Sub Categories
        const sc = subCategories.filter((i) => i.id === formik.values.sub_category_id)[0]
        // Current Category
        const availableCategory = results.filter((i) => i.id === sc.category_id)
        formik.setFieldValue('category_id', availableCategory[0].id)
        setSubCategoryChanged(false)
        actions.setCategories({ status: 0, payload: null })
      } else {
        setCategories(results.sort((a, b) => a.name.localeCompare(b.name)))
        actions.setCategories({ status: 0, payload: null })
      }
    }
  }, [state.categories])

  useEffect(() => {
    const { status, payload } = state.subCategories
    if (status === 2 && createModal === true) {
      const { results } = payload
      if (categoryChanged === true) {
        // Current Sub Category
        const availableSubCategories = results.filter((i) => i.category_id === formik.values.category_id)
        setSubCategories(availableSubCategories.sort((a, b) => a.name.localeCompare(b.name)))
        formik.setFieldValue('sub_category_id', '')
        setCategoryChanged(false)
        actions.setSubCategories({ status: 0, payload: null })
      } else {
        setSubCategories(results.sort((a, b) => a.name.localeCompare(b.name)))
        actions.setSubCategories({ status: 0, payload: null })
      }
    }
  }, [state.subCategories])

  useEffect(() => {
    if (categoryChanged === true) {
      actions.getSubCategories()
    }
  }, [categoryChanged])

  useEffect(() => {
    if (subCategoryChanged === true) {
      actions.getCategories({ per_page: 9999 })
    }
  }, [subCategoryChanged])

  useEffect(() => {
    const { status } = state.createdContent
    if (status === 2) {
      setImage(null)
      setFile(null)
      formik.resetForm()
      closeDefaultModals()
      setCreateModal(false)
      actions.setCreatedContent({ status: 0, payload: null })
      actions.getContent()
    } else if (status === 3) {
      closeDefaultModals()
      actions.setCreatedContent({ status: 0, payload: null })
    }
  }, [state.createdContent])

  return children({
    state,
    isLoading,
    formik,
    categories,
    subCategories,
    setCategoryChanged,
    setSubCategoryChanged,
    file,
    beforeFileUpload,
    handleFileUpload,
    image,
    beforeImageUpload,
    handleImageUpload
  })
}

export default Container
