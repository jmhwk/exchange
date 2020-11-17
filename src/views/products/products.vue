<template>
  <div class="products">
    <div class="products-top">
      <el-row :gutter="8">
        <el-col :span="3">
          <div class="grid-content bg-purple1">
            <div class="title">USDT合约</div>
            <ul class="currencynav n_hight">
              <li v-for="(item,index) in lendMaeketAll" :key="index" @click="handleClick(item,index)">
                <div :class="{activelist:index ==num}" v-if="item.coinName=='BTC'||item.coinName=='ETH'" class="active listnum" >
                  <div class="name"><label>{{item.coinName}}/{{item.marketCoinName}} 永续合约</label>
                    <label class="red" v-if="item.incRate<0">{{item.incRate}}%</label>
                    <label class="green" v-else>+{{item.incRate}}%</label>
                  </div>
                  <span>{{item.lastTradePrice.toFixed(2)}} ≈
                    {{item.cnyPrice.toFixed(2)}} CNY</span>
                </div>

              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="15">
          <div class=" bg-purple2" style="width: 100%;height: 1110px;background: #031937;">
           <centerkline ref="child" v-if="flg" ></centerkline>
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
              <div style="max-height: 586px;overflow: auto;">
                <ul id="handicap" class="menu_nav">
                  <li v-for="(t,i) in lendallList.sellList" :key="i" @click="pricelist(t.price)">
                    <span class="red">{{t.price}}</span>
                    <span>{{t.qty}}</span>
                   <!-- <span>{{t.amount}}</span> -->
                   <div class="reds" :style="{width: (t.qty)/proportionList.proportionred*100 + '%' }"></div>
                  </li>
                </ul>
              </div>
              <el-row class="t_tits"><el-col :span="24">最新价格(USDT)</el-col></el-row>
              <div style="height: 660px;">
                <ul class="menu_nav p_hight">
                  <li v-for="(t,i) in lendallList.buyList" :key="i" @click="pricelist(t.price)">
                    <span class="green">{{t.price}}</span>
                    <span>{{t.qty}}</span>
                <!--    <span>{{t.amount}}</span> -->
                   <div class="greens" :style="{width: (t.qty)/proportionList.proportiongreen*100 + '%' }"></div>
                    <!-- <div class="greens" style="width: 20.1364%;"></div> -->
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple3 bg-purple4">
            <div class="title">最新成交</div>
            <div class="t_tbs">
              <el-row class="t_tits" :gutter="10">
                <el-col :span="7">时间</el-col>
                <el-col :span="9">价格(USDT)</el-col>
                <el-col :span="8">数量(BTC)</el-col>
              </el-row>
              <ul class="menu_nav n_hight">
                <li v-for="(item, index) in lendallList.tradeList" :key="index" @click="pricelist(item.price)"><span>{{item.createTime}}</span>
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
      <record v-if="flg"></record>
    </div>
  </div>
</template>

<script>
  const record = () => import ('./components/record.vue')
  const centerkline = () => import('./components/centerkline.vue')
  import { mapState } from 'vuex'
  import { LENDMAEKET_ALL,LATES_TCONTRACT,LENDALL_LIST,PROPORTION_LIST,CONTRA_FORM } from '../../store/mutation-types' // 存储深度
  export default {
    data() {
      return {
        websock: null,
        moneylist:[],
        // all:[{show:isshow}],
        // isshow:false,
        flg:false,
        // marketList: {}, // 深度
        sellList:[], // 卖出
        buyList:[], // 买入
        tradeList:[], // 交易
        // market:{} ,// 市场
        // proportion:0,// 比例
        // proportionlist:0,
        // recent:0,// 最新价格第一个
        id:0,
        idlist:0,
        newlist:0,
        timer:null,// 清除定时器
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
        lendMaeketAll: state => state.websocket.lendMaeketAll,
        lendallList: state => state.websocket.lendallList ,// 所有数据
        proportionList: state => state.websocket.proportionList // 所有数据比例
      }),
    },
    beforeDestroy(){
      clearInterval(this.timer);　　// 清除定时器
      this.timer = null;
    },
    created() {
      const data = {
        channel: "lendMarketAll", 
      };
      this.socketApi.sendSock(data, this.getConfigResult);
    },
    methods: {
      pricelist(money){
        let contraForm={
          Buying:money,
          selling:money
        }
        // let contraForm = {price:money}
        this.$store.commit(CONTRA_FORM, contraForm)
      },
      // 接收socket回调函数返回数据的方法
      getConfigResult(data) {
        // console.log('实时数据',data.channel)
        if(data.channel== "lendMarketAll"){
           this.moneylist = data.marketAll
           this.$store.commit(LENDMAEKET_ALL, data.marketAll)
           // let a = res.marketAll[0].marketId
           let ids = data.marketAll[0].marketId
           if(ids !=this.id){
            this.idlist = ids
            let data = {channel: "lendMarketById",marketId: ids,event:'add',};
            this.socketApi.sendSock(data, this.getConfigResult);
            // this.id = data.marketAll[0].marketId
           }
           this.id = data.marketAll[0].marketId
          // console.log(res);//服务端返回的数据
        }else if (data.channel== "lendMarketById"){
          this.$store.commit(LATES_TCONTRACT, data.tradeList[0].price)
          this.$store.commit(LENDALL_LIST, data)
          // this.market = data.market ||{}
          // this.marketList = data || {}
          // this.buyList = data.buyList || []
          // this.sellList = data.sellList||[]
          // this.tradeList = data.tradeList||[]
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
          this.flg = true
        }
      },
      handleClick(item,index){
        // this.handicap(this.idlist,'remove')
        this.num = index
        let data = {channel: "lendMarketById",marketId: this.idlist,event:'remove',};
        this.socketApi.sendSock(data, this.getConfigResult);
        this.newlist = item.marketId
        this.timer=setTimeout(()=>{
          let data = {channel: "lendMarketById",marketId: this.newlist,event:'add',};
          this.socketApi.sendSock(data, this.getConfigResult);
          // this.$refs.child.marketAllid(item,index);
        }, 2000);
           this.$refs.child.marketAllid(item,index);
        // this.timer=setTimeout(()=>{
        //   this.$refs.child.marketAllid(item,index);
        // }, 1000);
        // this.$refs.child.marketAllid(item,index);
      },
    },
  }
</script>

<style lang="scss" scoped>
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
        height: 1232px;
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
        width: 38%;
        text-align: center;
        padding: 8px 0;
        font-size: 12px;
        color: #9eaebd;
        z-index: 2;
      }

      .bg-purple1 {
        .currencynav {
          width: 100%;
          // overflow: auto;

          .listnum {
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
            height: 586px;
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
