import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, InputNumber, Radio, Button } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'

import ViewComponent from './container'

const Styled = styled.div`
  .ant-radio-group {
    .ant-radio-button-wrapper {
      color: #212121 !important;
      background: #E0E0E0 !important;
      margin-right: 10px !important;
    }
    .ant-radio-button-wrapper:hover, .ant-radio-button-wrapper-checked {
      color: #FFFFFF !important;
      border-color: #FFFFFF !important;
      background: #35C332 !important;
    }
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
      background: #FFFFFF !important;
    }
  }
`

const View = ({ data }) => (
  <ViewComponent data={data}>
    {({ handleOther, isOther }) => (
      <Styled>
        <Row>
          <Col span={24}>
            <p style={{ fontSize: '13px', color: '#000000', marginBottom: '10px' }}>Enter number of point/s:</p>
            <Row>
              <Col span={10} className='center-left-vh'>
                {!isOther && <Radio.Group
                  onChange={(e) => (data.points_equivalent = e.target.value)}
                  defaultValue={data.points_equivalent}
                  size='large'
                >
                  <Radio.Button value={1}>1</Radio.Button>
                  <Radio.Button value={2}>2</Radio.Button>
                  <Radio.Button value={3}>3</Radio.Button>
                  <Radio.Button value={4}>4</Radio.Button>
                  <Radio.Button value={5}>5</Radio.Button>
                </Radio.Group>}
                {isOther && <Radio.Group
                  disabled={true}
                  size='large'
                >
                  <Radio.Button value={1}>1</Radio.Button>
                  <Radio.Button value={2}>2</Radio.Button>
                  <Radio.Button value={3}>3</Radio.Button>
                  <Radio.Button value={4}>4</Radio.Button>
                  <Radio.Button value={5}>5</Radio.Button>
                </Radio.Group>}
              </Col>
              <Col span={5} className='center-left-vh'>
                <span className='mr-2'>Other:</span>
                {!isOther && <InputNumber
                  disabled={true}
                  defaultValue={null}
                  size='large'
                />}
                {isOther && <InputNumber
                  onChange={v => (data.other = v)}
                  defaultValue={data.other}
                  min={1}
                  size='large'
                />}
              </Col>
              <Col span={2}>
                {isOther && <Button
                  onClick={() => handleOther(data)}
                  danger
                  size='large'
                  icon={<CloseOutlined />}
                />}
                {!isOther && <Button
                  onClick={() => handleOther(data)}
                  ghost
                  type='primary'
                  size='large'
                  icon={<EditOutlined />}
                />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

View.propTypes = {
  data: PropTypes.object
}

export default View
