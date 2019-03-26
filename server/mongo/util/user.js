'use static';

const crypto = require('crypto');

const { userModel, userHistoryModel } = require('../modules/user');

// 加密
const hash = data => {
  return crypto.createHmac('sha256', 'hotcake').update(data).digest('hex');
};

/*
 * ------- 用户操作记录表 ---------
 * body {
 *   userId: <_id> 用户 _id
 *   updateBy: <string> 修改者
 *   updateInfo: <string> 修改信息
 * }
 */
const userHistoryInsert = body => {
  return new Promise((resolve, reject) => {
    const createUserHistory = new userHistoryModel(body);
    createUserHistory.save(err => { // 保存数据
      if (err) {
        reject({
          data: {
            message: '操作记录失败',
            err: err,
          },
          description: 'DEFEAT',
        });
      } else {
        resolve({
          data: {
            data: createUserHistory,
          },
          description: 'SUCCESS',
        });
      }
    });
  });
};


/*
 * -------- 查询用户 ----------
 * body {
 *   userName: <String> 用户名
 *   password: <String> 密码
 * }
 */
const userFind = body => {
  return new Promise((resolve, reject) => {
    userModel.findOne({
      userName: body.userName,
    }).
    select({
      userName: 1,
      password: 1,
      nickName: 1,
      delete: 1,
    }).
    then(docs => {
      let status = 0;
      console.info('查询用户1', docs);
      if (!docs) {
        status = 1;
        docs = '用户名不存在！';
      } else if (docs.delete) {
        status = 2;
        docs = '用户已注销！';
      } else if (docs.password !==  hash(body.password)) {
        console.log(docs.password, hash(body.password));
        status = 3;
        docs = '密码错误！';
      }
      if (status) {
        resolve({
          data: {
            status: status,
            message: docs,
          },
          description: 'DEFEAT',
        });
      } else {
        resolve({
          data: {
            data: docs,
          },
          description: 'SUCCESS',
        });
      }
    }).
    catch(err => {
      console.warn('用户查询失败：' + err);
      reject({
        data: {
          message: '用户查询失败',
          err: err,
        },
        description: 'DEFEAT',
      });
    });
  });
};


/*
 * ------- 插入用户 ---------
 * body {
 *   userName: <String> 用户名
 *   password: <String> 密码
 *   nickName: <string> 昵称
 * }
 */
const userInsert = body => {
  return new Promise((resolve, reject) => {
    userFind(body).
    then(res => {
      if (res.data.status === 1) {
        const createUser = new userModel({
          userName: body.userName,
          password: hash(body.password),
          nickName: body.nickName
        });
        createUser.save(err => { // 保存数据
          if (err) {
            console.warn('新增用户失败：' + err);
            reject({
              data: {
                message: '新增用户失败',
                err: err,
              },
              description: 'DEFEAT',
            });
          } else {
            userHistoryInsert({
              userId: createUser._id,
              updateBy: createUser.userName,
              updateInfo: '新增用户'
            }); // 记录操作历史
            resolve({
              data: {
                message: '新增用户成功',
              },
              description: 'SUCCESS',
            });
          }
        });

      } else {
        console.warn(res);
        reject({
          data: {
            message: '用户已存在',
          },
          description: 'DEFEAT',
        });
      }
    }).
    catch(err => {
      reject({
        data: {
          message: '用户已存在',
          err: err,
        },
        description: 'DEFEAT',
      });
    });
  });
};


/*
 * ------- 修改用户密码 ---------
 * body {
 *   userName: <String> 用户名
 *   password: <String> 密码
 *   newPassword: <String> 新密码
 *   nickName: <string> 昵称
 * }
 */
const userChangePassword = body => {
  return new Promise((resolve, reject) => {
    userFind(body).
    then(res => {
      if (res.status === 0) {
        userModel.updateOne(
          {_id: res.data._id},
          {$set: { 'password': hash(body.newPassword) }}
        ).
        then(() => {
          userHistoryInsert({
            userId: res.data._id,
            updateBy: res.data.userName,
            updateInfo: '修改密码'
          }); // 记录操作历史
          resolve({
            data: {
              message: '修改密码成功',
            },
            description: 'SUCCESS',
          });
        }).
        catch(err => {
          console.warn('修改密码失败：' + err);
          reject({
            data: {
              message: '修改密码失败',
              err: err,
            },
            description: 'DEFEAT',
          });
        });
      } else {
        resolve({
          data: {
            data: res,
          },
          description: 'SUCCESS',
        });
      }
    }).
    catch(err => {
      reject({
        data: {
          message: '修改密码失败',
          err: err,
        },
        description: 'DEFEAT',
      });
    });
  });
};


/*
 * ------- 删除用户 ---------
 * body: {
 *   id: <String> 数据库查询 _id
 *   updateBy: <String> 修改者
 * }
 */
const userDelete = body => {
  return new Promise((resolve, reject) => {
    userModel.updateOne(
      {_id: body.id},
      {$set: { 'delete': true }}
    ).
    then(() => {
      userHistoryInsert({
        userId: body.id,
        updateBy: body.createBy,
        updateInfo: '删除用户'
      }); // 记录操作历史
      resolve({
        message: '删除用户成功！'
      });
    }).
    catch(err => {
      console.warn('删除用户失败：' + err);
      reject(err);
    });
  });
};

module.exports.userFind = userFind;
module.exports.userInsert = userInsert;
module.exports.userChangePassword = userChangePassword;
module.exports.userDelete = userDelete;
