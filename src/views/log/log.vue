<template>
  <div class="regist flexcentercenter">
    <div class="popupWindow flexzxlist">
      <h1>我要登录</h1>
      <div class="inputbox">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" clearable />
          </el-form-item>
          <el-form-item>
            <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" clearable />
          </el-form-item>
          <el-form-item>
            <div class="yzm-box flexcenter">
              <el-input v-model="ruleForm.phoneCode" placeholder="请输入图形验证码" style="width: 304px;" clearable />
              <div class="yzm">fefds</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btns"
              @click="submitForm('ruleForm')"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="inputbox">
      </div>
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
  import {
    isvalidatemobile
  } from '../../assets/js/validate'
  import { reqTelLogin } from '../../api'
  // import { RECEIVE_USER, TOKEN_USER } from '../../store/mutation-types' // 存储用户信息
export default {
  data() {
    const istel = (rule, value, callback) => {
      if (value != '') {
        if (!isvalidatemobile(value)) {
          callback(new Error('请输入正确手机格式'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      ruleForm:{
        phone:'',
        password:'',
        phoneCode:''
      },
      rules: {
        phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: istel,
            trigger: 'blur'
          }
        ],
      },
    }
  },
  created() {
 
  },
  methods: {
    goTo(path) {
      // 编程式路由跳转
      this.$router.replace(path)
    },
    submitForm(){
      const { password, phone,phoneCode} = this.ruleForm;
      let params = {
        password:password,
        phone:phone,
        phoneCode:phoneCode,
      }
      this.$store.dispatch('Login', params)
      this.$router.push('/index')
      // let result = await reqTelLogin({ password, phone})
      // if(result.code==200){
      //   const user = result.data.user
      //   const token = result.data.token
      // // 保存user(vuex的state中)
      // 
      // this.$store.commit(RECEIVE_USER, user) // 查找所有vuex模块中的mutation调用
      // // this.$store.commit(TOKEN_USER, token)
      // // localStorage.setItem("user", user);
      // localStorage.setItem("token", token);
      // localStorage.setItem("hasLoginlist", false);
      // // 跳转到首页
      // this.$router.push('/index')
      // window.location.reload();
      // }else{
      //     this.$message({
      //     message: result.msg,
      //     type: 'error'
      //   })
      // }
    }
  }
}
</script>

<style lang="scss">
.popupWindow {
  width: 600px;
  height: 500px;
  background: #ffffff;
  border-radius: 8px;
  justify-content: space-evenly;
  .el-form-item {
    margin-bottom: 10px;
}
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
