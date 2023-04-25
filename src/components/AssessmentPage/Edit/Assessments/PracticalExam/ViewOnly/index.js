import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Image, Button, Divider } from 'antd'
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
            <Row>
              <Col span={2} className='center-left-vh'>
                <Image src='/assets/images/assessment/practical-exam.png' preview={false} />
              </Col>
              <Col span={16} className='center-left-vh'>
                <p style={{ fontSize: '24px' }}>Practical Exam</p>
              </Col>
              <Col span={6} className='text-right'>
                {isStudentPreview === false && <Row>
                  <Col span={5} offset={15}>
                    <Button
                      onClick={() => handleEdit(k)}
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
            {isStudentPreview === true && <>
              <Row span={24} className='view-only-box mt-5'>
                <Col span={24}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Question {(step + 1)}:</p>
                </Col>
                <Col span={24} className='mt-2'>
                  <p style={{ fontSize: '15px' }}>
                    {v.items[step] && v.items[step].description}
                  </p>
                </Col>
                <Col span={24} className='center-vh mt-4'>
                  <Image src={v.items[step] && v.items[step].file} height={400} preview={false} />
                </Col>
                <Col span={24} className='mt-4'>
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
              </Row>
            </>}
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
