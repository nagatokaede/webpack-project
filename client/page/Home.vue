<template>
    <div id="home">
        <div class="row">
            <div class="col-md-4">
                <h3 class="text-center">輝きの庭へようこそ</h3>
                <p>访问时间：{{ dateContent.date }}</p>
                <p>时间戳：{{ dateContent.dateParse }}</p>
                <p>md5 加密：{{ dateContent.md5 }}</p>
                <p>md5 加密截取后24位：{{ dateContent.md5_24 }}</p>
                <textarea id="editor" placeholder="简单的 simditor 富文本编辑器" autofocus></textarea>
                <button type="button" class="btn btn-info btn-lg btn-block" onclick="getEdit()" style="margin: 10px 0">
                    提交富文本
                </button>
                <div class="panel panel-default">
                    <div class="panel-body" id="print">
                    </div>
                </div>
            </div>

            <div class="paddingNone col-md-8">
                <!--<img class="img-responsive center-block" :src="images.img_1" />-->

                <!--<img class="img-responsive center-block" :src="images.img_2" />-->

            </div>
        </div>
    </div>
</template>

<script>
  import md5 from 'md5';
  import filter from '../uitl/tool.js';
  import img_1 from '../asset/images/20190211180753.jpg';
  import img_2 from '../asset/images/20190211205504.jpg';
  export default {
    name: 'Home',

    data() {
      return {
        images: {
          img_1,
          img_2,
        },
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
      createEditor() {
        console.info(document.getElementById('editor'));
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
