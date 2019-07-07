<template>
    <div class="home">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <!--<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">-->
                        <!--&lt;!&ndash; Indicators &ndash;&gt;-->
                        <!--<ol class="carousel-indicators">-->
                            <!--<li data-target="#carousel-example-generic"-->
                                <!--v-for="(item, index) in images" :key="index"-->
                                <!--:data-slide-to="index" :class="{'action': !index}"></li>-->
                        <!--</ol>-->

                        <!--&lt;!&ndash; Wrapper for slides &ndash;&gt;-->
                        <!--<div class="carousel-inner" role="listbox">-->
                            <!--<div v-for="(item, index) in images" :key="index" :class="['item', {'active': !index}]">-->
                                <!--<img class="img-responsive center-block" :src="item" alt="Responsive image"/>-->
                                <!--<div class="carousel-caption"></div>-->
                            <!--</div>-->
                        <!--</div>-->

                        <!--&lt;!&ndash; Controls &ndash;&gt;-->
                        <!--<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">-->
                            <!--<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>-->
                            <!--<span class="sr-only">Previous</span>-->
                        <!--</a>-->
                        <!--<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">-->
                            <!--<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>-->
                            <!--<span class="sr-only">Next</span>-->
                        <!--</a>-->
                    <!--</div>-->

                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div v-for="(item, index) in images" :key="index" class="swiper-slide">
                                <img class="img-responsive center-block swiper-lazy" :data-src="item" alt="Responsive image"/>
                            </div>
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>

                        <!-- 如果需要导航按钮 -->
                        <!--<div class="swiper-button-prev"></div>-->
                        <!--<div class="swiper-button-next"></div>-->

                        <!-- 如果需要滚动条 -->
                        <!--<div class="swiper-scrollbar"></div>-->
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

        swiper: '',
        swiperConfig: {
          // direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项
          runCallbacksOnInit : false, //初始化时不触发slideChange
          autoplay: true, //可选选项，自动滑动
          grabCursor: true, // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
          autoHeight: true, //高度随内容变化
          // init: false, // 禁止初始化
          preloadImages: false, // Swiper强制加载所有图片
          updateOnImagesReady: true, // 当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化。使用此选项需要先开启preloadImages: true
          lazy: {
            loadPrevNext: true, // 设为true开启图片延迟加载默认值，使preloadImages无效。或者设置延迟加载选项。
          },

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          //
          // // 如果需要前进后退按钮
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // },
          //
          // // 如果需要滚动条
          // scrollbar: {
          //   el: '.swiper-scrollbar',
          // },
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
          this.$nextTick(() => {
            // DOM更新了
            // swiper重新初始化
            /* eslint-disable no-new */
            new Swiper('.swiper-container', this.swiperConfig);
          });
        });
      },

      /* ------ Swiper -------- */
      creatSwiper() {
        this.swiper = new Swiper('.swiper-container', this.swiperConfig);
      },
    },

    // 创建完毕
    created() {
      this.getInsImgList();
    },

    // 挂载完成
    mounted() {
      this.creatSwiper();
    }
  }
</script>

<style>
</style>
