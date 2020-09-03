<template>
  <div class="dashboard">
    <div class="dashboard-head">
      <div class="dash-center flexzxlist">
        <h1>{{ $t('dashboard.dashboard_title') }}</h1>
        <p>{{ $t('dashboard.dashboard_h1') }}</p>
        <div class="aure-btns">{{ $t('dashboard.dashboard_app') }}</div>
        <!--        <el-button type="primary" size="medium" class="aure-btns"></el-button> -->
      </div>
      <div class="dash-bottom flexcentercenter">
        <div class="dashb-1">
          <div>{{ $t('dashboard.dashboard_btc') }} BTC/USDT</div>
          <p>16587.5</p>
          <div>24H{{ $t('dashboard.dashboard_btc') }}22,376</div>
        </div>
        <div class="dashlin" />
        <div class="dashb-1">
          <div>{{ $t('dashboard.dashboard_vol') }} ETH/USDT</div>
          <p>16587.5</p>
          <div>24H{{ $t('dashboard.dashboard_vol') }}22,376</div>
        </div>
        <div class="dashlin" />
        <div class="dashb-1">
          <div>{{ $t('dashboard.dashboard_btc') }} BTC/USDT</div>
          <p>16587.5</p>
          <div>24H{{ $t('dashboard.dashboard_vol') }}22,376</div>
        </div>
        <div class="dashlin" />
        <div class="dashb-1">
          <div>{{ $t('dashboard.dashboard_eth') }} ETH/USDT</div>
          <p>16587.5</p>
          <div>24H{{ $t('dashboard.dashboard_vol') }}22,376</div>
        </div>
      </div>
      <div class="dash-lb">
        <i />
        <span>关于AUTEX V1.0.0版本更新的公告   /   警惕假冒AUTEX官网的风险提示公告   /   运营周报(2020/07/07-2020/07/07)</span>
      </div>
    </div>
    <div class="dashboard-center flexzxlist">
      <h1>{{ $t('dashboard.dashboard_scale') }}</h1>
      <p>{{ $t('dashboard.dashboard_scale1') }}</p>
      <div class="dasc-flex flexcentercenter">
        <div class="dasc-flexliet">
          <img src="../images/flex2.png" alt="">
          <p>{{ $t('dashboard.dashboard_list1') }}</p>
          <div>{{ $t('dashboard.dashboard_p1') }}</div>
        </div>
        <div class="dasc-flexliet">
          <img src="../images/flex3.png" alt="">
          <p>{{ $t('dashboard.dashboard_list2') }}</p>
          <div>{{ $t('dashboard.dashboard_p2') }}</div>
        </div>
        <div class="dasc-flexliet">
          <img src="../images/flex1.png" alt="">
          <p>{{ $t('dashboard.dashboard_list3') }}</p>
          <div>{{ $t('dashboard.dashboard_p3') }}</div>
        </div>
        <div class="dasc-flexliet">
          <img src="../images/flex4.png" alt="">
          <p>{{ $t('dashboard.dashboard_list4') }}</p>
          <div>{{ $t('dashboard.dashboard_p4') }}</div>
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
            <span>{{ $t('dashboard.anzhuo') }}</span>

          </div>
          <div class="dashi-left">
            <i class="ios" />
            <span>{{ $t('dashboard.ios') }}</span>

          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-input flexzxlist">
      <h1>{{ $t('dashboard.dashboard_p8') }}</h1>
      <div class="inp flexcenterlist">
        <input v-model="searchkey" type="text" :placeholder="$t('dashboard.dashboard_table_search')">
        <div class="btns"><router-link :to="{name: 'register'}">{{ $t('dashboard.dashboard_p9') }}</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, reqCategorys } from '../../api'
