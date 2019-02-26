<template>
    <div id="app">
        <header-component></header-component>
        <router-view></router-view>
    </div>
</template>

<script>
  import HeaderComponent from './component/Header.vue';

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
    }
  };
</script>

<style>

</style>