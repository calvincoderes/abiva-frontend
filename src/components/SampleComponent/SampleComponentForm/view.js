import React from 'react'
import ViewContainer from './container'
import { Space, Spin, Row, Col, Button, Input, Typography } from 'antd'
import { FormItem } from '@/components/FormItem'
import { Link } from 'react-router-dom'

const { Title } = Typography

const View = () => (
  <ViewContainer>
    {({
      state,
      formik
    }) => (
      <Spin spinning={state.createdSample.status === 1} >
        <div>
          <form method='post' onSubmit={formik.handleSubmit} noValidate>
            <Row>
              <Col span={24}>
                <Title level={2}>CREATE SAMPLE</Title>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={14}>
                <Row>
                  <Col span={24}>
                    <FormItem
                      formik={formik}
                      label='Name'
                      name='name'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='Name' />}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FormItem
                      formik={formik}
                      label='Job'
                      name='job'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='Job' />}
                    </FormItem>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Space>
                      <Link to='/samples-list'>
                        <a>
                          <Button size='large' type='primary' ghost>Back to list</Button>
                        </a>
                      </Link>
                      <Button
                        type='primary'
                        size='large'
                        htmlType='submit'
                        name='submit'
                        disabled={state.createdSample.status === 1}
                      >
                        Save
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        </div>
      </Spin>
    )}
  </ViewContainer>
)

export default View
