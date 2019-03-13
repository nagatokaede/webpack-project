'use static';

const http = require('http');
const https = require('https');
const sslify  = require('koa-sslify').default;
const path = require('path');

const Koa = require('koa');
const webpack = require('webpack');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');

const fs = require('./util/fs.js');
const config = require('./config.js');

const app = new Koa();

// 强制使用 HTTPS 访问
app.use(sslify());

console.info(path.normalize(__dirname + '/ssl/kaede.nagato.top.key'));

let options = {
  key: fs.readFileSync(path.normalize(__dirname + '/ssl/kaede.nagato.top.key')),
  cert: fs.readFileSync(path.normalize(__dirname + '/ssl/kaede.nagato.top.pem')),
};

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

// app.listen(config.port, '0.0.0.0', () => {
//   console.info('running server localhost:' + config.port);
// });

http.createServer(app.callback()).listen(config.port, '0.0.0.0');
https.createServer(options, app.callback()).listen(443, '0.0.0.0');
console.log('https server is running');
