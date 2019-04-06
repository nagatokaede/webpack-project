<template>
    <div id="app">
        <header-component></header-component>
        <router-view></router-view>
    </div>
</template>

<script>
  import HeaderComponent from './component/Header.vue';
  import icon from './asset/images/kaede.png';

  export default {
    name: 'App',

    components: {
      HeaderComponent,
    },

    data() {
      return {
        test: 'hello world!',
        content: this.$route
      };
    },

    methods: {
      linkIcon() {
        const link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = icon;
        link.type = 'image/png';

        const head = document.getElementsByTagName("head")[0];
        head.appendChild(link);
      },

      reLocation() {
        console.log(window.location.hostname);
        if (window.location.hostname === 'nagato.top')
          window.location.href='https://kaede.nagato.top';
      },
    },

    created() {
      this.reLocation();
    },

    // 挂载结束
    mounted() {
      this.linkIcon();
    }
  };
</script>

<style>

</style>