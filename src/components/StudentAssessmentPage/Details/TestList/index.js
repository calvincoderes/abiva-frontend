import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Progress, Image, Button } from 'antd'

import ViewComponent from './container'

import TrueOrFalseExam from './TrueOrFalseExam'
import MultipleChoiceExam from './MultipleChoiceExam'
import MatchingTypeExam from './MatchingTypeExam'
import EssayExam from './EssayExam'
import PracticalExam from './PracticalExam'

const Styled = styled.div`
  .view-only-box {
    border: 1px solid #AAAAAA;
    padding: 40px;
  }
`

const Index = ({ isForCompleted, data, setData, totalStep }) => (
  <ViewComponent isForCompleted={isForCompleted} data={data} totalStep={totalStep}>
    {({ state, percentage, step, handleBack, handleNext, answerChecker }) => (
      <Styled>
        <Spin spinning={state.updatedStudentAD.status === 1}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Progress percent={percentage} />
            </Col>
            <Col span={24}>
              {data && data.questionaires.map((v, k) => (
                v.items && v.items.map((q, qk) => (
                  step === q.step && <Row key={k}>
                    <Col span={2} className='center-left-vh'>
                      <Image src={`/assets/images/assessment/${v.type.replace(/_/g, '-').toLowerCase()}.png`} preview={false} />
                    </Col>
                    <Col span={16} className='center-left-vh pl-2'>
                      <p style={{ fontSize: '24px' }}>{v.type.replace(/_/g, ' ')}</p>
                    </Col>
                    <Col key={k} span={24} className='view-only-box mt-5'>
                      <Row>
                        <Col span={24}>
                          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Question {(q.step + 1)}:</p>
                        </Col>
                        <Col span={24} className='mt-2'>
                          <p style={{ fontSize: '15px' }}>
                            {v.items[qk] && v.items[qk].description}
                          </p>
                        </Col>
                        {v.type === 'TRUE_OR_FALSE' && <Col span={24}>
                          <TrueOrFalseExam answers={data.answers} data={data} setData={setData} q={q} />
                        </Col>}
                        {v.type === 'MULTIPLE_CHOICE' && <Col span={24}>
                          <MultipleChoiceExam answers={data.answers} data={data} setData={setData} q={q} />
                        </Col>}
                        {v.type === 'MATCHING_TYPE' && <Col span={24}>
                          <MatchingTypeExam answers={data.answers} data={data} setData={setData} q={q} />
                        </Col>}
                        {v.type === 'ESSAY' && <Col span={24}>
                          <EssayExam answers={data.answers} data={data} setData={setData} q={q} />
                        </Col>}
                        {v.type === 'PRACTICAL_EXAM' && <Col span={24}>
                          <PracticalExam answers={data.answers} data={data} setData={setData} q={q} />
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
                    disabled={step === totalStep || answerChecker(data.answers, step)}
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
        </Spin>
      </Styled>
    )}
  </ViewComponent>
)

Index.propTypes = {
  isForCompleted: PropTypes.bool,
  data: PropTypes.any,
  setData: PropTypes.any,
  totalStep: PropTypes.number
}

export default Index
