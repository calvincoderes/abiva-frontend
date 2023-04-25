import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Collapse, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
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
    {({ handleCollapse, panelDelete, questions, handleDelete, handleQuestion, handleAddAnswer }) => (
      <Styled>
        <Row>
          <Col span={24}>
            {questions && questions.items.map((q, k) => (<div key={k}>
              <Collapse defaultActiveKey={[0]} onChange={handleCollapse}>
                <Panel header={`Item ${(k + 1)}`} key={k} extra={k !== 0 ? <DeleteOutlined style={{ color: 'red' }} onClick={(e) => panelDelete(e, k)} /> : ''}>
                  <Row>
                    <Col span={24}>
                      <TextArea
                        onChange={e => (q.description = e.target.value)}
                        defaultValue={q.description}
                        autoSize={{ minRows: 4, maxRows: 5 }}
                        placeholder=''
                        size='large'
                      />
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col span={20} className='center-left-vh'>
                      <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>Correct Answer</p>
                    </Col>
                  </Row>
                  {q.answers && q.answers.map((a, ak) => (<Row key={ak} className='mb-3'>
                    <Col className='center-left-vh' span={11}>
                      <Input
                        defaultValue={a.title}
                        placeholder=''
                        size='large'
                        onChange={e => (q.answers[ak] = e.target.value)}
                      />
                    </Col>
                    {ak !== 0 && <Col className='center-left-vh' span={2}>
                      <Button onClick={() => handleDelete(k, ak)} icon={<DeleteOutlined />} danger type='link' size='large' />
                    </Col>}
                  </Row>))}
                  <Row className='mt-4'>
                    <Col span={24}>
                      <Button onClick={() => handleAddAnswer(k)} className='pl-0' type='link'>+ Additional Correct Answer</Button>
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
