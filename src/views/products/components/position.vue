<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="lenduserOrder" style="width: 100%; background: #031937!important;" height="500">
        <el-table-column prop="typesOfCurrency" label="币对" min-width="110" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.leftCoinName}}&nbsp;/&nbsp;{{scope1.row.rightCoinName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="方向" min-width="80" align="center">
          <template slot-scope="scope1" align="center">
          <span class="statusSty" :class="scope1.row.type | statusFilter" >{{scope1.row.type| formatStata}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="时间" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
          <span>{{timestampToTimes(scope1.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="委托价" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="qty" label="委托量" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="tradeQty" label="成交量" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="marginAmount" label="保证金" min-width="100" align="center">
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
  import { orderList,lendcancelOrder } from '@/api'
  import {
    mapState
  } from 'vuex'
  import {timestampToTimes} from '@/assets/js/time.js'
  // 交易账户tab页
  export default {
    data() {
      return {
        timestampToTimes:timestampToTimes,
        value: true,
        tableData: [],
        timer:null,
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
    filters:{
      // 颜色转换
      statusFilter(status) {
        const statusMap = {
          1: 'color_two',
          2: 'color_three',
          3: 'color_two',
          4: 'color_three', 
        }
        return statusMap[status]
      },
      // 状态显示转换1 买入开多 2 卖出开空 3卖出平多 4买入平空
      formatStata(status) {
        const statusMap = {
          1: '买入开多',
          2: '卖出开空',
          3: '买入平空',
          4: '卖出平多'
        }
        return statusMap[status]
      },
    },
    computed: {
      ...mapState({
        lenduserOrder: state => state.websocket.lenduserOrder,
      })
    },
    beforeDestroy(){
      clearInterval(this.timer);　　// 清除定时器
      this.timer = null;
    },
    methods: {
      // 当前委托订单
      // getConfigResult(data) {
      //   if(data.channel == "lendUserOrder"){
      //      this.tableData= data.orderList
      //   }
        
      // },
      // 调用撤单接口
      async handleEdit(e){
        let pram = {
          id: e.id,
          orderType: 1,
          userId:e.userId
        }
        const result = await lendcancelOrder(pram)
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