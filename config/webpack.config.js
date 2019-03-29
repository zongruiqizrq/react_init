// 引入配置文件（系统基础配置）
const config = require('../config/app.config')
const webpack = require('webpack')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
// 样式与JS分离
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 查看打包情况
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const { ReactLoadablePlugin } = require('react-loadable/webpack')

const dev_module = require('./webpack.dev.module')
const pro_module = require('./webpack.pro.module')

const entry = {
  app: path.join(config.CLIENT_ROOT, 'client_index.jsx'),
  vendor: [
    'react',
    'react-dom',
    'react-router-dom',
    'react-helmet',
    'mobx',
    'mobx-react',
  ],
}

const output = config.DEBUG
  ? {
      pathinfo: true,
      filename: '[name].js',
      chunkFilename: 'chunk.[name].js',
      publicPath: '/',
    }
  : {
      path: config.WEBPACK_CLIENT_ROOT,
      filename: '[name].[chunkhash:8].js',
      chunkFilename: 'chunk.[name].[chunkhash:8].js',
    }

const use_module = config.DEBUG ? dev_module : pro_module

const plugins = [
  // 它的作用：跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
  new webpack.NoEmitOnErrorsPlugin(),
  // module的名称
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      IS_DEV: config.DEBUG,
      IS_SSR: config.SSR,
    },
  }),
  // 打包情况   如果想看打包的情况 将下边注释的语句打开
  // new BundleAnalyzerPlugin(),
  // 声明打包的文件哪些是依赖或是公用部分
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    filename: config.DEBUG ? '[name].js' : '[name].[chunkhash:8].js',
    minChunks: Infinity
  }),
  // 打包时显示进度
  new webpack.ProgressPlugin(function(percentage, msg) {
    let str = `${Math.floor(percentage * 100)}% ${msg}`
    process.stderr.write(`${str}\r`)
  }),
  // css单独打包成文件
  new ExtractTextPlugin(config.DEBUG ? '[name].css' : '[name].[chunkhash:8].css'),
  new ManifestPlugin(),
]

if (config.DEBUG) {
  // 热更新
  plugins.push(new webpack.HotModuleReplacementPlugin())
  entry.vendor.push('webpack-hot-middleware/client?noInfo=true&reload=true')
} else {
  // 压缩
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  )
}

if (config.SSR) {
  plugins.push(new ReactLoadablePlugin({
    filename: path.join(config.WEBPACK_SERVER_ROOT, 'react-loadable.json'),
  }))
}

module.exports = {
  entry,
  devtool: 'cheap-module-source-map',
  output,
  module: use_module,
  plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
