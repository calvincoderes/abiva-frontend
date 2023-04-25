import React from 'react'
import styled from 'styled-components'
import { Row, Col, Divider, Button, Table } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;

  .white-box {
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    padding: 8px 15px 8px 15px;
    text-align: center;
  }
`

const View = () => (
  <ViewComponent>
    {({ state, handleBack, columns, details, data, pagination, handleTableOnChange }) => (
      <Styled>
        <Row gutter={[20, 20]}>
          <Col span={2} className='pt-2'>
            <Button onClick={handleBack} className='pl-0' type='link' icon={<LeftOutlined />}>
              Back
            </Button>
          </Col>
          <Col span={22}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <p style={{ fontSize: '40px', lineHeight: '50px', fontWeight: 'bold' }}>{(details && details.title) || '-'}</p>
              </Col>
              <Col span={6}>
                <p className='white-box' style={{ color: 'var(--silver-chalice)', fontSize: '11px' }}>{(details && details.subject_name) || '-'}</p>
              </Col>
              <Col span={24}>
                <p style={{ color: '#AAAAAA', fontSize: '15px', lineHeight: '18px' }}>
                  {(details && details.description) || '-'}
                </p>
              </Col>
              <Col span={24}>
                <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                  <b>Year Level:</b> 4th year
                </p>
              </Col>
              <Col span={24}>
                <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                  <b>Class/Section:</b> Section Mars
                </p>
              </Col>
              <Col span={24}>
                <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                  <b>Teacher:</b> {(details && details.teacher && details.teacher.name) || '-'}
                </p>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA' }} />
              </Col>
            </Row>
            <Row gutter={[20, 20]} className='mt-5'>
              <Col span={24}>
                <Row>
                  <Col span={5}>
                    <span style={{ fontStyle: 'italic', fontSize: '15px', lineHeight: '18px' }}>
                      <b>Number of students:</b> -
                    </span>
                  </Col>
                  <Col span={4} offset={2}>
                    <span style={{ fontStyle: 'italic', fontSize: '15px', lineHeight: '18px' }}>
                      <b>Completed:</b> {details && details.stats && details.stats.completed}
                    </span>
                  </Col>
                  <Col span={4}>
                    <span style={{ fontStyle: 'italic', fontSize: '15px', lineHeight: '18px' }}>
                      <b>For Checking:</b> {details && details.stats && details.stats.for_checking}
                    </span>
                  </Col>
                  <Col span={4}>
                    <span style={{ fontStyle: 'italic', fontSize: '15px', lineHeight: '18px' }}>
                      <b>On going:</b> {details && details.stats && details.stats.on_going}
                    </span>
                  </Col>
                  <Col span={5}>
                    <span style={{ fontStyle: 'italic', fontSize: '15px', lineHeight: '18px' }}>
                      <b>Not yet started:</b> {details && details.stats && details.stats.not_yet_started}
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Table
                  loading={state.users.status === 1 || state.gradingDetails.status === 1}
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  onChange={handleTableOnChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
