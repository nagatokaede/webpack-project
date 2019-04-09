<template>
    <div class="fiction">
        <div class="container">
            <div class="row">
                <div class="col-xs-6 col-lg-4">
                    <router-link to="fiction/sisterLife_01/01">
                        <img :src="images.sisterLife_1" alt="妹妹人生（上）" class="img-thumbnail">
                    </router-link>
                </div>

                <div class="col-xs-6 col-lg-4">
                    <img :src="images.sisterLife_2" alt="妹妹人生（下）" class="img-thumbnail">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import sisterLife_1 from '../asset/images/yimoudo/01/0.jpeg';
  import sisterLife_2 from '../asset/images/yimoudo/02/96017.jpeg';
  export default {
    name: 'fiction',

    data() {
      return {
        images: {
          sisterLife_1,
          sisterLife_2,
        },
      };
    },
  };
</script>

<style>

</style>