<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="币对" min-width="110" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.leftCoinName}}&nbsp;/&nbsp;{{scope1.row.rightCoinName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="方向" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty color_two">买入</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="时间" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
          <span>{{timestampToTimes(scope1.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="委托价" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="qty" label="委托量" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="tradeQty" label="成交量" min-width="100" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status!= -1 && scope.row.status!=3" class="btn" @click="handleEdit(scope.row)">撤单</el-button>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { orderList,cancelOrder } from '@/api'
  import {
    mapState
  } from 'vuex'
  import {timestampToTimes} from '@/assets/js/time.js'
  import { getSocket } from '@/assets/js/websocket.js'
  
  // 交易账户tab页
  export default {
    data() {
      return {
        timestampToTimes:timestampToTimes,
        value: true,
        tableData: [],
        CoinName:{
          leftCoinName:'',
          rightCoinName:''
        },
        options: [{
          value: '1',
          label: '全部交易对'
        }],
        options1: [{
          value: '1',
          label: '普通委托'
        }],
        options2: [{
            value: '0',
            label: '全部方向'
          },
          {
            value: '1',
            label: '买入'
          },
          {
            value: '2',
            label: '卖出'
          },
        ],
        options3: [
          {
            value: '0',
            label: '全部状态'
          },
          {
            value: '-1',
            label: '已撤单'
          },
          {
            value: '3',
            label: '已完成'
          },
          
        ],
        value: '1',
        value1: '1',
        value2: '1',
        value3: '0',
        
      }
    },
    computed: {
      ...mapState({
        user: state => state.user.user,
        allMarketList: state => state.websocket.allMarketList,
        marketAll: state => state.websocket.marketAll
      })
    },
    created() {
      // this.orderList()
      this.getSocketData()
    },
    methods: {
      selectchange(e,index,value){
        if(index == 1){
          this.orderList(e,value)
        }else{
          this.orderList(e,value)
        }
      },
      // 当前委托订单
      getSocketData() {
        let id = this.marketAll[0]
        let params = {
          channel: "userOrder", 
          marketId:id.marketId, 
          userId: this.user.id
        }
        getSocket(JSON.stringify(params), (data, ws) => {
          this.tableData= data.orderList
        });
      },
      // 调用撤单接口
      async handleEdit(e){
        let pram = {
          id: e.id,
          orderType: 1
        }
        const result = await cancelOrder(pram)
        if (result.code == 200) {
           this.$message({
             message: '撤单成功',
             type: 'success'
           })
           this.getSocketData()
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
    }
  }
</script>

<style lang="scss">
  .Tab1-subcontainer {
    display: flex;
    flex-direction: column;
    .pad{
      padding: 0 10px;
    }
    .subcontainer-bottom {
      flex: 1;

      .el-table::before {
        background-color: $blue;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }
      .el-input__inner {
        height: 35px !important;
        background: #031937;
        border-color: #4d5c71;
        color: #fff !important;
      }
      // .el-table__header {
      //   background-color: $blue;
      // }

      .el-table th {
        opacity: 0.61;
      }

      .el-table th,
      .el-table tr {
        color: #fff;
        background-color: $blue;
      }
      // .el-table th>.cell{
      //   width: 60%;
      // }
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }
      // .el-select__caret{
      //   padding: 4px 0;
      // }
      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #002658 !important;
        opacity: 1;
      }
      // .el-input__suffix{
      //   top: px;
      // }
      .btn {
        width: 46px;
        height: 21px;
        padding: unset;
        font-size: 12px;
        background-color: $blue;
        color: $money-blue;
        border-color: $money-blue;
      }
    }

    .pagination {
      margin-bottom: 27px;
      display: flex;
      justify-content: center;

      .el-pagination {
        background-color: $blue;
        display: inline-block;

        >button,
        >ul li {
          color: rgba($color: #fefefe, $alpha: 0.8);
          background-color: $blue;
        }

        .active {
          color: #1476FE;
        }
      }
    }
  }
</style>
