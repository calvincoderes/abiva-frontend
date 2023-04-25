import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Button, Spin, Pagination } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import AssessmentBox from './AssessmentBox'

import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({ state, data, pagination, handlesearchTable, handleOnChange, handleCreate }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Module Management</p>
          </Col>
          <Col span={10}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={5} offset={7}>
            <Button
              onClick={handleCreate}
              disabled={state.modules.status === 1}
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              icon={<PlusOutlined />}
              style={{ borderRadius: '2px' }}
            >
              Add Module
            </Button>
          </Col>
          <Col span={24} className='mt-3'>
            <Spin spinning={state.modules.status === 1}>
              <Row gutter={[20, 20]}>
                {data && data.map((v, k) => (<Col key={k} span={8}>
                  <AssessmentBox data={v} url={`/module/${v.id}/edit`} />
                </Col>))}
                {pagination.total !== 0 && <Col span={8} className='end-vh'>
                  <Pagination showLessItems={true} showSizeChanger={false} pageSize={pagination.pageSize} current={pagination.current} total={pagination.total} onChange={handleOnChange} />
                </Col>}
              </Row>
            </Spin>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
