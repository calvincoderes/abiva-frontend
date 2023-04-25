import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Tag, Divider, Button } from 'antd'

import ViewComponent from './container'

import { STATUS_MODULE_NOT_YET_STARTED, STATUS_MODULE_IN_PROGRESS, STATUS_MODULE_DONE } from '@/utils/constants'

const Styled = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);

  .header-status {
    .ant-tag {
      margin-right: 0px !important;
    }
  }

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
`

const View = ({ data, url = '' }) => (
  <ViewComponent>
    {({ handleLink }) => (
      <>
        <Styled>
          <Row>
            <Col span={24} className='text-right header-status'>
              {data.status === STATUS_MODULE_NOT_YET_STARTED && <Tag color='default'>{data.status.replace(/_/g, ' ')}</Tag>}
              {data.status === STATUS_MODULE_IN_PROGRESS && <Tag color='processing'>{data.status.replace(/_/g, ' ')}</Tag>}
              {data.status === STATUS_MODULE_DONE && <Tag color='success'>{data.status.replace(/_/g, ' ')}</Tag>}
            </Col>
            <Col span={24} className='box-content'>
              <Row className='mt-3'>
                <Col span={24}>
                  <p className='module-title' style={{ color: '#212121', fontWeight: 'bold', fontSize: '25px', lineHeight: '29px' }}>{data.title}</p>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col span={24}>
                  <p className='module-description' style={{ color: '#AAAAAA', fontSize: '15px', lineHeight: '18px' }}>
                    {data.description}
                  </p>
                </Col>
              </Row>
              <Row gutter={[10, 10]} className='mt-4'>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Teacher:</b> {data.teacher}
                  </p>
                </Col>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Content:</b> {data.stats ? data.stats.content : 0}
                  </p>
                </Col>
                <Col span={12}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Assessment:</b> {data.stats ? data.stats.assessment : 0}
                  </p>
                </Col>
                {/* <Col span={12}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Score:</b> {data.stats ? data.stats.assessment : 0}
                  </p>
                </Col> */}
              </Row>
              <Row>
                <Col span={24}>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {(data.status === STATUS_MODULE_NOT_YET_STARTED || data.status === STATUS_MODULE_IN_PROGRESS) && <Button
                    onClick={() => handleLink(url)}
                    block
                    type='primary'
                    size='large'
                  >
                    View Module
                  </Button>}
                  {data.status === STATUS_MODULE_DONE && <Button
                    disabled
                    block
                    ghost
                    type='primary'
                    size='large'
                  >
                    Review Module
                  </Button>}
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
