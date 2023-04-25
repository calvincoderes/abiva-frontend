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
      categories,
      handleTableOnChange,
      handlesearchTable,
      handleCreate,
      selectedData,
      setSelectedData,
      createModal,
      setCreateModal
    }) => (
      <Styled>
        <EditModal categories={categories} selectedData={selectedData} setSelectedData={setSelectedData} />
        <CreateModal categories={categories} createModal={createModal} setCreateModal={setCreateModal} />
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Sub-Category</p>
          </Col>
          <Col span={12}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={5} offset={7}>
            <Button
              onClick={handleCreate}
              disabled={state.createdSubCategory.status === 1 || state.deletedSubCategory.status === 1 || state.updatedSubCategory.status === 1}
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              icon={<PlusOutlined />}
              style={{ borderRadius: '2px' }}
            >
              Add Sub-Category
            </Button>
          </Col>
          <Col span={24}>
            <Table
              loading={state.createdSubCategory.status === 1 ||
              state.deletedSubCategory.status === 1 ||
              state.updatedSubCategory.status === 1 ||
              state.categories.status === 1 ||
              state.subCategories.status === 1}
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
