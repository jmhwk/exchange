<template>
  <div class="centerkline">
    <div class="center-top">
      <div class="centerk-nav">
        <el-row>
          <el-col :span="4">
            <!--    <el-select v-model="value" placeholder="请选择" @change="listchange(value)">
             <el-option v-for="(item,index) in lendMaeketAll" :key="index" :label="(item.coinName+'/'+item.marketCoinName+'永续合约')" :value="index">
             </el-option>
           </el-select> -->
            {{currency.title}}
          </el-col>
          <el-col :span="4">24H量</el-col>
          <el-col :span="4">24H最高</el-col>
          <el-col :span="4">24H最低</el-col>
        </el-row>
        <el-row class="center-row1">
          <el-col :span="4">
            <span>{{numFilter(currency.coinl)}} ≈ {{numFilter(currency.cny)}} CNY</span></el-col>
          <el-col :span="4">{{market.qty || '0.00'}}</el-col>
          <el-col :span="4">{{market.maxPrice || '0.00'}}</el-col>
          <el-col :span="4">{{market.closePrice || '0.00'}}</el-col>
        </el-row>
      </div>
      <div class="centerk-subject">
        <!--把子组件放到想放的位置-->
        <Vue-kline :klineParams="klineParams" :klineData="klineData" ref="callMethods" @refreshKlineData="refreshKlineData"></Vue-kline>
      </div>
    </div>
    <div class="center-bottom" style="height: 650px">
      <div class="AssetDetailsTabs-container">
        <el-tabs v-model="activeName" @tab-click="changeTab" >
          <el-tab-pane label="开仓" name="tab1">
            <Tab1 :lendobj="lendobj" :formsell="formsell" v-if="flg"/>
          </el-tab-pane>
          <el-tab-pane label="平仓" name="tab2">
            <Tab2 :opneobj2="opneobj2" :formsell="formsell" :opneobj1="opneobj1" v-if="flg1" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import VueKline from "vue-kline"; //当前页引入vue-kline
  import data from "@/assets/js/data.js";
  import {
    mapState
  } from 'vuex'
  import {
    add
  } from '@/api'
  import {
    numFilter
  } from '@/assets/js/time.js'
  import { LENDMAEKET_ALL,LATES_TCONTRACT, LENDALL_LIST,PROPORTION_LIST,CONTRA_FORM,LENDUSER_ORDER,LENDUSER_HOLD} from '@/store/mutation-types' // 存储深度
  import Tab1 from './tab1'
  import Tab2 from './tab2'
  export default {
    components: {
      VueKline, //以子组件形式注册到当前页面中
      Tab1,
      Tab2,
    },
    data() {
      return {
        numFilter: numFilter,
        market:{}, // 市场
        marketList: {}, // 深度
        timer: null, //定时器名称
        formsell: {
          buy: 0, // 买
          sell: 0, // 卖
          marketId: 0,
          orderType: 0,
        },
        idlist: 0, // 旧id
        flg: true,
        flg1: false,
        currency: {
          title: '',
          coinl: '',
          cny: ''
        },
        // 币对数据
        lendobj: {}, // 开仓
        opneobj1: {}, // 平仓
        opneobj2: {},
        value: 0,
        activeName: 'tab1',
        dialogTableVisible: false,
        marketIdlist: null,
        marketCoinId: 0,
        klineParams: {
          width: '100%', // k线窗口宽
          height: 500, // k线窗口高
          theme: "dark", // 主题颜色
          language: "zh-cn", //语言
          ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"], // 聚合选项
          symbol: "BTC", // 交易代号
          symbolName: '', // 交易名称
          intervalTime: 5000, // k线更新周期 毫秒
          depthWidth: 200, // 深度图宽度
          count: 2, //显示指标数量 默认两个  
          reverseColor:true, // 是否反色
        },
        arr: [],
        typelist: 0, //买入卖出
        klineData: {
          depths: {},
          lines: []
        }, // 数据
        timer: false,
        screenWidth: document.body.clientWidth,
      };
    },
    watch: {
      screenWidth: {
        immediate: true,
        handler: function(newVal) {
          // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
          if (!this.timer) {
            this.screenWidth = newVal;
            this.timer = true;
            let _this = this;
            setTimeout(() => {
              //在这里做有关浏览器变化时需要做的操作
              _this.timer = false;
              this.$refs.callMethods.resize(this.screenWidth * 0.622, 490);
            }, 400);
          }
          // if(newVal)
        }
      }
    },
    mounted() {
      this.$refs.callMethods.resize(1490, 490)
      let id = this.lendMaeketAll[0]
      let name = id.coinName + '/' + id.marketCoinName
      this.currency = {
          title: name + '永续合约',
          coinl: id.lastTradePrice,
          cny: id.cnyPrice
        },
      this.$refs.callMethods.setSymbol(this.market.marketName, this.market.symbol)
      this.marketIdlist = id.marketId
      this.marketCoinId = id.marketCoinId
      this.refreshKlineData(60000);
      this.$store.dispatch('getAccountlist', id.marketCoinId)
      this.timer=setTimeout(()=>{
        this.lendUserOrder(id.marketId)
      }, 1000);
      this.timer = setTimeout(() => {
        this.lendAccount(id.marketId)
      }, 2000);
      window.setInterval(() => {
        setTimeout(this.lendUserHold(this.marketIdlist), 0)
      }, 3000)
      const _this = this;
      // 画echars
      // 监听浏览器窗口变化
      window.onresize = function() {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          _this.screenWidth = window.screenWidth;
        })();
      };
    },
    computed: {
      ...mapState({
        lendMaeketAll: state => state.websocket.lendMaeketAll,
        user: state => state.user.user,
        accountList: state => state.property.accountList,
        // sumListcny: state => state.property.sumlistcny,
      })
    },
    beforeDestroy() {
      clearInterval(this.timer); // 清除定时器
      this.timer = null;
    },
    methods: {
      // tab切换
      changeTab(tab){
        if( tab.name ===  'tab1') {
            this. activeName =  'tab1'
            this.flg= true
            this.flg1 = false
          } else if ( tab.name ===  'tab2') {
            this. activeName =  'tab2'
            this.openLendAccount(this.marketIdlist, 1)
            this.openLendAccount(this.marketIdlist, 2)
            // this.timer=setTimeout(()=>{
            //   this.openLendAccount(this.marketIdlist, 2)
            // }, 2000);
            this.flg= false
            // this.flg1 = true
          }
      },
      // 左侧合约名字切换
      marketAllid(e, i) {
        this.value = i
        let name = e.coinName + '/' + e.marketCoinName
        // debugger
        this.currency = {
            title: name + '永续合约',
            coinl: e.lastTradePrice,
            cny: e.cnyPrice
          },
          this.$refs.callMethods.setSymbol('BTC', name)
        this.marketIdlist = e.marketId
        // console.log('id是',e.marketId)
        this.getSocketData(1, this.idlist, 'remove');
        this.lendAccount(e.marketId)
        this.lendUserHold(e.marketId)
        this.lendAccount(e.marketId)
      },
      // 所有回调数据都在这里
      getConfigResult(data) {
        let datalist = []
        this.arr = []
        // console.log('实时数据12121',data.channel)
        if (data.channel == "lendAccount") {
          this.lendobj = data
          // this.flg = true
        }else if(data.channel == "lendUserOrder"){
           // this.tableData= data.orderList
          this.$store.commit(LENDUSER_ORDER, data)
        }else if(data.channel=="lendUserHold"){
          this.$store.commit(LENDUSER_HOLD, data.data)
          
        }else if(data.channel== "lendMarketAll"){
          this.$store.commit(LENDMAEKET_ALL, data.marketAll)
        }else if (data.channel== "lendMarketById"){
          this.$store.commit(LENDALL_LIST, data)
          this.market = data.market ||{}
          this.marketList = data 
          let b = data.sellList.reduce(function(prev, i) {
            return i.qty + prev
          }, 0);
          let c = data.buyList.reduce(function(prev, i) {
            return i.qty + prev
          }, 0);
          let proportionList={
                proportionred:b,
                proportiongreen:c
              }// 比例
          this.$store.commit(PROPORTION_LIST, proportionList)
        }else if (data.channel == "openLendAccount") {
          this.flg1 = true
          if (data.type == 1) {
            this.opneobj1 = data ||{}
          } else if (data.type == 2) {
            this.opneobj2 = data || {}
          }
        } else if (data.channel == "lendKline") {
          // K线图, 依次是: 时间(ms), 开盘价, 最高价, 最低价, 收盘价, 成交量
          // asks:一定比例的卖单列表, bids:一定比例的买单列表, 其中每项的值依次是 成交价, 成交量
          // console.log('k线数据',data.channel)
          datalist = data.klineList || []
          datalist.forEach(i => {
            this.arr.push([i.createTime, i.open, i.high, i.low, i.close, i.qty])
          })
          let lista = this.marketList.sellList || [] // 卖
          let listb = this.marketList.buyList || [] // 买
          this.formsell = {
            buy: listb.length > 0 ? listb[0].price : 0, // 卖
            sell: lista.length > 0 ? lista[0].price : 0, // 卖
            marketId: this.marketIdlist,
          }
          let contraForm = {
            selling:this.formsell.sell,
            Buying:this.formsell.buy
          }
          this.$store.commit(CONTRA_FORM, contraForm)
          
          // this.form={
          //   price:this.formsell.sell, //价格
          //   qty:0, // 数量
          //   triggerPrice:'', // 触发
          //   stopPrice:'' // 委托
          // },
          // this.form1 ={
          //   price:this.formsell.buy, //价格
          //   qty:0, // 数量
          //   triggerPrice:'', // 触发
          //   stopPrice:'' // 委托
          // },
          // console.log('shihsi',this.formsell)
          // this.flg = true
          let aa = []
          let bb = []
          lista.forEach(i => {
            aa.push([i.price, i.qty])
          })
          listb.forEach(i => {
            bb.push([i.price, i.qty])
          })
          let timelist = this.arr.reverse()
          this.klineData = {
            data: {
              depths: {
                'asks': aa,
                'bids': bb,
              },
              'lines': timelist
            }
          }; // 进入页面时执行,默认聚合时间900000毫秒(15分钟) 
          
          this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(timelist)
        }
      },
      // 持仓
      lendUserOrder(id){
        let params = {
          channel: "lendUserOrder", 
          marketId:id, 
          userId: this.user.id
        }
        this.socketApi.sendSock(params, this.getConfigResult);
      },
      // 限价委托
      lendUserHold(id){
        let list = {
          channel: "lendUserHold", 
          marketId:id, 
          userId: this.user.id
        }
        this.socketApi.sendSock(list, this.getConfigResult);
      },
      // 开仓余额数据
      lendAccount(marketId) {
        let params = {
          channel: "lendAccount",
          // type:2,
          userId: this.user.id,
          marketId: marketId,
        };
        this.socketApi.sendSock(params, this.getConfigResult);
      },
      // 平仓可用余额数据
      openLendAccount(marketId, type) {
        this.typelist = type
        let params = {
          channel: "openLendAccount",
          type: type, // 1开多 2开空
          userId: this.user.id,
          marketId: marketId,
        }
        console.log('呼呼呼',params)
        this.socketApi.sendSock(params, this.getConfigResult);
      },
      // k线图
      getSocketData(time, id, remove) {
        let params = {
          channel: "lendKline",
          marketId: id,
          minType: time,
          event: remove,
        }
        // console.log('k线图传递参数', params)
        // let datalist = []
        // this.arr= []
        this.idlist = id
        this.socketApi.sendSock(params, this.getConfigResult,2);

        if (remove == 'remove') {
          this.getSocketData(time, this.marketIdlist, 'add')
        }
      },
      refreshKlineData(option) { //你点击页面上的时间会触发这个方法
        option = option / 1000 / 60
        if (this.marketIdlist) {
          this.getSocketData(option, this.marketIdlist, 'add')
        }

      },

    },

  }
