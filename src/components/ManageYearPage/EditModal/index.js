import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ViewContainer from './container'
import { Modal, Row, Col, Button, Input, Select, Typography, Divider, Spin } from 'antd'
import { FormItem } from '@/components/FormItem'

const { Option } = Select

const Styled = styled.div`
  .container {
    min-height: 70vh;
    padding: 60px 90px 60px 90px;
    background-color: #ffffff;
    width: 740px;

    .btn-container {
      .ant-btn-lg {
        height: 50px;
      }
    }
  }
`

const { Title } = Typography

export default function Index ({ schools, selectedData, setSelectedData }) {
  return (
    <ViewContainer selectedData={selectedData} setSelectedData={setSelectedData}>
    {({ isLoading, formik }) => (
      <>
        <Spin spinning={isLoading}>
          <Modal
            width={740}
            bodyStyle={{ padding: '0' }}
            closable={true}
            footer={null}
            style={{ top: 110 }}
            visible={selectedData !== null}
            onCancel={() => setSelectedData(null)}
          >
            <Styled>
              {selectedData && selectedData !== null && Object.keys(selectedData).length > 0 && <div className='container'>
                <form method='post' onSubmit={formik.handleSubmit} noValidate>
                  <Row>
                    <Col span={24}>
                      <Title level={2}>Update Year/Level Information #{selectedData.id}</Title>
                    </Col>
                  </Row>
                  <Row className='my-3' gutter={[12, 12]}>
                    <Col span={24}>
                      <span className='ant-form-item-label'>
                        <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                          Select School/Organization
                        </label>
                      </span>
                      <FormItem
                        formik={formik}
                        label=''
                        name='school'
                      >
                        {props => <Select
                          {...props}
                          showSearch
                          name='school'
                          placeholder='School/Organization Name'
                          size='large'
                          style={{ width: '100%' }}
                          value={formik.values.school}
                          onChange={(v) => {
                            formik.setFieldValue('school', v)
                          }}
                          filterOption={(input, option) => (
                            option.children.toLowerCase().includes(input.toLowerCase())
                          )}
                        >
                          {schools && schools.map((s, k) => (
                            <Option key={k} value={s.id}>
                              {s.name}
                            </Option>
                          ))}
                        </Select>}
                      </FormItem>
                    </Col>
                    <Col span={24}>
                      <FormItem
                        formik={formik}
                        label='Subject Name'
                        name='name'
                        required
                      >
                        {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                      </FormItem>
                    </Col>
                    <Col span={24}>
                      <FormItem
                        formik={formik}
                        label='Year/Level Description'
                        name='description'
                        required
                      >
                        {props => <Input.TextArea {...props} autoSize={{ minRows: 4, maxRows: 5 }} placeholder='' size='large' />}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col span={24}>
                      <Divider dashed={true} style={{ borderColor: '#00263D' }} />
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col span={14} offset={10}>
                      <Row gutter={[20, 20]}>
                        <Col className='btn-container' span={12}>
                          <Button
                            onClick={() => setSelectedData(null)}
                            type='ghost'
                            block
                            size='large'
                            name='submit'
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col className='btn-container' span={12}>
                          <Button
                            block
                            disabled={isLoading}
                            type='primary'
                            size='large'
                            htmlType='submit'
                            name='submit'
                          >
                            Proceed
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </form>
              </div>}
            </Styled>
          </Modal>
        </Spin>
      </>
    )}
  </ViewContainer>
  )
}

Index.propTypes = {
  schools: PropTypes.any,
  selectedData: PropTypes.any,
  setSelectedData: PropTypes.any
}
