<template>
  <div class="regist flexcentercenter">
    <div class="popupWindow flexzxlist">
      <h1>重置密码</h1>
      <div class="inputbox">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入手机号码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="16" style="margin-right: 45px;">
              <el-input v-model="ruleForm.imgpassword" placeholder="请输入图形验证码" clearable></el-input>
            </el-col>
            <el-col :span="4" class="yzm">feds</el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="16" style="margin-right: 45px;">
              <el-input v-model="ruleForm.code" placeholder="请输入手机验证码" clearable></el-input>
            </el-col>
            <el-col :span="4">
              <button
                class="btns"
                @click="countDown"
                :class="{disabled: !this.canClick}"
              >{{content}}</button>
            </el-col>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="8-24位，字母/数字组合密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              placeholder="请再次输入密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              class="btnstj"
              :class="{disabled: !checked}" 
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>已经有账号<a class="regm-left" @click="goTo('/log')">去登陆</a></div>
    </div>
  </div>
</template>

<script>
import { isvalidatemobile, isPassword } from "../../assets/js/validate";
export default {
  data() {
    const istel = (rule, value, callback) => {
      if (value != "") {
        if (!isvalidatemobile(value)) {
          callback(new Error("请输入正确手机格式"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value != "") {
        if (!isPassword(value)) {
          callback(new Error("请输入8-24位，字母/数字组合密码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      checked: true, // 单选
      ruleForm: {
        tel: "",
        pass: "",
        checkPass: "",
        imgpassword: "",
        code: "",
        invite: ""
      },
      rules: {
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: istel, trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      canClick: true, //添加canClick
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60 //记录具体倒计时时间
    };
  },
  created() {},
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goTo(path) {
      // 编程式路由跳转
      this.$router.replace(path);
    },
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      this.canClick = false;
      this.content = this.totalTime + "s后重发";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重发";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重发送验证码";
          this.totalTime = 10;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped="">
.popupWindow {
  width: 600px;
  height: 630px;
  background: #ffffff;
  border-radius: 8px;
  justify-content: space-evenly;
  h1 {
    text-align: center;
    font-size: 27px;
    color: #313131;
  }
  .btns {
    width: 101px;
    height: 50px;
    background: #1476fe;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 8px;
  }
  .btnstj {
    width: 440px;
    height: 60px;
    background: #1476fe;
  }
  .disabled {
    background-color: #57a3f3;
    border-color: #57a3f3;
    color: #fff;
    cursor: not-allowed; // 鼠标变化
  }
  .inputbox {
    width: 440px;
  }
  .el-checkbox:last-of-type {
    margin-right: 10px;
  }
}
</style>
