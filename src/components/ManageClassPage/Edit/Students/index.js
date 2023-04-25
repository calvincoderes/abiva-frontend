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

const View = ({ mainFormik }) => (
  <ViewComponent mainFormik={mainFormik}>
    {({
      state,
      formik,
      columns,
      data,
      users,
      handleSubmit
    }) => (
      <Styled>
        <Spin spinning={state.users.status === 1}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <form method='post' onSubmit={formik.handleSubmit} noValidate>
                <Row gutter={[16]}>
                  <Col span={18}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='student'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='student'
                        placeholder='Student'
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.student}
                        onChange={(v) => formik.setFieldValue('student', v)}
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
                      Add Student/s
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col span={24}>
              <Table loading={state.users.status === 1} columns={columns} dataSource={data} />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col className='center-left-vh' span={3} offset={17}>
              <Link to='/class'>
                <Button type='link'>Cancel</Button>
              </Link>
            </Col>
            <Col span={4}>
              <Button
                onClick={handleSubmit}
                disabled={state.updatedSection.status === 1 || Object.keys(data).length === 0}
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
  mainFormik: PropTypes.any
}

export default View
