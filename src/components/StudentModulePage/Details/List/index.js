import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Progress, Image, Button } from 'antd'

import ViewComponent from './container'

import TrueOrFalseExam from './TrueOrFalseExam'
import MultipleChoiceExam from './MultipleChoiceExam'
import MatchingTypeExam from './MatchingTypeExam'

const Styled = styled.div`
  .view-only-box {
    border: 1px solid #AAAAAA;
    padding: 40px;
  }

  img {
    width: 100% !important;
  }
`

const Index = ({ data, setData, totalStep, currentStep, setCurrentStep }) => (
  <ViewComponent data={data} totalStep={totalStep} currentStep={currentStep} setCurrentStep={setCurrentStep}>
    {({ state, percentage, handleBack, handleNext, answerChecker }) => (
      <Styled>
        <Spin spinning={state.updatedStudentMD.status === 1}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Progress percent={percentage} />
            </Col>
            <Col span={24}>
              {data && data.pages.map((v, k) => (
                currentStep === v.page && <Row key={k}>
                  <Col key={k} span={24} className='view-only-box mt-4'>
                    <Row>
                      {v.is_content && <Col span={24}>
                        <Row>
                          <Col span={24}>
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{v.content_title || '-'}</p>
                          </Col>
                          <Col span={24} className='mt-2'>
                            <div dangerouslySetInnerHTML={{ __html: (v.content_description || '-') }}></div>
                            {/* <div dangerouslySetInnerHTML={{ __html: (v.content_description.replace(/<[^>]+>/g, '') || '-') }} /> */}
                          </Col>
                        </Row>
                      </Col>}
                      {!v.is_content && <Col span={24} className='mt-4'>
                        {v.assessments.map((a, ak) => (<Row key={ak}>
                          <Col span={2} className='center-left-vh'>
                            <Image src={`/assets/images/assessment/${a.type.replace(/_/g, '-').toLowerCase()}.png`} preview={false} />
                          </Col>
                          <Col span={16} className='center-left-vh pl-2'>
                            <p style={{ fontSize: '24px' }}>{a.type.replace(/_/g, ' ')}</p>
                          </Col>
                          {a.type === 'TRUE_OR_FALSE' && <Col span={24}>
                            <TrueOrFalseExam answers={data.answers} data={data} setData={setData} a={a} page={v.page} />
                          </Col>}
                          {a.type === 'MULTIPLE_CHOICE' && <Col span={24}>
                            <MultipleChoiceExam answers={data.answers} data={data} setData={setData} a={a} page={v.page} />
                          </Col>}
                          {a.type === 'MATCHING_TYPE' && <Col span={24}>
                            <MatchingTypeExam answers={data.answers} data={data} setData={setData} a={a} page={v.page} />
                          </Col>}
                        </Row>))}
                      </Col>}
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col span={24} className='mt-4'>
              <Row>
                <Col span={2} offset={19}>
                  <Button disabled={currentStep === 1} onClick={handleBack} className='pl-0' type='link'>Back</Button>
                </Col>
                <Col span={3}>
                  <Button
                    disabled={
                      !data.pages[(currentStep - 1)].is_content &&
                      (currentStep === totalStep || answerChecker(data.answers, (currentStep - 1)))
                    }
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
  data: PropTypes.any,
  setData: PropTypes.any,
  totalStep: PropTypes.number,
  currentStep: PropTypes.number,
  setCurrentStep: PropTypes.func
}

export default Index
