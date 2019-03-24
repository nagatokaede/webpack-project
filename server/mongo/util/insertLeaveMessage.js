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

const leaveMessageInsert = body => {
  return new Promise((resolve, reject) => {
    const createLeaveMessage = new leaveMessageModel({
      createBy: body.createBy,
      message: body.message,
      style: body.style
    });
  
    createLeaveMessage.save(err => { // 保存数据
      if (err) {
        reject(err);
      } else {
        resolve(createLeaveMessage);
      }
    });
  });
};

// const leaveMessageHistoryInsert = async query => {
//   return new Promise((resolve, reject) => {
//     try {
//       const createLeaveMessageHistory = {
//         _id: await leaveMessageInsert._id,
//         createBy: query.createBy,
//         message: query.message
//       };
//       resolve(createLeaveMessageHistory);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

module.exports = leaveMessageInsert;
