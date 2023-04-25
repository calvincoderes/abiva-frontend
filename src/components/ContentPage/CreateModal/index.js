import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ViewContainer from './container'
import { Modal, Row, Col, Button, Input, Image, Select, Upload, Typography, Divider, Spin } from 'antd'
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons'
import { FormItem } from '@/components/FormItem'

const { Option } = Select

const Styled = styled.div`
  .container {
    min-height: 70vh;
    padding: 60px 90px 60px 90px;
    background-color: #ffffff;
    width: 1024px;

    .btn-container {
      .ant-btn-lg {
        height: 50px;
      }
    }

    .ant-upload.ant-upload-select-picture-card {
      width: unset !important;
      height: unset !important;
    }
  }
`

const { Title } = Typography

export default function Index ({ createModal, setCreateModal }) {
  return (
    <ViewContainer createModal={createModal} setCreateModal={setCreateModal}>
    {({
      state,
      isLoading,
      formik,
      categories,
      subCategories,
      setCategoryChanged,
      setSubCategoryChanged,
      file,
      beforeFileUpload,
      handleFileUpload,
      image,
      beforeImageUpload,
      handleImageUpload
    }) => (
      <>
        <Spin spinning={isLoading}>
          <Modal
            width={1024}
            bodyStyle={{ padding: '0' }}
            closable={true}
            footer={null}
            style={{ top: 110 }}
            visible={createModal}
            onCancel={() => setCreateModal(false)}
          >
            <Styled>
              <div className='container'>
                <form method='post' onSubmit={formik.handleSubmit} noValidate>
                  <Row>
                    <Col span={24} className='text-center'>
                      <Title level={2}>Create Content</Title>
                    </Col>
                  </Row>
                  <Row className='my-3' gutter={[12, 12]}>
                    <Col span={6}>
                      <Row>
                        <Col span={24}>
                          <Upload
                            type=''
                            accept='.png, .jpg, .jpeg'
                            className='avatar-uploader'
                            name='avatar'
                            listType='picture-card'
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={beforeImageUpload}
                            customRequest={handleImageUpload}
                          >
                            {!image && <Image src='/assets/images/default-lg-height.png' preview={false} />}
                            {image && <img src={image} alt='' style={{ width: '100%' }} />}
                          </Upload>
                          <Button type='text'>Change Cover Photo</Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={18}>
                      <Row>
                        <Col span={24}>
                          <FormItem
                            formik={formik}
                            label='Book/Content Name'
                            name='name'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={24}>
                          <FormItem
                            formik={formik}
                            label='Author'
                            name='author'
                            required
                          >
                            {props => <Input {...props} autoComplete='off' placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={24}>
                          <span className='ant-form-item-label'>
                            <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                              Category
                            </label>
                          </span>
                          <FormItem
                            formik={formik}
                            label=''
                            name='category_id'
                          >
                            {props => <Select
                              {...props}
                              showSearch
                              name='category_id'
                              placeholder='Select Categories'
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
                        <Col span={24}>
                          <span className='ant-form-item-label'>
                            <label className='ant-form-item-required' style={{ color: 'var(--silver-chalice)' }}>
                              Sub Category
                            </label>
                          </span>
                          <FormItem
                            formik={formik}
                            label=''
                            name='sub_category_id'
                          >
                            {props => <Select
                              {...props}
                              showSearch
                              name='sub_category_id'
                              placeholder='Select Sub Categories'
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
                        <Col span={24}>
                          <FormItem
                            formik={formik}
                            label='Description'
                            name='description'
                            required
                          >
                            {props => <Input.TextArea {...props} autoSize={{ minRows: 4, maxRows: 5 }} placeholder='' size='large' />}
                          </FormItem>
                        </Col>
                        <Col span={24}>
                          <Upload.Dragger
                            type=''
                            accept='.epub'
                            className='avatar-uploader'
                            name='avatar'
                            listType='picture-card'
                            multiple={false}
                            showUploadList={false}
                            beforeUpload={beforeFileUpload}
                            customRequest={handleFileUpload}
                          >
                            {!file && <div>
                              <div className='mt-2'>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">Click or drag file to this area to upload</p>
                              <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                              </p>
                              </div>
                            </div>}
                            {state.createdFile.status === 1 && <div>
                              <LoadingOutlined />
                              <div className='mt-2'>Upload</div>
                            </div>}
                            {file && <Image src='/assets/images/circled-check.png' preview={false} />}
                          </Upload.Dragger>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col span={24}>
                      <Divider dashed={true} style={{ borderColor: '#00263D' }} />
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col span={14} offset={10}>
                      <Row gutter={[20, 20]}>
                        <Col className='btn-container' span={12}>
                          <Button
                            onClick={() => setCreateModal(false)}
                            type='ghost'
                            block
                            size='large'
                            name='submit'
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col className='btn-container' span={12}>
                          <Button
                            block
                            disabled={isLoading}
                            type='primary'
                            size='large'
                            htmlType='submit'
                            name='submit'
                          >
                            Proceed
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </form>
              </div>
            </Styled>
          </Modal>
        </Spin>
      </>
    )}
  </ViewContainer>
  )
}

Index.propTypes = {
  createModal: PropTypes.any,
  setCreateModal: PropTypes.any
}
