import React from 'react'
import styled from 'styled-components'
import { Row, Col, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import Pages from './Pages'
import List from './List'

import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({ data, setData, totalStep, handleBack, currentStep, setCurrentStep }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={2} className='center-left-vh'>
            <Button onClick={handleBack} className='pl-0' type='link' icon={<LeftOutlined />}>
              Back
            </Button>
          </Col>
          <Col span={18} className='center-left-vh'>
            <Col span={24}>
              <p style={{ fontSize: '24px', color: '#111111' }}>Modules</p>
            </Col>
          </Col>
          <Col span={7}>
            {data && <Pages data={data.pages} currentStep={currentStep} />}
          </Col>
          <Col span={17}>
            <Row>
              <Col span={24}>
                {data && <List data={data} setData={setData} totalStep={totalStep} currentStep={currentStep} setCurrentStep={setCurrentStep} />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
