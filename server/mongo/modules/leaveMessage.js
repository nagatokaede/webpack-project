'use static';

const mongoose = require(mongoose);

require('../conn_mongo');

/*
 * ------- 留言表 ---------
 * createTime: <Date> 创建时间
 * createBy: <string> 创建人
 * userIP: <string> 创建人ip地址
 * message: <string> 留言
 * delete: <Boolean> 逻辑删除
 */

// 将 mongoose.Schema 赋值给一个变量来定义一个数据约束
const leaveMessageSchema = mongoose.Schema({
  createTime: {
    type: Date,
    default: new Date()
  },
  createBy: String,
  userIP: String,
  message: String,
  delete: Boolean,
});

/*
 * ------- 留言操作记录表 ---------
 * leaveMessageId: <_id> 留言表 _id
 * updateTime: <Date> 修改时间
 * updateBy: <string> 修改者
 * updateInfo: <string> 修改信息
 */

const leaveMessageHistorySchema = mongoose.Schema({
  leaveMessageId: String,
  updateTime: {
    type: Date,
    default: new Date()
  },
  updateBy: String,
  updateInfo: String
});

// mongoose.model(modeName, schema)
// model 就是数据库中的集合 collection
const leaveMessageModel = mongoose.model('leave_message', leaveMessageSchema);

const leaveMessageHistoryModel = mongoose.model('leave_message_history', leaveMessageHistorySchema);

module.exports.leaveMessageModel = leaveMessageModel;
module.exports.leaveMessageHistoryModel = leaveMessageHistoryModel;
