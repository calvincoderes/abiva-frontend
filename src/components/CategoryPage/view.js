import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Table, Button, Spin } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import ViewComponent from './container'
import EditModal from './EditModal'
import CreateModal from './CreateModal'

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({
      state,
      columns,
      data,
      pagination,
      handleTableOnChange,
      handlesearchTable,
      handleCreate,
      selectedData,
      setSelectedData,
      createModal,
      setCreateModal
    }) => (
      <Styled>
        <EditModal selectedData={selectedData} setSelectedData={setSelectedData} />
        <CreateModal createModal={createModal} setCreateModal={setCreateModal} />
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Category</p>
          </Col>
          <Col span={12}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={5} offset={7}>
            <Button
              onClick={handleCreate}
              disabled={state.categories.status === 1 || state.deletedCategory.status === 1 || state.updatedCategory.status === 1}
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              icon={<PlusOutlined />}
              style={{ borderRadius: '2px' }}
            >
              Add Category
            </Button>
          </Col>
          <Col span={24}>
            <Spin spinning={state.createdCategory.status === 1 || state.deletedCategory.status === 1 || state.updatedCategory.status === 1}>
              <Table loading={state.categories.status === 1} pagination={pagination} columns={columns} dataSource={data} onChange={handleTableOnChange} />
            </Spin>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
