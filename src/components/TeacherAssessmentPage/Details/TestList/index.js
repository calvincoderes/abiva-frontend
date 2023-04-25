import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Progress, Image, Button } from 'antd'

import ViewComponent from './container'

import EssayExam from './EssayExam'
import PracticalExam from './PracticalExam'

const Styled = styled.div`
  .view-only-box {
    border: 1px solid #AAAAAA;
    padding: 40px;

    .manual-points-container {
      width: 100% !important;
      .ant-input-number {
        width: 100% !important;
      }
    }
  }
`

const Index = ({ data, setData, totalStep }) => (
  <ViewComponent data={data} totalStep={totalStep}>
    {({ percentage, step, handleBack, handleNext, scoreChecker }) => (
      <Styled>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Progress percent={percentage} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            {data && data.questionaires.map((v, k) => (
              v.items && v.items.map((q, qk) => (
                step === q.step && <Row key={k}>
                  <Col span={2} className='center-left-vh'>
                    <Image src={`/assets/images/assessment/${v.type.replace(/_/g, '-').toLowerCase()}.png`} preview={false} />
                  </Col>
                  <Col span={16} className='center-left-vh'>
                    <p style={{ fontSize: '24px' }}>{v.type.replace(/_/g, ' ')}</p>
                  </Col>
                  <Col key={k} span={24} className='view-only-box mt-5'>
                    <Row>
                      <Col span={12}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Question {(q.step + 1)}:</p>
                      </Col>
                      <Col span={24} className='mt-2'>
                        <p style={{ fontSize: '15px' }}>
                          {v.items[qk] && v.items[qk].description}
                        </p>
                      </Col>
                      {v.type === 'ESSAY' && <Col span={24}>
                        <EssayExam answers={data.answers} manualPoints={data.manual_points} data={data} setData={setData} q={q} />
                      </Col>}
                      {v.type === 'PRACTICAL_EXAM' && <Col span={24}>
                        <PracticalExam answers={data.answers} manualPoints={data.manual_points} data={data} setData={setData} q={q} />
                      </Col>}
                    </Row>
                  </Col>
                </Row>
              ))
            ))}
          </Col>
          <Col span={24} className='mt-4'>
            <Row>
              <Col span={2} offset={19}>
                <Button disabled={step === 0} onClick={handleBack} className='pl-0' type='link'>Back</Button>
              </Col>
              <Col span={3}>
                <Button
                  disabled={step === totalStep || scoreChecker(data.manual_points, step)}
                  onClick={handleNext}
                  block
                  type='primary'
                  size='large'
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

Index.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.any,
  totalStep: PropTypes.number
}

export default Index
