import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import { Row, Col, Table, Input, Alert, Button } from 'antd'
import { SettingOutlined, SearchOutlined } from '@ant-design/icons'
import ViewComponent from './container'

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
    .qty-input {
      .ant-form-item-explain {
        display: none;
      }
    }
  }
`

const View = ({ mainFormik }) => (
  <ViewComponent mainFormik={mainFormik}>
    {({ formik, columns, data, handleTableOnChange }) => (
      <Styled>
        <form method='post' onSubmit={formik.handleSubmit} noValidate>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <p style={{ color: '#111111', fontSize: '16px' }}>Review Book/Content</p>
            </Col>
            <Col span={24}>
              <Alert message={<p>You can only add <b>25 students</b>. Quantity of students must be equal to Content Materials. </p>} type='warning' icon={<SettingOutlined />} showIcon />
            </Col>
          </Row>
          <Row className='mt-4' gutter={[16, 16]}>
            <Col span={10}>
              <Input size='large' placeholder='Search' prefix={<SearchOutlined />} />
            </Col>
            <Col span={24}>
              <Table columns={columns} dataSource={data} onChange={handleTableOnChange} />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col className='center-left-vh' span={3} offset={17}>
              <Button type='link'>Cancel</Button>
            </Col>
            <Col span={4}>
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
  mainFormik: PropTypes.any
}

export default View
