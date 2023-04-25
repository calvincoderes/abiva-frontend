import React from 'react'
import { Menu } from 'antd'
import { DashboardOutlined, DiffOutlined, FolderOpenOutlined, FileDoneOutlined } from '@ant-design/icons'

import ViewContainer from './container'

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
          <Menu.Item key='assessments-for-checking' icon={<DiffOutlined />}>
            ASSESSMENTS FOR CHECKING
          </Menu.Item>
          <Menu.Item key='assessment' icon={<DiffOutlined />}>
            ASSESSMENT MANAGEMENT
          </Menu.Item>
          <Menu.Item key='module' icon={<FileDoneOutlined />}>
            MODULE MANAGEMENT
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
