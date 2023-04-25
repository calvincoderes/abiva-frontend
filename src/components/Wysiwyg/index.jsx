import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Spin } from 'antd'

import ViewComponent from './container'

const Styled = styled(Row)`
`

export default function Wysiwyg ({ index, initialDescription, currentTab, handleOnChange }) {
  return (
    <ViewComponent index={index} initialDescription={initialDescription} currentTab={currentTab} handleOnChange={handleOnChange}>
      {({ state, quillRef }) => (
        <Styled key={index}>
          <Col span={24}>
            <Spin spinning={state.createdImage.status === 1}>
              <div style={{ height: 300 }}>
                <div ref={quillRef} />
              </div>
            </Spin>
          </Col>
        </Styled>
      )}
    </ViewComponent>
  )
}

Wysiwyg.propTypes = {
  index: PropTypes.number,
  initialDescription: PropTypes.string,
  currentTab: PropTypes.number,
  handleOnChange: PropTypes.func
}
