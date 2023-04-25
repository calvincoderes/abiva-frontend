import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Collapse, Upload } from 'antd'
import { DeleteOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons'
import Points from '../Points'

import ViewComponent from './container'

const { TextArea } = Input
const { Panel } = Collapse

const Styled = styled.div`
  .add-question-container {
    cursor: pointer;
    padding: 9px;
    background: #FAFAFA;
    border: 1px solid #D9D9D9;
    border-top: unset;
  }
  .ant-btn-link span {
    text-decoration: underline;
  }
`

const View = ({ setAssessment }) => (
  <ViewComponent setAssessment={setAssessment}>
    {({ state, setCurrentFileKey, beforeUpload, handleUpload, handleCollapse, panelDelete, questions, handleQuestion }) => (
      <Styled>
        <Row>
          <Col span={24}>
            {questions && questions.items.map((q, k) => (<div key={k}>
              <Collapse defaultActiveKey={[0]} onChange={handleCollapse}>
                <Panel header={`Item ${(k + 1)}`} key={k} extra={k !== 0 ? <DeleteOutlined style={{ color: 'red' }} onClick={(e) => panelDelete(e, k)} /> : ''}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Points data={q} />
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={24}>
                          <TextArea
                            onChange={e => (q.description = e.target.value)}
                            defaultValue={q.description}
                            autoSize={{ minRows: 4, maxRows: 5 }}
                            placeholder='Description...'
                            size='large'
                          />
                        </Col>
                        <Col className='mt-4' span={24}>
                          <Upload.Dragger
                            type=''
                            accept='.png, .jpg, .jpeg'
                            className='avatar-uploader'
                            name='avatar'
                            listType='picture-card'
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            customRequest={handleUpload}
                            onChange={() => setCurrentFileKey(k)}
                          >
                            {!q.file && <div>
                              <div className='mt-2'>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">Click or drag file to this area to upload</p>
                              <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                              </p>
                              </div>
                            </div>}
                            {state.createdImage.status === 1 && <div>
                              <LoadingOutlined />
                              <div className='mt-2'>Upload</div>
                            </div>}
                            {q.file && <img src={q.file} alt='' style={{ width: '100%' }} />}
                          </Upload.Dragger>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </div>))}
            <Row className='add-question-container'>
              <Col span={24}>
                <p onClick={handleQuestion} style={{ fontSize: '13px', color: '#000000' }}>+ Add Question</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

View.propTypes = {
  setAssessment: PropTypes.any
}

export default View
