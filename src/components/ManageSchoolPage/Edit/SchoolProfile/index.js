import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Image, Input, Select, Button } from 'antd'
import { LinkOutlined, EditOutlined } from '@ant-design/icons'
import { FormItem } from '@/components/FormItem'
import ViewComponent from './container'

const { Option } = Select

const Styled = styled.div`
`

const View = ({ current, handleSteps, mainFormik }) => (
  <ViewComponent current={current} handleSteps={handleSteps} mainFormik={mainFormik}>
    {({ state, formik, provinces, cities, setProvinceChanged, setCityChanged }) => (
      <Styled>
        <Spin spinning={state.provinces.status === 1 || state.cities.status === 1}>
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            <Row>
              <Col span={4}>
                <Row>
                  <Col span={24}>
                    <Image src='/assets/images/avatar.png' preview={false} />
                  </Col>
                  <Col span={24}>
                    <Button type='text' icon={<EditOutlined />}>Change logo</Button>
                  </Col>
                </Row>
              </Col>
              <Col span={20}>
                <Row gutter={16}>
                  <Col span={24}>
                    <FormItem
                      formik={formik}
                      label='School/Organization Name'
                      name='name'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      formik={formik}
                      label='Website'
                      name='website'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' prefix={<LinkOutlined />} placeholder='' size='large' />}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      formik={formik}
                      label='Phone Number'
                      name='phone_number'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                    </FormItem>
                  </Col>
                </Row>
                <Row className='mt-4' gutter={16}>
                  <Col span={24}>
                    <p style={{ fontSize: '16px', color: '#111111' }}>School Address</p>
                  </Col>
                  <Col span={24}>
                    <FormItem
                      formik={formik}
                      label='Street Name, Building, House Number'
                      name='address'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <span className='ant-form-item-label'>
                      <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                        Province
                      </label>
                    </span>
                    <FormItem
                      formik={formik}
                      label=''
                      name='province_id'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='province_id'
                        placeholder=''
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.province_id}
                        onChange={(v) => {
                          formik.setFieldValue('province_id', v)
                          setProvinceChanged(true)
                        }}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {provinces && provinces.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {pv.name}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <span className='ant-form-item-label'>
                      <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                        City
                      </label>
                    </span>
                    <FormItem
                      formik={formik}
                      label=''
                      name='city_id'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='city_id'
                        placeholder=''
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.city_id}
                        onChange={(v) => {
                          formik.setFieldValue('city_id', v)
                          setCityChanged(true)
                        }}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {cities && cities.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {pv.name}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      formik={formik}
                      label='Barangay'
                      name='address_barangay'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={3} offset={21}>
                    <Button
                      block
                      type='primary'
                      size='large'
                      htmlType='submit'
                      name='submit'
                      style={{ borderRadius: '4px' }}
                    >
                      Next
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
  current: PropTypes.any,
  handleSteps: PropTypes.any,
  mainFormik: PropTypes.any
}

export default View
