import React from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Divider } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import TestList from './TestList'

import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;

  .white-box {
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    padding: 8px;
    text-align: center;
  }
`

const View = () => (
  <ViewComponent>
    {({ data, setData, totalStep, handleBack, handleStartTest, testStarted }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={2}>
            <Button onClick={handleBack} className='pl-0' type='link' icon={<LeftOutlined />}>
              Back
            </Button>
          </Col>
          <Col span={22}>
            <Row>
              <Col span={24}>
                <p style={{ fontSize: '24px', color: '#111111' }}>Assessment</p>
              </Col>
              <Col span={24} className='mt-4'>
                <p style={{ fontSize: '24px', color: '#111111', fontWeight: 'bold' }}>{(data && data.title) || '-'}</p>
              </Col>
              <Col span={24} className='mt-4'>
                <p style={{ fontSize: '14px', color: '#111111' }}>{(data && data.description) || '-'}</p>
              </Col>
              <Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA' }} />
              </Col>
            </Row>
            {!testStarted && <Row className='mt-4'>
              <Col span={24}>
                <Button
                  onClick={handleStartTest}
                  type='primary'
                  size='large'
                >
                  Review the Test
                </Button>
              </Col>
            </Row>}
            {testStarted && <Row>
              <Col span={24}>
                {data && <TestList data={data} setData={setData} totalStep={totalStep} />}
              </Col>
            </Row>}
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
