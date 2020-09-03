<template>
  <div class="regist flexcentercenter">
    <div class="popupWindow flexzxlist">
      <h1>我要登录</h1>
      <div class="inputbox">
        <el-input v-model="input" placeholder="请输入手机号码" clearable />
        <el-input v-model="input" placeholder="请输入密码" type="password" clearable />
        <div class="yzm-box flexcenter">
          <el-input v-model="input" placeholder="请输入图形验证码" style="width: 304px;" clearable />
          <div class="yzm">fefds</div>
        </div>
      </div>
      <el-button type="primary" class="btns">登录</el-button>
      <div class="regist-messag flexcenter">
        <div class="regm-left " @click="goTo('/password')">忘记密码</div>
        <div>
          没有账号
          <a class="regm-left" @click="goTo('/regist')">立即注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  created() {},
  methods: {
    goTo(path) {
      // 编程式路由跳转
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss" scoped="">
.popupWindow {
  width: 600px;
  height: 500px;
  background: #ffffff;
  border-radius: 8px;
  justify-content: space-evenly;
  h1 {
    text-align: center;
    font-size: 27px;
    color: #313131;
  }
  .btns {
    width: 440px;
    height: 60px;
    background: #1476fe;
  }
  .inputbox {
    width: 440px;
    .yzm-box {
      .yzm {
        width: 101px;
        height: 50px;
        background: #a5a5a5;
        color: #1476fe;
        line-height: 50px;
        text-align: center;
      }
    }
    .el-input {
      margin: 10px 0;
    }
  }
  .regist-messag {
    width: 440px;
  }
}
</style>
