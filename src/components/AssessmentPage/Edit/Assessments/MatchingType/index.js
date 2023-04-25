import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, InputNumber, Collapse, Button, Divider } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
// import Points from '../Points'

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
    {({ handleCollapse, panelDelete, questions, handleQuestion, handleAddAnswer, handleAddWrongAnswer }) => (
      <Styled>
        <Row>
          <Col span={24}>
            {questions && questions.items.map((q, k) => (<div key={k}>
              <Collapse defaultActiveKey={[0]} onChange={handleCollapse}>
                <Panel header={`Item ${(k + 1)}`} key={k} extra={k !== 0 ? <DeleteOutlined style={{ color: 'red' }} onClick={(e) => panelDelete(e, k)} /> : ''}>
                  <Row gutter={[16, 16]}>
                    {/* <Col span={24}>
                      <Points data={q} />
                    </Col> */}
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
                      <p style={{ fontSize: '13px', color: '#000000', marginTop: '15px', marginBottom: '15px' }}>Stimulus List:</p>
                      <Row gutter={[16, 16]}>
                        <Col span={10}>
                          <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>Items:</p>
                        </Col>
                        <Col span={7} offset={1}>
                          <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>Answer</p>
                        </Col>
                        <Col span={3} offset={1}>
                          Points
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      {q.answers && q.answers.map((a, ak) => (<Row key={ak} gutter={[16, 16]} className='mb-3'>
                        <Col className='center-left-vh' span={1}>
                          {(ak + 1)}.
                        </Col>
                        <Col className='center-left-vh' span={10}>
                          <Input
                            defaultValue={a.item}
                            placeholder=''
                            size='large'
                            onChange={e => (a.item = e.target.value)}
                          />
                        </Col>
                        <Col className='center-left-vh' span={8}>
                          <Input
                            defaultValue={a.answer}
                            placeholder=''
                            size='large'
                            onChange={e => (a.answer = e.target.value)}
                          />
                        </Col>
                        <Col className='center-left-vh' span={3}>
                          <InputNumber
                            onChange={v => (a.points_equivalent = v)}
                            defaultValue={a.points_equivalent}
                            min={1}
                            max={1}
                            size='large'
                          />
                        </Col>
                        {ak !== 0 && <Col className='center-left-vh' span={2}>
                          <Button icon={<DeleteOutlined />} danger type='link' size='large' />
                        </Col>}
                      </Row>))}
                      <Row className='mt-4'>
                        <Col span={24}>
                          <Button onClick={() => handleAddAnswer(k)} className='pl-0' type='link'>+ Add Pair</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Divider style={{ borderColor: '#AAAAAA' }} />
                        </Col>
                      </Row>
                      {q.additional_wrong_answers && q.additional_wrong_answers.map((wa, wak) => (<Row key={wak} gutter={[16, 16]} className='mb-3'>
                        <Col className='center-left-vh' span={11}>
                          <Input
                            defaultValue={wa}
                            placeholder=''
                            size='large'
                            onChange={e => (q.additional_wrong_answers[wak] = e.target.value)}
                          />
                        </Col>
                        {wak !== 0 && <Col className='center-left-vh' span={2}>
                          <Button icon={<DeleteOutlined />} danger type='link' size='large' />
                        </Col>}
                      </Row>))}
                      <Row className='mt-4'>
                        <Col span={24}>
                          <Button onClick={() => handleAddWrongAnswer(k)} className='pl-0' type='link'>+ Additional Answer</Button>
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
