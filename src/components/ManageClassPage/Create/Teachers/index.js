import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Spin, Row, Col, Table, Select, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ViewComponent from './container'
import { FormItem } from '@/components/FormItem'

const { Option } = Select

const Styled = styled.div`
`

const View = ({ current, handleSteps, mainFormik }) => (
  <ViewComponent current={current} handleSteps={handleSteps} mainFormik={mainFormik}>
    {({
      state,
      formik,
      columns,
      data,
      subjects,
      users,
      handleNext
    }) => (
      <Styled>
        <Spin spinning={state.subjects.status === 1}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <form method='post' onSubmit={formik.handleSubmit} noValidate>
                <Row gutter={[16]}>
                  <Col span={7}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='subject'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='subject'
                        placeholder='Subjects'
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.subject}
                        onChange={(v) => formik.setFieldValue('subject', v)}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {subjects && subjects.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {pv.name}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={11}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='teacher'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='teacher'
                        placeholder='Teacher'
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.teacher}
                        onChange={(v) => formik.setFieldValue('teacher', v)}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {users && users.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {`${pv.first_name} ${pv.last_name} (${pv.email})`}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <Button
                      block
                      type='primary'
                      size='large'
                      htmlType='submit'
                      name='submit'
                      icon={<PlusOutlined />}
                      style={{ borderRadius: '4px' }}
                    >
                      Add Teacher/s
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col span={24}>
              <Table loading={state.subjects.status === 1} columns={columns} dataSource={data} />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col className='center-left-vh' span={3} offset={17}>
              <Link to='/school'>
                <Button type='link'>Cancel</Button>
              </Link>
            </Col>
            <Col span={4}>
              <Button
                disabled={Object.keys(data).length === 0}
                onClick={handleNext}
                block
                type='primary'
                size='large'
                style={{ borderRadius: '4px' }}
              >
                Next
              </Button>
            </Col>
          </Row>
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
