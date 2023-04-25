import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Table, Button } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import ViewComponent from './container'
import EditModal from './EditModal'
import CreateModal from './CreateModal'

const Styled = styled.div`
  min-height: 100vh;
  .box-nh {
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #E0E0E0;
    padding: 24px;
  }

  .box {
    min-height: 120px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #E0E0E0;
    padding: 24px;
  }

  .table-box {
    background: #FFFFFF;
    border-radius: 5px;
    min-height: 410px;
  }

  .pointer {
    cursor: pointer;
  }
`

const View = () => (
  <ViewComponent>
    {({
      state,
      columns,
      pagination,
      data,
      handleTableOnChange,
      handlesearchTable,
      handleCreate,
      selectedData,
      setSelectedData,
      createModal,
      setCreateModal
    }) => (
      <Styled>
        {selectedData && <EditModal selectedData={selectedData} setSelectedData={setSelectedData} />}
        {!selectedData && <CreateModal createModal={createModal} setCreateModal={setCreateModal} />}
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Content</p>
          </Col>
          <Col span={12}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={4} offset={8}>
            <Button
              onClick={handleCreate}
              disabled={state.createdContent.status === 1 || state.deletedContent.status === 1 || state.updatedContent.status === 1}
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              icon={<PlusOutlined />}
              style={{ borderRadius: '2px' }}
            >
              Add Content
            </Button>
          </Col>
          <Col span={24}>
            <Table
              loading={state.createdContent.status === 1 ||
              state.deletedContent.status === 1 ||
              state.updatedContent.status === 1 ||
              state.content.status === 1}
              columns={columns}
              dataSource={data}
              pagination={pagination}
              onChange={handleTableOnChange}
            />
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
