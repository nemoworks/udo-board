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
    // '/cordra': {
    //   target: 'https://172.19.250.127:7711',
    //   changeOrigin: true,
    //   secure: false,
    //   pathRewrite: { '^/cordra': '' },
    // },
  },
})
