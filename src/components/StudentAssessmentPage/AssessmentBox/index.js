import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Tag, Divider, Button } from 'antd'

import ViewComponent from './container'

import { STATUS_NOT_YET_STARTED, STATUS_ON_GOING, STATUS_FOR_CHECKING, STATUS_COMPLETED } from '@/utils/constants'

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
            <Col span={24} className='text-right header-status'>
              {data.status === STATUS_NOT_YET_STARTED && <Tag color='default'>{data.status.replace(/_/g, ' ')}</Tag>}
              {data.status === STATUS_ON_GOING && <Tag color='processing'>{data.status.replace(/_/g, ' ')}</Tag>}
              {data.status === STATUS_FOR_CHECKING && <Tag color='warning'>{data.status.replace(/_/g, ' ')}</Tag>}
              {data.status === STATUS_COMPLETED && <Tag color='success'>{data.status.replace(/_/g, ' ')}</Tag>}
            </Col>
            <Col span={24} className='box-content'>
              <Row>
                <p className='white-box' style={{ color: 'var(--silver-chalice)', fontSize: '11px' }}>{data.subject}</p>
              </Row>
              <Row className='mt-3'>
                <Col span={24}>
                  <p style={{ color: '#212121', fontWeight: 'bold', fontSize: '25px', lineHeight: '29px' }}>{data.title}</p>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col span={24}>
                  <p style={{ color: '#AAAAAA', fontSize: '15px', lineHeight: '18px' }}>
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
                    <b>Number of items:</b> {data.total_items}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {(data.status === STATUS_NOT_YET_STARTED || data.status === STATUS_ON_GOING) && <Button
                    onClick={() => handleLink(url)}
                    block
                    type='primary'
                    size='large'
                  >
                    Take the test
                  </Button>}
                  {(data.status === STATUS_FOR_CHECKING || data.status === STATUS_COMPLETED) && <Button
                    disabled
                    block
                    ghost
                    type='primary'
                    size='large'
                  >
                    Review answers
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
