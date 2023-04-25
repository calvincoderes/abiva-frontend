import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Button, Table, Spin } from 'antd'
import ViewComponent from './container'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

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
      data,
      pagination,
      handleTableOnChange,
      handlesearchTable,
      handleCreate
    }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Assessment Management</p>
          </Col>
          <Col span={12}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={5} offset={7}>
            <Button
              onClick={handleCreate}
              disabled={state.assessments.status === 1 || state.deletedAssessment.status === 1 || state.patchedAssessment.status === 1 || state.publishedAssessment.status === 1}
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              icon={<PlusOutlined />}
              style={{ borderRadius: '2px' }}
            >
              Add Test
            </Button>
          </Col>
          <Col span={24}>
            <Spin spinning={state.deletedAssessment.status === 1 || state.patchedAssessment.status === 1}>
              <Table loading={state.assessments.status === 1} pagination={pagination} columns={columns} dataSource={data} onChange={handleTableOnChange} />
            </Spin>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