export default {
  data() {
    return {
      searchkey: ''
    }
  },
  mounted() {
    this.reqCategorys()
  },
  methods: {
    async reqCategorys() {
      const result = await reqCategorys()
      if (result.code === 200) {
        const user = result.data
        console.log('数据', user)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard{
    width: 100%;
    height: 100%;
    color: #fff;
    h1{
      font-size:34px;
    }
    .aure-btns{
      width: 188px;
      padding: 20px 0;
      background:rgba(20,118,254,1);
      border:2px solid rgba(20,118,254,1);
      opacity:1;
      border-radius:8px;
      text-align: center;
      font-size:24px;
      margin-top: 50px;
    }
    .dashboard-head{
      box-sizing: border-box;
      width:100%;
      height:1080px;
      // margin:0;
      position: relative;
      background:url(../images/home_banner_bg@3x.png) no-repeat center;
      background-size: cover;
      .dash-center{
        padding: 300px 0;
        h1{
          font-size:56px;
          font-weight: bold;
        }
        p{
          font-size:24px;
          padding: 20px 0;
        }
      }

    }
      .dash-bottom {
        .dashlin{
          width:1px;
          height:115px;
          background:rgba(243,243,243,1);
          opacity:1;

        }
        .dashb-1{
          font-size: 18px;
          padding: 0 70px;
          p{
            font-size: 38px;
            color:#F33E3F;
            padding: 20px 0;
          }
        }
      }
      .dash-lb{
        background: #000000;
        text-align: center;
        padding: 13px 0;
        font-size: 14px;
        position: absolute;
        bottom: 0;
        width: 100%;
        i{
          vertical-align: middle;
          display: inline-block;
          width: 22px;
          height: 22px;
          background:url(../images/laba.png) no-repeat center;
          background-size: cover;
          // padding-right: 10px;
        }
        span{
          padding-left: 10px;
        }
    }
    .dashboard-center{
      text-align: center;
      height: 580px;
      color: #333;
      // padding: 100px;
      p{
        font-size:20px;
        color: #A5A5A5;
      }
      h1{
        font-size: 34px;
      }
      .dasc-flex{
        .dasc-flexliet{
          line-height: 40px;
          padding: 0 50px;
          img{
            width: 120px;
            height: 120px;
          }
          p{
            font-size:24px;
            color: #333333;
          }
          div{
            font-size:14px;
            color: #A5A5A5;
            text-align: center;
          }
        }

      }
    }
    .dashboard-download{
      height: 900px;
      background:url(../images/bg1.png) no-repeat center;
      background-size: cover;
      .dashd-left{
        height: 830px;
        padding-top: 65px;
        img{
          width: 852px;
          height: 830px;
        }
      }
      .dashd-right{
        height: 830px;
        padding-top: 180px;
        img{
          width: 190px;
          height: 190px;
          margin: auto;
          display: block;
        }
        p{
          font-size: 20px;
          padding: 20px 0 60px;
        }
        .dash-icon{
          padding-top: 80px;
          .dashi-left{
            width: 231px;
            height: 63px;
            line-height: 63px;
            border: 1px solid #FFFFFF;
            border-radius: 8px;
            text-align: center;
            margin: 15px auto;
            span{
              width: 140px;
              display: inline-block;
            }
            i{
              vertical-align: middle;
              display: inline-block;
              width: 43px;
              height: 43px;
              background:url(../images/anzhou.png) no-repeat center;
              background-size: cover;

            }
            .ios{
              background:url(../images/ios.png) no-repeat center;
              background-size: cover;
            }
          }
        }
      }
    }
    .dashboard-input{
      text-align: center;
      color: #333;
      height: 300px;
      padding: 100px 0;
      background: #fff;
      .btns{
        width: 142px;
        height: 72px;
        background: #1476FE;
        line-height: 72px;
        border-radius: 4px;
        text-align: center;
        margin-left: 60px;
        font-size: 20px;
      }
      a{
        color: #fff;
      }
      .inp{
        input{
         width: 510px;
         height:72px;
         background:rgba(255,255,255,1);
         border:1px solid rgba(165,165,165,1);
         opacity:1;
         border-radius:4px;
         font-size: 20px;
         padding: 0 30px;
        }
      }
    }
  }
</style>
