import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Row, Col, Input, Radio, Checkbox, Collapse, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Points from '../../Points'

import ViewComponent from './container'

const { TextArea } = Input
const { Panel } = Collapse

const Styled = styled.div`
  .container {
    min-height: 70vh;
    padding: 60px 90px 60px 90px;
    background-color: #ffffff;
    width: 900px;

    .add-question-container {
      cursor: pointer;
      padding: 9px;
      background: #FAFAFA;
      border: 1px solid #D9D9D9;
      border-top: unset;
    }
  }
`

const View = ({ mainFormik, v, k, editAssessment, setEditAssessment }) => (
  <ViewComponent mainFormik={mainFormik} v={v} k={k}>
    {({
      handleCollapse,
      panelDelete,
      getDefaultValues,
      questions,
      handleQuestion,
      handleOnChange,
      handleAnswers,
      handleMultipleAnswers,
      handleDelete,
      handleAddAnswer
    }) => (
      <Modal
        width={900}
        bodyStyle={{ padding: '0' }}
        closable={true}
        footer={null}
        style={{ top: 110 }}
        visible={editAssessment}
        onCancel={() => setEditAssessment(false)}
        destroyOnClose={true}
      >
        <Styled>
          <div className='container'>
            <Row>
              <Col span={24} className='my-4'>
                <Row>
                  <Col span={20} className='center-left-vh'>
                    <p style={{ fontSize: '24px' }}>Multiple Choice</p>
                  </Col>
                  <Col span={4} className='center-right-vh'>
                    <p style={{ fontSize: '14px', fontStyle: 'italic' }}>{v.items.length} items.</p>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                {questions && Object.keys(questions).length > 0 && questions.items.map((q, k) => (<div key={k}>
                  <Collapse defaultActiveKey={[0]} onChange={handleCollapse}>
                    <Panel header={`Item ${(k + 1)}`} key={k} extra={k !== 0 ? <DeleteOutlined style={{ color: 'red' }} onClick={(e) => panelDelete(e, k)} /> : ''}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Points data={q} />
                        </Col>
                        <Col span={24}>
                          <TextArea
                            onChange={e => (q.description = e.target.value)}
                            defaultValue={q.description}
                            autoSize={{ minRows: 4, maxRows: 5 }}
                            placeholder=''
                            size='large'
                          />
                        </Col>
                        <Col span={24}>
                          <p style={{ fontSize: '13px', color: '#000000', marginTop: '15px', marginBottom: '15px' }}>Select Type:</p>
                          <Radio.Group
                            onChange={e => handleOnChange(k, e.target.value)}
                            defaultValue={q.type}
                          >
                            <Radio value='radio'>One Answer (Radio Button)</Radio>
                            <Radio value='checkbox'>Multiple Answers (Checkbox)</Radio>
                          </Radio.Group>
                        </Col>
                        <Col span={24}>
                          {q.type === 'radio' && <>
                            <p style={{ fontSize: '13px', color: '#000000', marginTop: '25px', marginBottom: '15px' }}>Select Answer:</p>
                            <Row>
                              <Col span={24}>
                                <Radio.Group
                                  style={{ width: '100%' }}
                                  onChange={e => handleAnswers(k, e.target.value)}
                                  defaultValue={getDefaultValues(q.answers)[0]}
                                >
                                  {q.answers && q.answers.map((a, ak) => (<Row key={ak} className='mb-4'>
                                    <Col className='center-left-vh' span={1}>
                                      <Radio value={ak} />
                                    </Col>
                                    <Col span={19}>
                                      <Input
                                        defaultValue={a.title}
                                        placeholder='Answer item goes here'
                                        size='large'
                                        onChange={e => (a.title = e.target.value)}
                                      />
                                    </Col>
                                    {ak !== 0 && <Col span={3} offset={1}>
                                      <Button onClick={() => handleDelete(k, ak)} icon={<DeleteOutlined />} danger type='link' size='large' />
                                    </Col>}
                                  </Row>))}
                                </Radio.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Button onClick={() => handleAddAnswer(k)} className='pl-0' type='link'>+ Add Choice</Button>
                              </Col>
                            </Row>
                          </>}
                          {q.type === 'checkbox' && <>
                            <p style={{ fontSize: '13px', color: '#000000', marginTop: '25px', marginBottom: '15px' }}>Select Answer:</p>
                            <Row>
                              <Col span={24}>
                                <Checkbox.Group
                                  style={{ width: '100%' }}
                                  onChange={v => handleMultipleAnswers(k, v)}
                                  defaultValue={getDefaultValues(q.answers)}
                                >
                                  {q.answers && q.answers.map((a, ak) => (<Row key={ak} className='mb-4'>
                                    <Col className='center-left-vh' span={1}>
                                      <Checkbox value={ak} />
                                    </Col>
                                    <Col span={19}>
                                      <Input
                                        defaultValue={a.title}
                                        placeholder='Answer item goes here'
                                        size='large'
                                        onChange={e => (a.title = e.target.value)}
                                      />
                                    </Col>
                                    {ak !== 0 && <Col span={3} offset={1}>
                                      <Button onClick={() => handleDelete(k, ak)} icon={<DeleteOutlined />} danger type='link' size='large' />
                                    </Col>}
                                  </Row>))}
                                </Checkbox.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Button onClick={() => handleAddAnswer(k)} className='pl-0' type='link'>+ Add Choice</Button>
                              </Col>
                            </Row>
                          </>}
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
                <Row className='mt-4'>
                  <Col
                    className='center-right-vh'
                    span={6}
                    offset={18}
                  >
                    <Button
                      onClick={() => setEditAssessment(!editAssessment)}
                      danger
                      size='large'
                      name='submit'
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Styled>
      </Modal>
    )}
  </ViewComponent>
)

View.propTypes = {
  mainFormik: PropTypes.any,
  v: PropTypes.object,
  k: PropTypes.number,
  editAssessment: PropTypes.bool,
  setEditAssessment: PropTypes.any
}

export default View
