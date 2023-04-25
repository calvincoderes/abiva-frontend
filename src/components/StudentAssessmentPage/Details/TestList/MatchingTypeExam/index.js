import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Select } from 'antd'

import ViewComponent from './container'

const { Option } = Select

const Styled = styled.div`
`

const View = ({ answers, data, setData, q }) => (
  <ViewComponent q={q}>
    {({ availableAnswers, handleDefaultValue }) => (
      <Styled>
        <Row key={q.step}>
          <Col span={24} className='mt-4'>
            <Row>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={20}>
                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Prompts:</p>
                  </Col>
                  {q.answers.map((a, ak) => (<Col key={ak} span={20}>
                    <Input disabled value={a.item} size='large' />
                  </Col>))}
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={20}>
                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Answers:</p>
                  </Col>
                  {q.answers.map((_, ak) => (<Col key={ak} span={20}>
                    <Select
                      defaultValue={handleDefaultValue(answers, ak)}
                      showSearch
                      name='answer'
                      placeholder=''
                      size='large'
                      style={{ width: '100%' }}
                      onChange={(v) => {
                        if (answers && answers.length > 0 && answers.filter(x => x.uuid === q.uuid).length > 0) {
                          answers.map((a) => {
                            if (a.uuid === q.uuid) a.answers[ak] = { key: ak, item: q.answers[ak].item, answer: v, points_equivalent: 1 }
                            return a
                          })
                        } else {
                          setData({
                            ...data,
                            answers: [
                              ...data.answers,
                              {
                                type: 'MATCHING_TYPE',
                                uuid: q.uuid,
                                answers: [{ key: ak, item: 'Red', answer: 'Color', points_equivalent: 1 }]
                              }]
                          })
                        }
                      }}
                      filterOption={(input, option) => (
                        option.children.toLowerCase().includes(input.toLowerCase())
                      )}
                    >
                      {availableAnswers && availableAnswers.map((v, k) => (
                        <Option key={k} value={v}>
                          {v}
                        </Option>
                      ))}
                    </Select>
                  </Col>))}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

View.propTypes = {
  answers: PropTypes.array,
  data: PropTypes.object,
  setData: PropTypes.func,
  q: PropTypes.object
}

export default View
