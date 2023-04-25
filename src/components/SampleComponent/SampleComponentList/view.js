import React from 'react'
import ViewComponent from './container'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

const View = () => (
  <ViewComponent>
    {({ state }) => (
      <Spin spinning={state.samples.status === 1}>
        <h1>List Kunwari</h1>
        <p><Link to='/samples-form'>Click here to add sample</Link></p>
        <pre>
          {JSON.stringify(state.samples, null, 4)}
        </pre>
      </Spin>
    )}
  </ViewComponent>
)

export default View
