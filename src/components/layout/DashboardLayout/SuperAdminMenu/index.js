import React from 'react'
import { Menu } from 'antd'
import {
  DashboardOutlined,
  ApartmentOutlined,
  UsergroupDeleteOutlined,
  ReadOutlined,
  DiffOutlined,
  FileDoneOutlined,
  FolderOpenOutlined
} from '@ant-design/icons'

import ViewContainer from './container'

const { SubMenu } = Menu

const View = () => (
  <ViewContainer>
    {({ currentPath, defaultKeys, handleMenu }) => (
      <>
        <div className='mt-4' />
        {defaultKeys && <Menu
          onClick={handleMenu}
          mode='inline'
          defaultOpenKeys={[defaultKeys]}
          selectedKeys={[currentPath]}
        >
          <Menu.Item key='dashboard' icon={<DashboardOutlined />}>
            DASHBOARD
          </Menu.Item>
          <SubMenu key='configuration' icon={<ApartmentOutlined />} title='CONFIGURATION'>
            <Menu.Item key='school'>Manage School / Organization</Menu.Item>
            <Menu.Item key='subject'>Manage Subject</Menu.Item>
            <Menu.Item key='year'>Manage Year/Level</Menu.Item>
            <Menu.Item key='class'>Manage Class/Section</Menu.Item>
          </SubMenu>
          <SubMenu key='account-management' icon={<UsergroupDeleteOutlined />} title='ACCOUNT MANAGEMENT'>
            <Menu.Item key='school-admin'>School Admin</Menu.Item>
            <Menu.Item key='school-sub-admin'>School Sub-Admin</Menu.Item>
            <Menu.Item key='teacher'>Teacher</Menu.Item>
            <Menu.Item key='student'>Student</Menu.Item>
          </SubMenu>
          <SubMenu key='content-management' icon={<ReadOutlined />} title='CONTENT MANAGEMENT'>
            <Menu.Item key='category'>Category</Menu.Item>
            <Menu.Item key='sub-category'>Sub-Category</Menu.Item>
            <Menu.Item key='content'>Content</Menu.Item>
          </SubMenu>
          <Menu.Item key='module' icon={<FileDoneOutlined />}>
            MODULE MANAGEMENT
          </Menu.Item>
          <Menu.Item key='assessment' icon={<DiffOutlined />}>
            ASSESSMENT MANAGEMENT
          </Menu.Item>
          <Menu.Item key='grading' icon={<FolderOpenOutlined />}>
            GRADING MANAGEMENT
          </Menu.Item>
        </Menu>}
      </>
    )}
  </ViewContainer >
)

export default View
