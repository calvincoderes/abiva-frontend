import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Image, InputNumber } from 'antd'

import ViewComponent from './container'

const Styled = styled.div`
`

const View = ({ answers, manualPoints, data, setData, q }) => (
  <ViewComponent>
    {({ isValidURL }) => (
      <Styled>
        <Row key={q.step}>
          <Col span={24} className='mt-4'>
            {q.file && isValidURL(q.file) && <Image src={q.file} height={400} preview={false} />}
            {q.file && !isValidURL(q.file) && <Image src='/assets/images/sample-content-lg.png' height={400} preview={false} />}
          </Col>
          <Col span={24} className='mt-4'>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Student Answer:</p>
          </Col>
          <Col span={24} className='mt-2'>
            <p style={{ fontSize: '15px' }}>
              {(answers && answers.length > 0 && answers.filter(x => x.uuid === q.uuid).length > 0) ? answers.filter(x => x.uuid === q.uuid)[0].answer : null}
            </p>
          </Col>
          <Col span={24} className='mt-4'>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Score</p>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={6} className='center-left-vh manual-points-container'>
                <InputNumber
                  onChange={v => {
                    if (manualPoints && manualPoints.length > 0 && manualPoints.filter(x => x.uuid === q.uuid).length > 0) {
                      manualPoints.map((a) => {
                        if (a.uuid === q.uuid) a.points = v
                        return a
                      })
                    } else {
                      setData({
                        ...data,
                        manual_points: [...data.manual_points, { type: 'ESSAY', uuid: q.uuid, points: v }]
                      })
                    }
                  }}
                  defaultValue={(manualPoints && manualPoints.length > 0 && manualPoints.filter(x => x.uuid === q.uuid).length > 0) ? manualPoints.filter(x => x.uuid === q.uuid)[0].points : null}
                  min={0}
                  max={q.points_equivalent}
                  size='large'
                />
              </Col>
              <Col span={6} className='center-left-vh pl-2'>
                <p style={{ fontSize: '20px' }}> / {q.points_equivalent} <span style={{ fontSize: '15px' }}> (maximum score)</span></p>
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
  manualPoints: PropTypes.array,
  data: PropTypes.object,
  setData: PropTypes.func,
  q: PropTypes.object
}

export default View
