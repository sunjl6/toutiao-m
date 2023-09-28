const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  lintOnSave: false,
  devServer: {
    // 配置http-proxy代理方式跨域
    proxy: {
      // 自定义请求的开头,使用代理方式处理/demo开头的请求,/xxx可以自定义
      '/taobao': {
        // 往哪个服务器发请求
        target: 'https://suggest.taobao.com/',
        changeOrigin: true,
        pathRewrite: {
          // ^代表字符串开头,实际发送请求时,会把请求开头的/demo删除
          // 因为/demo并不是请求的一部分,只是个代理的标识
          '^/taobao': '/'
        }
      },
      '/toutiao': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
          // ^代表字符串开头,实际发送请求时,会把请求开头的/demo删除
          // 因为/demo并不是请求的一部分,只是个代理的标识
          '^/toutiao': '/'
        }
      }
      // 如果有其他网址也需要跨域则继续配置
      // "/其他的...": {
      // target: "其他的请求地址",
      // pathRewrite: {
      // "^/其他的...": "",
      // },
      // },
    }
  }
}
