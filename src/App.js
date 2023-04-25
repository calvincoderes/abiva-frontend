import React from 'react'
import Routes from './routes'
import Interceptors from './utils/interceptor'
import store from './store'
import { StoreProvider } from 'easy-peasy'
import './assets/styles/app.less'

Interceptors.setupInterceptors(store)

const App = () => (
  <StoreProvider store={store}>
    <Routes />
  </StoreProvider>
)

export default App
