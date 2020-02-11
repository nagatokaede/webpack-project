<template>
    <div class="fiction">
        <div class="container">
            <div class="row">
                <div class="col-xs-6 col-lg-4">
                    <router-link to="fiction/sisterLife_01/01">
                        <img :src="ossPath + images.sisterLife_1" alt="妹妹人生（上）" class="img-thumbnail">
                    </router-link>
                </div>

                <div class="col-xs-6 col-lg-4">
                    <img :src="ossPath + images.sisterLife_2" alt="妹妹人生（下）" class="img-thumbnail">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'fiction',

    data() {
      return {
        ossPath: '//nagato-oss.oss-cn-hongkong.aliyuncs.com/WebApp/Images/%E3%81%84%E3%82%82%E3%83%BC%E3%81%A8%E3%82%89%E3%81%84%E3%81%B5/',
        images: {
          sisterLife_1: '00.jpeg',
          sisterLife_2: '20.jpeg',
        },
      };
    },
  };
</script>

<style>

</style>
