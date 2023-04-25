import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Input, Button, Switch, Divider } from 'antd'
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { FormItem } from '@/components/FormItem'
import ViewComponent from './container'
import AddAssessmentModal from './AddAssessmentModal'

import TrueOrFalseView from './TrueOrFalse/ViewOnly'
import MultipleChoiceView from './MultipleChoice/ViewOnly'
import MatchingTypeView from './MatchingType/ViewOnly'
import EssayView from './Essay/ViewOnly'
// import FillTheBlanksView from './FillTheBlanks/ViewOnly'
import PracticalExamView from './PracticalExam/ViewOnly'

const Styled = styled.div`
  .assessment-description {
    white-space: pre-line;
  }
`

const View = ({ mainFormik }) => (
  <ViewComponent mainFormik={mainFormik}>
    {({ formik, state, addAssessment, setAddAssessment, handlePreview, isStudentPreview }) => (
      <Styled>
        <AddAssessmentModal formik={mainFormik} addAssessment={addAssessment} setAddAssessment={setAddAssessment} />
        <Spin spinning={state.updatedAssessment.status === 1}>
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            {isStudentPreview === false && <Row>
              <Col span={24}>
                <FormItem
                  formik={formik}
                  label='Test Title'
                  name='title'
                  required
                >
                  {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  formik={formik}
                  label='Description'
                  name='description'
                  required
                >
                  {props => <Input.TextArea {...props} autoSize={{ minRows: 4, maxRows: 5 }} placeholder='' size='large' />}
                </FormItem>
              </Col>
            </Row>}
            {isStudentPreview === true && <Row>
              <Col span={24}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111111', marginBottom: '24px' }}>{formik.values.title || '-'}</p>
              </Col>
              <Col span={24}>
                <div className='assessment-description' dangerouslySetInnerHTML={{ __html: formik.values.description || '-' }} />
              </Col>
            </Row>}
            <Row>
              <Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA' }} />
              </Col>
            </Row>
            {mainFormik.values.assessment_types_data && mainFormik.values.assessment_types_data.map((v, k) => (v && <Row key={k}>
              {v.type === 'TRUE_OR_FALSE' && <Col span={24}>
                <TrueOrFalseView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
              </Col>}
              {v.type === 'MULTIPLE_CHOICE' && <Col span={24}>
                <MultipleChoiceView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
              </Col>}
              {v.type === 'MATCHING_TYPE' && <Col span={24}>
                <MatchingTypeView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
              </Col>}
              {v.type === 'ESSAY' && <Col span={24}>
                <EssayView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
              </Col>}
              {/* {v.type === 'FILL_IN_THE_BLANKS' && <Col span={24}>
                <FillTheBlanksView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
              </Col>} */}
              {v.type === 'PRACTICAL_EXAM' && <Col span={24}>
                <PracticalExamView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
              </Col>}
            </Row>))}
            <Row>
              <Col span={24}>
                <Button
                  block
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  onClick={() => setAddAssessment(!addAssessment)}
                >
                  Add New Assessment Type
                </Button>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA' }} />
              </Col>
            </Row>
            <Row>
              <Col className='mt-2' span={24}>
                <Row>
                  <Col className='center-left-vh' span={12}>
                    <Switch
                      onChange={handlePreview}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />&nbsp;<span style={{ color: '#111111', fontSize: '16px' }}> Preview (Student View)</span>
                  </Col>
                  <Col className='center-right-vh' span={12}>
                    <Button
                      type='primary'
                      size='large'
                      htmlType='submit'
                      name='submit'
                    >
                      Save Test Paper
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        </Spin>
      </Styled>
    )}
  </ViewComponent>
)

View.propTypes = {
  mainFormik: PropTypes.any
}

export default View
