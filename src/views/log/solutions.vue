<template>
  <div class="solutions  flexzxlist">
    <div class="solutions-center">
      <div class="sol-top sol-bg flexcenter">
        <div class="solt-left flexcenterlist">
          <div class="soltle-yq">
            <h1>我的专属二维码</h1>
            <div class="solte-ma flexzx">
              <img src="../images/bgright.png" class="imgma"></img>
              <div>
                <img src="../images/logo.png" class="imgma1"></img>
                <p>专业可靠的资产交易平台</p>
              </div>

            </div>
          </div>
          <div class="solte-connection ">
            <div class="soltec-left">
              <h2>我的专属邀请码</h2>
              <el-row :gutter="20">
                <el-col :span="18" class="soltecle-input">w896o367</el-col>
                <el-col :span="4">
                  <el-button type="primary" class="jys-btns" @click="copy">点击复制</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="soltec-left">
              <h2>我的专属邀请链接</h2>
              <el-row :gutter="20">
                <el-col :span="18" class="soltecle-input">https://www.boxex.io/pcact/register?rcode=w896o367</el-col>
                <el-col :span="4">
                  <el-button type="primary" class="jys-btns">点击复制</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="solt-line" />
        <div class="solft-bg">
          <div class="solut-rebate">
            <h1>获得返佣（USDT）</h1>
            <P>0.00</P>
          </div>
          <div class="solut-invite">
            <el-row>
              <el-col :span="12">
                <h1>邀请人数(含间接邀请）</h1>
                <P>0.00</P>
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
            <el-col :span="12"><span>{{ item.name }}</span></el-col>
            <el-col :span="12"><span>{{ item.time }}</span></el-col>
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
export default {
  data() {
    return {
      invite: [{
        name: '邀请记录'
      }, {
        name: '返佣记录'
      }],
      account: [{ name: '188****6890', time: '2020-08-20 16:47:03' }, { name: '188****1234', time: '2020-08-20 16:47:03' }],
      active: false
    }
  },
  created() {

  },
  methods: {
    // 复制
    copy() {

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
    .solutions-center {
      .sol-top {
        width: 1200px;
        height: 470px;
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
            width: 350px;

            .soltec-left {
              h2 {
                font-size: 16px;
                padding: 20px 0;
              }

              .soltecle-input {
                // width: 230px;
                padding: 20px 0;
                border: 1px solid #30425b;
                border-radius: 4px;
                text-align: center;
                word-break: break-all;
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
          span{
            display: inline-block;
            padding: 25px 0;
            font-size: 13px;
          }
          .tits{
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
