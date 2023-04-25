import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Image } from 'antd'

import ViewComponent from './container'

const Styled = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 25px 20px 25px 20px;

  .pointer {
    cursor: pointer;
  }

  .white-box {
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    padding: 8px;
    text-align: center;
  }

  .ant-image > .ant-image-img {
    height: 180px !important;
  }
`

const View = ({ c, url = '' }) => (
  <ViewComponent>
    {({ handleLink }) => (
      <>
        <Styled>
          <Row onClick={() => handleLink(url)} className={`${url ? 'pointer' : ''}`}>
            <Col span={24} className='center-vh'>
              <Image src={c.cover_photo ? c.cover_photo : '/assets/images/sample-content.png'} preview={false} />
            </Col>
            <Col span={24}>
              <Row className='mt-4'>
                <Col span={15} className='white-box'>
                  <p style={{ color: 'var(--silver-chalice)', fontSize: '11px' }}>Subject Name</p>
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col span={24}>
                  <p style={{ color: '#212121', fontWeight: 'bold', fontSize: '25px', lineHeight: '29px' }}>{c.name}</p>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col span={24}>
                  <p style={{ color: '#AAAAAA', fontSize: '15px', lineHeight: '18px' }}>
                    {c.description}
                  </p>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Author:</b> {c.author}
                  </p>
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
  c: PropTypes.object,
  url: PropTypes.string
}

export default View
