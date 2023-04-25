/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import validationSchema from './validations'

const clearState = { status: 0, payload: null }

const pushedData = []

const defaultFormValues = {
  category_id: '',
  category_name: '',
  sub_category_id: '',
  sub_category_name: '',
  content_id: '',
  content_name: '',
  quantity: ''
}

const Container = ({ children, mainFormik }) => {
  const history = useHistory()

  // State
  const state = useStoreState(s => ({
    content: s.content,
    categories: s.categories,
    subCategories: s.subCategories,
    createdSchool: s.createdSchool
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getContent: a.getContent,
    setContent: a.setContent,
    getCategories: a.getCategories,
    setCategories: a.setCategories,
    getSubCategories: a.getSubCategories,
    setSubCategories: a.setSubCategories,
    createSchool: a.createSchool,
    setCreatedSchool: a.setCreatedSchool
  }))

  const [initialValues] = useState(defaultFormValues)
  const [isListsLoaded, setIsListsLoaded] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [contentChanged, setContentChanged] = useState(false)
  const [categoryChanged, setCategoryChanged] = useState(false)
  const [subCategoryChanged, setSubCategoryChanged] = useState(false)
  const [content, setContent] = useState(null)
  const [categories, setCategories] = useState(null)
  const [subCategories, setSubCategories] = useState(null)
  const [allContent, setAllContent] = useState(null)
  const [allCategories, setAllCategories] = useState(null)
  const [allSubCategories, setAllSubCategories] = useState(null)

  const [columns] = useState([
    {
      title: 'Category',
      dataIndex: 'category_name'
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category_name'
    },
    {
      title: 'Book/Content Name',
      dataIndex: 'content_name'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      render: value => (<>
        <Button
          onClick={() => handleDelete(value.key)}
          className='m-1'
          danger
          size='large'
          icon={<DeleteOutlined />}
        />
      </>)
    }
  ])

  const [data, setData] = useState([])

  const handleDelete = (id) => {
    const filtered = pushedData.filter(x => x.key !== id)
    pushedData.length = 0 // Clear array
    if (Object.keys(filtered).length > 0) {
      pushedData.push(filtered)
      setData(filtered)
    } else {
      setData([])
    }
  }

  // Filtered Results
  const filteredR = (data, id) => {
    return data.filter(x => x.id === id)
  }

  // Filtered Categories
  const filteredC = (id) => {
    return allCategories ? allCategories.filter(x => x.id === id) : []
  }

  // Filtered Sub Categories
  const filteredSC = (id) => {
    return allSubCategories ? allSubCategories.filter(x => x.id === id) : []
  }

  // Filtered Content
  const filteredCT = (id) => {
    return allContent ? allContent.filter(x => x.id === id) : []
  }

  // Sorter
  const sortedData = (data) => {
    return data.sort((a, b) => a.name.localeCompare(b.name))
  }

  const filteredSchoolData = (data) => {
    const books = []
    if (data && Object.keys(data).length > 0) {
      data.map((c, k) => {
        c.key = k
        books.push({
          key: k,
          category_id: c.category_id,
          category_name: filteredC(c.category_id)[0] ? filteredC(c.category_id)[0].name : '',
          sub_category_id: c.sub_category_id,
          sub_category_name: filteredSC(c.sub_category_id)[0] ? filteredSC(c.sub_category_id)[0].name : '',
          content_id: c.content_id,
          content_name: filteredCT(c.content_id)[0] ? filteredCT(c.content_id)[0].name : '',
          quantity: parseInt(c.quantity),
          action: c
        })
        return books
      })
    }

    mainFormik.values.books_data = books

    return books
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true,
    onSubmit (values) {
      if (values && isFormSubmitted === false) {
        values.key = (pushedData.length + 1)
        values.action = values
        if (categories) values.category_name = filteredC(values.category_id)[0].name
        if (subCategories) values.sub_category_name = filteredSC(values.sub_category_id)[0].name
        if (content) values.content_name = filteredCT(values.content_id)[0].name
        pushedData.push(values)
        const scData = data
        scData.push(values)
        setData(filteredSchoolData(scData))
        setIsFormSubmitted(true)
      }
    }
  })

  const handleSubmit = () => {
    if (data && Object.keys(data).length > 0) {
      const profile = mainFormik.values.school_profile_data
      const quantity = mainFormik.values.account_quantity_data
      const books = []
      data.map(c => {
        books.push({
          category_id: c.category_id,
          sub_category_id: c.sub_category_id,
          content_id: c.content_id,
          quantity: parseInt(c.quantity)
        })
        return books
      })
      mainFormik.values.school_data = {
        name: profile.name,
        website: profile.website,
        phone_number: profile.phone_number,
        address: profile.address,
        province_id: profile.province_id,
        city_id: profile.city_id,
        address_barangay: profile.address_barangay,
        accounts: {
          admin_quantity: quantity.sa_quantity,
          sub_school_admin_quantity: quantity.ssa_quantity,
          teacher_quantity: quantity.teacher_quantity,
          student_quantity: quantity.student_quantity
        },
        books
      }
      actions.createSchool(mainFormik.values.school_data)
    }
  }

  useEffect(() => {
    actions.getCategories()
    actions.getSubCategories()
    actions.getContent()
  }, [])

  // Handle preloaded data of Books/Content
  useEffect(() => {
    if (mainFormik.values.books_data && Object.keys(mainFormik.values.books_data).length > 0 && isListsLoaded === false && allCategories && allSubCategories && allContent) {
      pushedData.push(filteredSchoolData(mainFormik.values.books_data)) // Reference for Deleting per row
      setData(filteredSchoolData(mainFormik.values.books_data)) // Table Data
      setIsListsLoaded(true) // To make sure it only load once
    }
  }, [mainFormik.values.books_data, allCategories, allSubCategories, allContent])

  useEffect(() => {
    if (isFormSubmitted === true) {
      formik.resetForm()
      actions.getCategories()
      actions.getSubCategories()
      actions.getContent()
      setIsFormSubmitted(false)
    }
  }, [isFormSubmitted])

  useEffect(() => {
    const { status } = state.createdSchool
    if (status === 2) {
      actions.setCreatedSchool(clearState)
      history.push('/school')
    } else if (status === 3) {
      actions.setCreatedSchool(clearState)
    }
  }, [state.createdSchool])

  useEffect(() => {
    const { status, payload } = state.categories
    if (status === 2) {
      const { results } = payload
      setAllCategories(results) // Set all categories without filtering data
      if (subCategoryChanged === true) { // Manipulate Categories Data list: "If Sub Categories Changes"
        // Current Sub Categories
        const sc = filteredSC(formik.values.sub_category_id)[0]
        // Set Category
        formik.setFieldValue('category_id', filteredR(results, sc.category_id)[0].id)

        // Set Categories Changes to false so it can be use again upon changing
        actions.setCategories(clearState)

        // Get Contents if Category Field Changes
        actions.getContent()
      } else if (contentChanged === true) { // Manipulate Categories Data list: "If Content Changes"
        // Available Contents
        const ac = filteredCT(formik.values.content_id)
        // Set Category ID
        formik.setFieldValue('category_id', ac && ac.length > 0 ? ac[0].category_id : 0)

        // If Category Field does not have a value
        !formik.values.category_id && setContent(ac)

        // Clear Set Sub-Categories State
        actions.setSubCategories(clearState)
      } else { // Initial
        setCategories(sortedData(results))
        actions.setCategories(clearState)
      }
    }
  }, [state.categories])

  useEffect(() => {
    const { status, payload } = state.subCategories
    if (status === 2) {
      const { results } = payload
      setAllSubCategories(results) // Set all sub categories without filtering data
      if (categoryChanged === true) { // Manipulate Sub Categories Data list: "If Category Changes"
        // Current Category
        const ac = results.filter((i) => i.category_id === formik.values.category_id)
        // Set Sorted Category
        setSubCategories(sortedData(ac))

        // Current Content
        const act = content.filter((i) => i.category_id === formik.values.category_id)
        // Set Sorted Content
        setContent(sortedData(act))

        // Reset Sub Category and Content if Category Field Changes
        formik.setFieldValue('sub_category_id', '')
        formik.setFieldValue('content_id', '')

        // Set Sub Categories Changes to false so it can be use again upon changing
        actions.setSubCategories(clearState)

        // Get Contents if Category Field Changes
        actions.getContent()
      } else if (contentChanged === true) { // Manipulate Sub Categories Data list: "If Content Changes"
        // Current Contents
        const act = filteredCT(formik.values.content_id)
        // Sub Category ID
        const scId = act && act.length > 0 ? act[0].sub_category_id : 0

        // If Sub Category Field does not have a value
        if (!formik.values.sub_category_id) {
          formik.setFieldValue('sub_category_id', scId)
          setContent(act)
        } else if (formik.values.sub_category_id) { // If Sub Category Field has value
          formik.setFieldValue('sub_category_id', scId)
          setSubCategories(filteredR(results, scId))
        }

        // Set Content Changes to false so it can be use again upon changing
        setContentChanged(false)

        // Clear Set Sub-Categories State
        actions.setSubCategories(clearState)
      } else { // Initial
        setSubCategories(sortedData(results))
        actions.setSubCategories(clearState)
      }
    }
  }, [state.subCategories])

  useEffect(() => {
    const { status, payload } = state.content
    if (status === 2) {
      const { results } = payload
      setAllContent(results) // Set all content without filtering data
      if (subCategoryChanged === true) { // Manipulate Content Data list: "If Sub Category Changes"
        // Current Sub Categories
        const sc = filteredSC(formik.values.sub_category_id)[0]
        // Current Categories
        const ac = filteredR(results, sc.category_id)
        // Current Content
        const act = results.filter((i) => i.sub_category_id === sc.id)

        // Set Content List
        setContent(act)

        // Update Selected Content
        formik.setFieldValue('content_id', act && act.length > 0 ? act[0].id : '')

        // Update Selected Category
        ac && ac.length > 0 && formik.setFieldValue('category_id', ac[0].id)

        // Set Sub Category Changes to false so it can be use again upon changing
        setSubCategoryChanged(false)

        // Clear Set Categories State
        actions.setCategories(clearState)
      } else if (categoryChanged === true) { // Manipulate Content Data list: "If Category Changes"
        // Current Categories
        const c = filteredC(formik.values.category_id)[0]

        // Current Sub Categories
        const sc = subCategories.filter((i) => i.category_id === c.id)

        // Current Content
        const act = results.filter((i) => i.category_id === c.id)
        if (act && act.length > 0) {
          setContent(results)
          formik.setFieldValue('content_id', act[0].id)
        }

        // Current Sub Category
        if (sc && sc.length > 0) {
          formik.setFieldValue('sub_category_id', sc[0].id)
        }

        // Set Category Changes to false so it can be use again upon changing
        setCategoryChanged(false)

        // Clear Set Categories State
        actions.setSubCategories(clearState)
      } else { // Initial
        setContent(sortedData(results))
        actions.setContent(clearState)
      }
    }
  }, [state.content])

  useEffect(() => {
    if (categoryChanged === true) {
      actions.getSubCategories()
    }
  }, [categoryChanged])

  useEffect(() => {
    if (subCategoryChanged === true) {
      actions.getCategories()
    }
  }, [subCategoryChanged])

  useEffect(() => {
    if (contentChanged === true) {
      actions.getCategories()
      actions.getSubCategories()
    }
  }, [contentChanged])

  return children({
    state,
    formik,
    columns,
    data,
    content,
    categories,
    subCategories,
    handleSubmit,
    setContentChanged,
    setCategoryChanged,
    setSubCategoryChanged
  })
}

export default Container
