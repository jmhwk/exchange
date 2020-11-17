<template>
  <div class="password">
    <Head></Head>
    <div class="psdmanage">
      <div class="tits">绑定邮箱</div>
      <div class="form">
        <el-form ref="form" :model="form" status-icon label-width="96px" :rules="rules">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.emailCode" placeholder="请输入邮箱验证码">
              <template slot="append">
                  <span  @click.prevent="sendCode(form.email)"><a href="javascript:;"> {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}</a></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="bindEmail('form')" style="background: #1476fe;">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from './head.vue'
  import { bindEmail,sendEmailCode } from '../../api'
  import { checkEmail } from '../../assets/js/validate'
  export default {
    components: {
      Head
    },
    data() {
      const emailPath = (rule, value, callback) => {
        if (value != '') {
          if (!checkEmail(value)) {
            callback(new Error('请输入正确邮箱地址'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        computeTime: 0, // 倒计时剩余的时间
        change:true,
        form: {
          email: '',
          emailCode: '',
        },
        rules:{
          email: [
            { message: '请输入邮箱地址', trigger: 'blur'},
            { validator: emailPath,trigger: ['blur', 'change']}
          ]
        }
      };
    },
    created() {

    },
    methods: {
      // 修改手机号
      async bindEmail(formName){
        let that = this
        const {email,emailCode} = that.form
        let result = await bindEmail ({email,emailCode})
        if(result.code==200){
          that.$message({
            message:'绑定成功',
            type: 'success'
          })
        this.$router.push('/userManagement/passwordmodify')
        }else{
            that.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      
      
      /*发送邮箱验证*/
      async sendCode (email) {
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
        let type =0  
        // 请求发送验证码
        const result = await sendEmailCode(email)
        if(result.code === 200) { // 成功
          this.$message({
          message: '发送邮箱验证码成功',
          type: 'success'
        });
        } else { //失败
          // 停止计时
          clearInterval(this.intervalId)
          this.computeTime = 0
          this.$message.error('发送邮箱验证码失败');
        }
      },
    },
  }
</script>

<style lang="scss">
  .password {
    .psdmanage {
      height: 100%;
      width: 100%;
      color: #fff;
      background: #031937;
      height: 816px;

      .tits {
        width: 100%;
        padding: 20px 0;
        text-indent: 20px;
        font-size: 14px;
        color: #1476FE;
        background: #041f43;
        margin-top: 5px;
      }
      .form {
        margin-top: 40px;
        margin-left: 130px;

        .el-form {
          .el-form-item {
            margin-bottom: 30px;
            .el-form-item__error{
              line-height: 21px;
            }
            .el-form-item__label {
              color: rgba($color: #fff, $alpha: 0.8);
              padding: 0px 20px;
              text-align: justify;
              text-align-last: justify;
            }

            .el-form-item__content {
              width: 470px;

              span {
                padding-left: 16px;

                >a {
                  font-size: 14px;
                  color: $money-blue;
                }
              }

              input {
                width: 100%;
                background-color: rgba($color: #243b5d, $alpha: 0.41);
                height: 40px !important;
              }

              .el-button {
                width: 100%;
                margin-top: 50px;
              }
            }
          }
        }
      }
    }
  }
</style>
