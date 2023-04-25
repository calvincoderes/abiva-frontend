import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Select, Button, Table } from 'antd'
import ViewComponent from './container'
import { SearchOutlined } from '@ant-design/icons'

const { Option } = Select

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
      schools,
      handleSchool,
      handleTableOnChange,
      handlesearchTable,
      handleCreate
    }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Manage Class/Section</p>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col className='center-left-vh' span={10}>
                <Input onPressEnter={handlesearchTable} size='large' placeholder='Search Class/Section' prefix={<SearchOutlined />} />
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
              <Col className='center-right-vh' span={6} offset={1}>
                <Button
                  onClick={handleCreate}
                  block
                  type='primary'
                  size='large'
                  htmlType='submit'
                  name='submit'
                  style={{ borderRadius: '4px' }}
                >
                  Add New Class/Section
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Table
              loading={state.sections.status === 1 ||
              state.patchedSection.status === 1 ||
              state.deletedSection.status === 1}
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
