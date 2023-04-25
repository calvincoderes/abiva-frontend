import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Image, Divider } from 'antd'
import { FormOutlined, BookOutlined } from '@ant-design/icons'

import ViewComponent from './container'

const Styled = styled.div`
  .l-container {
    border: 1px solid #AAAAAA;
    border-radius: 5px;
    padding: 20px 0px 20px 20px;
  }
`

const Index = ({ data, currentStep }) => (
  <ViewComponent>
    {() => (
      <Styled>
        <Row className='l-container'>
          <Col span={22} offset={1}>
            {/* <Row>
              <Col span={2}>
                <Image src='/assets/images/circled-check.png' preview={false} />
              </Col>
              <Col span={20} offset={1}>
                <p style={{ fontSize: '14px', color: '#212121', fontWeight: 'bold', lineHeight: '20px' }}>Introduction</p>
              </Col>
              <Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA', marginTop: '15px', marginBottom: '15px' }} />
              </Col>
            </Row> */}
            {data && data.map((v, k) => (<Row key={k}>
              <Col span={2}>
                <Image src={`/assets/images/${v.page < currentStep ? 'circled-check' : 'circled-inactive-check'}.png`} preview={false} />
              </Col>
              <Col span={18} offset={1} className='center-left-vh'>
                <p style={{ fontSize: '14px', color: (currentStep !== v.page ? '#111111' : '#FECD3E'), lineHeight: '20px' }}>
                  <b>Page {v.page}:</b> {v.content_title || ''}
                </p>
              </Col>
              <Col span={2}>
                {v.is_content ? <BookOutlined style={{ fontSize: '14px' }} /> : <FormOutlined style={{ fontSize: '14px' }} />}
              </Col>
              {(data.length - 1) !== k && (<Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA', marginTop: '15px', marginBottom: '15px' }} />
              </Col>)}
            </Row>))}
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

Index.propTypes = {
  data: PropTypes.any,
  currentStep: PropTypes.number
}

export default Index
