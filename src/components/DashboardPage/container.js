import { useState } from 'react'

const Container = ({ children }) => {
  const [columns] = useState([
    {
      title: 'Rank',
      dataIndex: 'rank'
    },
    {
      title: 'School/Organization',
      dataIndex: 'school'
    }
  ])

  const [data] = useState([
    {
      key: '1',
      rank: '1',
      school: 'School/Organization 1'
    },
    {
      key: '2',
      rank: '2',
      school: 'School/Organization 2'
    },
    {
      key: '3',
      rank: '3',
      school: 'School/Organization 3'
    },
    {
      key: '4',
      rank: '4',
      school: 'School/Organization 4'
    },
    {
      key: '5',
      rank: '5',
      school: 'School/Organization 5'
    }
  ])

  const handleTableOnChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return children({ columns, data, handleTableOnChange })
}

export default Container
