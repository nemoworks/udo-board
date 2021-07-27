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
      target: 'http://192.168.28.92:8080',
      changeOrigin: true,
    },
    '/dns': {
      target: 'https://v2.alapi.cn/api/domain',
      changeOrigin: true,
    },
    '/ip': {
      target: 'https://restapi.amap.com/v5',
      changeOrigin: true,
    },
  },
  //headScripts: [`//api.map.baidu.com/api?type=webgl&v=1.0&ak=vvgjuqKmPMlaC633vyVbmuVzPTR5v3Ia`],
  headScripts: [`http://api.map.baidu.com/api?v=2.0&ak=vvgjuqKmPMlaC633vyVbmuVzPTR5v3Ia`],
})
