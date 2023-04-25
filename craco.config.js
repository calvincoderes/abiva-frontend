const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#074EE8',
              '@layout-body-background': '#0D509F',
              '@layout-sider-background': '#0D509F',
              '@layout-header-background': '#FFFFFF',
              '@layout-header-color': '#111111',
              '@slider-handle-color': '#6AC259',
              '@slider-handle-color-hover': '#6AC259',
              '@slider-handle-color-tooltip-open': '#6AC259'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      '@': path.join(path.resolve(__dirname, './src'))
    }
  }
}
