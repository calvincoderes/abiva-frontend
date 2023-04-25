import React from 'react'
import styled from 'styled-components'
import { Row, Col, Spin, Image, Input, Button, Tabs } from 'antd'
import ViewContainer from './container'
import { FormItem } from '@/components/FormItem'

const { TabPane } = Tabs

const Styled = styled(Row)`
  width: 100%;
  min-height: 100vh;
  padding-top: 40px;
  background: #FFFFFF;
  .login-container {
    padding: 60px 90px 60px 90px;

    .header-tab {
      padding: 0px 20px 0px 20px;
      background: #F0F2F5;
    }

    .btn-container {
      .ant-btn-lg {
        height: 50px;
      }
    }
  }
`

const View = () => (
  <ViewContainer>
    {({ state, formik }) => (
      <Styled>
        <Col
          className='login-container'
          xs={{ span: 20, offset: 2 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 14, offset: 5 }}
          lg={{ span: 14, offset: 5 }}
          xl={{ span: 14, offset: 5 }}
          xxl={{ span: 10, offset: 7 }}
        >
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            <Spin spinning={state.cp.status === 1}>
              <Row>
                <Col
                  className='center-vh'
                  xs={{ span: 11, offset: 1 }}
                  sm={{ span: 11, offset: 1 }}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 6, offset: 9 }}
                  xl={{ span: 6, offset: 9 }}
                  xxl={{ span: 6, offset: 9 }}
                >
                  <Image src='/assets/images/abiva-logo.png' preview={false} />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col className='text-center' span={20} offset={2}>
                  <p style={{ color: 'var(--grey)', fontSize: '14px' }}>
                    Abiva Publishing House is committed to promote quality education through the development, publication, and distribution of excellent educational materials.
                  </p>
                </Col>
              </Row>
              <Row className='mt-5 mb-3'>
                <Col className='header-tab' span={24}>
                  <Tabs defaultActiveKey='1'>
                    <TabPane tab='Create Password' key='1' />
                  </Tabs>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <FormItem
                    formik={formik}
                    label='Password'
                    name='password'
                    required
                  >
                    {props => <Input.Password {...props} placeholder='' size='large' />}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                      formik={formik}
                      label='Confirm Password'
                      name='confirm_password'
                      required
                    >
                      {props => <Input.Password {...props} placeholder='' size='large' />}
                  </FormItem>
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col className='btn-container' span={24}>
                  <Button
                    disabled={state.cp.status === 1}
                    block
                    type='primary'
                    size='large'
                    htmlType='submit'
                    name='submit'
                    style={{ borderRadius: '2px' }}
                  >
                    Continue
                  </Button>
                </Col>
              </Row>
            </Spin>
            <Row className='center-vh'>
              <Col style={{ position: 'absolute', bottom: '20px', fontSize: '13px', color: '#A9A9A9' }} span={24}>
                Copyright ©2021 Produced by Trifecta Core Technologies Corp.
              </Col>
            </Row>
          </form>
        </Col>
      </Styled>
    )}
  </ViewContainer>
)

export default View
