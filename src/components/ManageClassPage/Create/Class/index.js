import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input, Select, Button, Divider } from 'antd'
import { FormItem } from '@/components/FormItem'
import ViewComponent from './container'

const { Option } = Select

const Styled = styled.div`
`

const View = ({ current, handleSteps, mainFormik }) => (
  <ViewComponent current={current} handleSteps={handleSteps} mainFormik={mainFormik}>
    {({ formik, schools, years }) => (
      <Styled>
        <form method='post' onSubmit={formik.handleSubmit} noValidate>
          <Row>
            <Col span={24} className='mb-2'>
              <p style={{ color: '#111111', fontSize: '16px' }}>Select School/Organization</p>
            </Col>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={18}>
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
                      onChange={(v) => formik.setFieldValue('school', v)}
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
                <Col span={6}>
                  <span className='ant-form-item-label'>
                    <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                      Year/Level
                    </label>
                  </span>
                  <FormItem
                    formik={formik}
                    label=''
                    name='year_level'
                  >
                    {props => <Select
                      {...props}
                      showSearch
                      name='year_level'
                      placeholder=''
                      size='large'
                      style={{ width: '100%' }}
                      value={formik.values.year_level}
                      onChange={(v) => formik.setFieldValue('year_level', v)}
                      filterOption={(input, option) => (
                        option.children.toLowerCase().includes(input.toLowerCase())
                      )}
                    >
                      {years && years.map((s, k) => (
                        <Option key={k} value={s.id}>
                          {s.name}
                        </Option>
                      ))}
                    </Select>}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Divider style={{ borderColor: '#AAAAAA' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24} className='mb-2'>
                  <p style={{ color: '#111111', fontSize: '16px' }}>Add Class/Section</p>
                </Col>
                <Col span={24}>
                  <FormItem
                    formik={formik}
                    label='Class/Section Name'
                    name='name'
                    required
                  >
                    {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    formik={formik}
                    label='Class/Section Description'
                    name='description'
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
