<template>
    <div class="register">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-xs-12">
                    <div class="col-xs-12">
                        <h2>輝きの庭へようこそ</h2>
                        <p>已有账号？ <router-link to="login">登录</router-link></p>
                    </div>
                </div>

                <form class="col-md-8 col-xs-12">
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <input type="text" class="form-control" placeholder="昵称" v-model="requestBody.nickName">
                    </div>
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <input type="text" class="form-control" placeholder="用户名" v-model="requestBody.userName">
                    </div>
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <input type="password" class="form-control" autocomplete="off" placeholder="密码" v-model="requestBody.password">
                    </div>
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <input type="password" class="form-control" autocomplete="off" placeholder="确认密码" v-model="requestBody.rePassword">
                    </div>
                    <div class="col-xs-12" style="padding-bottom: 20px;">
                        <button type="button" class="btn btn-primary btn-block" @click="register">注册</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Register',

    data() {
      return {
        requestBody: {
          nickName: '',
          userName: '',
          password: '',
          rePassword: ''
        },
      };
    },

    methods: {
      /* -------- api ---------- */
      userRegister(body) {
        return new Promise((resolve, reject) => {
          this.$axios.userRegister(body).then(res => {
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
      register() {
        if (this.requestBody.password === this.requestBody.rePassword) {
          this.userRegister(this.requestBody).then(() => {
            this.$router.push('/login');
          });
        } else {
          alert('两次密码不相同！');
        }
      },

      /* -------- 工具 ---------- */

    }
  }
</script>

<style>

</style>