const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
//vue.config.js配置
//官网链接
//https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
  //publicPath 项目部署的路径 默认‘/’
  /*
  *默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，
  * 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，
  * 你就需要用这个选项指定这个子路径。
  * 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，
  * 则设置 publicPath 为 /my-app/。
  * */
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',

  //outputDir 运行npm run build 时生成文件的名字 会先删除原来的目录再创建一个新的
  //默认值 ‘dist'
  outputDir: 'dist',

  //assetsDir 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  //默认 ’‘  <link href="js/app.4471dae5.js" rel="preload" as="script">
  /*
  * 例子
  * assetsDir: 'blog'
  * <link href="blog/js/app.4471dae5.js" rel="preload" as="script">
  * */
  assetsDir: '',

  //indexPath 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  //默认 'index.html'
  indexPath: 'index.html',

  // filenameHashing
  //默认值为 true
  /*默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
  如果你无法使用 Vue CLI 生成的 index HTML，
  你可以通过将这个选项设为 false 来关闭文件名哈希。
  */
  filenameHashing: 'true',

  // productionSourceMap
  // 默认 true,
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: true,
  configureWebpack: config => {
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api',resolve('src/api'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('utils',resolve('src/utils'))
      .set('common',resolve('src/common'))
      .set('network',resolve('src/network'))
      .set('view',resolve('src/view'))
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))

  },
  devServer: {
    // 所有 webpack-dev-server 的选项都支持 https://webpack.js.org/configuration/dev-server/
    //中文 https://www.webpackjs.com/configuration/dev-server/
    // 注意：
    // 有些值像 host、port 和 https 可能会被命令行参数覆写。
    // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。

    host: "0.0.0.0",  //服务器外部可访问,
    port: 8888,       //指定要监听请求的端口号
    headers: {        //在所有响应中添加首部内容
      "X-Custom-Foo": "bar"
    },
    proxy: {         //代理
      "/api": {
        // target: " https://www.easy-mock.com/mock/5fb65cdebae16b281b2fe1b6/mymimall",
        target: "http://mall-pre.springboot.cn/",
        pathRewrite: {"^/api" : ""},    //重写路径
      }
    },
    //一切服务都启用gzip 压缩
    compress: true,

    //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    // contentBase: path.join(__dirname, "public")
  },

  css: {
    //详细见https://cli.vuejs.org/zh/config/#css-modules
    requireModuleExtension: true,
    // extract
    sourceMap: false,
    // loaderOptions: {
    //   css: {
    //     //这里传递值给 css-loader
    //   },
    //   postcss: {
    //     //这里的选项会传递给postcss-loader
    //   }
    // }
  },

  runtimeCompiler: false,
  // runtimeCompiler
  //默认 false
  // 是否使用包含运行时编译器的 Vue 构建版本。
  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，
  // 但是这会让你的应用额外增加 10kb 左右。


  // transpileDependencies
  //默认 []
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
  // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。

  /*pages
  * 默认 undefined
  * 在 multi-page 模式下构建应用。
  * 每个“page”应该有一个对应的 JavaScript 入口文件。
  * 其值应该是一个对象，对象的 key 是入口的名字，value 是：
  *   一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
  *   或一个指定其 entry 的字符串。
  *
        pages: {
        index: {
          // page 的入口
          entry: 'src/index/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'Index Page',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/subpage/main.js'
  }
  * */
  /*
  * lintOnSave
  * 默认 ’default‘,
  * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。

    设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。

    如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'default'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。

    设置为 error 将会使得 eslint-loader 把 lint 警告也输出为编译错误，这意味着 lint 警告将会导致编译失败。
    你也可以通过设置让浏览器 overlay 同时显示警告和错误：
    module.exports = {
        devServer: {
        overlay: {
        warnings: true,
        errors: true
        }
     }
    }
  * */

  //更多见官方文档
  //crossorigin
  //integrity
  //configureWebpack
  //chainWebpack
  //css.requireModuleExtension
  //css.extract
  //css.sourceMap
  //parallel
  //pwa
  //pluginOptions
}