<template>
  <div class="solutions  flexzxlist">
    <div class="rebate-content" v-if="this.token =='' || this.token==undefined">
        <h1>返佣收益：邀请用户注册并在平台成功下单交易的用户，可获得一定佣金奖励。</h1>
        <h2>Autex返佣规则：</h2>
        <h3>1、合伙人：</h3>
        <h4>返佣等级：</h4>
        <p>返佣比例50%：团队直属超级节点人数低于10人，或团队累计手续费佣金低于15万；</p>
        <p>返佣比例60%：团队直属超级节点人数10-20人，或团队累计手续费佣金15万-30万；</p>
        <p>返佣比例70%：团队直属超级节点人数20人以上，或团队累计手续费佣金大于30万。</p>
        <h3>2、超级节点：</h3>
        <h4>返佣等级：</h4>
        <p>返佣比例40%：累计手续费佣金低于1.5万；</p>
        <p>返佣比例50%：累计手续费佣金1.5万-3万；</p>
        <p>返佣比例60%：累计手续费佣金大于3万</p>
        <h3>3、普通用户：</h3>
        <p>推荐新用户注册享返佣10%</p>
        <p>结算时间：次日1点返前一日佣金</p>
        <p>返佣内容：交易手续费</p>
        <p>有效用户：用户注册成功并在平台成功下单的交易用户，即为有效用户。</p>
        <div class="logoin" @click="logoin">您还未登录，<span>马上去登录</span></a></div>
    </div>
    <div class="solutions-center" v-else>
      <div class="sol-top sol-bg flexcenter">
        <div class="solt-left flexcenterlist">
          <div class="soltle-yq">
            <h1>我的专属二维码</h1>
            <div class="solte-ma flexzx">
              <vue-qr :text="userInvite" :size="200"></vue-qr>
              <div>
                <img src="../images/logo.png" class="imgma1"></img>
                <p>专业可靠的资产交易平台</p>
              </div>

            </div>
          </div>
          <div class="solte-connection ">
            <div class="soltec-left">
              <h2>我的专属邀请码</h2>
              <div class="invite flexcenterlist">
                <div class="invite-left">
                  {{user.code}}
                </div>
                <div class="invite-right">
                    <el-button type="primary" class="jys-btns"  
                      v-clipboard:copy="user.code"  
                      v-clipboard:success="onCopy" 
                      v-clipboard:error="onError"
                    >点击复制</el-button>
                </div>
              </div>
            </div>
            <div class="soltec-left">
              <h2>我的专属邀请链接</h2>
              <div class="invite flexcenterlist">
                <div class="invite-left">
                  {{userInvite}}
                </div>
                <div class="invite-right">
                    <el-button type="primary" class="jys-btns" 
                      v-clipboard:copy="userInvite" 
                      v-clipboard:success="onCopy" 
                      v-clipboard:error="onError"
                    >点击复制</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="solt-line" />
        <div class="solft-bg">
          <div class="solut-rebate">
            <h1>获得返佣（USDT）</h1>
            <P>{{myTeam.refereeAmount}}</P>
          </div>
          <div class="solut-invite">
            <el-row>
              <el-col :span="12">
                <h1>邀请人数(含间接邀请）</h1>
                <P>{{refereeTotal}}</P>
              </el-col>
              <el-col :span="1" style="height: 210px;background: #010e20;width: 3px;" />
              <el-col :span="9">
                <h1>返佣比例</h1>
                <P>0.00</P>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="sol-top soltop-bg">
        <el-row class="tit">
          <el-col v-for="(item,index) in invite" :key="index" :span="12">
            <span :class="{active:active==index}" @click="tabcut(index)">{{ item.name }}</span>
          </el-col>
        </el-row>
        <div v-if="!active" class="tab1">
          <el-row class="tits">
            <el-col :span="12"><span>被邀请人的账号</span></el-col>
            <el-col :span="12"><span>邀请时间</span></el-col>
          </el-row>
          <el-row v-for="(item,index) in account" :key="index" class="titslist">
            <el-col :span="12"><span>{{ item.phone }}</span></el-col>
            <el-col :span="12"><span>{{ timestampToTime(item.createTime) }}</span></el-col>
          </el-row>
        </div>
        <div v-else class="tab1">
          <el-row class="tits">
            <el-col :span="12"><span>被邀请人的账号</span></el-col>
            <el-col :span="12"><span>返佣</span></el-col>
          </el-row>
          <el-row v-for="(item,index) in account" :key="index" class="titslist">
            <el-col :span="12"><span>{{ item.name }}</span></el-col>
            <el-col :span="12"><span>{{ item.time }}</span></el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRefeRee,
  refereeTotal,
  userInvite,
  myTeam
} from '@/api'
import {timestampToTime} from '@/assets/js/time.js'
import { mapState } from 'vuex'
import vueQr from 'vue-qr'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
export default {
  data() {
    return {
      refereeTotal:0, // 邀请人数
      userInvite :'',// 邀请连接
      myTeam:{}, // 返佣
      timestampToTime:timestampToTime,
      invite: [{
        name: '邀请记录'
      }, {
        name: '返佣记录'
      }],
      account: [{ name: '188****6890', time: '2020-08-20 16:47:03' }, { name: '188****1234', time: '2020-08-20 16:47:03' }],
      active: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      token: state => state.user.token,
    })
  },
  // 二维码
  components: { vueQr },
  created() {
    // if(this.token =='' || this.token==undefined){
    //   this.$router.push('/log')
    // }
    this.getRefeRee()
  },
  methods: {
    logoin(){
      this.$router.push('/log')
    },
    // 复制成功时的回调函数
    onCopy (e) {
       this.$message.success("内容已复制到剪切板！")
    },
    // 复制失败时的回调函数
    onError (e) {
       this.$message.error("抱歉，复制失败！")
    },
    // 我的邀请
    async getRefeRee() {
      const result = await getRefeRee()
      const resultlist = await refereeTotal()
      const reslist = await myTeam()
      let type = 2
      const res = await userInvite(type)
      if (result.code == 200 || resultlist.code == 200) {
        this.account=result.data
        this.refereeTotal = resultlist.data
        this.userInvite = res.data
        this.myTeam = reslist.data
      } else {
        that.$message({
          message: result.msg,
          type: 'error'
        })
      }
      
    },

    // tabs切换
    tabcut(index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped="">
  .solutions {
    height: 1177px;
    background: #010E20;
    color: #fff;
    .active{
      width: 120px;
      border-bottom:3px solid #1476FE;
      color: #1476FE;
    }
    .rebate-content{
      width: 900px;
      height: 100%px;
      background: #031937;
      padding: 70px;
      .logoin{
        cursor:pointer;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        padding-top: 40px;
        span{
          font-weight: bold;
          color: #1476fe;
        }
      }
      p{
        padding: 10px 40px;
      }
      h1{
        font-size: 22px;
        font-weight: bold;
      }
      h2{
        font-size: 20px;
        padding: 30px 20px 0;
      }
      h3{
        font-size: 18px;
        padding: 15px 20px;
      }
      h4{
        font-size: 16px;
        padding: 10px 30px;
      }
    }
    .solutions-center {
      .sol-top {
        width: 1200px;
        height: 500px;
        background: #02142d;

        .solt-left {
          width: 660px;
          height: 420px;
          background: #031937;

          .solte-ma {
            width: 199px;
            height: 225px;
            background: url(../images/yq.png) no-repeat;
            background-size: cover;
            text-align: center;
            align-items: center;

            img {
              width: 105px;
              height: 105px;
              padding: 10px 0;
            }

            .imgma1 {
              width: 74px;
              height: 27px;
            }

            P {
              color: #005AAA;
              font-size: 9px;
            }
          }

          .soltle-yq {
            h1 {
              font-size: 18px;
              padding: 20px 0;
              text-align: center;
            }
          }

          .solte-connection {
            width: 400px;

            .soltec-left {
              h2 {
                font-size: 16px;
                padding: 20px 0;
              }
              .invite{
                .invite-left{
                  width: 100%;
                  padding: 20px 10px;
                  border: 1px solid #30425b;
                  border-radius: 4px;
                  text-align: center;
                  word-break: break-all;
                  margin: 0 15px;
                }
              }
            }
          }
        }

        .solt-line {
          width: 5px;
          background: #010e20;
          height: 100%;
        }

        .solft-bg {
          background: url(../images/solftbg.png) no-repeat;
          background-size: cover;
          width: 490px;
          height: 420px;
          .solut-rebate {
            height: 208px;
          }

          h1 {
            padding: 30px 20px;
            font-size: 18px;
          }

          p {
            padding: 10px 20px;
            color: #1476FE;
            font-size: 48px;
          }
        }
      }

      .sol-bg {
        height: 420px;
        background: #031937;
        // display: flex;
      }

      .soltop-bg {
        .tit{
          text-align: center;
          span{
            display: inline-block;
            padding: 25px 0;
            font-size: 13px;
          }
        }
        .tab1{
          height: 400px;
          overflow: auto;
          span{
            display: inline-block;
            padding: 25px 0;
            font-size: 13px;
          }
          .tits{
            // position: fixed;
            text-align: center;
            border-bottom:2px dashed #16263d;
          }
          .titslist{
            text-align: center;
            border-bottom:2px solid #16263d;
          }
        }
      }
    }
  }
</style>
