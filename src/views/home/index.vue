<template>
  <div class="dashboard">
    <div style="background-image: linear-gradient(180deg,#102c7a,#0a1d57);">
      <div class="dashboard-head">
        <div class="dash-center flexzxlist">
          <h1>AUTEX数字资产交易平台</h1>
          <p>链启货币，数智未来</p>
    <!--      <div class="aure-btns">{{ $t('dashboard.dashboard_app') }}</div> -->
          <!--        <el-button type="primary" size="medium" class="aure-btns"></el-button> -->
        </div>
        <div class="dash-bottom flexcentercenter">
          <div class="dashb-1" v-for="(item,index) in recommendMarketList" :key='index'>
            <div>{{item.marketCoin.coinName}}/{{item.marketCoin.marketCoinName}}</div>
            <p>{{item.marketCoin.lastTradePrice.toFixed(2)}}</p>
            <div class="isred" v-if="item.marketCoin.incRate<0">{{item.marketCoin.incRate.toFixed(2)}}%</div>
            <div class="isgreen" v-else>+{{item.marketCoin.incRate.toFixed(2)}}%</div>
          </div>
        </div>
        <div class="dash-lb">
          <ul class="flexcentercenter">
            <i />
            <li v-for="(i,n) in articlelist" :key="n"><span style="padding: 0 30px;" v-if="n!=0">/</span>
            <router-link :to="{path:'/footer/announcement',query:{n}}">
              {{i.cnTitle}} 
            </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="dashboard-center flexzxlist">
<!--      <h1>{{ $t('dashboard.dashboard_scale') }}</h1>
      <p>{{ $t('dashboard.dashboard_scale1') }}</p> -->
      <h1>100%助力数字财富增长</h1>
      <p>为全球交易用户提供安全、可信赖的数字资产交易及资产管理服务</p>
      <div class="dasc-flex flexcentercenter">
        <div class="dasc-flexliet">
          <img src="../images/flex2.png" alt="">
          <p>硬核实力</p>
          <div>金融创新基因，世界顶级管理团队。安全稳定可信赖</div>
        </div>
        <div class="dasc-flexliet">
          <img src="../images/flex3.png" alt="">
          <p>安全体系</p>
          <div> 一流团队打造专业安全多重防御 让您资产无忧</div>
        </div>
        <div class="dasc-flexliet">
          <img src="../images/flex1.png" alt="">
          <p>交易系统</p>
          <div>自主研发高速交易撮合引擎，可承载巨量交易，妥善完成每一份委托</div>
        </div>
        <div class="dasc-flexliet">
          <img src="../images/flex4.png" alt="">
          <p>品质服务</p>
          <div>7*24h全天候专业客服，快速响应。极致体验源于客户至上的崇高理念</div>
        </div>
      </div>
    </div>
    <div class="dashboard-download flexcentercenter">
      <div class="dashd-left">
        <img src="../images/bgleft.png" alt="">
      </div>
      <div class="dashd-right">
        <h1>{{ $t('dashboard.dashboard_p6') }}</h1>
        <p>{{ $t('dashboard.dashboard_p7') }}</p>
        <img src="../images/bgright.png" alt="">
        <div class="dash-icon">
          <div class="dashi-left">
            <i />
            <span>Android下载</span>

          </div>
          <div class="dashi-left">
            <i class="ios" />
            <span>iPhone下载</span>

          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-input flexzxlist">
      <h1>{{ $t('dashboard.dashboard_p8') }}</h1>
      <div class="inp flexcenterlist">
         <el-input v-model="searchkey" :placeholder="$t('dashboard.dashboard_table_search')" clearable />
        <div class="btns">
          <router-link :to="{path:'/regist',query:{searchkey}}">{{ $t('dashboard.dashboard_p9') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    article
  } from '../../api'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        searchkey: '',
        websock: null,
        articlelist: [] // 公告
      }
    },
    created() {
      this.$store.dispatch('getSocketData')
      this.article()
    },
    computed: {
      ...mapState({
        recommendMarketList: state => state.websocket.recommendMarketList
      })
    },
    methods: {
      // 公告
      async article() {
        let type = 2
        const result = await article(type)
        if (result.code == 200) {
          this.articlelist = result.data.slice(0,5)
        }
      },
    },
  }
</script>

