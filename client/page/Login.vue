<template>
    <div id="login">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <h2>輝きの庭へようこそ</h2>
                    <p>没有账号？ <router-link to="register">注册</router-link></p>
                </div>

                <form class="col-md-8 col-xs-12">
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <input type="text" class="form-control" placeholder="用户名" v-model="requestBody.userName">
                    </div>
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <input type="password" class="form-control" autocomplete="off" placeholder="密码" v-model="requestBody.password">
                    </div>
                    <div class="col-xs-12 checkbox" style="padding-bottom: 20px;">
                        <label>
                            <input type="checkbox" v-model="remember"> 记住账号密码
                        </label>
                    </div>
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-block" @click="login">登录</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',

    data() {
      return {
        requestBody: {
          userName: localStorage[ 'login-userName' ] ? localStorage[ 'login-userName' ] : '',
          password: localStorage[ 'login-password' ] ? localStorage[ 'login-password' ] : '',
        },
        remember: localStorage[ 'login-remember' ] ? Boolean(localStorage[ 'login-remember' ]) : false,
      };
    },

    methods: {
      /* -------- api ---------- */
      userLogin(body) {
        return new Promise((resolve, reject) => {
          this.$axios.userLogin(body).then(res => {
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
      login() {
        this.userLogin(this.requestBody).then((res) => {
          if (this.remember) {
            localStorage[ 'login-userName' ] = this.requestBody.userName;
            localStorage[ 'login-password' ] = this.requestBody.password;
            localStorage[ 'login-remember' ] = this.remember;
          }
          this.$store.userInfo = res.message;
          this.$router.push('/');
        });
      },

      /* -------- 工具 ---------- */

    }
  }
</script>

<style>

</style>