<template>
    <div class="leaveMessage">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <template v-for="item in responseDate.pageData" v-html="item.message">
                                <div :class="'panel panel-' + (item.style || 'default')">
                                    <div class="panel-heading">
                                        <span class="panel-title">
                                            {{ item.createBy }}
                                        </span>
                                        <span class="glyphicon glyphicon-remove" aria-hidden="true" @click="deleteLeaveMessage(item._id)"
                                              style="float: right; line-height: 18px; padding-left:10px; cursor: pointer;">
                                        </span>
                                        <span class="panel-title" style="float: right;">
                                            {{ item.createTime }}
                                        </span>
                                    </div>
                                    <div class="panel-body" v-html="item.message">
                                        {{ item.message }}
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="form-group col-xs-12">
                        <!--<div class="form-group">-->
                            <!--<input type="text" class="form-control" v-model="requestBody.createBy" placeholder="用户名">-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="col-xs-6">-->
                        <select class="form-control" v-model="requestBody.style">
                            <option value="default">default</option>
                            <option value="primary" style="color: #fff; background-color: #337ab7">primary</option>
                            <option value="success" style="color: #3c763d; background-color: #dff0d8">success</option>
                            <option value="info" style="color: #31708f; background-color: #d9edf7">info</option>
                            <option value="warning" style="color: #8a6d3b; background-color: #fcf8e3">warning</option>
                            <option value="danger" style="color: #a94442; background-color: #f2dede">danger</option>
                        </select>
                    </div>
                </div>

                <div class="col-xs-12">
                    <textarea id="editor" placeholder="简单的 simditor 富文本编辑器" autofocus></textarea>
                    <button type="button" class="btn btn-info btn-lg btn-block" @click="getEdit" style="margin: 10px 0">
                        提交富文本
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import md5 from 'md5';
  import filter from '../util/tool.js';
  export default {
    name: 'LeaveMessage',

    data() {
      return {
        userInfo: this.$store.state.userInfo,
        dateContent: {
          date: '',
          dateParse: '',
          md5: '',
          md5_24: '',
        },

        editor: '', // 保存 simditor 对象
        toolbar: [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'fontScale',
          'ol',
          'ul',
          'blockquote',
          'hr',
          'indent',
          'outdent',
          'alignment',
        ], // 自定义工具栏

        query: {
          pageIndex: 1,
          pageSize: 10
        },
        responseDate: {
          pageData: [],
          totalCount: 0
        },

        requestBody: {
          createBy: '匿名者',
          message: '',
          style: 'default'
        },

        deleteBody: {
          id: '',
          updateBy: 'kaede'
        }
      }
    },

    methods: {
      /* -------- api ---------- */
      leaveMessageFindByPage(query) {
        return new Promise((resolve, reject) => {
          this.$axios.leaveMessageFindByPage(query).then(res => {
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

      leaveMessageInsert(body) {
        return new Promise((resolve, reject) => {
          this.$axios.leaveMessageInsert(body).then(res => {
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

      leaveMessageDelete(body) {
        return new Promise((resolve, reject) => {
          this.$axios.leaveMessageDelete(body).then(res => {
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
      getLeaveMessageList() {
        this.leaveMessageFindByPage().then(res => {
          this.responseDate = res;
        });
      },

      createLeaveMessage(callback) {
        if (this.userInfo) this.requestBody.createBy = this.userInfo.nickName;
        this.leaveMessageInsert(this.requestBody).then(res => {
          this.getLeaveMessageList();
          if (callback) callback(res);
        });
      },

      deleteLeaveMessage(id, callback) {
        this.deleteBody.id = id;
        this.leaveMessageDelete(this.deleteBody).then(res => {
          this.getLeaveMessageList();
          if (callback) callback(res);
        });
      },

      /* -------- 工具 ---------- */
      createEditor() {
        this.editor = new Simditor({
          textarea: document.querySelector('textarea'),
          toolbar: this.toolbar
        });
      },

      dateMD5() {
        const date = (new Date()).getTime();
        const dateMd5 = md5(date.toString());

        this.dateContent = {
          date: filter.DateFilter(date),
          dateParse: date,
          md5: dateMd5,
          md5_24: dateMd5.substring(8),
        };
      },

      getEdit() {
        this.requestBody.message = this.editor.sync();
        this.createLeaveMessage();
      },
    },

    // 创建完毕
    created() {
      this.dateMD5();
      this.getLeaveMessageList();
    },

    // 挂载之前
    beforeMount() {

    },

    // 挂载结束
    mounted() {
      this.createEditor();
    }
  }
</script>

<style>

</style>