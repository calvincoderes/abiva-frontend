import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Radio, Collapse } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
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
`

const View = ({ setAssessment }) => (
  <ViewComponent setAssessment={setAssessment}>
    {({ handleCollapse, panelDelete, questions, handleQuestion }) => (
      <Styled>
        <Row>
          <Col span={24}>
            {questions && questions.items.map((q, k) => (
              <div key={k}>
                <Collapse defaultActiveKey={[0]} onChange={handleCollapse}>
                  <Panel header={`Item ${(k + 1)}`} key={k} extra={k !== 0 ? <DeleteOutlined style={{ color: 'red' }} onClick={(e) => panelDelete(e, k)} /> : ''}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Points data={q} />
                      </Col>
                      <Col span={24}>
                        {q.description}
                        <TextArea
                          onChange={e => (q.description = e.target.value)}
                          defaultValue={q.description}
                          autoSize={{ minRows: 4, maxRows: 5 }}
                          placeholder=''
                          size='large'
                        />
                      </Col>
                      <Col span={24}>
                        <p style={{ fontSize: '13px', color: '#000000', marginTop: '15px', marginBottom: '15px' }}>Select Answer:</p>
                        <Radio.Group
                          onChange={e => (q.answer = e.target.value)}
                          defaultValue={q.answer}
                        >
                          <Radio value={'TRUE'}>True</Radio>
                          <Radio value={'FALSE'}>False</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </div>
            ))}
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
