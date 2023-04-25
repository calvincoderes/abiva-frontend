import React from 'react'
import styled from 'styled-components'
import { Spin, Row, Col, Input, Select, Divider } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AssessmentBox from './AssessmentBox'

import ViewComponent from './container'

const { Option } = Select

const Styled = styled.div`
  min-height: 100vh;
`

const View = () => (
  <ViewComponent>
    {({
      state,
      data,
      users,
      schools,
      years,
      subjects,
      sections,
      pagination,
      handleUser,
      handleSchool,
      handleYear,
      handleSubject,
      handleSection,
      handlesearchTable
    }) => (
      <Styled>
        <Spin spinning={
          state.assessments.status === 1 ||
          state.users.status === 1 ||
          state.schools.status === 1 ||
          state.years.status === 1 ||
          state.subjects.status === 1 ||
          state.sections.status === 1
        }>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <p style={{ fontSize: '24px', color: 'var(--tory-blue)' }}>GRADING Management</p>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <span className='ant-form-item-label'>
                    <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                      Select School/Organization
                    </label>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    name='school'
                    placeholder='School Name'
                    size='large'
                    style={{ width: '100%' }}
                    onChange={handleSchool}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {schools && schools.map((s, k) => (
                      <Option key={k} value={s.id}>
                        {s.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={4}>
                  <span className='ant-form-item-label'>
                    <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                      Year Level
                    </label>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    name='year'
                    placeholder='Year Level'
                    size='large'
                    style={{ width: '100%' }}
                    onChange={handleYear}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {years && years.map((s, k) => (
                      <Option key={k} value={s.id}>
                        {s.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row className='mt-3' gutter={[16]}>
                <Col span={8}>
                  <span className='ant-form-item-label'>
                    <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                      Subject
                    </label>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    name='subject'
                    placeholder='Subject'
                    size='large'
                    style={{ width: '100%' }}
                    onChange={handleSubject}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {subjects && subjects.map((s, k) => (
                      <Option key={k} value={s.id}>
                        {s.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={8}>
                  <span className='ant-form-item-label'>
                    <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                      Class/Section
                    </label>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    name='section'
                    placeholder='Section'
                    size='large'
                    style={{ width: '100%' }}
                    onChange={handleSection}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {sections && sections.map((s, k) => (
                      <Option key={k} value={s.id}>
                        {s.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={8}>
                  <span className='ant-form-item-label'>
                    <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                      Teacher
                    </label>
                  </span>
                  <Select
                    showSearch
                    allowClear
                    name='teacher'
                    placeholder='Teacher'
                    size='large'
                    style={{ width: '100%' }}
                    onChange={handleUser}
                    filterOption={(input, option) => (
                      option.children.toLowerCase().includes(input.toLowerCase())
                    )}
                  >
                    {users && users.map((pv, k) => (
                      <Option key={k} value={pv.id}>
                        {`${pv.first_name} ${pv.last_name} (${pv.email})`}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row className='my-4'>
                <Col span={24}>
                  <Divider style={{ borderColor: '#AAAAAA' }} />
                </Col>
              </Row>
              <Row>
                <Col className='center-left-vh' span={12}>
                  <p style={{ fontSize: '14px', color: '#111111', fontStyle: 'italic' }}><b>Number of assessments:</b> {pagination && pagination.total}</p>
                </Col>
                <Col className='center-right-vh' span={12}>
                  <Input onPressEnter={handlesearchTable} size='large' placeholder='Search' prefix={<SearchOutlined />} />
                </Col>
              </Row>
              <Row className='mt-5' gutter={[30, 30]}>
                {data && data.map((v, k) => (<Col key={k} span={8}>
                  <AssessmentBox data={v} url={`/grading/${v.id}`} />
                </Col>))}
              </Row>
            </Col>
          </Row>
        </Spin>
      </Styled>
    )}
  </ViewComponent>
)

export default View