<style lang="scss">
  .dashboard {
    width: 100%;
    height: 100%;
    color: #fff;
    h1 {
      font-size: 34px;
    }

    .isred {
      color: #e2505b;
    }

    .isgreen {
      color: #01bd8b;
    }

    .aure-btns {
      width: 188px;
      padding: 20px 0;
      background: rgba(20, 118, 254, 1);
      border: 2px solid rgba(20, 118, 254, 1);
      opacity: 1;
      border-radius: 8px;
      text-align: center;
      font-size: 24px;
      margin-top: 50px;
    }

    .dashboard-head {
      box-sizing: border-box;
      width: 100%;
      // height: 1080px;
      height: 700px;
      // margin:0;
      position: relative;
      // background: url(../images/home_banner_bg@3x.png) no-repeat center;
      background: url(../images/bgxian.png);
      background-size: cover;
      // background-image: linear-gradient(180deg,#102c7a,#0a1d57);
      .dash-center {
        padding: 180px 0 111px 0;

        h1 {
          font-size: 56px;
          font-weight: bold;
        }

        p {
          font-size: 24px;
          padding-top: 60px;
        }
      }

    }

    .dash-bottom {
      .dashlin {
        width: 1px;
        height: 115px;
        background: rgba(243, 243, 243, 1);
        opacity: 1;

      }

      .dashb-1 {
        font-size: 18px;
        padding: 0 100px;

        p {
          font-size: 38px;
          color: #F33E3F;
          padding: 20px 0;
        }
      }
    }

    .dash-lb {
      background: #00000047;
      text-align: center;
      padding: 13px 0;
      font-size: 14px;
      position: absolute;
      bottom: 0;
      width: 100%;
        ul{
          li{
            a{
              color: #fff;
            }
            a:hover{
              color: #1476fe;
            }
          }

        }

      i {
        margin-right: 30px;
        vertical-align: middle;
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url(../images/laba.png) no-repeat center;
        background-size: cover;
        // padding-right: 10px;
      }

      span {
        padding-left: 10px;
      }
    }

    .dashboard-center {
      text-align: center;
      height: 580px;
      color: #333;

      // padding: 100px;
      p {
        font-size: 20px;
        color: #A5A5A5;
      }

      h1 {
        font-size: 34px;
      }

      .dasc-flex {
        .dasc-flexliet {
          line-height: 40px;
          padding: 0 50px;

          img {
            width: 120px;
            height: 120px;
          }

          p {
            font-size: 24px;
            color: #333333;
          }

          div {
            font-size: 14px;
            color: #A5A5A5;
            text-align: center;
          }
        }

      }
    }

    .dashboard-download {
      height: 900px;
      background: url(../images/bg1.png) no-repeat center;
      background-size: cover;

      .dashd-left {
        height: 830px;
        padding-top: 65px;

        img {
          width: 852px;
          height: 830px;
        }
      }

      .dashd-right {
        height: 830px;
        padding-top: 180px;

        img {
          width: 190px;
          height: 190px;
          margin: auto;
          display: block;
        }

        p {
          font-size: 20px;
          padding: 20px 0 60px;
        }

        .dash-icon {
          padding-top: 80px;

          .dashi-left {
            width: 231px;
            height: 63px;
            line-height: 63px;
            border: 1px solid #FFFFFF;
            border-radius: 8px;
            text-align: center;
            margin: 15px auto;

            span {
              width: 140px;
              display: inline-block;
            }

            i {
              vertical-align: middle;
              display: inline-block;
              width: 43px;
              height: 43px;
              background: url(../images/anzhou.png) no-repeat center;
              background-size: cover;

            }

            .ios {
              background: url(../images/ios.png) no-repeat center;
              background-size: cover;
            }
          }
        }
      }
    }

    .dashboard-input {
      text-align: center;
      color: #333;
      height: 300px;
      padding: 100px 0;
      background: #fff;

      .btns {
        width: 142px;
        height: 72px;
        background: #1476FE;
        line-height: 72px;
        border-radius: 4px;
        text-align: center;
        margin-left: 60px;
        font-size: 20px;
      }

      a {
        color: #fff;
      }

      .inp {
        .el-input{
          width: 510px;
        }
        .el-input__inner {
          width: 100%;
          height: 72px!important;
          background: rgba(255, 255, 255, 1);
          // border: 1px solid rgba(165, 165, 165, 1);
          border-radius: 4px;
          font-size: 20px;
          padding: 0 30px;
            // input{
            //  height: 72px; 
            // }
        }
      }
    }
  }
</style>
