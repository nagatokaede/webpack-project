<template>
    <div class="api-manage">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="findMethod">Method: </label>
                            <input type="text" v-model="mainListReqPathParameters.type" class="form-control"
                                   id="findMethod" placeholder="Method">
                        </div>
                        <div class="form-group">
                            <label for="findUri">Uri: </label>
                            <input type="email" v-model="mainListReqPathParameters.uri" class="form-control"
                                   id="findUri" placeholder="Uri">
                        </div>
                        <button type="submit" class="btn btn-info" @click="getMainList('search')">搜索</button>
                        <button type="submit" class="btn btn-info pull-right" data-toggle="modal" @click="openCreateModel">新增</button>
                    </form>
                </div>

                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th style="width: 240px;">Id</th>
                                    <th style="width: 100px;">Method</th>
                                    <th>Uri</th>
                                    <th>Query</th>
                                    <th>Body</th>
                                    <th>remark</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in mainListResData.pageData" :key="index">
                                    <td>{{ item._id }}</td>
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.uri }}</td>
                                    <td>{{ item.query }}</td>
                                    <td>{{ item.body }}</td>
                                    <td>{{ item.remark }}</td>
                                    <td>
                                        <button type="button" class="btn btn-info btn-xs" @click="openEditModel(item._id)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs" @click="deleteApi(item._id)">删除</button>
                                        <button type="button" class="btn btn-info btn-xs" @click="openCreateDataModel(item._id)">插入数据</button>
                                        <button type="button" class="btn btn-info btn-xs" @click="openDataModel(item._id)">展开数据</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="modal fade" tabindex="-1" role="dialog" id="addOrEditModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">{{ addOrEditModal.modalType }} api</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="creatMethod">Method: </label>
                                    <select class="form-control" id="creatMethod" v-model="addOrEditReqBody.type">
                                        <option>GET</option>
                                        <option>POST</option>
                                        <option>PUT</option>
                                        <option>DELETE</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="creatUri">Uri: </label>
                                    <input class="form-control" id="creatUri" placeholder="Uri" v-model="addOrEditReqBody.uri">
                                </div>
                                <div class="form-group">
                                    <label for="creatQuery">query: </label>
                                    <textarea id="creatQuery" class="form-control" rows="3" v-model="addOrEditReqBody.query"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="creatBody">body: </label>
                                    <textarea id="creatBody" class="form-control" rows="3" v-model="addOrEditReqBody.body"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="creatRemark">remark: </label>
                                    <textarea id="creatRemark" class="form-control" rows="3" v-model="addOrEditReqBody.remark"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="addOrEditModal.method">{{ addOrEditModal.modalType }}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

            <div class="modal fade" tabindex="-1" role="dialog" id="addOrEditDataModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">{{ addOrEditDataModal.modalType }} Data</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="creatData">Data: </label>
                                    <textarea id="creatData" class="form-control" rows="3" v-model="addOrEditDataReqBody.data"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="addOrEditDataModal.method">{{ addOrEditDataModal.modalType }}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->

            <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="dataModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th style="width: 200px;">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in apiData" :key="index">
                                    <td>{{ item }}</td>
                                    <td>
                                        <button type="button" class="btn btn-info btn-xs" @click="openEditDataModel(item.dataId)">编辑</button>
                                        <button type="button" class="btn btn-danger btn-xs" @click="deleteData(item.dataId)">删除</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ApiManage',

  data() {
    return {
      // 主表查询
      mainListReqPathParameters: {
        type: '',
        uri: '',
        pageIndex: 1,
        pageSize: 10,
      }, // 主要列表请求数据
      mainListReturnPage: {
        ability: '', // ability name/code
        startTime: '', // 开始时间
        endTime: '', // 截止时间
        expireDate: [],
        pageIndex: 1,
        pageSize: 10,
      }, // 翻页暂存数据
      mainListResData: {
        pageData: [
          { _id: 123, type: 'GET', uri: '/api', remark: 'abc' },
        ],
        totalCount: 1,
      }, // 主要列表响应数据

      // 新增&编辑
      addOrEditReqBody: {
        type: '',
        uri: '',
        query: '',
        body: '',
        remark: '',
      }, // 请求数据
      addOrEditModal: {
        modalType: '',
        method: {},
      }, // 模态框

      // 新增&编辑 数据
      addOrEditDataReqBody: {
        apiId: '',
        data: '',
      }, // 请求数据
      addOrEditDataModal: {
        modalType: '',
        method: {},
      }, // 模态框

      apiDataReqBody: {
        apiId: '',
        dataId: '',
        data: '',
      }, // 请求数据
      apiData: '',
    };
  },

  methods: {
    /* -------- api ---------- */
    apiFindOne(query) {
      return new Promise((resolve, reject) => {
        this.$axios.apiFindOne(query).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    apiFind(query) {
      return new Promise((resolve, reject) => {
        this.$axios.apiFind(query).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    apiCreate(body) {
      return new Promise((resolve, reject) => {
        this.$axios.apiCreate(body).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    apiChange(body) {
      return new Promise((resolve, reject) => {
        this.$axios.apiChange(body).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    apiDelete(query) {
      return new Promise((resolve, reject) => {
        this.$axios.apiDelete(query).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },


    dataFindOne(query) {
      return new Promise((resolve, reject) => {
        this.$axios.dataFindOne(query).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    dataFind(query) {
      return new Promise((resolve, reject) => {
        this.$axios.dataFind(query).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    dataCreate(body) {
      return new Promise((resolve, reject) => {
        this.$axios.dataCreate(body).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    dataChange(body) {
      return new Promise((resolve, reject) => {
        this.$axios.dataChange(body).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    dataDelete(query) {
      return new Promise((resolve, reject) => {
        this.$axios.dataDelete(query).then(res => {
          const data = res.data;
          if (data.description === 'SUCCESS') {
            resolve(data.data);
          } else {
            alert(data.data.message);
            reject(data.data);
          }
        });
      });
    },

    /* ------ api 调用 -------- */
    /* ---------------------- 页面方法 ---------------------------- */
    getMainList(method) {
      // 搜索条件 → 参数
      if (method === 'search') {
        this.mainListReqPathParameters.pageIndex = 1;
        this.mainListReturnPage = JSON.parse(JSON.stringify(this.mainListReqPathParameters));
      }
      // 翻页
      if (typeof method === 'number') {
        this.mainListReturnPage.pageIndex = method;
        this.mainListReqPathParameters = JSON.parse(JSON.stringify(this.mainListReturnPage));
      }
      // 过滤没有数据的入参项和数据转换
      const query = this.mainListQuery(this.mainListReqPathParameters);
      // 发起 ajax 请求
      this.apiFind(query).then(res => {
        // 处理响应参数
        this.mainListResData = res;
        // 备份请求参数
        this.mainListReturnPage = JSON.parse(JSON.stringify(this.mainListReqPathParameters));
      });
    },

    openCreateModel() {
      // 表单初始化
      this.addOrEditReqBody = {
        type: '',
        uri: '',
        query: '',
        body: '',
        remark: '',
      };
      // 模态框
      this.addOrEditModal.modalType = '新增';
      this.addOrEditModal.method = this.createApi;
      // 打开模态框
      $('#addOrEditModal').modal('show');
    },
    createApi() {
      // 预处理请求数据
      const body = this.toRequestData();
      // 发起新增请求
      this.apiCreate(body).then(() => {
        // 刷新主表数据
        this.getMainList('search');
        // 关闭模态框
        $('#addOrEditModal').modal('hide');
        // 清除表单缓存
        this.addOrEditReqBody = {
          type: '',
          uri: '',
          query: '',
          body: '',
          remark: '',
        };
      });
    },

    openEditModel(id) {
      // 获取详情
      this.apiFindOne({_id: id}).then(res => {
        console.log(res);
        // 表单初始化
        this.addOrEditReqBody = this.toFromData(res);
        // 模态框
        this.addOrEditModal.modalType = '编辑';
        this.addOrEditModal.method = this.editApi;
        // 打开模态框
        $('#addOrEditModal').modal('show');
      });
    },
    editApi() {
      // 预处理请求数据
      const body = this.toRequestData();
      console.log(body);
      // 发起新增请求
      this.apiChange(body).then(() => {
        // 刷新主表数据
        this.getMainList('search');
        // 关闭模态框
        $('#addOrEditModal').modal('hide');
        // 清除表单缓存
        this.addOrEditReqBody = {
          type: '',
          uri: '',
          query: '',
          body: '',
          remark: '',
        };
      });
    },

    deleteApi(id) {
      this.apiDelete({ id }).then(() => {
        // 刷新主表数据
        this.getMainList('search');
      });
    },


    openCreateDataModel(id) {
      // 表单初始化
      this.addOrEditDataReqBody = {
        apiId: id,
        data: '',
      };
      // 模态框
      this.addOrEditDataModal.modalType = '新增';
      this.addOrEditDataModal.method = this.createData;
      // 打开模态框
      $('#addOrEditDataModal').modal('show');
    },
    createData() {
      // 入参处理
      const body = {
        apiId: this.addOrEditDataReqBody.apiId,
        data: '',
      };
      try {
        body.data = JSON.parse(this.addOrEditDataReqBody.data);
      } catch (err) {
        alert('data 数据不能转换为JSON！');
      }
      // 发起新增请求
      if (typeof body.data === 'object') {
        this.dataCreate(body).then(() => {
          // 刷新主表数据
          this.getMainList('search');
          // 关闭模态框
          $('#addOrEditDataModal').modal('hide');
          // 清除表单缓存
          this.addOrEditDataReqBody = {
            data: '',
          };
        });
      }
    },

    openDataModel(id) {
      this.apiDataReqBody.apiId = id;
      this.dataFind({apiId: id}).then(res => {
        this.apiData = res.pageData;
        $('#dataModal').modal('show');
      });
    },

    openEditDataModel(id) {
      // 表单初始化
      this.addOrEditDataReqBody = {
        dataId: id,
        data: '',
      };
      // 模态框
      this.addOrEditDataModal.modalType = '编辑';
      this.addOrEditDataModal.method = this.editData;
      // 打开模态框
      $('#dataModal').modal('hide');
      $('#addOrEditDataModal').modal('show');
    },
    editData() {
      // 入参处理
      const body = {
        dataId: this.addOrEditDataReqBody.dataId,
        data: '',
      };
      try {
        body.data = JSON.parse(this.addOrEditDataReqBody.data);
      } catch (err) {
        alert('data 数据不能转换为JSON！');
      }
      // 发起新增请求
      if (typeof body.data === 'object') {
        this.dataChange(body).then(() => {
          // 刷新主表数据
          this.getMainList('search');
          // 关闭模态框
          $('#addOrEditDataModal').modal('hide');
          // 清除表单缓存
          this.addOrEditDataReqBody = {
            data: '',
          };
        });
      }
    },

    deleteData(id) {
      // 删除
      this.dataDelete({dataId: id}).then(() => {
        // 刷新
        this.dataFind({apiId: this.apiDataReqBody.apiId}).then(res => {
          this.apiData = res.pageData;
        });
      });
    },

    /* ---------------------- 数据转换 ---------------------------- */
    // 主表过滤没有数据的入参项和数据转换
    mainListQuery(data) {
      const query = {}; // 添加默认参数
      for (const [ key, value ] of Object.entries(JSON.parse(JSON.stringify(data)))) {
        if (value) query[key] = value;
      }
      return query;
    },

    // 表单格式数据转请求格式数据
    toRequestData() {
      // 获取表单数据
      const content = JSON.parse(JSON.stringify(this.addOrEditReqBody));

      content.query = content.query.split(',').filter(x => x);
      content.body = content.body.split(',').filter(x => x);

      return content;
    },

    // 响应数据转表单格式数据
    toFromData(res) {
      return {
        id: res._id,
        type: res.type,
        uri: res.uri,
        query: res.query.join(',') || '',
        body: res.body.join(',') || '',
        remark: res.remark || '',
      };
    },
  },

  // 创建完毕
  created() {
    this.getMainList('search');
  },
}
</script>

<style scoped>

</style>
