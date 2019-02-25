'use static';

const path = require('path');

// 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 打包之前清除打包文件夹下的旧文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 解决 vue-loader 依赖
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 单独打包 css 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//


const webpack = require('webpack');

module.exports = {
  // development: 开发模式，不会压缩打包文件;
  // production: 生产模式，压缩打包文件，删除为引用的文件内容;
  mode: 'development',
  // 入口源文件
  entry: {
    app: './src/index.js',
    // print: './src/print.js',
  },
  // 配置vue别名和扩展
  resolve: {
    extensions: [ '.js', '.vue', '.json' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // webpack-dev-server 提供了一个简单的 web 服务器，并且能够实时重新加载
  devServer: {
    // 将 dist 目录下的文件，作为可访问文件。
    contentBase: './dist',
    // 启用模块热替换
    hot: true,
  },
  // 追踪抛出错误的源文件
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 打包之前清除打包文件夹下的旧文件
    new CleanWebpackPlugin(['dist']),
    // 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中。
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    // NamedModulesPlugin，以便更容易查看要修补(patch)的依赖。
    new webpack.NamedModulesPlugin(),
    // 模块热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 解决 vue-loader 依赖
    new VueLoaderPlugin(),
    // 单独打包 css 文件
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  // 输出
  output: {
    // 输出文件名
    filename: '[name].bundle.js',
    // 输出文件夹，绝对路径
    path: path.resolve(__dirname, 'dist'),
  },
};
