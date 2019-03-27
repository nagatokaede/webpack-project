<template>
    <div id="header">

        <nav class="navbar navbar-default">
            <div class="container">
            <div class="container-fluid">

                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <router-link class="navbar-brand" to="home">
                        <img alt="楓" :src="icon" style="width: 20px; height: auto;">
                    </router-link>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <p class="navbar-text text-center navbar-right">
                        <a v-if="userInfo" @click="logout">{{ userInfo.nickName }}</a>
                        <router-link v-else to="login">輝きの庭へようこそ</router-link>
                    </p>

                    <ul class="nav navbar-nav navbar-right">
                        <li><router-link class="text-center" to="tool">Tool</router-link></li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li><router-link class="text-center" to="leaveMessage">留言</router-link></li>
                    </ul>
                </div><!-- /.navbar-collapse -->

            </div><!-- /.container-fluid -->
            </div>
        </nav>

    </div>
</template>

<script>
  import icon from '../asset/images/kaede.png';
  export default {
    name: "Header",

    data() {
      return {
        icon,
      }
    },

    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      },
    },

    methods: {
      logout() {
        this.$store.commit('setUserInfo');
        this.$router.push('/login');
      }
    }
  }
</script>

<style>

</style>
