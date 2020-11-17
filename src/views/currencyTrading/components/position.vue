<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%;height: 570px; background: #031937; overflow: auto;">
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
          <span>{{timestampToTimes(scope1.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="委托价" min-width="100" align="center">
          <template slot="header" slot-scope="scope">
            <span>委托价（{{name.rightCoinName}}）</span>
          </template>
        </el-table-column>
        <el-table-column prop="qty" label="委托量" min-width="100" align="center">
          <template slot="header" slot-scope="scope">
            <span>委托量（{{name.leftCoinName}}）</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="成交量" min-width="100" align="center">
          <template slot="header" slot-scope="scope">
            <span>成交量（{{name.leftCoinName}}）</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status!= -1 && scope.row.status!=3" class="btn" @click="handleEdit(scope.row,scope.column)">撤单</el-button>
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
  // import { getSocket } from '@/assets/js/websocket.js'
  
  // 交易账户tab页
  export default {
    data() {
      return {
        timestampToTimes:timestampToTimes,
        tableData: [],
        name:{},
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
        marketAll: state => state.websocket.marketAll,
        // userOrder: state => state.websocket.userOrder,
        userOrder: function(state) {
          if (state.property.userOrder.length > 0) {
            let ids = state.property.userOrder
            this.tableData = ids
            let a = this.tableData[0] || []
              this.name={
                leftCoinName:a.leftCoinName,
                rightCoinName:a.rightCoinName
              }
            }
          return state.property.userOrder
        },
      })
    },
    methods: {
      // 调用撤单接口
      async handleEdit(e,r){
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
