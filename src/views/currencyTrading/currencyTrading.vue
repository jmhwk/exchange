<template>
  <div class="products">
    <div class="products-top">
      <el-row :gutter="5">
        <el-col :span="3">
          <div class="grid-content bg-purple1">
            <div class="title">币对</div>
            <ul class="currencynav n_hight">
              <li class="active" v-for="(item,index) in allMarketList" :key="index" @click="handleClick(item)">
                <div class="name"><label>{{item.coinName}}/{{item.marketCoinName}}</label>
                  <label class="red" v-if="item.incRate<0">{{item.incRate}}%</label>
                  <label class="green" v-else>+{{item.incRate}}%</label>
                </div>
                <span>{{item.lastTradePrice.toFixed(2)}} ≈
                  {{item.cnyPrice.toFixed(2)}} CNY</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="15">
          <div class=" bg-purple2">
            <centerkline :marketList="marketList" :market="market" ref="child"v-if="flg"></centerkline>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple3">
            <div class="title">盘口</div>
            <div class="t_tbs">
              <div class="t_tits"><span>价格(USDT)</span><span>数量(BTC)</span><span>累计(BTC)</span></div>
              <ul id="handicap" class="menu_nav p_hight">
                <li v-for="(t,i) in sellList" :key="i">
                  <span class="red">{{t.price}}</span>
                  <span>{{t.qty}}</span>
                  <span>{{t.amount}}</span>
                 <div class="reds" :style="{width: (t.qty)/proportion*100 + '%' }"></div>
                </li>
              </ul>
              <ul class="menu_nav p_hight">
                <li v-for="(t,i) in buyList" :key="i">
                  <span class="green">{{t.price}}</span>
                  <span>{{t.qty}}</span>
                  <span>{{t.amount}}</span>
                  <div class="greens" :style="{width: (t.qty)/proportion*100 + '%' }"></div>
                  <!-- <div class="greens" style="width: 20.1364%;"></div> -->
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple3 bg-purple4">
            <div class="title">实时成交</div>
            <div class="t_tbs">
              <div class="t_tits">
                <span>时间</span><span>价格(USDT)</span><span>数量(BTC)</span>
              </div>
              <ul class="menu_nav n_hight">
                <li v-for="(item, index) in tradeList" :key="index"><span>{{item.createTime}}</span>
                <span class="tr-mName thead-color green" v-if="item.type==1">{{item.price}}</span>
                <span class="tr-mName thead-color red" v-else>{{item.price}}</span>
                <span>{{item.qty}}</span></li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="products-bottom">
      <record v-if="flg" ></record>
    </div>
  </div>
</template>

<script>
  const record = () => import ('./components/record.vue')
  const centerkline = () => import('./components/centerkline.vue')
  import { mapState } from 'vuex'

  import { getSocket} from '../../assets/js/websocket.js'
  import { MARKET_LIST,MARKET_ALL } from '../../store/mutation-types' // 存储深度
  export default {
    data() {
      return {
        // webscok
        wsData: [], // 保存 websocket 数据对象
        marketid:0,// 传入id
        websock: null,
        flg:false,
        marketList: {}, // 深度
        sellList:[], // 卖出
        buyList:[], // 买入
        tradeList:[], // 交易
        market:{} ,// 市场
        proportion:0,// 比例
        proportionlist:0,
        value: 'USDT',
      }
    },
    components: {
      record,
      centerkline
    },
    computed: {
      ...mapState({
        allMarketList: state => state.websocket.allMarketList
      })
    },
    created() {
      this.getSocketData()
      this.getSocketData1()
    },
    destroyed() {
      this.wsData.close(); // 关闭 websocket
    },
    methods: { 
      handleClick(){
        this.$refs.child.marketAllid(item);
      },

      getSocketData() {
       this.$store.dispatch('getSocketData')
      },
      getSocketData1() {
        let params = {
          channel: "marketAll", 
        }
        getSocket(JSON.stringify(params), (data, ws) => {
          let id = data.marketAll[0].marketId
          this.$store.commit(MARKET_ALL, data.marketAll)
          this.marketAll =  data.marketAll
          this.flg = true
          this.getSocketData2(id)
        });
      },
      getSocketData2(id) {
        let params = {
          channel: "marketById", 
          marketId: id,
        }
        getSocket(JSON.stringify(params), (data, ws) => {
          // this.$store.commit(MARKET_LIST, data)
          this.marketList = data
          this.market = data.market
          this.buyList = data.buyList
          this.sellList = data.sellList
          this.tradeList = data.tradeList
          let b = this.sellList.reduce(function(prev, i) {
            return i.qty + prev
          }, 0);
          let c = this.buyList.reduce(function(prev, i) {
            return i.qty + prev
          }, 0);
          this.proportion = b
          this.proportionlist = c // 比例
        });
      },
    },
  }
</script>

<style lang="scss">
  .products {
    padding: 75px 0 5px;
    background: #010E20;
    color: #fff;

    .products-top {
      padding-bottom: 5px;

      .red {
        color: #e2505b !important;
      }

      .reds {
        background-color: #f33e3f36;
        height: 30px;
        position: absolute;
        right: 0;
      }

      .green {
        color: #01bd8b !important;
      }

      .greens {
        background-color: #1baf8236;
        height: 30px;
        position: absolute;
        right: 0;
      }

      .title {
        font-size: 14px;
        color: #fff;
        background: #002658;
        padding: 10px;
        // border-bottom: 1px solid #1f314d;
      }

      .grid-content {
        background: #031937;
        height: 1117.5px;
      }

      span:first-of-type {
        text-align: left;
        padding-left: 15px;
      }

      span:last-of-type {
        text-align: right;
        padding-right: 15px;
      }

      span {
        width: 33.3%;
        text-align: center;
        padding: 8px 0;
        font-size: 12px;
        color: #9eaebd;
      }

      .bg-purple1 {
        .currencynav {
          width: 100%;
          overflow-x: hidden;

          li {
            padding: 15px 10px;
            color: #919598;
            cursor: pointer;
            font-size: 12px;
            border-bottom: 1px solid #1f314d;

            span {
              display: block;
              padding-top: 5px;

            }

            span:first-of-type {
              color: #dfdfdf;
              width: 100%;
              padding-left: 0;
            }

            span:last-of-type {
              color: #dfdfdf;
              text-align: left;
              padding-left: 0;
            }

            .name {
              font-size: 13px;
              color: #7fa6fb;
              display: flex;
              justify-content: space-between;
            }
          }

          li.active,
          li:hover {
            background: #021e43;
          }
        }
      }

      .bg-purple4 {
        overflow: auto;
      }

      .bg-purple3 {
        .t_tbs {
          width: 100%;

          .t_tits {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background: #1a2639;
          }

          .p_hight {
            height: 453px;
          }

          .menu_nav {
            overflow: auto;

            li {
              display: flex;
              position: relative;
              cursor: pointer;
            }
          }
        }
      }
    }

    .products-bottom {
      height: 563px;
      background: #031937;
    }

  }
</style>
