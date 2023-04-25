import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Typography, Modal, Image, Button } from 'antd'
import ViewContainer from './container'
import TrueOrFalse from '../TrueOrFalse'
import MultipleChoice from '../MultipleChoice'
import MatchingType from '../MatchingType'
// import FillTheBlanks from '../FillTheBlanks'
import PracticalExam from '../PracticalExam'
import Essay from '../Essay'

const Styled = styled.div`
  .container {
    min-height: 70vh;
    padding: 60px 90px 60px 90px;
    background-color: #ffffff;
    width: 900px;
  }
  .assessment-box {
    cursor: pointer;
  }
  .assessment-box:hover {
    .ant-image-img {
      border: 1px solid #074EE8 !important;
    }
    .ab-name > p {
      color: #074EE8 !important;
    }
  }
  .assessment-box-selected {
    .ant-image-img {
      border: 1px solid #074EE8 !important;
    }
    .ab-name > p {
      color: #074EE8 !important;
    }
  }
`

const { Title } = Typography

export default function Index ({ formik, addAssessment, setAddAssessment }) {
  return (
    <ViewContainer formik={formik} setAddAssessment={setAddAssessment}>
    {({ types, selectedType, handleType, setAssessment, createAssessment }) => (
      <>
        <Modal
          width={900}
          bodyStyle={{ padding: '0' }}
          closable={true}
          footer={null}
          style={{ top: 110 }}
          visible={addAssessment}
          onCancel={() => setAddAssessment(false)}
          destroyOnClose={true}
        >
          <Styled>
            <div className='container'>
              <Row>
                <Col className='text-center' span={24}>
                  <Title level={2}>Select Type of Assessment</Title>
                </Col>
              </Row>
              <Row className='mt-5 center-vh' gutter={[20, 20]}>
                {types && types.map((t, k) => (
                  <Col className={`${selectedType && selectedType.type === t.type ? 'assessment-box-selected' : 'assessment-box'}`} span={4} key={k} onClick={() => handleType(t)}>
                    <Row>
                      <Col span={24}>
                        <Image src={`/assets/images/assessment/${t.image}`} preview={false} />
                      </Col>
                      <Col className='text-center ab-name' span={24}>
                        <p style={{ color: '#000000', fontSize: '13px', lineHeight: '16px' }}>{t.name}</p>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
              {selectedType && <>
                <Row className='mt-5' gutter={[20, 20]}>
                  <Col span={24}>
                    {selectedType.type === 'true_or_false' && <TrueOrFalse setAssessment={setAssessment} />}
                    {selectedType.type === 'multiple_choice' && <MultipleChoice setAssessment={setAssessment} />}
                    {selectedType.type === 'matching_type' && <MatchingType setAssessment={setAssessment} />}
                    {/* {selectedType.type === 'fill_the_blanks' && <FillTheBlanks setAssessment={setAssessment} />} */}
                    {selectedType.type === 'essay' && <Essay setAssessment={setAssessment} />}
                    {selectedType.type === 'practical_exam' && <PracticalExam setAssessment={setAssessment} />}
                    {/* {selectedType.type !== 'true_or_false' && JSON.stringify(selectedType)} */}
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col span={14} offset={10}>
                    <Row gutter={[20, 20]}>
                      <Col span={12}>
                        <Button
                          onClick={() => setAddAssessment(false)}
                          type='ghost'
                          block
                          size='large'
                          name='submit'
                        >
                          Cancel
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          onClick={() => createAssessment()}
                          block
                          type='primary'
                          size='large'
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>}
            </div>
          </Styled>
        </Modal>
      </>
    )}
  </ViewContainer>
  )
}

Index.propTypes = {
  formik: PropTypes.any,
  addAssessment: PropTypes.bool,
  setAddAssessment: PropTypes.any
}
