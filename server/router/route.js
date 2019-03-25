'use static';

const Route = require('koa-router');
const { leaveMessageInsert, leaveMessageDelete, leaveMessageFindByPage} = require('../mongo/util/leaveMessage');

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

// API ---------------------------------------------
const leaveMessage = new Route();

leaveMessage.get('/', async ctx => {
  let docs = {};
  try {
    docs = {
      data: await leaveMessageFindByPage(ctx.query),
      description: 'SUCCESS'
    }
  } catch (err) {
    docs = {
      description: err
    }
  }
  
  ctx.body = docs;
});

leaveMessage.post('/', async ctx => {
  let docs = {};
  try {
    docs = {
      data: await leaveMessageInsert(ctx.request.body),
      description: 'SUCCESS'
    }
  } catch (err) {
    docs = {
      description: err
    }
  }
  
  ctx.body = docs;
});

leaveMessage.put('/', async ctx => {
  let docs = {};
  try {
    docs = {
      data: await leaveMessageDelete(ctx.request.body),
      description: 'SUCCESS'
    }
  } catch (err) {
    docs = {
      description: err
    }
  }

  ctx.body = docs;
});

// 装载所有路由接口 ---------------------------------------------
const router = new Route();
router.use('/leaveMessage', leaveMessage.routes(), leaveMessage.allowedMethods());
router.use('/test', test.routes(), test.allowedMethods());


module.exports = router;
