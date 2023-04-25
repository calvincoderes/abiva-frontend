/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useFormik } from 'formik'
import validationSchema from './validations'

const defaultFormValues = {
  quantity: ''
}

const Container = ({ children, mainFormik }) => {
  const [initialValues] = useState(defaultFormValues)
  const [columns] = useState([
    {
      title: 'Subject',
      dataIndex: 'subject',
      filters: [
        {
          text: 'Subject 1',
          value: 'Subject 1'
        },
        {
          text: 'Subject 2',
          value: 'Subject 2'
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.subject.indexOf(value) === 0,
      sorter: (a, b) => a.subject.length - b.subject.length,
      sortDirections: ['descend']
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: [
        {
          text: 'Category 1',
          value: 'Category 1'
        },
        {
          text: 'Category 2',
          value: 'Category 2'
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ['descend']
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category',
      filters: [
        {
          text: 'Sub Category 1',
          value: 'Sub Category 1'
        },
        {
          text: 'Sub Category 2',
          value: 'Sub Category 2'
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.sub_category.indexOf(value) === 0,
      sorter: (a, b) => a.sub_category.length - b.sub_category.length,
      sortDirections: ['descend']
    },
    {
      title: 'Book/Content Name',
      dataIndex: 'book',
      filters: [
        {
          text: 'Book 1',
          value: 'Book 1'
        },
        {
          text: 'Book 2',
          value: 'Book 2'
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.book.indexOf(value) === 0,
      sorter: (a, b) => a.book.length - b.book.length,
      sortDirections: ['descend']
    },
    {
      title: 'Quantity Available',
      dataIndex: 'quantity'
    }
  ])

  const [data] = useState([
    {
      key: '1',
      subject: 'Subject 1',
      category: 'Category 1',
      sub_category: 'Sub Category 1',
      book: 'Book 1',
      quantity: (<p style={{ color: 'var(--red)' }}>25</p>),
      action: ''
    },
    {
      key: '2',
      subject: 'Subject 2',
      category: 'Category 2',
      sub_category: 'Sub Category 2',
      book: 'Book 2',
      quantity: (<p style={{ color: 'var(--yellow)' }}>50</p>),
      action: ''
    },
    {
      key: '3',
      subject: 'Subject 3',
      category: 'Category 3',
      sub_category: 'Sub Category 3',
      book: 'Book 3',
      quantity: (<p style={{ color: 'var(--green)' }}>80</p>),
      action: ''
    }
  ])

  const handleTableOnChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema, // From validations
    enableReinitialize: true
  })

  return children({ formik, columns, data, handleTableOnChange })
}

export default Container
