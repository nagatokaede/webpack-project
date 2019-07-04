<template>
    <div class="home">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                        <!-- Indicators -->
                        <ol class="carousel-indicators">
                            <li data-target="#carousel-example-generic"
                                v-for="(item, index) in images" :key="index"
                                :data-slide-to="index" :class="{'action': !index}"></li>
                        </ol>

                        <!-- Wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                            <div v-for="(item, index) in images" :key="index" :class="['item', {'active': !index}]">
                                <img class="img-responsive center-block" :src="item" alt="Responsive image"/>
                                <div class="carousel-caption"></div>
                            </div>
                        </div>

                        <!-- Controls -->
                        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Home',

    data() {
      return {
        images: [],
        requestBody: {
          url: 'https://instagram.com/yuihorie_official?igshid=rnvm0zflrsdb',
        },
      };
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
          this.images = res.data;
        });
      },

    },

    // 创建完毕
    created() {
      this.getInsImgList();
    },
  }
</script>

<style>

</style>
