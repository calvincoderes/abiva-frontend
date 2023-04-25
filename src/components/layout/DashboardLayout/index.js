import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ViewContainer from './container'
import { Layout, Row, Col, Divider, Image, Tooltip, Spin } from 'antd'
import {
  LogoutOutlined,
  SearchOutlined,
  BellOutlined
} from '@ant-design/icons'

import { USER_TYPE_STUDENT, USER_TYPE_SUPER_ADMIN, USER_TYPE_SCHOOL_ADMIN, USER_TYPE_TEACHER } from '@/utils/constants'

import SuperAdminMenu from './SuperAdminMenu'
import SchoolAdminMenu from './SchoolAdminMenu'
import TeacherMenu from './TeacherMenu'
import StudentMenu from './StudentMenu'

const { Header, Content, Footer, Sider } = Layout

const Styled = styled.div`

  .ant-menu-light {
    background: #0D509F !important;
    color: #FFFFFF !important;
    .ant-menu-submenu-title:hover, .ant-menu-item:hover {
      background: #FECD3E !important;
      color: #0D509F !important;
    }
    .ant-menu-submenu {
      background: #0D509F !important;
      color: #FFFFFF !important;
      .ant-menu-submenu-arrow {
        color: #FFFFFF !important;
      }
      .ant-menu-sub {
        background: #0D509F !important;
        color: #FFFFFF !important;
      }
      .ant-menu-item-icon {
        color: #FECD3E !important;
      }
    }
    .ant-menu-submenu:hover {
      background: #FECD3E !important;
      color: #0D509F !important;
      .ant-menu-item-icon {
        color: #0D509F !important;
      }
    }
    .ant-menu-item {
      .ant-menu-item-icon {
        color: #FECD3E !important;
      }
    }
    .ant-menu-item:hover {
      .ant-menu-item-icon {
        color: #0D509F !important;
      }
    }
    .ant-menu-item-selected {
      background: #FECD3E !important;
      color: #0D509F !important;
      .ant-menu-item-icon {
        color: #0D509F !important;
      }
    }
  }

  .ant-layout-content {
    margin: 0 !important;
  }
  
  .ant-layout-header {
    border-bottom: 2px solid #AAAAAA;
  }

  .ant-layout-sider {
    min-height: 100vh;
    flex: 0 0 290px !important;
    max-width: 290px !important;
    min-width: 200px !important;
    width: 290px !important;
    border-right: 2px solid #AAAAAA;
  }

  .site-layout-background {
    padding: 60px 60px 0px 60px !important;
    background-color: #FFFFFF;
  }
  
  .ant-layout-footer {
    padding: 24px 60px;
    background-color: #FFFFFF;
  }

  .logo-container {
    color: #111111;
  }
  .ant-menu-item-disabled {
    height: 15px;
  }
`

const View = ({ children, ...rest }) => (
  <ViewContainer>
    {({ isLoading, me, handleLogout }) => (
      <Styled className='layout' {...rest}>
        <Spin spinning={isLoading}>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
              <Row>
                <Col
                  xs={{ span: 12, offset: 0 }}
                  sm={{ span: 12, offset: 0 }}
                  md={{ span: 5, offset: 0 }}
                  lg={{ span: 5, offset: 0 }}
                  xl={{ span: 5, offset: 0 }}
                  xxl={{ span: 3, offset: 0 }}
                >
                  <Row className='logo-container'>
                    <Col
                      className='center-left-vh'
                      xs={{ span: 2, offset: 1 }}
                      sm={{ span: 2, offset: 1 }}
                      md={{ span: 3, offset: 1 }}
                      lg={{ span: 3, offset: 1 }}
                      xl={{ span: 3, offset: 1 }}
                      xxl={{ span: 4, offset: 1 }}
                    >
                      <Image src='/assets/images/abiva-icon.png' preview={false} />
                    </Col>
                    <Col className='center-vh' span={1} offset={1}>
                      <Image src='/assets/images/splitter.png' preview={false} />
                    </Col>
                    <Col span={11} offset={1}>
                      <p style={{ color: '#212121', fontSize: '15px', fontWeight: 'bold' }}>
                        {me && me.type.replace('_', ' ')}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={{ span: 12, offset: 0 }}
                  sm={{ span: 12, offset: 0 }}
                  md={{ span: 11, offset: 8 }}
                  lg={{ span: 11, offset: 8 }}
                  xl={{ span: 11, offset: 8 }}
                  xxl={{ span: 11, offset: 10 }}
                >
                  <Row>
                    <Col
                      xs={{ span: 3, offset: 14 }}
                      sm={{ span: 3, offset: 14 }}
                      md={{ span: 3, offset: 14 }}
                      lg={{ span: 3, offset: 14 }}
                      xl={{ span: 3, offset: 14 }}
                      xxl={{ span: 2, offset: 17 }}
                    >
                      <Tooltip title='search'>
                        <SearchOutlined style={{ fontSize: '20px' }} />
                      </Tooltip>
                    </Col>
                    <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} xl={{ span: 3 }} xxl={{ span: 2 }}>
                      <Tooltip title='notification'>
                        <BellOutlined style={{ fontSize: '20px' }} />
                      </Tooltip>
                    </Col>
                    <Col xs={{ span: 3 }} sm={{ span: 3 }} md={{ span: 3 }} lg={{ span: 3 }} xl={{ span: 3 }} xxl={{ span: 2 }}>
                      <Tooltip onClick={handleLogout} title='logout'>
                        <LogoutOutlined style={{ fontSize: '20px' }} />
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Header>
          </Layout>
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
            >
              {me && me.type === USER_TYPE_SUPER_ADMIN && <SuperAdminMenu /> }
              {me && me.type === USER_TYPE_SCHOOL_ADMIN && <SchoolAdminMenu /> }
              {me && me.type === USER_TYPE_TEACHER && <TeacherMenu /> }
              {me && me.type === USER_TYPE_STUDENT && <StudentMenu /> }
            </Sider>
            <Layout>
              <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  {children({})}
                </div>
              </Content>
              <Footer>
                <Row>
                  <Col span={24}>
                    <Divider style={{ borderColor: '#E0E0E0' }} />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span style={{ color: '#A9A9A9' }}>Copyright ©2021 Produced by Trifecta Core Technologies Corp.</span>
                  </Col>
                </Row>
              </Footer>
            </Layout>
          </Layout>
        </Spin>
      </Styled>
    )}
  </ViewContainer >
)

View.propTypes = {
  children: PropTypes.any
}
export default View
