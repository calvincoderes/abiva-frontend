import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Divider } from 'antd'

import ViewComponent from './container'

const Styled = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 25px 20px 25px 20px;

  .pointer {
    cursor: pointer;
  }

  .ab-subject-name {
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    padding: 8px;
    text-align: center;
  }
`

const View = ({ data, url }) => (
  <ViewComponent>
    {({ handleLink }) => (
      <>
        <Styled>
          <Row onClick={() => handleLink(url)} className='pointer'>
            <Col span={24}>
              <Row>
                <Col span={9} className='ab-subject-name'>
                  <p style={{ color: 'var(--silver-chalice)', fontSize: '11px' }}>{data.subject}</p>
                </Col>
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
              <Row className='mt-2'>
                <Col span={24}>
                  <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                    <b>Teacher:</b> {data.teacher}
                  </p>
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col span={24}>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row className='mb-3'>
                    <Col span={10} className='center-left-vh'>
                      <p style={{ color: '#35C332', fontWeight: 'bold', fontSize: '15px', lineHeight: '18px' }}>
                        Completed:
                      </p>
                    </Col>
                    <Col span={14} className='center-right-vh'>
                      <p style={{ color: '#212121', fontSize: '15px', lineHeight: '18px' }}>{data.completed}</p>
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col span={10} className='center-left-vh'>
                      <p style={{ color: '#FECD3E', fontWeight: 'bold', fontSize: '15px', lineHeight: '18px' }}>
                        For checking:
                      </p>
                    </Col>
                    <Col span={14} className='center-right-vh'>
                      <p style={{ color: '#212121', fontSize: '15px', lineHeight: '18px' }}>{data.for_checking}</p>
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col span={10} className='center-left-vh'>
                      <p style={{ color: '#0D509F', fontWeight: 'bold', fontSize: '15px', lineHeight: '18px' }}>
                        On going:
                      </p>
                    </Col>
                    <Col span={14} className='center-right-vh'>
                      <p style={{ color: '#212121', fontSize: '15px', lineHeight: '18px' }}>{data.on_going}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10} className='center-left-vh'>
                      <p style={{ color: '#9E9E9E', fontWeight: 'bold', fontSize: '15px', lineHeight: '18px' }}>
                        Not yet started:
                      </p>
                    </Col>
                    <Col span={14} className='center-right-vh'>
                      <p style={{ color: '#212121', fontSize: '15px', lineHeight: '18px' }}>{data.not_yet_started}</p>
                    </Col>
                  </Row>
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
