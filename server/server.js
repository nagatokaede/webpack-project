'use static';

const http = require('http');
const https = require('https');
const sslify  = require('koa-sslify').default;
const path = require('path');

const Koa = require('koa');
const webpack = require('webpack');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const nginx = require('./middleware/nginx');

const fs = require('./util/fs/fs.js');
const config = require('./config.js');

const app = new Koa();

// 强制使用 HTTPS 访问
app.use(sslify());

app.use(nginx({
  proxyTables: config.proxy,
}));

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

http.createServer(app.callback()).listen(config.port, '0.0.0.0');
https.createServer(options, app.callback()).listen(443, '0.0.0.0');
console.info(`running mode type ${config.mode}`);
console.info(`http server is running http://localhost:${config.port}`);
console.info(`https server is running https://localhost`);
