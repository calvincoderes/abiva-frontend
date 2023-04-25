import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Divider, Select, Button } from 'antd'
import ViewComponent from './container'

import { FormItem } from '@/components/FormItem'

const { Option } = Select

const Styled = styled.div`
  .aq-box {
    border: 1px solid #111111;
    padding: 0px 32px 32px 32px;
    .aq-header {
      background: #ffffff;
      color: #111111;
      font-size: 18px;
      position: absolute;
      margin-top: -15px;
      padding-right: 10px;
      padding-left: 10px;
    }
    .aq-content {
      padding: 40px 0px 20px 0px;
    }
    .qty-input {
      .ant-form-item-explain {
        display: none;
      }
    }
  }
`

const View = ({ current, handleSteps, mainFormik }) => (
  <ViewComponent current={current} handleSteps={handleSteps} mainFormik={mainFormik}>
    {({ state, formik, users, years, sections, subjects }) => (
      <Styled>
        <Spin spinning={state.users.status === 1 || state.years.status === 1 || state.sections.status === 1 || state.subjects.status === 1}>
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            <Row gutter={[16]}>
              <Col span={24}>
                <p style={{ fontSize: '16px', color: '#111111' }}><b>01.</b> Assign to Class/Section</p>
              </Col>
              <Col span={6}>
                <span className='ant-form-item-label'>
                  <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                    Select Year/Level
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
              <Col span={18}>
                <span className='ant-form-item-label'>
                  <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                    Select Class/Section
                  </label>
                </span>
                <FormItem
                  formik={formik}
                  label=''
                  name='class_section'
                >
                  {props => <Select
                    {...props}
                    showSearch
                    name='class_section'
                    placeholder=''
                    size='large'
                    style={{ width: '100%' }}
                    value={formik.values.class_section}
                    onChange={(v) => formik.setFieldValue('class_section', v)}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {sections && sections.map((s, k) => (
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
            <Row gutter={[16]}>
              <Col span={24}>
                <p style={{ fontSize: '16px', color: '#111111' }}><b>02.</b> Assign to Subject</p>
              </Col>
              <Col span={24}>
                <span className='ant-form-item-label'>
                  <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                    Select Subject
                  </label>
                </span>
                <FormItem
                  formik={formik}
                  label=''
                  name='subject'
                >
                  {props => <Select
                    {...props}
                    showSearch
                    name='subject'
                    placeholder=''
                    size='large'
                    style={{ width: '100%' }}
                    value={formik.values.subject}
                    onChange={(v) => formik.setFieldValue('subject', v)}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {subjects && subjects.map((s, k) => (
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
            <Row gutter={[16]}>
              <Col span={24}>
                <p style={{ fontSize: '16px', color: '#111111' }}><b>03.</b> Assign to Teacher</p>
              </Col>
              <Col span={24}>
                <span className='ant-form-item-label'>
                  <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                    Select Teacher
                  </label>
                </span>
                <FormItem
                  formik={formik}
                  label=''
                  name='teacher'
                >
                  {props => <Select
                    {...props}
                    showSearch
                    name='teacher'
                    placeholder=''
                    size='large'
                    style={{ width: '100%' }}
                    value={formik.values.teacher}
                    onChange={(v) => formik.setFieldValue('teacher', v)}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {users && users.map((u, k) => (
                      <Option key={k} value={u.id}>
                        {`${u.first_name} ${u.last_name} (${u.email})`}
                      </Option>
                    ))}
                  </Select>}
                </FormItem>
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col className='center-left-vh' span={3} offset={18}>
                <Button type='link'>Cancel</Button>
              </Col>
              <Col span={3}>
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
