'use static';

const { leaveMessageModel, leaveMessageHistoryModel } = require('../modules/leaveMessage');

// 插入留言
/*
 * ------- 留言表 ---------
 * createTime: <Date> 创建时间
 * createBy: <string> 创建人
 * userIP: <string> 创建人ip地址
 * message: <string> 留言
 * delete: <Boolean> 逻辑删除
 *
 * ------- 留言操作记录表 ---------
 * leaveMessageId: <_id> 留言表 _id
 * updateTime: <Date> 修改时间
 * updateBy: <string> 修改者
 * updateInfo: <string> 修改信息
 */
const docs = {};

const leaveMessageInsert = query => {
  return new Promise((resolve, reject) => {
    leaveMessageModel.insert({
      delete: { $ne: true }
    }).
    skip((query.pageIndex - 1) * query.pageSize).
    limit(query.pageSize).select({
      createBy: 1,
      message: 1
    }).
    then(docs => {
      resolve(docs);
    }).
    catch(err => {
      console.warn('分页查询留言表失败：' + err);
      reject(err);
    });
  });
};

module.exports = leaveMessageFindByPage;
