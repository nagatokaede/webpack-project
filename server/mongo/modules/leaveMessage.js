'use static';

const mongoose = require(mongoose);

require('../conn_mongo');

/*
 * createTime: <string> 创建时间
 * createBy: <string> 创建人
 * userIP: <string> 创建人ip地址
 * message: <string> 创建信息
 * delete: <Boolean> 逻辑删除
 * updateHistory: [
 *   {
 *     updateTime: <string> 修改时间
 *     updateBy: <string> 修改者
 *     updateInfo: <string> 修改信息
 *   }
 * ]
 */

// 将 mongoose.Schema 赋值给一个变量来定义一个数据约束
const leaveMessageSchema = mongoose.Schema({
  createTime: String,
  createBy: String,
  userIP: String,
  message: String,
  delete: Boolean,
  updateHistory: [
    {
      updateTime: String,
      updateBy: String,
      updateInfo: String,
    }
  ]
});

// mongoose.model(modeName, schema)
// model 就是数据库中的集合 collection
const leaveMessageModel = mongoose.model('leave_message', leaveMessageSchema);

module.exports = leaveMessageModel;
