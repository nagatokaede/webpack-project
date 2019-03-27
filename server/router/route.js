'use static';

const Route = require('koa-router');
const { leaveMessageInsert, leaveMessageDelete, leaveMessageFindByPage} = require('../mongo/util/leaveMessage');
const { userFind, userInsert, userChangePassword, userDelete } = require('../mongo/util/user');
const insSpider = require('../spider/bin/spider');


// leave message API -----------------------------------------
const leaveMessage = new Route();

leaveMessage.get('/', async ctx => {
  try {
    ctx.body = await leaveMessageFindByPage(ctx.query);
  } catch (err) {
    ctx.throw(500, err);
  }
});

leaveMessage.post('/', async ctx => {
  try {
    ctx.body = await leaveMessageInsert(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }
});

leaveMessage.put('/', async ctx => {
  try {
    ctx.body = await leaveMessageDelete(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }
});

// leave message API -----------------------------------------
const user = new Route();

user.post('/login', async ctx => {
  try {
    ctx.body = await userFind(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }
});

user.post('/register', async ctx => {
  try {
    ctx.body = await userInsert(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }
});

user.put('/changePassword', async ctx => {
  try {
    ctx.body = await userChangePassword(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }
});

user.put('/userDelete', async ctx => {
  try {
    ctx.body = await userDelete(ctx.request.body);
  } catch (err) {
    ctx.throw(500, err);
  }
});

// instagram spider ------------------------------------------
const instagramSpider = new Route();

instagramSpider.post('/', async ctx => {
  try {
    ctx.body = await insSpider(ctx.request.body.url);
  } catch (err) {
    ctx.throw(500, err);
  }
});

// 装载所有路由接口 ---------------------------------------------
const router = new Route();
router.use('/instagramSpider', instagramSpider.routes(), instagramSpider.allowedMethods());
router.use('/leaveMessage', leaveMessage.routes(), leaveMessage.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());


module.exports = router;
