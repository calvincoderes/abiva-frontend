import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Image, Checkbox, Radio, Space, Button, Divider } from 'antd'
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
                <Image src='/assets/images/assessment/multiple-choice.png' preview={false} />
              </Col>
              <Col span={16} className='center-left-vh'>
                <p style={{ fontSize: '24px' }}>Multiple Choice</p>
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
          </Col>
          {isStudentPreview === true && <>
            <Col span={24} className='view-only-box mt-5'>
              <Row>
                <Col span={24}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Question {(step + 1)}:</p>
                </Col>
                <Col span={24} className='mt-2'>
                  <p style={{ fontSize: '15px' }}>
                    {v.items[step] && v.items[step].description}
                  </p>
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col span={24}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Select Answer:</p>
                </Col>
                <Col span={24} className='mt-2'>
                  {v.items[step].answers.map((a, ak) => (
                    <div key={ak}>
                      {v.items[step].type === 'radio' && <Radio.Group
                        value={'true'}
                        defaultValue={'true'}
                      >
                        <Space direction='vertical'>
                          <Radio value={a.is_correct}>{a.title}</Radio>
                        </Space>
                      </Radio.Group>}

                      {v.items[step].type === 'checkbox' && <Row>
                        <Col span={24}>
                          <Checkbox defaultChecked={a.is_correct === 'true'} disabled /> &nbsp; {a.title}
                        </Col>
                      </Row>}
                    </div>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col span={24} className='mt-4'>
              <Row>
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
          </>}
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
