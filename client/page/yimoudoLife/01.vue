<template>
    <div class="sister-life-01 fiction-content">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-lg-6">
                    <img :src="images.img_01" class="img-responsive" alt="Responsive image">
                </div>

                <div class="col-xs-12 col-lg-12">
                    <img :src="images.img_02" class="img-responsive" alt="Responsive image">
                </div>

                <div class="col-xs-12 col-lg-12">
                    <img :src="images.img_03" class="img-responsive" alt="Responsive image">
                </div>

                <div class="col-xs-12 col-lg-12">
                    <img :src="images.img_04" class="img-responsive" alt="Responsive image">
                </div>

                <div class="col-xs-12 col-lg-6">
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

                <div class="col-xs-12 col-lg-6">
                    <img :src="images.img_05" class="img-responsive" alt="Responsive image">
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
        images: {
          img_01,
          img_02,
          img_03,
          img_04,
          img_05,
        },
      };
    },
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
</style>