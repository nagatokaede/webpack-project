<template>
    <div id="tool">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <p>访问时间：{{ dateContent.date }}</p>
                    <p>时间戳：{{ dateContent.dateParse }}</p>
                </div>

                <div class="col-md-6 col-xs-12">
                    <p>md5 加密：{{ dateContent.md5 }}</p>
                    <p>md5 加密截取后24位：{{ dateContent.md5_24 }}</p>
                </div>

                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-body" id="print" v-html="printContent">
                        </div>
                    </div>
                </div>

                <div class="col-xs-12">
                    <textarea id="editor" placeholder="简单的 simditor 富文本编辑器" autofocus></textarea>
                    <button type="button" class="btn btn-info btn-lg btn-block" @click="getEdit" style="margin: 10px 0">
                        提交富文本
                    </button>
                </div>

                <div class="col-md-6 col-xs-12">
                    <button type="button" class="btn btn-info btn-lg btn-block" @click="getTestApiGet">GET API TEST</button>
                </div>

                <div class="col-md-6 col-xs-12">
                    <button type="button" class="btn btn-info btn-lg btn-block" @click="getTestApiPost">POST API TEST</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import md5 from 'md5';
  import filter from '../uitl/tool.js';
  export default {
    name: 'Tool',

    data() {
      return {
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
        printContent: '' //
      }
    },

    methods: {
      /* -------- api ---------- */
      testGet(query) {
        return new Promise((resolve, reject) => {
          this.$axios.testGet(query).then(res => {
            const data = res.data;
            if (data.description === 'SUCCESS') {
              resolve(data.data);
            } else {
              alert(data.description);
              reject(data.description);
            }
          });
        });
      },

      testPost(body) {
        return new Promise((resolve, reject) => {
          this.$axios.testPost(body).then(res => {
            const data = res.data;
            if (data.description === 'SUCCESS') {
              resolve(data.data);
            } else {
              alert(data.description);
              reject(data.description);
            }
          });
        });
      },

      /* ------ api 调用 -------- */
      getTestApiGet() {
        this.testGet().then(res => {
          console.info(res);
          document.getElementById('print').innerText += res.message;
        });
      },

      getTestApiPost() {
        this.testPost().then(res => {
          console.info(res);
          document.getElementById('print').innerText += res.message;
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
        this.printContent = this.editor.sync();
      },
    },
    // 创建完毕
    created() {
      this.dateMD5();
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