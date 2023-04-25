import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Row, Col, Input, Button, Switch, Divider, Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '@/components/FormItem'
import Wysiwyg from '@/components/Wysiwyg'
import ViewComponent from './container'
import AddAssessmentModal from './AddAssessmentModal'

import TrueOrFalseView from './TrueOrFalse/ViewOnly'
import MultipleChoiceView from './MultipleChoice/ViewOnly'
import MatchingTypeView from './MatchingType/ViewOnly'

const { TabPane } = Tabs

const Styled = styled.div`
  .assessment-description {
    white-space: pre-line;
  }
  .ant-tabs {
    overflow: unset !important;
  }
  .page-type {
    .ant-switch[aria-checked="false"] {
      background: #73d13d !important;
    }
  }
`

const View = ({ mainFormik }) => (
  <ViewComponent mainFormik={mainFormik}>
    {({
      formik,
      state,
      addAssessment,
      setAddAssessment,
      handlePreview,
      isStudentPreview,
      handleTabsChanged,
      handleTabs,
      currentTab,
      handleOnChange,
      tabs
    }) => (
      <Styled>
        <Spin spinning={state.createdModule.status === 1}>
          <AddAssessmentModal page={parseInt(currentTab + 1)} formik={mainFormik} addAssessment={addAssessment} setAddAssessment={setAddAssessment} />
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            {isStudentPreview === false && <Row>
              <Col span={24}>
                <FormItem
                  formik={formik}
                  label='Module Title'
                  name='title'
                  required
                >
                  {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  formik={formik}
                  label='Module Description'
                  name='description'
                  required
                >
                  {props => <Input.TextArea {...props} autoSize={{ minRows: 4, maxRows: 5 }} placeholder='' size='large' />}
                </FormItem>
              </Col>
            </Row>}
            {isStudentPreview === true && <Row>
              <Col span={24}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111111', marginBottom: '24px' }}>{formik.values.title || '-'}</p>
              </Col>
              <Col span={24}>
                <div className='assessment-description' dangerouslySetInnerHTML={{ __html: formik.values.description || '-' }} />
              </Col>
            </Row>}
            <Row gutter={[10, 10]} className='mb-10'>
              <Col span={22}>
                <Tabs onChange={handleTabsChanged} defaultActiveKey={0} tabPosition='top' style={{ height: 300 }}>
                  {tabs && tabs.module.map((t, i) => (
                    <TabPane tab={`Page ${t.page}`} key={i}>
                      <Row className='py-3'>
                        <Col span={24} className='page-type'>
                          <Switch
                            onChange={v => handleOnChange('is_content', i, v)}
                            checkedChildren='Content'
                            unCheckedChildren='Assessment'
                            defaultChecked={t.is_content}
                          />
                        </Col>
                      </Row>
                      {tabs.module[i].is_content && <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <span className='ant-form-item-label'>
                            <label style={{ color: 'var(--silver-chalice)' }}>
                              Content Title
                            </label>
                          </span>
                          <Input
                            onChange={e => handleOnChange('content_title', i, e.target.value)}
                            defaultValue={t.content_title}
                            placeholder='Title'
                            size='large'
                          />
                        </Col>
                        <Col span={24}>
                          <span className='ant-form-item-label'>
                            <label style={{ color: 'var(--silver-chalice)' }}>
                              Content
                            </label>
                          </span>
                          <Wysiwyg index={parseInt(i)} currentTab={currentTab} handleOnChange={handleOnChange} />
                        </Col>
                      </Row>}
                      {!tabs.module[i].is_content && <>
                        {mainFormik.values.assessment_types_data && mainFormik.values.assessment_types_data.map((v, k) => (v && v.page === t.page && <Row key={k}>
                          {v.type === 'TRUE_OR_FALSE' && <Col span={24}>
                            <TrueOrFalseView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
                          </Col>}
                          {v.type === 'MULTIPLE_CHOICE' && <Col span={24}>
                            <MultipleChoiceView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
                          </Col>}
                          {v.type === 'MATCHING_TYPE' && <Col span={24}>
                            <MatchingTypeView isStudentPreview={isStudentPreview} mainFormik={mainFormik} v={v} k={k} />
                          </Col>}
                        </Row>))}
                        <Row>
                          <Col span={24}>
                            <Button
                              block
                              type='primary'
                              size='large'
                              icon={<PlusOutlined />}
                              onClick={() => setAddAssessment(!addAssessment)}
                            >
                              Add New Assessment Type
                            </Button>
                          </Col>
                        </Row>
                      </>}
                    </TabPane>
                  ))}
                </Tabs>
              </Col>
              <Col span={2}>
                <Button
                  block
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  onClick={() => handleTabs()}
                />
              </Col>
            </Row>
            <Row className='pt-20'>
              <Col span={24}>
                <Divider style={{ borderColor: '#AAAAAA' }} />
              </Col>
            </Row>
            <Row>
              <Col className='mt-2' span={24}>
                <Row>
                  {/* <Col className='center-left-vh' span={12}>
                    <Switch
                      onChange={handlePreview}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />&nbsp;<span style={{ color: '#111111', fontSize: '16px' }}> Preview (Student View)</span>
                  </Col> */}
                  <Col className='center-right-vh' span={24}>
                    <Button
                      disabled={state.createdModule.status === 1}
                      type='primary'
                      size='large'
                      htmlType='submit'
                      name='submit'
                    >
                      Save Module
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
  mainFormik: PropTypes.any
}

export default View
