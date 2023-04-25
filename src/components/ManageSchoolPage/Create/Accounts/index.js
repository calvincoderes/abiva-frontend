import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col, Input, Button } from 'antd'
import ViewComponent from './container'
import { FormItem } from '@/components/FormItem'

const Styled = styled.div`
  .aq-box {
    border: 1px solid #111111;
    padding: 0px 32px 32px 32px;
    .aq-header {
      background: #ffffff;
      color: #111111;
      font-size: 18px;
      position: absolute;
      margin-top: -15px;
      padding-right: 10px;
      padding-left: 10px;
    }
    .aq-content {
      padding: 40px 0px 20px 0px;
    }
  }
`

const View = ({ current, handleSteps, mainFormik }) => (
  <ViewComponent current={current} handleSteps={handleSteps} mainFormik={mainFormik}>
    {({ formik, data }) => (
      <Styled>
        <form method='post' onSubmit={formik.handleSubmit} noValidate>
          <Row gutter={[16, 16]}>
            {data && data.map((d, k) => (<Col key={k} span={6}>
              <Row className='aq-box'>
                <Col span={24}>
                  <div className='aq-header'>{d.title}</div>
                  <Row className='aq-content'>
                    {/* <Col
                      className='pt-2'
                      xs={{ span: 10, offset: 0 }}
                      sm={{ span: 10, offset: 0 }}
                      md={{ span: 10, offset: 0 }}
                      lg={{ span: 10, offset: 0 }}
                      xl={{ span: 10, offset: 0 }}
                      xxl={{ span: 6, offset: 0 }}
                    >
                      <p style={{ fontSize: '14px', color: '#767676' }}>Quantity</p>
                    </Col> */}
                    <Col
                      className='qty-input'
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 24, offset: 0 }}
                      md={{ span: 24, offset: 0 }}
                      lg={{ span: 24, offset: 0 }}
                      xl={{ span: 24, offset: 0 }}
                      xxl={{ span: 24, offset: 0 }}
                    >
                      <FormItem
                        label='Quantity'
                        formik={formik}
                        name={d.name}
                        required
                        inputType='number'
                      >
                        {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>))}
          </Row>
          <Row className='mt-5'>
            <Col className='center-left-vh' span={3} offset={18}>
              <Link to='/school'>
                <Button type='link'>Cancel</Button>
              </Link>
            </Col>
            <Col span={3}>
              <Button
                block
                type='primary'
                size='large'
                htmlType='submit'
                name='submit'
                style={{ borderRadius: '4px' }}
              >
                Next
              </Button>
            </Col>
          </Row>
        </form>
      </Styled>
    )}
  </ViewComponent>
)

View.propTypes = {
  current: PropTypes.any,
  handleSteps: PropTypes.any,
  mainFormik: PropTypes.any
}

export default View
