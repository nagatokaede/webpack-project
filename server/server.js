'use static';

const http = require('http');

const path = require('path');

const Koa = require('koa');
// const webpack = require('webpack');
// const devMiddleware = require('koa-webpack-dev-middleware');
// const hotMiddleware = require('koa-webpack-hot-middleware');
const nginx = require('./middleware/nginx');
const serve = require('koa-static');

const config = require('./config.js');

const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../webapp';

console.log(path.join( __dirname,  staticPath));

app.use(serve(
  path.join( __dirname,  staticPath)
));

app.use(nginx({
  proxyTables: config.proxy,
}));
//
// let webpackConfig = require('../webpackConfig/webpack.dev.js');
// if (config.mode === 'production') webpackConfig = require('../webpackConfig/webpack.prod.js');
// const compiler = webpack(webpackConfig);

// 使用改造后的 webpack-dev-middleware 对更改的文件进行监控
// app.use(devMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath // '/'
// }));

// 使用改造后的 webpack-hot-middleware 实现热加载功能
// app.use(hotMiddleware(compiler));

http.createServer(app.callback()).listen(config.port, '0.0.0.0');
console.info(`running mode type ${config.mode}`);
console.info(`http server is running http://localhost:${config.port}`);
