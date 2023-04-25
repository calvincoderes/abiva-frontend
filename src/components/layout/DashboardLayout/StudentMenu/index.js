import React from 'react'
import { Menu } from 'antd'
import { UsergroupDeleteOutlined, DiffOutlined, FileDoneOutlined } from '@ant-design/icons'

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
          <Menu.Item key='contents' icon={<UsergroupDeleteOutlined />}>
            CONTENTS
          </Menu.Item>
          <Menu.Item key='assessments' icon={<DiffOutlined />}>
            ASSESSMENTS
          </Menu.Item>
          <Menu.Item key='modules' icon={<FileDoneOutlined />}>
            MODULE
          </Menu.Item>
        </Menu>}
      </>
    )}
  </ViewContainer >
)

export default View
