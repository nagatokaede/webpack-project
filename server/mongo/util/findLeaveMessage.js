'use static';

const leaveMessageModel = require('../modules/leaveMessage').leaveMessageModel;

// 分页查询留言表
/*
 * query {
 *   pageIndex: <Number> 页码
 *   pageSize: <Number> 每页显示条数
 * }
 */
const leaveMessageFindByPage = query => {
  return new Promise((resolve, reject) => {
    leaveMessageModel.find({
      delete: { $ne: true }
    }).
    skip(((query.pageIndex || 1) - 1) * (query.pageSize || 10)).
    limit(query.pageSize || 10).
    select({
      createBy: 1,
      message: 1,
      createTime: 1,
      style: 1,
      _id: 0
    }).
    then(docs => {
      console.info(docs);
      resolve({
        pageData: docs,
        totalCount: docs.length
      });
    }).
    catch(err => {
      console.warn('分页查询留言表失败：' + err);
      reject(err);
    });
  });
};

module.exports = leaveMessageFindByPage;
