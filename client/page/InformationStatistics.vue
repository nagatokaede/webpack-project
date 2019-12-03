<template>
    <div class="information-statistics">
    </div>
</template>

<script>
export default {
  name: 'InformationStatistics',

  data() {
    return {
      requestBody: {
        createBy: '匿名者',
        message: '', // 富文本内容
        style: 'default'
      },
    }
  },

  methods: {
    /* -------- api ---------- */
    informationStatisticsInsert(body) {
      return new Promise((resolve, reject) => {
        this.$axios.informationStatisticsInsert(body).then(res => {
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
    createLeaveMessage() {
      this.leaveMessageInsert(this.requestBody).then(() => {
        alert('填写成功！');
      });
    },
  },
}
</script>

<style>
</style>
