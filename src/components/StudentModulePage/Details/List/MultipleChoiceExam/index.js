import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Radio, Space, Divider } from 'antd'

import ViewComponent from './container'

const Styled = styled.div`
`

const View = ({ answers, data, setData, a, page }) => (
  <ViewComponent>
    {({ answersChecker, defaultAnswer }) => (
      <Styled>
        {a.items && a.items.map((i, ik) => (<Row key={ik}>
          <Col span={24} className='mt-4'>
            <p style={{ fontSize: '16px' }}>{i.description}</p>
          </Col>
          <Col span={24} className='mt-3'>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Select Answer:</p>
          </Col>
          <Col span={24} className='mt-2'>
            <Radio.Group
              onChange={e => {
                if (answersChecker(answers, page, i.uuid)) {
                  answers.filter(x => x.page === page)[0].answers.map(ans => {
                    if (ans.uuid === i.uuid) ans.answer = e.target.value
                    return ans
                  })
                } else {
                  setData({
                    ...data,
                    page,
                    answers: [...data.answers, { page, answers: [{ type: 'MULTIPLE_CHOICE', uuid: i.uuid, answer: e.target.value }] }]
                  })
                }
              }}
              defaultValue={defaultAnswer(answers, page, i.uuid)}
            >
              <Space direction='vertical'>
                {i.answers.map((ia, iak) => (
                  <Radio key={iak} value={ia.title}>{ia.title}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Col>
          <Col span={24}>
            <Divider style={{ borderColor: '#AAAAAA' }} />
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
