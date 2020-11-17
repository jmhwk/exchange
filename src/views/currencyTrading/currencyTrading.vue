<template>
  <div class="products">
    <div class="products-top">
      <el-row :gutter="5">
        <el-col :span="3">
          <div class="grid-content bg-purple1">
            <div class="title">市场</div>
            <ul class="currencynav n_hight">
              <li class="active" v-for="(item,index) in marketAll" :key="index" @click="handleClick(item,index)" :class="{activelist:index ==num}">
                <div class="name"><label>{{item.coinName}}/{{item.marketCoinName}}</label>
                  <label class="red" v-if="item.incRate<0">{{item.incRate}}%</label>
                  <label class="green" v-else>+{{item.incRate}}%</label>
                </div>
                <span>{{numFor(item.lastTradePrice)}} ≈
                  {{numFor(item.cnyPrice*item.lastTradePrice)}} CNY</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="15">
          <div class=" bg-purple2" style="width: 1490;height: 1110px;background: #031937;">
            <centerkline ref="child"v-if="flg"></centerkline>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple3">
            <div class="title">盘口</div>
            <div class="t_tbs">
              <el-row class="t_tits">
                <el-col :span="12">价格(USDT)</el-col>
                <el-col :span="12">数量(BTC)</el-col>
              </el-row>
              <div style="height: 535px;">
                <ul id="handicap" class="menu_nav">
                  <li v-for="(t,i) in cionList.sellList" :key="i"  @click="pricelist(t.price)">
                    <span class="red">{{t.price}}</span>
                    <span>{{t.qty}}</span>
                   <!-- <span>{{t.amount}}</span> -->
                   <div class="reds" :style="{width: (t.qty)/proportionCion.proportionred*100 + '%' }"></div>
                  </li>
                </ul>
              </div>
              <el-row class="t_tits"><el-col :span="24">最新价格(USDT)</el-col></el-row>
              <div style="height: 535px;">
                <ul class="menu_nav p_hight">
                  <li v-for="(t,i) in cionList.buyList" :key="i"  @click="pricelist(t.price)">
                    <span class="green">{{t.price}}</span>
                    <span>{{t.qty}}</span>
                    <div class="greens" :style="{width: (t.qty)/proportionCion.proportiongreen*100 + '%' }"></div>
                  </li>
                </ul>
              </div>  
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple3 bg-purple4">
            <div class="title">实时成交</div>
            <div class="t_tbs">
              <el-row class="t_tits" :gutter="10">
                <el-col :span="7">时间</el-col>
                <el-col :span="9">价格(USDT)</el-col>
                <el-col :span="8">数量(BTC)</el-col>
              </el-row>
              <ul class="menu_nav n_hight">
                <li v-for="(item, index) in cionList.tradeList" :key="index" @click="pricelist(item.price)"><span>{{item.createTime}}</span>
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

  import { numFor} from '@/assets/js/time.js'
  import { MARKET_ALL,CION_LIST, PROPORTION_CION,COINS_FORM } from '../../store/mutation-types' // 存储深度
  export default {
    data() {
      return {
        // webscok
        numFor:numFor,
        wsData: [], // 保存 websocket 数据对象
        // moneylist:[],// 币对数据
        marketid:0,// 传入id
        flg:false,
        sellList:[], // 卖出
        buyList:[], // 买入
        tradeList:[], // 交易
        // proportion:0,// 比例
        // proportionlist:0,
        recent:0,// 最新价格第一个
        id:0,
        timer:null,
        num:0,
      }
    },
    components: {
      record,
      centerkline
    },
    computed: {
      ...mapState({
        allMarketList: state => state.websocket.allMarketList,
        marketAll: state => state.websocket.marketAll,
        cionList: state => state.websocket.cionList ,// 所有数据
        proportionCion: state => state.websocket.proportionCion, // 所有数据比例
      })
    },
    created() {
      let params = {
        channel: "marketAll", 
      }
      this.socketApi.sendSock(params, this.getConfigResult)
    },
    methods: { 
      pricelist(money){
        let contraForm={
          Buying:money,
          selling:money
        }
        // let contraForm = {price:money}
        this.$store.commit(COINS_FORM, contraForm)
      },
      handleClick(item,index){
        this.num = index
        // this.$refs.child.marketAllid(item,index);
        this.getSocketData2(this.id,'remover')
        this.timer=setTimeout(()=>{
          this.getSocketData2(item.marketId,'add')
          // this.$refs.child.marketAllid(item,index);
        }, 2400);
        this.timer=setTimeout(()=>{
          this.$refs.child.marketAllid(item,index);
        }, 1500);
      },

      // getSocketData() {
      //  this.$store.dispatch('getSocketData')
      // },
      // getSocketData1() {

      // },
      // 所有回调
      getConfigResult(data){
        if(data.channel=="marketAll"){
          let ids = data.marketAll[0].marketId
          this.moneylist = data.marketAll
          this.$store.commit(MARKET_ALL, data.marketAll)
          if(ids !=this.id){
            this.getSocketData2(ids,'add')
          }
          this.id= data.marketAll[0].marketId
          // this.flg = true
        }else if(data.channel=="marketById"){
          this.$store.commit(CION_LIST, data)
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
          this.flg = true
        }
      },
      getSocketData2(id,remover) {
        let params = {
          channel: "marketById", 
          marketId: id,
          event:remover
        }
        this.socketApi.sendSock(params, this.getConfigResult)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .products {
    padding: 75px 0 5px;
    background: #010E20;
    color: #fff;
    overflow: hidden;
    .products-top {
      padding-bottom: 5px;

      .red {
        color: #e2505b !important;
      }

      .reds {
        background-color: #332038;
        height: 30px;
        position: absolute;
        right: 0;
      }

      .green {
        color: #01bd8b !important;
      }

      .greens {
        background-color: #073746;
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
        height: 1136px;
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
        z-index:1,
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
          li.active{
            background: #021e43;
          }
          .activelist{
            background: #002658!important;
          }
          li:hover {
            background: #002658;
          }
        }
      }

      .bg-purple4 {
        overflow: auto;
        overflow-x: hidden;
      }

      .bg-purple3 {
        .t_tbs {
          width: 100%;

          .t_tits {
            padding: 10px 8px;
            background: #1a2639;
            font-size: 12px;
            color: #9eaebd;
          }
          #handicap{
            display: flex;
            flex-direction:column;
            width: 100%;
          }
          .p_hight {
            height: 535px;
          }

          .menu_nav {
            overflow: auto;
            height: 100%;
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
