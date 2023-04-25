import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Image, Button, Divider } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import EditOnlyModal from '../EditOnlyModal'

import ViewComponent from './container'

const Styled = styled.div`
  .view-only-box {
    border: 1px solid #AAAAAA;
    padding: 40px;
  }
`

const Index = ({ isStudentPreview, mainFormik, v, k }) => (
  <ViewComponent mainFormik={mainFormik} key={k}>
    {({ step, handleBack, handleNext, handleDelete, handleEdit, editAssessment, setEditAssessment }) => (
      <Styled>
        <Row className='mb-4'>
          <Col span={24}>
            <EditOnlyModal mainFormik={mainFormik} v={v} k={k} editAssessment={editAssessment} setEditAssessment={setEditAssessment} />
          </Col>
          <Col span={24}>
            <Row gutter={[10, 10]}>
              <Col span={2} className='center-left-vh'>
                <Image src='/assets/images/assessment/matching-type.png' preview={false} />
              </Col>
              <Col span={16} className='center-left-vh'>
                <p style={{ fontSize: '24px' }}>Matching Type</p>
              </Col>
              <Col span={6} className='text-right'>
                {isStudentPreview === false && <Row>
                  <Col span={5} offset={15}>
                    <Button
                      onClick={handleEdit}
                      className='m-1'
                      ghost
                      type='primary'
                      size='large'
                      icon={<EditOutlined />}
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      onClick={() => handleDelete(k)}
                      className='m-1'
                      danger
                      size='large'
                      icon={<DeleteOutlined />}
                    />
                  </Col>
                </Row>}
                <Row>
                  <Col span={24} className='mt-4'>
                    <p style={{ fontSize: '14px', fontStyle: 'italic' }}>{v.items.length} items.</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            {isStudentPreview === true && <Row span={24} className='view-only-box mt-5'>
              <Col span={24}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Question {(step + 1)}:</p>
              </Col>
              <Col span={24} className='mt-2'>
                <p style={{ fontSize: '15px' }}>
                  {v.items[step] && v.items[step].description}
                </p>
              </Col>
              <Col span={24}>
                <p style={{ fontSize: '13px', color: '#000000', marginTop: '15px', marginBottom: '15px' }}>Stimulus List:</p>
              </Col>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={10}>
                    <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>Items:</p>
                  </Col>
                  <Col span={10} offset={1}>
                    <p style={{ fontSize: '13px', color: '#000000', marginBottom: '15px' }}>Answer</p>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                {v.items[step] && v.items[step].answers.map((a, ak) => (<Row key={ak} gutter={[16, 16]} className='mb-3'>
                  <Col className='center-left-vh' span={1}>
                    {(ak + 1)}.
                  </Col>
                  <Col className='center-left-vh' span={10}>
                    <Input
                      value={a.item}
                      placeholder=''
                      size='large'
                      disabled
                    />
                  </Col>
                  <Col className='center-left-vh' span={10}>
                    <Input
                      value={a.answer}
                      placeholder=''
                      size='large'
                      disabled
                    />
                  </Col>
                </Row>))}
                {v.items[step] && v.items[step].additional_wrong_answers && <>
                  <Row>
                    <Col span={24}>
                      <Divider style={{ borderColor: '#AAAAAA' }} />
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col span={24}>
                      <p style={{ fontSize: '15px' }}>Additional Answer</p>
                    </Col>
                  </Row>
                  {v.items[step].additional_wrong_answers.map((wa, wak) => (<Row key={wak} gutter={[16, 16]} className='mb-3'>
                    <Col className='center-left-vh' span={11}>
                      <Input
                        value={wa}
                        placeholder=''
                        size='large'
                        disabled
                      />
                    </Col>
                  </Row>))}
                </>}
                <Row className='mt-5'>
                  <Col span={2} offset={19}>
                    <Button disabled={step === 0} onClick={handleBack} className='pl-0' type='link'>Back</Button>
                  </Col>
                  <Col span={3}>
                    <Button
                      disabled={step === (v.items.length - 1)}
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
            </Row>}
          </Col>
          <Col span={24}>
            <Divider style={{ borderColor: '#AAAAAA' }} />
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

Index.propTypes = {
  isStudentPreview: PropTypes.bool,
  mainFormik: PropTypes.any,
  v: PropTypes.object,
  k: PropTypes.number
}

export default Index
