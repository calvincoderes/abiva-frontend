import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Spin, Row, Col, Divider, Button, Image } from 'antd'
import { LeftOutlined, EyeOutlined } from '@ant-design/icons'

import ContentBox from '../ContentBox'
import EPUBModal from '../EPUBModal'
import ViewComponent from './container'

const Styled = styled.div`
  min-height: 100vh;

  .white-box {
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    padding: 8px;
    text-align: center;
  }
`

const View = () => (
  <ViewComponent>
    {({ state, content, contents, handleBack, setViewEpub, viewEpub }) => (
      <Styled>
        <Spin spinning={state.meContents.status === 1 || state.contentDetails.status === 1}>
          {content && <Row gutter={[20, 20]}>
            <Col span={24}>
              {content.file_url && <EPUBModal url={content.file_url} viewEpub={viewEpub} setViewEpub={setViewEpub} />}
            </Col>
            <Col span={2}>
              <Button onClick={handleBack} className='pl-0' type='link' icon={<LeftOutlined />}>
                Back
              </Button>
            </Col>
            <Col span={22}>
              <Row gutter={[20, 20]}>
                <Col span={12}>
                  <Row gutter={[20, 20]}>
                    <Col span={10} className='white-box'>
                      <p style={{ color: 'var(--silver-chalice)', fontSize: '11px' }}>Category / Sub-category</p>
                    </Col>
                    <Col span={24}>
                      <p style={{ fontSize: '40px', lineHeight: '50px', fontWeight: 'bold' }}>{content.name}</p>
                    </Col>
                    <Col span={24}>
                      <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                        <b>Author:</b> {content.author}
                      </p>
                    </Col>
                    <Col span={24}>
                      <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                        <b>Date published:</b> {moment(content.created_at).format('MMMM D, YYYY')}
                      </p>
                    </Col>
                    <Col span={24}>
                      <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }} />
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={24}>
                          <p style={{ color: '#111111', fontSize: '24px' }}>Description</p>
                        </Col>
                        <Col span={24}>
                        <p style={{ color: '#666666', fontSize: '15px', lineHeight: '18px' }}>
                          {content.description}
                        </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={12} className='center-vh'>
                  <Row gutter={[16, 16]}>
                    <Col span={24} className='text-right'>
                      <Image src={content.cover_photo ? content.cover_photo : '/assets/images/sample-content-lg.png'} preview={false} />
                    </Col>
                    <Col span={24} className='text-right'>
                      <Button
                        disabled={!content.file_url}
                        onClick={() => setViewEpub(true)}
                        type='primary'
                        ghost
                        size='large'
                        icon={<EyeOutlined />}
                        style={{ borderRadius: '2px' }}
                      >
                        {!content.file_url ? 'No File Found' : 'Open File'}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }} />
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={1} className='center-left-vh'>
                      <Image src='/assets/images/assessment-type-sm.png' preview={false} />
                    </Col>
                    <Col span={10} className='center-left-vh'>
                      <p style={{ fontSize: '23px', color: '#111111' }}>Other contents</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={[30, 30]}>
                    {contents && contents.map((c, k) => (<Col key={k} span={8}>
                      <ContentBox c={c} />
                    </Col>))}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>}
        </Spin>
      </Styled>
    )}
  </ViewComponent>
)

export default View
