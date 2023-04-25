import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Select, Button } from 'antd'
import { FormItem } from '@/components/FormItem'

import ViewComponent from './container'

const { Option } = Select

const Styled = styled.div`
`

const View = ({ current, handleSteps, mainFormik }) => (
  <ViewComponent current={current} handleSteps={handleSteps} mainFormik={mainFormik}>
    {({ state, formik, schools }) => (
      <Styled>
        <Spin spinning={state.schools.status === 1}>
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            <Row>
              <Col span={24}>
                <span className='ant-form-item-label'>
                  <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                    School/Organization Name
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
            </Row>
            <Row className='mt-5'>
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
