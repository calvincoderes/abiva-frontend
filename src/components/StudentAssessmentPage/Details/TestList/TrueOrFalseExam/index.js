import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Radio, Space } from 'antd'

import ViewComponent from './container'

const Styled = styled.div`
`

const View = ({ answers, data, setData, q }) => (
  <ViewComponent>
    {() => (
      <Styled>
        <Row key={q.step}>
          <Col span={24} className='mt-4'>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Select Answer:</p>
          </Col>
          <Col span={24} className='mt-2'>
            <Radio.Group
              onChange={e => {
                if (answers && answers.length > 0 && answers.filter(x => x.uuid === q.uuid).length > 0) {
                  answers.map((a) => {
                    if (a.uuid === q.uuid) a.answer = e.target.value
                    return a
                  })
                } else {
                  setData({
                    ...data,
                    answers: [...data.answers, { type: 'TRUE_OR_FALSE', uuid: q.uuid, answer: e.target.value }]
                  })
                }
              }}
              defaultValue={(answers && answers.length > 0 && answers.filter(x => x.uuid === q.uuid).length > 0) ? answers.filter(x => x.uuid === q.uuid)[0].answer : null}
            >
              <Space direction='vertical'>
                <Radio value={'TRUE'}>True</Radio>
                <Radio value={'FALSE'}>False</Radio>
              </Space>
            </Radio.Group>
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
