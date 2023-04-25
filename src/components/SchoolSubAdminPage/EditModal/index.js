import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ViewContainer from './container'
import { Modal, Row, Col, Button, Input, Select, Typography, Divider, Spin, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { FormItem } from '@/components/FormItem'

const { Option } = Select

const Styled = styled.div`
  .container {
    min-height: 70vh;
    padding: 70px 50px 70px 50px;
    background-color: #ffffff;
    width: 1020px;
    .modal-divider {
      border-left: 1px solid #767676;
    }
  }
`

const { Title } = Typography

export default function Index ({ schools, selectedData, setSelectedData }) {
  return (
    <ViewContainer selectedData={selectedData} setSelectedData={setSelectedData}>
    {({ state, formik, content, columns, data, pagination, handleTableOnChange, handleAddContent }) => (
      <>
        <Spin spinning={state.updatedUser.status === 1}>
          <Modal
            width={1020}
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
                    <Col span={12}>
                      <Row>
                        <Col span={24}>
                        <Title level={2}>Update School Sub-Admin Information #{selectedData.id}</Title>
                        </Col>
                      </Row>
                      <Row className='my-3' gutter={[16, 16]}>
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
                      </Row>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Divider style={{ borderColor: '#AAAAAA', marginTop: '0px' }} />
                        </Col>
                        <Col span={10}>
                          <FormItem
                            formik={formik}
                            label='Employee No.'
                            name='user_number'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                      </Row>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <FormItem
                            formik={formik}
                            label='First Name'
                            name='first_name'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={12}>
                          <FormItem
                            formik={formik}
                            label='Last Name'
                            name='last_name'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={24}>
                          <FormItem
                            formik={formik}
                            label='Email Address'
                            name='email'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={24}>
                          <FormItem
                            formik={formik}
                            label='Mobile Number'
                            name='mobile'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={24}>
                          <FormItem
                            formik={formik}
                            label='Password'
                            name='password'
                            required
                          >
                            {props => <Input.Password {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='modal-divider' span={1} offset={1} />
                    <Col span={10}>
                      <Row gutter={[16, 16]}>
                        <Col span={14}>
                          <Select
                            showSearch
                            name='content_id'
                            placeholder='Content'
                            size='large'
                            style={{ width: '100%' }}
                            value={formik.values.content_id}
                            onChange={(v) => formik.setFieldValue('content_id', v)}
                            filterOption={(input, option) => (
                              option.children.toLowerCase().includes(input.toLowerCase())
                            )}
                          >
                            {content && content.map((pv, k) => (
                              <Option key={k} value={pv.id}>
                                {pv.name}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col span={10}>
                          <Button
                            onClick={handleAddContent}
                            block
                            type='primary'
                            size='large'
                            icon={<PlusOutlined />}
                            style={{ borderRadius: '4px' }}
                          >
                            Add Content
                          </Button>
                        </Col>
                      </Row>
                      <Row className='mt-4'>
                        <Col span={24}>
                          <Table loading={state.content.status === 1} pagination={pagination} columns={columns} dataSource={data} onChange={handleTableOnChange} />
                        </Col>
                      </Row>
                      <Row className='mt-10'>
                        <Col span={10}>
                          <Button
                            onClick={() => setSelectedData(null)}
                            type='link'
                            block
                            size='large'
                            name='submit'
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col span={12}>
                          <Button
                            block
                            disabled={state.updatedUser.status === 1}
                            type='primary'
                            size='large'
                            htmlType='submit'
                            name='submit'
                          >
                            Save
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
