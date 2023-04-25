import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Spin, Row, Col, Table, Input, Select, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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

const View = ({ mainFormik }) => (
  <ViewComponent mainFormik={mainFormik}>
    {({
      state,
      formik,
      columns,
      data,
      content,
      categories,
      subCategories,
      handleSubmit,
      setContentChanged,
      setCategoryChanged,
      setSubCategoryChanged
    }) => (
      <Styled>
        <Spin spinning={state.createdSchool.status === 1 || state.content.status === 1 || state.categories.status === 1 || state.subCategories.status === 1}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <form method='post' onSubmit={formik.handleSubmit} noValidate>
                <Row gutter={[16]}>
                  <Col span={5}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='category_id'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='category_id'
                        placeholder='Categories'
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.category_id}
                        onChange={(v) => {
                          formik.setFieldValue('category_id', v)
                          setCategoryChanged(true)
                        }}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {categories && categories.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {pv.name}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='sub_category_id'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='sub_category_id'
                        placeholder='Sub Categories'
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.sub_category_id}
                        onChange={(v) => {
                          formik.setFieldValue('sub_category_id', v)
                          setSubCategoryChanged(true)
                        }}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {subCategories && subCategories.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {pv.name}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='content_id'
                    >
                      {props => <Select
                        {...props}
                        showSearch
                        name='content_id'
                        placeholder='Books/Content'
                        size='large'
                        style={{ width: '100%' }}
                        value={formik.values.content_id}
                        onChange={(v) => {
                          formik.setFieldValue('content_id', v)
                          setContentChanged(true)
                        }}
                        filterOption={(input, option) => (
                          option.children.toLowerCase().includes(input.toLowerCase())
                        )}
                      >
                        {content && content.map((pv, k) => (
                          <Option key={k} value={pv.id}>
                            {pv.name}
                          </Option>
                        ))}
                      </Select>}
                    </FormItem>
                  </Col>
                  <Col span={3}>
                    <FormItem
                      formik={formik}
                      label=''
                      name='quantity'
                      required
                    >
                      {props => <Input {...props} autoComplete='off' placeholder='Quantity' size='large' />}
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
                      Add Books/Content
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col span={24}>
              <Table loading={state.categories.status === 1 || state.subCategories.status === 1 || state.content.status === 1} columns={columns} dataSource={data} />
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col className='center-left-vh' span={3} offset={15}>
              <Link to='/school'>
                <Button type='link'>Cancel</Button>
              </Link>
            </Col>
            <Col span={6}>
              <Button
                onClick={handleSubmit}
                disabled={state.createdSchool.status === 1 || Object.keys(data).length === 0}
                block
                type='primary'
                size='large'
                style={{ borderRadius: '4px' }}
              >
                Save School/Orgnization
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
