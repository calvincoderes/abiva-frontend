import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Divider, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import ViewComponent from './container'

const Styled = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);

  .box-content {
    padding: 25px 20px 25px 20px;

    .module-title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .module-description {
      overflow: hidden;
      height: 35px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .white-box {
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    padding: 8px 15px 8px 15px;
    text-align: center;
  }
`

const View = ({ data, url = '' }) => (
  <ViewComponent>
    {({ handleLink }) => (
      <>
        <Styled>
          <Row>
            <Col span={24} className='box-content'>
              <Row className='mt-3'>
                <Col span={24}>
                  <p className='module-title' style={{ color: '#212121', fontWeight: 'bold', fontSize: '24px', lineHeight: '29px' }}>{data.title}</p>
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col span={24}>
                  <p className='module-description' style={{ color: '#AAAAAA', fontSize: '15px', lineHeight: '18px' }}>
                    {data.description} {data.description} {data.description} {data.description}
                  </p>
                </Col>
              </Row>
              <Row gutter={[10, 10]} className='mt-4'>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Creator:</b> {data.creator_name}
                  </p>
                </Col>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Content:</b> {data.stats.content}
                  </p>
                </Col>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Assessment:</b> {data.stats.assessment}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }} />
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={12}>
                  <Button
                    onClick={() => handleLink(url)}
                    icon={<EditOutlined />}
                    block
                    ghost
                    type='primary'
                    size='large'
                  >
                    Edit Module
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Styled>
      </>
    )}
  </ViewComponent>
)

View.propTypes = {
  data: PropTypes.object,
  url: PropTypes.string
}

export default View
