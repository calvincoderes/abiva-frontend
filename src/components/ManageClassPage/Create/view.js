import React from 'react'
import styled from 'styled-components'
import { Row, Col, Steps, Divider, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import ViewComponent from './container'
import Class from './Class'
import Teachers from './Teachers'
// import Books from './Books'
import Students from './Students'

const { Step } = Steps
// .ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item-description {
//   max-width: unset;
// }
const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({ formik, handleCancel, handleBack, handleSteps, current }) => (
      <Styled>
        <Row>
          <Col span={24}>
            <Row>
              <Col
                className='mt-1'
                xs={{ span: 3, offset: 0 }}
                sm={{ span: 3, offset: 0 }}
                md={{ span: 2, offset: 0 }}
                lg={{ span: 2, offset: 0 }}
                xl={{ span: 2, offset: 0 }}
                xxl={{ span: 2, offset: 0 }}
              >
                {current === 0 && <Button onClick={handleCancel} className='pl-0' type='link' icon={<LeftOutlined />}>
                  Cancel
                </Button>}
                {current !== 0 && <Button onClick={handleBack} className='pl-0' type='link' icon={<LeftOutlined />}>
                  Back
                </Button>}
              </Col>
              <Col
                xs={{ span: 21, offset: 0 }}
                sm={{ span: 21, offset: 0 }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 22, offset: 0 }}
                xxl={{ span: 22, offset: 0 }}
              >
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <p style={{ fontSize: '24px', color: '#111111' }}>Add Class/Section</p>
                  </Col>
                  <Col span={24}>
                    <Steps current={current}>
                      <Step title='Create Class/Section' description='Select School/Org, Yr./Lvl. and input class/section details' />
                      <Step title='Assign Teacher' description='Select teacher/s in class/section' />
                      {/* <Step title='Review Books/Content' description='Review Books/Content and available quantity for student' /> */}
                      <Step title='Assign Students' description='Select student/s in class/section' />
                    </Steps>
                  </Col>
                  <Col span={24}>
                    <Divider style={{ borderColor: '#AAAAAA' }} />
                  </Col>
                  <Col span={24}>
                    {current === 0 && <Class current={current} handleSteps={handleSteps} mainFormik={formik} />}
                    {current === 1 && <Teachers current={current} handleSteps={handleSteps} mainFormik={formik} />}
                    {/* {current === 2 && <Books mainFormik={formik} />} */}
                    {current === 2 && <Students current={current} handleSteps={handleSteps} mainFormik={formik} />}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
