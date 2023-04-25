import React from 'react'
import styled from 'styled-components'
import { Row, Col, Spin, Input, Image } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ContentBox from './ContentBox'

import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({ state, contents }) => (
      <Styled>
        <Spin spinning={state.meContents.status === 1}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--tory-blue)' }}>CONTENTS</p>
            </Col>
            <Col span={10}>
              <Input size='large' placeholder='Search' prefix={<SearchOutlined />} />
            </Col>
            {contents && contents.length > 0 && <>
              <Col span={24}>
                <Row>
                  <Col span={1} className='center-left-vh'>
                    <Image src='/assets/images/assessment-type-sm.png' preview={false} />
                  </Col>
                  <Col span={10} className='center-left-vh'>
                    <p style={{ fontSize: '23px', color: '#111111' }}>Subject Name</p>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row gutter={[30, 30]}>
                  {contents.map((c, k) => (<Col key={k} span={8}>
                    <ContentBox c={c} url={`/contents/${c.content_id}`} />
                  </Col>))}
                </Row>
              </Col>
            </>}
          </Row>
        </Spin>
      </Styled>
    )}
  </ViewComponent>
)

export default View
