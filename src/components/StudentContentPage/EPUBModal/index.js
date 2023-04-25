import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Modal } from 'antd'
import { ReactReader } from 'react-reader'

import ViewContainer from './container'

const Styled = styled.div`
  .container {
    min-height: 70vh;
    padding: 60px 90px 60px 90px;
    background-color: #ffffff;
    width: 900px;
  }
`

export default function Index ({ url, viewEpub, setViewEpub }) {
  return (
    <ViewContainer setViewEpub={setViewEpub}>
    {({ location, locationChanged }) => (
      <>
        <Modal
          width={900}
          bodyStyle={{ padding: '0' }}
          closable={true}
          footer={null}
          style={{ top: 110 }}
          visible={viewEpub}
          onCancel={() => setViewEpub(false)}
          destroyOnClose={true}
        >
          <Styled>
            <div className='container'>
              <Row>
                <Col span={24}>
                  <div style={{ height: '70vh' }}>
                    <ReactReader
                      location={location}
                      locationChanged={locationChanged}
                      url={url}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Styled>
        </Modal>
      </>
    )}
  </ViewContainer>
  )
}

Index.propTypes = {
  url: PropTypes.string,
  viewEpub: PropTypes.bool,
  setViewEpub: PropTypes.any
}
