<template>
  <div class="password">
    <Head></Head>
    <div class="psdmanage">
      <div class="tits">{{title}}</div>
      <ul class="navs"v-if="modifylist">
        <li>
          <div class="tps">
            <h2>登录密码</h2>
            <h4>用于网站登录、客户终端登录时进行校验</h4>
          </div><span class="orange" @click="modify(1)" >修改</span>
        </li>
        <li>
          <div class="tps">
            <h2>交易密码</h2>
            <h4>用于交易、提币时进行安全认证</h4>
          </div><span class="orange" @click="modify(2)">设置</span>
        </li>
      </ul>
      <div class="form" v-else>
        <el-form ref="form" :model="form" label-width="96px">
  <!--        <el-form-item label="原密码">
            <el-input v-model="form.oldPassword" placeholder="请输入原密码" clearable type="password"/>
          </el-form-item> -->
          <el-form-item label="新密码">
            <el-input v-model="form.newPassword" placeholder="请输入新密码" clearable type="password" />
          </el-form-item>
          <el-form-item label="再次输入">
            <el-input v-model="form.repeatPassword" placeholder="请再次输入新密码" clearable type="password"/>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.phoneCode" placeholder="请输入验证码" clearable>
              <template slot="append">
                <span  @click.prevent="sendCode"><a href="javascript:;"> {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}</a></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" style="background: #1476fe;">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from './head.vue'
  import {mapState} from 'vuex'
  import {reqCode ,modificationforget,repeatforget} from '../../api'
  export default {
    components: {
      Head
    },
    data() {
      return {
        computeTime: 0, // 倒计时剩余的时间
        modifylist:true,
        title:'密码管理',
        form: {
          newPassword: '',
          // oldPassword: '',
          phoneCode: '',
          repeatPassword:'',
        },
      };
    },
    created() {
    },
    computed: {
      ...mapState({
        user:state => state.user.user
      }),
    },
    methods: {
      // 修改密码
      async forget(index){
        let that = this
        let result = {}
        const { newPassword ,phoneCode,repeatPassword } = that.form
        if(index==1){
          result = await modificationforget ({newPassword ,phoneCode,repeatPassword })
        }else{
          let transactionPassword = that.form.newPassword
          result = await repeatforget ({transactionPassword ,phoneCode,repeatPassword })
        }
        if(result.code==200){
          that.$message({
            message:'修改成功',
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
        let type =0
        let phone = this.user.phone
        console.log(11111,phone)
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
      
    // 提交
    submitForm(formName) {
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.title == '修改登录密码'){
            this.forget(1)
          }else{
            this.forget(2)
          }
          
        } else {
          return false
        }
      })
    },
      modify(index){
        this.modifylist=false
        if(index==1){
          this.title = '修改登录密码'
          
        }else{
          this.title = '设置交易密码'
        }
      }
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
      .el-input-group__append{
        background: #031937;
      }
      .tits {
        width: 100%;
        padding: 20px 0;
        text-indent: 20px;
        font-size: 14px;
        color: #1476FE;
        background: #041f43;
        margin-top: 5px;
      }

      .navs {
        width: 100%;

        li {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 100%;
          border-bottom: 1px solid #262f3c;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 25px 0;

          .tps {
            padding-left: 20px;
            -ms-flex-item-align: center;
            align-self: center;

            h2 {
              font-size: 14px;
              color: #fff;
            }

            h4 {
              font-size: 12px;
              color: #787d87;
              padding-top: 15px;
            }
          }

          span {
            -ms-flex-item-align: center;
            align-self: center;
            padding-right: 30px;
            cursor: pointer;
            font-size: 14px;
          }

          .orange {
            color: #1476FE !important;
          }
        }
      }

      .form {
        margin-top: 40px;
        margin-left: 130px;

        .el-form {
          .el-form-item {
            margin-bottom: 20px;

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
                background-color: #031937 !important;
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
