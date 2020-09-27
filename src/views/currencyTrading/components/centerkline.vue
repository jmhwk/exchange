<template>
  <div class="centerkline">
    <div class="center-top">
      <div class="centerk-nav">
        <el-row>
          <el-col :span="4">
           <!-- <h1>BTC/USDT</h1> -->
           <el-select v-model="value" placeholder="请选择"  @visible-change="selectchange(value)" @change="listchange(value)">
             <el-option v-for="(item,index) in options" :key="index" :label="(item.coinName+'/'+item.marketCoinName)" :value="index">
             </el-option>
           </el-select>
          </el-col>
          <el-col :span="4">开盘价</el-col>
          <el-col :span="4">涨跌额</el-col>
          <el-col :span="4">24H最高</el-col>
          <el-col :span="4">24H最低</el-col>
        </el-row>
        <el-row class="center-row1">
          <el-col :span="4">涨跌幅+0.50%</el-col>
          <el-col :span="4">{{market.openPrice}}</el-col>
          <el-col :span="4">{{market.maxPrice}}</el-col>
          <el-col :span="4">{{market.closePrice}}</el-col>
          <el-col :span="4">{{market.qty}}</el-col>
        </el-row>
      </div>
      <div class="centerk-subject">
        <!--把子组件放到想放的位置-->
        <Vue-kline :klineParams="klineParams" :klineData="klineData" ref="callMethods" @refreshKlineData="refreshKlineData"></Vue-kline>
      </div>
    </div>
    <div class="center-bottom">
      <div class="AssetDetailsTabs-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="币币交易" name="tab1">
            <div class="deal flexcenterlist">
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
                    <input type="text" maxlength="12"  v-model="form.price" placeholder="请输入买入价格" readonly >
                  <span> ≈ ${{form.price}}</span>
                  </div>
                </div>
                <div class="ints">
                  <h5>数量(BTC)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" v-model="form.qty"  placeholder="请输入买入数量" readonly></div>
                </div>
                <div class="rate flexcenter">
                  <a>可用<label>{{numFilter(accountList.balance)}}</label></a>
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
                    <input type="text" maxlength="12"  v-model="form1.price" placeholder="请输入卖出价格"></div>
                </div>
                <div class="ints">
                  <h5>数量(BTC)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" v-model="form1.qty"  placeholder="请输入卖出数量" ></div>
                </div>
                <div class="rate flexcenter">
                  <a>可用<label>{{numFilter(accountList.balance)}}</label></a>
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
  import { mapState } from 'vuex'
  import { add } from '@/api'
  import {numFilter} from '@/assets/js/time.js'
  import {
    getSocket
  } from '@/assets/js/websocket.js'
  export default {
    components: {
      VueKline, //以子组件形式注册到当前页面中
    },
  props: {
    marketList: {
      type: Object,
      default: () => {}
    },
    market:{
      type: Object,
      default: () => {}
    },
    marketid:{
      type: Number,
      default: () => {}
    },
  },
    data() {
      return {
        numFilter:numFilter,
        options:[{
          label:''
        }],// 下拉数据
        form:{
          price:0,
          qty:10000,
          orderType:1,
        },
        form1:{
          price:0,
          qty:10000,
          orderType:1,
        },
        value: 0,
        activeName: 'tab1',
        dialogTableVisible: false,
        marketIdlist:0, 
        marketCoinId:0,
        klineParams: {
          width: '100%', // k线窗口宽
          height: 500, // k线窗口高
          theme: "dark", // 主题颜色
          language: "zh-cn", //语言
          ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"], // 聚合选项
          symbol: "BTC", // 交易代号
          symbolName: "AUTT/USDT", // 交易名称
          intervalTime: 5000, // k线更新周期 毫秒
          depthWidth: 200, // 深度图宽度
          count: 2 //显示指标数量 默认两个  
        },
        arr: [],
        klineData:{
          depths:{},
          lines:[]
        } // 数据
      };
    },
    mounted() {
      // this.getSocketData(60,this.market.id)
      this.$refs.callMethods.resize(1325, 490)
      this.options = this.marketAll 
      let id = this.options[0]
      this.refreshKlineData(60000,id.marketId);
      this.marketIdlist = id.marketId
      this.marketCoinId = id.marketCoinId
      this.$store.dispatch('getAccountlist', id.marketCoinId)  
    },
    computed: {
      ...mapState({
        marketAll: state => state.websocket.marketAll,
        accountList :state => state.property.accountList,
        // sumListcny: state => state.property.sumlistcny,
      })
    },
    methods: {
      // 名字切换
      marketAllid(e){
        this.options = this.marketAll
        this.options.push(e)
        this.value = 1
        let name  = e.coinName+'/'+e.marketCoinName
        this.$refs.callMethods.setSymbol('BTC', name)
        this.marketIdlist = e.marketId
        this.getSocketData(1,e.marketId);
      },
      // 买卖接口
      async add(type,form) {
        let marketId = this.marketIdlist
        const { orderType, price, qty} = form
        const result = await add({ marketId, orderType, price, qty,type})
        if (result.code == 200) {
          let message = ''
          if(type==1){
            message = '买入成功'
          }else {
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
      // tab切换
      selectchange(e){
        this.options = this.marketAll
      },
      // tab切换
      listchange(e){
        let id = this.marketAll[e]
        this.getSocketData(1,id.marketId)
      },
      // k线图
      getSocketData(time,id) {
        let params = {
          channel: "kline",
          marketId:id,
          minType: time
        }
        let datalist = []
        this.arr= []
        console.log('参数',params)
        getSocket(JSON.stringify(params), (data, ws) => {
          datalist = data.klineList || []
          // this.klineData = a
          // K线图, 依次是: 时间(ms), 开盘价, 最高价, 最低价, 收盘价, 成交量
          // asks:一定比例的卖单列表, bids:一定比例的买单列表, 其中每项的值依次是 成交价, 成交量
          datalist.forEach(i => {
            this.arr.push([i.id, i.open, i.high, i.low, i.close, i.qty])
          })
          this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(this.arr)
          let lista = this.marketList.sellList || []
          let listb = this.marketList.buyList ||[]
          this.form.price = listb[0].price|| 0
          console.log('lisa',this.form.price)
          let aa=[]
          let bb =[]
           lista.forEach(i =>{
             aa.push([i.price,i.qty])
           })
           listb.forEach(i =>{
             bb.push([i.price,i.qty])
           })
          this.klineData = {
            success: true,
            data:{
              depths:{
                asks:aa,
                bids:bb,
              },
              lines:this.arr
            }
          }; // 进入页面时执行,默认聚合时间900000毫秒(15分钟)    
        });
      },
      refreshKlineData(option,id) { //你点击页面上的周期会触发这个方法
      option = option/1000/60
      this.getSocketData(option,id,)
      },

    },

  }
</script>

<style lang="scss">
  .centerkline {
    input::-webkit-input-placeholder {
      color: #ffffffcc;
    }

    #chart_overlayCanvas {
      overflow: hidden;
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
          height: 23px !important;
          background: #002658;
          border-color: #002658;
          color:#1476FE;
        }
        .products .products-top span:last-of-type{
          padding: 0px !important;
        }
        .el-input__suffix-inner{
          text-align: left;
        }
        .el-table th>.cell{
          width: 60%;
        }
      }
    }

    .center-bottom {
      margin-top: 5px;

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
