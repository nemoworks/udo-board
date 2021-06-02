import { defineConfig } from 'umi'
import MonacoEditorWebpackPlugin from 'monaco-editor-webpack-plugin'

export default defineConfig({
  chainWebpack(memo) {
    memo.plugin('monaco-editor').use(MonacoEditorWebpackPlugin, [
      {
        languages: ['json'],
      },
    ])
  },
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'UDO-Board',
  favicon: 'favicon.svg',
  dva: {},
  antd: {},
  proxy: {
    '/api': {
      target: 'http://172.127.150.56:8080/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
})