</script>

<style lang="scss">
  .centerkline {
    input::-webkit-input-placeholder {
      color: #ffffffcc;
    }

    .chart_container a.chart_icon_theme_dark {
      background-color: #031937;
    }

    .chart_container.dark #chart_loading {
      display: none!important;
    }
    .chart_container.light #chart_loadin{
      display: none!important;
    }
    #chart_overlayCanvas {
      // overflow-x: hidden;
      position: absolute;
      z-index: 2;
      // background-color: #031937;
    }

    .chart_container.dark #chart_toolbar {
      background-color: #031937;
      border-top-color: #031937;
    }

    .chart_container.dark #chart_tabbar {
      background-color: #031937;
      border-top-color: #031937;
    }

    input::-moz-input-placeholder {
      color: #ffffffcc;
    }

    input::-ms-input-placeholder {
      color: #ffffffcc;
    }

    .lbtns {
      width: 100%;
      border-radius: 2px;
      font-size: 13px;
      cursor: pointer;
      color: #fff;
      padding: 10px 0;
      border: 0;
    }

    .el-row {
      padding: 7px 0;
      font-size: 12px;
      color: #bfc5cd;

      span {
        padding-left: 0 !important;

        i {
          padding-left: 3px;
        }
      }
    }

    .center-row1 {
      color: #A8CCFF;
    }

    .center-top {

      // height: 556px;
      .centerk-subject {
        height: 500px;
        background: #031937;
        width: 100%;
        overflow: auto;
      }

      .centerk-nav {
        // height: 63px;
        padding: 10px;
        background: #002658;

        .el-input__inner {
          height: 35px !important;
          background: #002658;
          border-color: #002658;
          color: #1476FE;
          padding: 0;
        }

        .products .products-top span:last-of-type {
          padding: 0px !important;
        }

        .el-input__suffix-inner {
          text-align: left;
        }

        .el-table th>.cell {
          width: 60%;
        }
      }
    }

    .center-bottom {
      // height: 629px!important;
      margin-top: 5px;

      .el-select {
        padding: 0px 0px;

        .el-input__inner {
          height: 35px !important;
          background-color: $blue;
          color: rgba($color: #fff, $alpha: 0.81);
        }
      }

      .centerb-nav {
        display: flex;
        background: #031937;
        // padding: 0 20px;

        h1 {
          font-size: 18px;
          color: #1476FE;
          line-height: 100px;
          padding: 0 20px;
          width: 150px;
        }
      }

      .centerb-left {
        width: 100%;
        padding: 20px;
      }

      .AssetDetailsTabs-container {
        width: 100%;
        height: 100%;
        background-color: $blue;
        margin: 5px 0;
        position: relative;

        .intsnav {
          padding: 20px 43px 0;
        }

        .lever {
          cursor: pointer;
          display: flex;

          li {
            border: 1px solid #383f66;
            border-radius: 5px;
            padding: 8px 10px;
            margin-right: 20px;
          }

          .active {
            border: 1px solid #1476FE;
            color: #1476FE;
          }

          span {
            color: #708ad5;
          }
        }

        .deal {
          background: #031937;
          padding: 10px 43px;

          h5 {
            font-size: 12px;
            display: block;
            margin-bottom: 5px;
            color: #ffffff99;
          }

          .ints {
            margin-bottom: 28px;

            // .el-input__suffix{
            //   text-align: left;
            // }
            .its {
              border-bottom: 1px solid #383f66;
              padding: 10px 0;
              // display: flex;
              // position: relative;

              input {
                width: 70%;
                height: 24px !important;
                background: none;
                border: 0;
                font-size: 12px;
                color: #d2d6ec;
                padding: 0 0;
              }
            }
          }

          .rate {
            margin-bottom: 35px;

            a {
              color: #ffffff99;
              font-size: 12px;
              cursor: none;
            }
          }

          .lbtns {
            background: #13ad8f;
          }

          .lbtns1 {
            background: #db465f;
          }
        }

        .explain {
          // padding: 20px 30px;
          font-size: 12px;
          position: absolute;
          left: 240px;
          top: 20px;
          color: #495c77;

          i {
            padding-left: 3px;
          }

          .el-dialog {
            background: #e6e9ed;
            width: 480px;
            text-align: center;
          }

          .el-dialog__body {
            padding: 0 20px 20px 20px;
          }

          .tables {
            border-collapse: collapse;

            // color: #fff;
            td:first-of-type {
              width: 30%;
            }

            td {
              width: 50%;
              border: 1px solid #d0d1d1;
              padding: 10px;
            }
          }
        }

        .el-tabs {
          width: 100%;

          .el-tabs__header {
            margin: unset;

            .el-tabs__nav-wrap {
              .el-tabs__nav-scroll {
                background-color: rgba($color: #1476FE, $alpha: 0.06);

                .el-tabs__item {
                  height: 55px;
                  line-height: 55px;
                  text-align: center;
                  padding: unset;
                  width: 120px;
                  color: #fff;
                  opacity: 1;
                }

                .el-tabs__item.is-active {
                  background-color: $blue;
                }
              }
            }

            .el-tabs__nav-wrap::after {
              background-color: $blue;
            }
          }
        }
      }
    }

  }
</style>
