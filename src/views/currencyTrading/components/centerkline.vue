<template>
  <div class="centerkline">
    <div class="center-top">
      <div class="centerk-nav">
        <el-row>
          <el-col :span="4">
            <!-- <h1>BTC/USDT</h1> -->
            <!-- <el-select v-model="value" placeholder="请选择" @change="listchange(value)">
             <el-option v-for="(item,index) in marketAll" :key="index" :label="(item.coinName+'/'+item.marketCoinName)" :value="index">
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
            <span>{{numFor(currency.coinl)}} ≈ {{numFor(currency.cny)}} CNY</span></el-col>
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
    <div class="center-bottom" style="height: 553px;">
      <div class="AssetDetailsTabs-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="币币交易" name="tab1">
            <div class="deal flexcenterlist">
              <div class="deal-top">
                <div class="ints">
                  <h5>委托类型</h5><span style="color: #031937;">{{coinsForm.Buying}}</span>
                  <div class="its">
                    <input type="text" disabled="disabled">
                    <div class="lever">
                      <el-dropdown>
                        <span class="el-dropdown-link">限价委托<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>限价委托</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
                <div class="ints">
                  <h5>价格(USDT)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" v-model="form.price" placeholder="请输入买入价格" readonly>
                    <span> ≈ ${{form.price}}</span>
                  </div>
                </div>
                <div class="ints">
                  <h5>数量(BTC)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" v-model="form.qty" placeholder="请输入买入数量" readonly></div>
                </div>
                <div class="rate flexcenter">
                  <a>可用<label>{{numFor(accountList.balance)}}</label></a>
                  <a>交易额：<label>{{form.price*form.qty}}</label></a>
                </div>
                <input type="button" value="买入AUTT" class="lbtns" @click="add(1,form)">
              </div>

              <div class="deal-top">
                <div class="ints">
                  <h5>委托类型</h5>
                  <div class="its">
                    <input type="text" disabled="disabled">
                    <div class="lever">
                      <el-dropdown>
                        <span class="el-dropdown-link">限价委托<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>限价委托</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
                <div class="ints">
                  <h5>价格(USDT)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" v-model="form1.price" placeholder="请输入卖出价格"></div>
                </div>
                <div class="ints">
                  <h5>数量(BTC)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" v-model="form1.qty" placeholder="请输入卖出数量"></div>
                </div>
                <div class="rate flexcenter">
                  <a>可用<label>{{numFor(accountList1.balance)}}</label></a>
                  <a>交易额：<label>{{form1.price*form1.qty}}</label></a>
                </div>
                <input type="button" value="卖出AUTT" class="lbtns lbtns1" @click="add(2,form1)">
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import VueKline from "vue-kline"; //当前页引入vue-kline
  import data from "@/assets/js/data.js";
  import { MARKET_ALL,USER_ORDER } from '@/store/mutation-types' // 存储深度 
  import { coinList, getAccount }from '@/api'
  import {
    mapState
  } from 'vuex'
  import {
    add
  } from '@/api'
  import {numFor} from '@/assets/js/time.js'
  export default {
    components: {
      VueKline, //以子组件形式注册到当前页面中
    },
    data() {
      return {
        numFor:numFor,
        accountList:{}, // 币种信息
        accountList1:{}, // 币种信息
        form: {
          price:null,
          qty: 10000,
          orderType: 1,
        },
        form1: {
          price:null,
          qty: 0,
          orderType: 1,
        },
        value: 0,
        activeName: 'tab1',
        dialogTableVisible: false,
        marketIdlist: null,
        marketCoinId: 0,
        klineParams: {
          width: 1490, // k线窗口宽
          height: 490, // k线窗口高
          theme: "dark", // 主题颜色
          language: "zh-cn", //语言
          ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"], // 聚合选项
          symbol: "BTC", // 交易代号
          symbolName: "AUTT/USDT", // 交易名称
          intervalTime: 5000, // k线更新周期 毫秒
          depthWidth: 200, // 深度图宽度
          count: 2, //显示指标数量 默认两个  
          reverseColor:true, // 是否反色
        },
        arr: [],
        idlist: 0, // 旧id
        currency: {
          title: '',
          coinl: '',
          cny: ''
        },
        klineData: {
          depths: {},
          lines: []
        }, // 数据
        timer: false,
        screenWidth: document.body.clientWidth,
        market:{} ,// 市场
        marketList: {}, // 深度
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
      // this.$refs.callMethods.resize(1490, 490)
      let id = this.marketAll[0]
      // this.getSocketData(1,this.marketIdlist,'add')
      let name = id.coinName + '/' + id.marketCoinName
      this.currency = {
          title: name,
          coinl: id.lastTradePrice,
          cny: id.cnyPrice*id.lastTradePrice
        }
      this.form.price = id.lastTradePrice
      this.marketIdlist = id.marketId
      this.refreshKlineData(60000);
      this.marketCoinId = id.marketCoinId
      this.userOrder(id.marketId)
      // this.$store.dispatch('getAccountlist', id.marketCoinId)
      this.currencyMessage(id.fullCoinName,id.marketCoinId)
      this.currencyMessage(id.marketCoinName,id.coinId)
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
        marketAll: state => state.websocket.marketAll,
        user: state => state.user.user,
        // accountList: state => state.property.accountList,
        coinsForm: function(state) {
          if (JSON.stringify(state.websocket.coinsForm) != '{}') {
            let coinsForm = state.websocket.coinsForm
            // debugger
            // this.form.price = coinsForm.selling
          }
          return state.websocket.coinsForm
        },
      })
    },
    methods: {
      // 名字切换
      marketAllid(e) {
        this.value = e
        let name = e.coinName + '/' + e.marketCoinName
        this.$refs.callMethods.setSymbol('BTC', name)
        this.marketIdlist = e.marketId
        this.getSocketData(1, e.marketId, 'remove');
        this.form.price = e.lastTradePrice
        this.currency = {
            title: name,
            coinl: e.lastTradePrice,
            cny: e.cnyPrice*e.lastTradePrice
          }
      },
      async currencyMessage(name,type){
        let result = await getAccount (type)
        if (result.code == 200) {
          if(result.data.coinName =="USDT"){
            this.accountList = result.data
          }else if(result.data.coinName == "AUTT"){
            this.accountList1 = result.data
          }
          // console.log('币种信息',result.data)
          // commit(ACCOUNT_LIST, result.data)
        }
      },
      // 买卖接口
      async add(type, form) {
        let marketId = this.marketIdlist
        const {
          orderType,
          price,
          qty
        } = form
        const result = await add({
          marketId,
          orderType,
          price,
          qty,
          type
        })
        if (result.code == 200) {
          let message = ''
          if (type == 1) {
            message = '买入成功'
          } else {
            message = '卖出成功'
          }
          this.$message({
            message: message,
            type: 'success'
          })
          this.$store.dispatch('getAccountlist', this.marketCoinId)
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      // 当前委托订单
      userOrder(ids) {
        let params = {
          channel: "userOrder", 
          marketId:ids, 
          userId: this.user.id
        }
        this.socketApi.sendSock(params, this.getConfigResult)
      },
      // k线图
      async getSocketData(time, id, remove) {
        let params = {
          channel: "kline",
          marketId: id,
          minType: time,
          event: remove,
        }
     
        this.idlist = id
        let a = await this.socketApi.sendSock(params, this.getConfigResult)
        if (remove == 'remove') {
          this.getSocketData(time, this.marketIdlist, 'add')
        }
      },
      // 所有回调
      getConfigResult(data) {
        let datalist = []
        
        // this.arr= []
        if (data.channel == "kline") {
          datalist = data.klineList || []
          // this.klineData = a
          // K线图, 依次是: 时间(ms), 开盘价, 最高价, 最低价, 收盘价, 成交量
          // asks:一定比例的卖单列表, bids:一定比例的买单列表, 其中每项的值依次是 成交价, 成交量
          datalist.forEach(i => {
            this.arr.push([i.createTime, i.open, i.high, i.low, i.close, i.qty])
          })
          let lista = this.marketList.sellList || []
          let listb = this.marketList.buyList || []
          // this.form.price = lista.length > 0 ? lista[0].price : 0
          this.form1.price = listb.length > 0 ? listb[0].price : 0
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
            success: true,
            data: {
              depths: {
                asks: aa,
                bids: bb,
              },
              lines: this.arr
            }
          }; // 进入页面时执行,默认聚合时间900000毫秒(15分钟) 
          
          this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(timelist)
        }else if(data.channel=="marketAll"){
          this.$store.commit(MARKET_ALL, data.marketAll)
        }else if(data.channel=="userOrder"){
          this.$store.commit(USER_ORDER, data.orderList)
          console.log('USER_ORDER',data.orderList)
        }else if(data.channel=="marketById"){
          this.$store.commit(CION_LIST, data)
          this.marketList = data
          this.market = data.market
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
          this.$store.commit(PROPORTION_CION, proportionList)
        }
      },
      refreshKlineData(option) { //你点击页面上的周期会触发这个方法
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
    .chart_container.light #chart_loading {
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
        padding: 10px 20px;
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
      margin-top: 5px;

      // height: 553px!important;
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

        .deal {
          background: #031937;
          padding: 43px;

          .deal-top {
            width: 40%;

            h5 {
              font-size: 12px;
              display: block;
              margin-bottom: 5px;
              color: #ffffff99;
            }

            .ints {
              margin-bottom: 40px;

              .its {
                border-bottom: 1px solid #383f66;
                padding: 10px 0;
                display: flex;
                position: relative;

                input {
                  width: 70%;
                  background: none;
                  border: 0;
                  font-size: 12px;
                  color: #d2d6ec;
                }

                .lever {
                  position: absolute;
                  right: 0;
                  cursor: pointer;

                  span {
                    color: #708ad5;
                  }
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
