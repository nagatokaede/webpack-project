'use static';

const Koa = require('koa');
const webpack = require('webpack');
const devMiddleware = require('./util/devMiddleware.js');

const app = new Koa();

const config = require('./webpack.dev.js');
const compiler = webpack(config);

// 使用改造后的 webpack-dev-middleware
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath // '/'
}));

console.warn('this is nagato no message!!!!!!', process.env);

app.listen(8888, '127.0.0.1',() => {
  console.info('running server localhost:8888');
});
