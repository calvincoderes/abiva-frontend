import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Row, Col, Input, Radio, Collapse, Button } from 'antd'
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
    {({ handleCollapse, panelDelete, questions, handleQuestion }) => (
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
                    <p style={{ fontSize: '24px' }}>True or False</p>
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
