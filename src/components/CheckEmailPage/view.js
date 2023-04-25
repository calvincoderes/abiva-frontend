import React from 'react'
import styled from 'styled-components'
import { Row, Col, Image, Button, Typography } from 'antd'
import ViewContainer from './container'

const { Title } = Typography

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

    .title-text {
      color: #0D509F !important;
    }

    .try-another-email {
      cursor: pointer;
      color: #fccd41;
      text-decoration: underline;
    }
  }
`

const View = () => (
  <ViewContainer>
    {({ onClick }) => (
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
            <Row>
          </Row>
          <Row className='mt-10'>
            <Col className='center-vh' span={24}>
              <Image src='/assets/images/circled-check.png' preview={false} />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col className='text-center' span={24}>
              <Title className='title-text' level={3}>CHECK YOUR EMAIL</Title>
            </Col>
            <Col className='text-center' span={24}>
              <p style={{ fontSize: '14px', color: '#00263D' }}>You should have received an email with instructions on how to reset  your password. Please check your spam/junk inbox as well.</p>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col className='btn-container' span={24}>
              <Button
                block
                type='primary'
                size='large'
                onClick={() => onClick('/')}
              >
                Go back to Login
              </Button>
            </Col>
          </Row>
          <Row className='mt-10'>
            <Col span={24} className='text-center'>
              <p style={{ fontSize: '14px', color: '#00263D' }}>Did not receive the email? Check your Spam filter, or <span className='try-another-email' onClick={() => onClick('/forgot-password')}>try another email address</span></p>
            </Col>
          </Row>
          <Row className='center-vh'>
            <Col style={{ position: 'absolute', bottom: '20px', fontSize: '13px', color: '#A9A9A9' }} span={24}>
              Copyright ©2021 Produced by Trifecta Core Technologies Corp.
            </Col>
          </Row>
        </Col>
      </Styled>
    )}
  </ViewContainer>
)

export default View
