
const proxy = require('http-proxy-middleware');
const c2k = require('koa-connect');
const compose = require('koa-compose');

function proxyMiddleareCreator(option) {
  return async function proxyMiddleare (ctx, next) {
    const pathReg = new RegExp(`^\\/${option.context}`);
    if(pathReg.test(ctx.url)) {
      const defaultOption = {
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite(path) {
          pathReg.lastIndex = 0;
          return path.replace(pathReg, '');
        }, // 移除context path
      };
      const proxyOptions = { ...defaultOption, ...option };
      var expressProxy = proxy(proxyOptions);
      await c2k(expressProxy)(ctx, next);
    }
    await next();
  }
}

module.exports = function nginxMiddlewareCreator(option) {
  const { proxyTables, ...proxyOption } = option;
  let middlewares = [];
  if(Array.isArray(proxyTables)) {
    middlewares = proxyTables.map((proxyTable) => {
      const opt = { ...proxyOption, ...proxyTable };
      return proxyMiddleareCreator(opt);
    });
  }
  return compose(middlewares);
};
