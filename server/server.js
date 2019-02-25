'use static';

const Koa = require('koa');
const webpack = require('webpack');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');

const config = require('./config.js');

const app = new Koa();

let webpackConfig = require('../webpackConfig/webpack.dev.js');
if (config.mode === 'production') webpackConfig = require('../webpackConfig/webpack.prod.js');
const compiler = webpack(webpackConfig);

// 使用改造后的 webpack-dev-middleware 对更改的文件进行监控
app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath // '/'
}));

// 使用改造后的 webpack-hot-middleware 实现热加载功能
app.use(hotMiddleware(compiler));

// console.warn('this is nagato no message!!!!!!', process.env);

app.listen(config.port, '0.0.0.0', () => {
  console.info('running server localhost:' + config.port);
});
