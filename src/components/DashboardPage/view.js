import React from 'react'
import styled from 'styled-components'
import { Row, Col, Image, Divider, Table } from 'antd'
// import accounting from 'accounting'
import ViewComponent from './container'
import { InfoCircleOutlined, EllipsisOutlined } from '@ant-design/icons'

const Styled = styled.div`
  min-height: 100vh;
  .box-nh {
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #E0E0E0;
    padding: 24px;
  }

  .box {
    min-height: 120px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #E0E0E0;
    padding: 24px;
  }

  .table-box {
    background: #FFFFFF;
    border-radius: 5px;
    min-height: 410px;
  }

  .pointer {
    cursor: pointer;
  }
`

const View = () => (
  <ViewComponent>
    {({ columns, data, handleTableOnChange }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={16}>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Row className='box'>
                  <Col span={24}>
                    <Row>
                      <Col className='center-left-vh' span={21}>
                        <p style={{ fontSize: '14px', color: 'var(--grey)' }}>Total School/Organization</p>
                      </Col>
                      <Col className='center-right-vh' span={2} offset={1}>
                        <InfoCircleOutlined style={{ fontSize: '16px' }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>234</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className='box'>
                  <Col span={24}>
                    <Row>
                    <Col className='center-left-vh' span={21}>
                      <p style={{ fontSize: '14px', color: 'var(--grey)' }}>Total Books/Contents</p>
                    </Col>
                    <Col className='center-right-vh' span={2} offset={1}>
                      <InfoCircleOutlined style={{ fontSize: '16px' }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p style={{ fontSize: '30px', fontWeight: 'bold' }}>3,240</p>
                    </Col>
                  </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='box mt-4'>
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <Row>
                      <Col className='center-left-vh' span={24}>
                        <p style={{ fontSize: '14px', color: 'var(--grey)' }}>School Admin/s</p> &nbsp; <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                      </Col>
                      <Col span={24}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>3</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col className='center-left-vh' span={24}>
                        <p style={{ fontSize: '14px', color: 'var(--grey)' }}>School Sub-Admin/s</p> &nbsp; <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                      </Col>
                      <Col span={24}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>2</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={5}>
                    <Row>
                      <Col className='center-left-vh' span={24}>
                        <p style={{ fontSize: '14px', color: 'var(--grey)' }}>Teachers</p> &nbsp; <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                      </Col>
                      <Col span={24}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>42</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={5}>
                    <Row>
                      <Col className='center-left-vh' span={24}>
                        <p style={{ fontSize: '14px', color: 'var(--grey)' }}>Students</p> &nbsp; <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                      </Col>
                      <Col span={24}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>320</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Table columns={columns} dataSource={data} onChange={handleTableOnChange} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row className='box'>
              <Col span={24}>
                <Row>
                  <Col className='center-left-vh' span={21}>
                    <p style={{ fontSize: '14px', color: 'var(--grey)' }}>Visits</p>
                  </Col>
                  <Col className='center-right-vh' span={2} offset={1}>
                    <InfoCircleOutlined style={{ fontSize: '16px' }} />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <p style={{ fontSize: '30px', fontWeight: 'bold' }}>8,846</p>
                  </Col>
                  <Col className='center-vh' span={24}>
                    <Image src='/assets/images/visits.png' preview={false} />
                  </Col>
                  <Col span={24}>
                    <Divider style={{ borderColor: '#E8E8E8' }} />
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <p style={{ fontSize: '14px' }}>Daily Visits</p>
                  </Col>
                  <Col span={19} offset={1}>
                    <p style={{ fontSize: '14px' }}>1,234</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col className='box-nh' span={24}>
                <Row>
                  <Col className='center-left-vh' span={21}>
                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Books/Content per School</p>
                  </Col>
                  <Col className='center-right-vh' span={2} offset={1}>
                    <EllipsisOutlined style={{ fontSize: '16px' }} />
                  </Col>
                </Row>
              </Col>
              <Col className='box center-vh' span={24}>
                <Image src='/assets/images/piechart.png' preview={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
