import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Button, Table } from 'antd'
// import accounting from 'accounting'
import ViewComponent from './container'
import { SearchOutlined } from '@ant-design/icons'

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
      handleCreate
    }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Manage School / Organization</p>
          </Col>
          <Col span={24}>
            <Row>
              <Col className='center-left-vh' span={10}>
                <Input onPressEnter={handlesearchTable} size='large' placeholder='Search School/Organization' prefix={<SearchOutlined />} />
              </Col>
              <Col className='center-right-vh' span={6} offset={8}>
                <Button
                  onClick={handleCreate}
                  block
                  type='primary'
                  size='large'
                  htmlType='submit'
                  name='submit'
                  style={{ borderRadius: '4px' }}
                >
                  Add New School / Organization
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Table
              loading={state.schools.status === 1 ||
              state.updatedSchool.status === 1 ||
              state.deletedSchool.status === 1}
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
