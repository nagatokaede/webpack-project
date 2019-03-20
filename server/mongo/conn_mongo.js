'use static';

const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:15498/');

// 监听 MongoDB 连接状态
// 连接
mongoose.connection.once('open', (err) => {
  if (!err) {
    console.log(`数据库已连接！！`);
  }
});

// 断开
mongoose.connection.once('close', (err) => {
  if (!err) {
    console.log(`数据库已断开！！`);
  }
});
