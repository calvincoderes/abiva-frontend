import React from 'react'
import styled from 'styled-components'
import { Row, Col, Input, Spin, Pagination } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AssessmentBox from './AssessmentBox'

import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({ state, data, pagination, handlesearchTable, handleOnChange }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tory-blue)' }}>ASSESSMENTS FOR CHECKING</p>
          </Col>
          <Col span={10}>
            <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
          </Col>
          <Col span={24} className='mt-3'>
            <Spin spinning={state.studentA.status === 1}>
              <Row gutter={[30, 30]}>
                {data && data.map((v, k) => (<Col key={k} span={8}>
                  <AssessmentBox data={v} url={`/assessments-for-checking/${v.id}`} />
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
