/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Button, Switch } from 'antd'
import { CloseOutlined, CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

const clearState = { status: 0, payload: null }

const Container = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  // State
  const state = useStoreState(s => ({
    schools: s.schools,
    sections: s.sections,
    patchedSection: s.patchedSection,
    createdSection: s.createdSection,
    deletedSection: s.deletedSection
  }))

  // Actions
  const actions = useStoreActions(a => ({
    getSchools: a.getSchools,
    setSchools: a.setSchools,
    getSections: a.getSections,
    setSections: a.setSections,
    deleteSection: a.deleteSection,
    setDeletedSection: a.setDeletedSection,
    patchSection: a.patchSection,
    setPatchedSection: a.setPatchedSection
  }))

  const [schools, setSchools] = useState(null)
  const [pageLimit] = useState(10)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: pageLimit
  })
  const [queries, setQueries] = useState({
    ...qs.parse(location.search),
    // ordering: 'name',
    per_page: pageLimit
  })

  const handleCreate = () => {
    history.push({ pathname: '/class/create', search: location.search })
  }

  const handleEdit = (id) => {
    history.push({ pathname: '/class/' + id + '/edit', search: location.search })
  }

  const handleDelete = (id) => {
    actions.deleteSection(id)
  }

  const handleStatus = (checked, c) => {
    actions.patchSection({ id: c.id, is_active: checked })
  }

  const [columns] = useState([
    {
      title: 'Class/Section Name',
      dataIndex: 'name'
    },
    {
      title: 'School Name',
      dataIndex: 'school'
    },
    {
      title: 'Year/Level',
      dataIndex: 'year_level'
    },
    {
      title: 'Activate/Deactivate',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: value => (<>
        {/* <Button
          onClick={() => handleShow(value.id)}
          className='m-1'
          size='large'
          icon={<EyeOutlined />}
        /> */}
        <Button
          onClick={() => handleEdit(value.id)}
          className='m-1'
          ghost
          type='primary'
          size='large'
          icon={<EditOutlined />}
        />
        <Button
          onClick={() => handleDelete(value.id)}
          className='m-1'
          danger
          size='large'
          icon={<DeleteOutlined />}
        />
      </>)
    }
  ])

  // antd Table component's handleTableChange event function
  const handleTableOnChange = (paginate, filters, sorter) => {
    // Update Pagination Data
    setPagination(paginate)

    // Prepare Query Strings Filters
    const query = {
      ...queries,
      page: paginate.current
    }

    if (typeof sorter.field !== 'undefined') {
      query.ordering = `${(sorter.order === 'descend' ? '-' : '')}${sorter.field}`
    } else {
      delete query.ordering
    }

    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  // On Search
  const handlesearchTable = (obj) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      search: obj.target.value,
      page: 1
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  const handleSchool = (v) => {
    // Prepare Query Strings Filters
    const query = {
      ...queries,
      school_id: v
    }
    setQueries(query)

    // Change URL
    history.push(`?${qs.stringify(query)}`)
  }

  useEffect(() => {
    actions.getSchools({ per_page: 9999 })
    actions.getSections()
  }, [])

  useEffect(() => {
    const { status, payload } = state.schools
    if (status === 2 && payload) {
      const { results } = payload
      setSchools(results)
      actions.setSchools({ status: 0, payload: null })
    } else if (status === 3) {
      actions.setSchools({ status: 0, payload: null })
    }
  }, [state.schools])

  useEffect(() => {
    const { status } = state.patchedSection
    if (status === 2) {
      actions.setPatchedSection(clearState)
    } else if (status === 3) {
      actions.setPatchedSection(clearState)
    }
  }, [state.patchedSection])

  useEffect(() => {
    const { status, payload } = state.sections
    if (status === 2 && payload && schools) {
      if (payload && payload.results && Object.keys(payload.results).length > 0) {
        const pushedData = []
        payload.results.map(c => {
          pushedData.push({
            key: c.id,
            id: c.id,
            school: schools.filter(x => x.id === c.school)[0].name,
            year_level: c.year_level,
            name: c.name,
            status: (<Switch
              onChange={(v) => handleStatus(v, c)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={c.is_active}
            />),
            action: c
          })
          return setData(pushedData)
        })
      } else {
        setData([])
      }
      actions.setSections(clearState)
    } else if (status === 3) {
      actions.setSections(clearState)
    }
  }, [state.sections, schools])

  useEffect(() => {
    const { status } = state.deletedSection
    if (status === 2) {
      actions.getSections()
      actions.setDeletedSection(clearState)
    } else if (status === 3) {
      actions.setDeletedSection(clearState)
    }
  }, [state.deletedSection])

  // Side effect of queries
  useEffect(() => {
    actions.getSections({ ...queries })
  }, [queries])

  return children({
    state,
    columns,
    pagination,
    data,
    schools,
    handleSchool,
    handleTableOnChange,
    handlesearchTable,
    handleCreate
  })
}

export default Container
