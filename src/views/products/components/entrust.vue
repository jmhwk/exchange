<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100% ; background: #031937!important;" height="500">
        <el-table-column prop="typesOfCurrency" label="币对" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.leftCoinName}}&nbsp;/&nbsp;{{scope1.row.rightCoinName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="方向" min-width="80" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty color_three" v-if="scope1.row.isBrust">{{scope1.row.isBrust==1?'强制平仓':''}}</span>
            <span class="statusSty"  :class="scope1.row.type | statusFilter" v-else>{{scope1.row.type| formatStata}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" min-width="110" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{timestampToTimes(scope1.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="triggerPrice" label="触发价格" min-width="120" align="center" :formatter="fmtLengthFloat"/>
        <el-table-column prop="stopPrice" label="委托价格" min-width="120" align="center" :formatter="fmtLengthFloat"/>
        <el-table-column prop="earnPrice" label="止盈价格" min-width="120" align="center" :formatter="fmtLengthFloat"/>
        <el-table-column prop="lossPrice" label="止损价格" min-width="120" align="center" :formatter="fmtLengthFloat"/>
        <el-table-column prop="qty" label="委托量" min-width="120" align="center">
          <template slot="header" slot-scope="scope">
            <span>委托总量（{{name.leftCoinName}}）</span>
          </template>
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
  import { lendcancelOrder , lendorderList} from '@/api'
  import {
    mapState
  } from 'vuex'
  import {timestampToTimes,fmtLengthFloat} from '@/assets/js/time.js'
  // 交易账户tab页
  export default {
    data() {
      return {
        timestampToTimes:timestampToTimes,
        fmtLengthFloat:fmtLengthFloat,
        value: true,
        tableData:[],
        name:{leftCoinName:'',rightCoinName:''},
        pagesize: 15, // 一页14条
        currentPage:1,// 默认第一页
        total: 0,// 总页数
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
      }
    },
    computed: {
      ...mapState({
        user: state => state.user.user,
        lendMaeketAll: state => state.websocket.lendMaeketAll
      })
    },
    created() {
      this.orderList()
    },
    methods: {
      // 订单详情接口
      async orderList() {
        this.tableData=[]
        let parm = {
            "orderType": 3,
            "pageNumber": this.currentPage,
            "pageSize": this.pagesize,
          }
        const result = await lendorderList(parm)
        if (result.code == 200) {
          let a = result.data.records
          this.total = result.data.total
          if(a.length!=0){
            this.tableData = result.data.records
            let b = this.tableData[0]
            this.name={
              leftCoinName:b.leftCoinName,
              rightCoinName:b.rightCoinName
            }
          }else{
            this.tableData=[]
          }
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      // 调用撤单接口
      async handleEdit(e){
        let pram = {
          id: e.id,
          orderType: e.orderType,
          userId:e.userId
        }
       
        const result = await lendcancelOrder(pram)
        if (result.code == 200) {
           this.$message({
             message: '撤单成功',
             type: 'success'
           })
           this.orderList()
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