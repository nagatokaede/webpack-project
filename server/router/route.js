'use static';

const Route = require('koa-router');

const logPath = (ctx, method) => {
  console.log(`请求方式 ${method} 请求地址 ${ctx.url} 并返回数据成功！`);
};

// 测试用路由端口 ---------------------------------------------
const test = new Route();

test.get('/', async ctx => {
  // get 请求测试
  ctx.body = {
    data: {
      message: 'get 端口测试 ok ！',
    },
    description: 'SUCCESS'
  };
  logPath(ctx, 'GET');
});

test.post('/', async ctx => {
  // post 请求测试
  ctx.body = {
    data: {
      message: 'post 端口测试 ok ！',
    },
    description: 'SUCCESS'
  };
  logPath(ctx, 'POST');
});


// 装载所有路由接口 ---------------------------------------------
const router = new Route();
router.use('/test', test.routes(), test.allowedMethods());


module.exports = router;
