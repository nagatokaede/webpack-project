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

                <div>
                    <div class="col-xs-12 col-md-10" style="padding-bottom: 20px;">
                        <input type="text" class="form-control" placeholder="输入 Instagram 地址" v-model="requestBody.url">
                    </div>
                    <div class="col-xs-12 col-md-2" style="padding-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-block" @click="getInsImgList">获取</button>
                    </div>
                </div>

                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div v-for="item in responseDate.data" style="padding: 10px;">
                                <img :src="item" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import md5 from 'md5';
  import filter from '../util/tool.js';

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

        requestBody: {
          url: '',
        },
        responseDate: {
          data: []
        }
      }
    },

    methods: {
      /* -------- api ---------- */
      getInstagramSpider(body) {
        return new Promise((resolve, reject) => {
          this.$axios.getInstagramSpider(body).then(res => {
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
      getInsImgList() {
        this.getInstagramSpider(this.requestBody).then(res => {
          this.responseDate = res;
        });
      },

      /* -------- 工具 ---------- */
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
    }
  }
</script>

<style>

</style>