/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useFormik } from 'formik'
import { Input, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import validationSchema from './validations'

const defaultFormValues = {
  school: '',
  subject_name: '',
  subject_code: ''
}

const Container = ({ children }) => {
  const [initialValues] = useState(defaultFormValues)

  const [columns] = useState([
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
      sortDirections: ['descend'],
      render: value => (value === 'initial' ? <Input /> : value)
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
      sortDirections: ['descend'],
      render: value => (value === 'initial' ? <Input /> : value)
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
      sortDirections: ['descend'],
      render: value => (value === 'initial' ? <Input /> : value)
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: value => (value === 'initial' ? <Input /> : value)
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      render: value => (value === 'initial'
        ? <Button
            block
            type='primary'
            size='large'
          >Add</Button>
        : <>
            <Button
              className='m-1'
              danger
              size='large'
              icon={<DeleteOutlined />}
            />
          </>
      )
    }
  ])

  const [data] = useState([
    {
      key: 'initial',
      category: 'initial',
      sub_category: 'initial',
      book: 'initial',
      quantity: 'initial',
      action: 'initial'
    },
    {
      key: '1',
      category: 'Category 1',
      sub_category: 'Sub Category 1',
      book: 'Book 1',
      quantity: 5,
      action: ''
    },
    {
      key: '2',
      category: 'Category 2',
      sub_category: 'Sub Category 2',
      book: 'Book 2',
      quantity: 7,
      action: ''
    },
    {
      key: '3',
      category: 'Category 3',
      sub_category: 'Sub Category 3',
      book: 'Book 3',
      quantity: 2,
      action: ''
    }
  ])

  const handleTableOnChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  // Use to handle form validations and submissions
  const formik = useFormik({
    initialValues, // Initial form validations
    validationSchema // From validations
  })

  return children({ formik, columns, data, handleTableOnChange })
}

export default Container
