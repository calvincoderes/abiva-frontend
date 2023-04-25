/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { useFormik } from 'formik'
import { Input, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import validationSchema from './validations'

const defaultFormValues = {
  school: '',
  year_name: '',
  year_code: ''
}

const Container = ({ children }) => {
  const [initialValues] = useState(defaultFormValues)

  const [columns] = useState([
    {
      title: 'Subject Code',
      dataIndex: 'subject_code',
      filters: [
        {
          text: 'Subject Code 1',
          value: 'Subject Code 1'
        },
        {
          text: 'Subject Code 2',
          value: 'Subject Code 2'
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
      title: 'Subject Name',
      dataIndex: 'subject_name',
      filters: [
        {
          text: 'Subject Name 1',
          value: 'Subject Name 1'
        },
        {
          text: 'Subject Name 2',
          value: 'Subject Name 2'
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
      subject_code: 'initial',
      subject_name: 'initial',
      action: 'initial'
    },
    {
      key: '1',
      subject_code: 'Subject Code 1',
      subject_name: 'Subject Name 1',
      action: ''
    },
    {
      key: '2',
      subject_code: 'Subject Code 2',
      subject_name: 'Subject Name 2',
      action: ''
    },
    {
      key: '3',
      subject_code: 'Subject Code 3',
      subject_name: 'Subject Name 3',
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
