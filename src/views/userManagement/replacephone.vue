<template>
  <div class="password">
    <Head></Head>
    <div class="psdmanage">
      <div class="tits">更换手机</div>
      <div class="form"  v-if="change">
        <el-form ref="form" :model="form" label-width="96px">
          <el-form-item label="原手机">
            <el-input v-model="form.oldphone" placeholder="请输入原手机" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.oldPhoneCode" placeholder="请输入验证码">
              <template slot="append">
                  <span  @click.prevent="sendCode(form.oldphone)"><a href="javascript:;"> {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}</a></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="netx" style="background: #1476fe;">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form" v-else>
        <el-form ref="form" :model="newform" label-width="96px">
          <el-form-item label="新手机">
            <el-input v-model="newform.phone" placeholder="请输入新手机" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="newform.phoneCode" placeholder="请输入验证码">
              <template slot="append">
                  <span  @click.prevent="sendCode(newform.phone)"><a href="javascript:;"> {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}</a></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="forget" style="background: #1476fe;">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from './head.vue'
  import {updatePhone,reqCode } from '../../api'
  export default {
    components: {
      Head
    },
    data() {
      return {
        computeTime: 0, // 倒计时剩余的时间
        change:true,
        form: {
          oldphone: '',
          oldPhoneCode: '',
        },
        newform:{
          phone: '',
          phoneCode: '',
        }
      };
    },
    created() {

    },
    methods: {
      netx(){
       this.change = false
       this.computeTime = 0
      },
      // 修改手机号
      async forget(index){
        let that = this
        const { phoneCode, phone } = that.newform
        const {oldPhoneCode} = that.form
        let result = await updatePhone ({oldPhoneCode,  phone, phoneCode })
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
      async sendCode (phone) {
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
