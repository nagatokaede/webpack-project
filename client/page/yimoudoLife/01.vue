<template>
    <div class="sister-life-01 fiction-content">
        <div class="container">
            <div class="row">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div v-for="(item, index) in data" :key="index" :class="['swiper-slide col-xs-12', {'col-lg-6': item.size === 'narrow'}]">
                            <div v-if="item.type === 'img'">
                                <img :data-src="item.content" class="img-responsive center-block swiper-lazy" alt="Responsive image">
                            </div>

                            <div v-if="item.type === 'article'">
                                <div class="content">
                                    这不是将一生奉献给谁的故事。<br/>
                                    人生的道路不管走到哪里，都只能是自己的路。<br/>
                                    不论如何抉择，不论觉得这些有多好，或者被多么沉重的事物攀附，<br/>
                                    全都是我在活著的过程中得到的，属于我的东西。<br/>
                                    因此，只要妹妹能漾起愉快的笑脸，大部分的事我都能以「随便啦」带过。<br/>
                                    这就是我注定会走上的路吧。<br/>
                                    而且，必须经过相当长的时间才能发现，<br/>
                                    这种近乎草率的随便态度将会左右自己的一生。<br/>
                                    但就算发现了，整个世界也早已建构完毕，没办法进行任何修改了。<br/>
                                    所以，我们也只能继续以这样的方式生活下去。<br/>
                                    这本书就是这样的故事。<br/>
                                </div>
                            </div>
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
</template>

<script>
  import img_01 from '../../asset/images/yimoudo/01/1.jpeg';
  import img_02 from '../../asset/images/yimoudo/01/2.jpeg';
  import img_03 from '../../asset/images/yimoudo/01/3.jpeg';
  import img_04 from '../../asset/images/yimoudo/01/4.jpeg';
  import img_05 from '../../asset/images/yimoudo/01/5.jpeg';
  export default {
    name: 'sisterLife01',

    data() {
      return {
        data: [
          {
            type: 'img',
            size: 'narrow',
            content: img_05,
          },
          {
            type: 'article',
            size: 'narrow',
            content: '',
          },
          {
            type: 'img',
            size: 'wide',
            content: img_04,
          },
          {
            type: 'img',
            size: 'wide',
            content: img_03,
          },
          {
            type: 'img',
            size: 'wide',
            content: img_02,
          },
          {
            type: 'img',
            size: 'narrow',
            content: img_01,
          },
        ],

        swiper: '',
        swiperConfig: {
          // direction: 'vertical', // 垂直切换选项
          initialSlide: 0, // 设定初始化时slide的索引。
          loop: false, // 循环模式选项
          runCallbacksOnInit : false, //初始化时不触发slideChange
          autoplay: false, //可选选项，自动滑动
          grabCursor: true, // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
          // autoHeight: true, //高度随内容变化
          // init: false, // 禁止初始化
          preloadImages: false, // Swiper强制加载所有图片
          updateOnImagesReady: true, // 当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化。使用此选项需要先开启preloadImages: true
          lazy: {
            loadPrevNext: true, // 设为true开启图片延迟加载默认值，使preloadImages无效。或者设置延迟加载选项。
          },
          slidesPerView: 'auto', // 一行显示个数，auto 自动判断
          slidesPerColumn: 1, // 显示2行

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

      /* ------ api 调用 -------- */

      /* ------ Swiper -------- */
      creatSwiper() {
        this.swiperConfig.initialSlide = this.data.length - 1;
        this.swiper = new Swiper('.swiper-container', this.swiperConfig);
      },
    },

    // 创建完毕
    created() {
    },

    // 挂载完成
    mounted() {
      this.creatSwiper();
    }
  };
</script>

<style>
    div.fiction-content {
        font-size: 18px;
        padding: 20px 40px 40px 40px;
        color: #333;
    }
    div.fiction-content  h1 {
        font-size: 1.8em;
        margin: .5em 0;
        text-align: center;
        font-weight: normal;
    }
    div.fiction-content .content {
        margin: 1em;
        text-indent: 2em;
        line-height: 1.8;
        writing-mode: vertical-rl;
    }

    .swiper-container {
        width: 100%;
        min-height: 100vh;
    }
</style>
