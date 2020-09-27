<template>
  <div class="regist flexcentercenter">
    <div class="popupWindow flexzxlist">
      <h1>欢迎注册</h1>
      <div class="inputbox">
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="8-24位，字母/数字组合密码"
              clearable
            />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="请再次输入密码"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-col :span="16" style="margin-right: 45px;">
              <el-input v-model="ruleForm.imgpassword" placeholder="请输入图形验证码" clearable />
            </el-col>
            <el-col :span="4" class="yzm">feds</el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="16" style="margin-right: 45px;">
              <el-input v-model="ruleForm.phoneCode" placeholder="请输入手机验证码" clearable />
            </el-col>
            <el-col :span="4">
              <!-- <button
                class="btns"
                :class="{disabled: !this.canClick}"
                @click="countDown"
              >{{ content }}</button> -->
              <button :disabled="computeTime>0" class="btns"
                      @click.prevent="sendCode">
                {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ruleForm.inviteCode" placeholder="请输邀请码（选填）" clearable />
          </el-form-item>
          <el-form-item>
            <div>
              <el-checkbox v-model="checked" size="medium" />我已阅读并接受《
              <a class="regm-left" @click="goTo('/footer/user')">用户协议</a>》
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="btnstj"
              :class="{disabled: !checked}"
              @click="submitForm('ruleForm')"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>已经有账号<a class="regm-left" @click="goTo('/log')">去登陆</a></div>
    </div>
  </div>
</template>

<script>
import { isvalidatemobile, isPassword } from '../../assets/js/validate'
import { reqCode, reqSmsLogin } from '../../api'
import {RECEIVE_USER} from '../../store/mutation-types' // 存储用户信息
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
    const validatePass = (rule, value, callback) => {
      if (value != '') {
        if (!isPassword(value)) {
          callback(new Error('请输入8-24位，字母/数字组合密码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      checked: true, // 单选
      computeTime: 0, // 倒计时剩余的时间
      ruleForm: {
        phone: '',
        password: '',
        checkPass: '', // 再次输入密码
        imgpassword: '', // 图形验证码
        phoneCode: '', // 短信验证码
        inviteCode: '' // 邀请码
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: istel, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
    }
  },
  created() {
  },
  methods: {
    // 注册接口
    async zc (){
      let that = this
      const { inviteCode, password, phone, phoneCode } = that.ruleForm
      console.log(inviteCode, password, phone, phoneCode);
      let result = await reqSmsLogin({inviteCode, password, phone, phoneCode})
      if(result.code==200){
      const user = result.data.user
      const token = result.data.token
      // 保存user(vuex的state中)
      that.$store.commit(RECEIVE_USER, user) // 查找所有vuex模块中的mutation调用
      that.$store.commit(RECEIVE_USER, token)
      this.$router.push('/index')
      // 跳转到个人中心
      // this.$router.replace('/profile')
        // that.goTo('/index')
      }else{
          that.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
    // 注册
    submitForm(formName) {
      let that = this
      if (!that.checked) {
        that.$message({
          message: '请勾选用户协议',
          type: 'warning'
        })
        return
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            that.zc()
          } else {
            that.$message.error('注册失败');
            return false
          }
        })
      }
    },
    goTo(path) {
      // 编程式路由跳转
      this.$router.replace(path)
    },
    /*发送短信验证*/
    async sendCode () {
      // alert('----')
      this.computeTime = 60
      // 启动循环定时器, 每隔1s, 将计时减1
      const intervalId = setInterval(() => {
        // 一旦变为了0, 停止计时
        if(this.computeTime===0) {
          clearInterval(intervalId)
        } else {
          this.computeTime--
        }

      }, 1000)
    const {phone} = this.ruleForm
    let type =0
      // 请求发送验证码
      const result = await reqCode({phone, type})
      if(result.code === 200) { // 成功
        this.$message({
        message: '发送短信验证码成功',
        type: 'success'
      });
      } else { //失败
        // 停止计时
        clearInterval(this.intervalId)
        this.computeTime = 0
        this.$message.error('发送短信验证码失败');
      }
    },
  }
}
</script>

<style lang="scss" scoped="">
.popupWindow {
  width: 600px;
  height: 736px;
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
