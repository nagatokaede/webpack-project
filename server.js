'use static';

const Koa = require('koa');
const webpack = require('webpack');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');

const app = new Koa();

const config = require('./webpack.dev.js');
const compiler = webpack(config);

// 使用改造后的 webpack-dev-middleware 对更改的文件进行监控
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath // '/'
}));

// 使用改造后的 webpack-hot-middleware 实现热加载功能
app.use(hotMiddleware(compiler));

// console.warn('this is nagato no message!!!!!!', process.env);

app.listen(8888, '127.0.0.1',() => {
  console.info('running server localhost:8888');
});
