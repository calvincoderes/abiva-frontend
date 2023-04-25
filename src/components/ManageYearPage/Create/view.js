import React from 'react'
import styled from 'styled-components'
import { Row, Col, Select, Input, Table, Button, Divider } from 'antd'
import ViewComponent from './container'
import { FormItem } from '@/components/FormItem'

const { Option } = Select

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({ formik, columns, data, handleTableOnChange }) => (
      <Styled>
        <Row>
          <Col span={24}>
            <p style={{ fontSize: '24px', color: '#111111' }}>Add Year/Level</p>
          </Col>
          <Col className='mt-4' span={24}>
            <p style={{ fontSize: '16px', color: '#111111' }}>Select School/Organization</p>
          </Col>
          <Col span={24}>
            <FormItem
              formik={formik}
              label='School/Organization Name'
              name='school'
            >
              {props => <Select
                {...props}
                showSearch
                name='school'
                placeholder=''
                size='large'
                style={{ width: '100%' }}
                value={formik.values.civil_status}
                onChange={(v) => formik.setFieldValue('school', v)}
              >
                <Option value='tip'>Technological Institute of the Philippines</Option>
                <Option value='up'>University of the Philippines</Option>
              </Select>}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Divider style={{ borderColor: '#AAAAAA' }} />
          </Col>
          <Col span={24}>
            <p style={{ color: '#111111', fontSize: '16px' }}>Add Year/Level</p>
          </Col>
          <Col span={4}>
            <FormItem
              formik={formik}
              label='Year/Level Name'
              name='year_name'
              required
            >
              {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
            </FormItem>
          </Col>
          <Col span={20}>
            <FormItem
              formik={formik}
              label='Year/Level Description'
              name='year_description'
              required
            >
              {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Divider style={{ borderColor: '#AAAAAA' }} />
          </Col>
          <Col span={24}>
            <p style={{ color: 'var(--black)', fontSize: '16px' }}>Assign Subjects</p>
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={data} onChange={handleTableOnChange} />
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col className='center-left-vh' span={3} offset={17}>
            <Button type='link'>Cancel</Button>
          </Col>
          <Col span={4}>
            <Button
              block
              type='primary'
              size='large'
              htmlType='submit'
              name='submit'
              style={{ borderRadius: '4px' }}
            >
              Save Subject
            </Button>
          </Col>
        </Row>
      </Styled>
    )}
  </ViewComponent>
)

export default View
