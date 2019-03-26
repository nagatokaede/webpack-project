'use static';

const Route = require('koa-router');
const { leaveMessageInsert, leaveMessageDelete, leaveMessageFindByPage} = require('../mongo/util/leaveMessage');
const { userFind, userInsert, userChangePassword, userDelete } = require('../mongo/util/user');
const insSpider = require('../spider/bin/spider');


// 工具 -------------------------------------------------------
const logPath = (ctx, method) => {
  console.log(`请求方式 ${method} 请求地址 ${ctx.url} 并返回数据成功！`);
};

const returnDocs = async (callback) => {
  let docs = {};
  try {
    docs = {
      data: await callback,
      description: 'SUCCESS'
    }
  } catch (err) {
    docs = {
      data: err,
      description: 'DEFEAT'
    }
  }
  return docs;
};

// 测试用路由端口 -----------------------------------------------
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

// leave message API -----------------------------------------
const leaveMessage = new Route();

leaveMessage.get('/', async ctx => {
  ctx.body = await returnDocs(leaveMessageFindByPage(ctx.query));
});

leaveMessage.post('/', async ctx => {
  ctx.body = await returnDocs(leaveMessageInsert(ctx.request.body));
});

leaveMessage.put('/', async ctx => {
  ctx.body = await returnDocs(leaveMessageDelete(ctx.request.body));
});

// leave message API -----------------------------------------
const user = new Route();

user.post('/login', async ctx => {
  ctx.body = await returnDocs(userFind(ctx.request.body));
});

user.post('/register', async ctx => {
  ctx.body = await returnDocs(userInsert(ctx.request.body));
});

user.put('/changePassword', async ctx => {
  ctx.body = await returnDocs(userChangePassword(ctx.request.body));
});

user.put('/userDelete', async ctx => {
  ctx.body = await returnDocs(userDelete(ctx.request.body));
});

// instagram spider ------------------------------------------
const instagramSpider = new Route();

instagramSpider.post('/', async ctx => {
  ctx.body = await returnDocs(insSpider(ctx.request.body.url));
});

// 装载所有路由接口 ---------------------------------------------
const router = new Route();
router.use('/instagramSpider', instagramSpider.routes(), instagramSpider.allowedMethods());
router.use('/leaveMessage', leaveMessage.routes(), leaveMessage.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/test', test.routes(), test.allowedMethods());


module.exports = router;
