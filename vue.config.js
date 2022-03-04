// 反向代理后端服务器地址
// const target = 'http://192.168.140.29:9006'
// const target = 'http://10.111.3.221:9006/'
// const target = 'http://10.1.20.184:9000'
const target = 'http://192.168.196.165:9000'
const proxy = {}

// 反向代理后端接口一级目录
'api'.split('|').map((key) => {
    key = `^/${key}`
    proxy[key] = {
        target,
        changeOrigin: true,
        pathRewrite: { '/api': '' }
    }
})
console.log(proxy)
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '测试demo'
        }
    },
    devServer: {
        port: 3300,
        proxy,
        open: true,
        // webpack4.0 开启热更新
        // disableHostCheck: true,
        // 浮层同时展示警告和错误
        overlay: {
            warnings: true,
            errors: true
        }
    },
    css: {
        extract: false, // 抽离css
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}
