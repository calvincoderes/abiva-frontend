import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Select } from 'antd'

import ViewComponent from './container'

const { Option } = Select

const Styled = styled.div`
`

const View = ({ answers, data, setData, a, page }) => (
  <ViewComponent items={a.items}>
    {({ questions, answersChecker, defaultAnswer }) => (
      <Styled>
        {a.items && a.items.map((i, ik) => (<Row key={ik}>
          <Col span={24} className='mt-4'>
            <Row>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={20}>
                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Prompts:</p>
                  </Col>
                  {questions && questions.length > 0 && questions.filter(x => x.uuid === i.uuid)[0].items.map((ia, iak) => (<Col key={iak} span={20}>
                    <Input disabled value={ia.item} size='large' />
                  </Col>))}
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={20}>
                    <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Answers:</p>
                  </Col>
                  {i.answers.map((_, iak) => (<Col key={iak} span={20}>
                    <Select
                      defaultValue={defaultAnswer(answers, page, i.uuid, iak)}
                      showSearch
                      name='answer'
                      placeholder=''
                      size='large'
                      style={{ width: '100%' }}
                      onChange={(v) => {
                        if (answersChecker(answers, page, i.uuid)) {
                          answers.filter(x => x.page === page)[0].answers.map(ans => {
                            if (ans.uuid === i.uuid) {
                              const item = ans.answers.filter(y => y.key === iak)[0].item
                              ans.answers[iak] = { key: iak, item, answer: v, points_equivalent: 1 }
                            }
                            return ans
                          })
                        } else {
                          setData({
                            ...data,
                            page,
                            answers: [...data.answers, { page, answers: [{ type: 'MATCHING_TYPE', uuid: i.uuid, answers: [{ key: iak, item: i.answers[iak].item, answer: v, points_equivalent: 1 }] }] }]
                          })
                        }
                      }}
                      filterOption={(input, option) => (
                        option.children.toLowerCase().includes(input.toLowerCase())
                      )}
                    >
                      {i.answers && i.answers.map((ia, iak) => (
                        <Option key={iak} value={ia.answer}>
                          {ia.answer}
                        </Option>
                      ))}
                    </Select>
                  </Col>))}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>))}
      </Styled>
    )}
  </ViewComponent>
)

View.propTypes = {
  answers: PropTypes.array,
  data: PropTypes.object,
  setData: PropTypes.func,
  a: PropTypes.object,
  page: PropTypes.number
}

export default View
