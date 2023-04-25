import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Select, Table, Button, Spin } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import ViewComponent from './container'
import EditModal from './EditModal'
import CreateModal from './CreateModal'

const { Option } = Select

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({
      state,
      columns,
      data,
      schools,
      pagination,
      handleSchool,
      handleTableOnChange,
      handlesearchTable,
      handleCreate,
      selectedData,
      setSelectedData,
      createModal,
      setCreateModal
    }) => (
      <Styled>
        {selectedData && <EditModal schools={schools} selectedData={selectedData} setSelectedData={setSelectedData} />}
        {!selectedData && <CreateModal schools={schools} createModal={createModal} setCreateModal={setCreateModal} />}
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>School Sub-Admin</p>
          </Col>
          <Col span={10}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={7}>
            <Select
              showSearch
              allowClear
              name='school'
              placeholder='School Name'
              size='large'
              style={{ width: '100%' }}
              onChange={handleSchool}
              filterOption={(input, option) => (
                option.children.toLowerCase().includes(input.toLowerCase())
              )}
            >
              {schools && schools.map((s, k) => (
                <Option key={k} value={s.id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col className='center-right-vh' span={7}>
            <Button
              onClick={handleCreate}
              disabled={state.users.status === 1 || state.deletedUser.status === 1 || state.updatedUser.status === 1}
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              icon={<PlusOutlined />}
              style={{ borderRadius: '2px' }}
            >
              Add New School Sub-Admin
            </Button>
          </Col>
          <Col span={24}>
            <Spin spinning={state.createdUser.status === 1 || state.deletedUser.status === 1 || state.updatedUser.status === 1}>
              <Table loading={state.users.status === 1} pagination={pagination} columns={columns} dataSource={data} onChange={handleTableOnChange} />
            </Spin>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
