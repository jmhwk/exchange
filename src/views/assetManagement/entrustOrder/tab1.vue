<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
            <el-select v-model="value2" placeholder="请选择"  @change="selectchange(value2,1,value3)">
              <el-option 
              v-for="item in options2" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"
              >
              </el-option>
            </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value3" placeholder="请选择"  @change="selectchange(value3,2,value2)">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="币对" min-width="110" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.leftCoinName}}&nbsp;/&nbsp;{{scope1.row.rightCoinName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="方向" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
          <span class="statusSty" :class="scope1.row.type | statusFilter" >{{scope1.row.type| formatStata}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="时间" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{timestampToTimes(scope1.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="委托价" min-width="100" align="center"/>
        <el-table-column prop="qty" label="委托量" min-width="100" align="center"/>
        <el-table-column prop="tradeQty" label="成交量" min-width="100" align="center"/>
        <el-table-column prop="--" label="成交均价" min-width="100" align="center">
          <template slot-scope="scope" align="center">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="成交总额" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{(scope1.row.tradeQty*scope1.row.qty)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty"  :class=" scope1.row.status | placeFilter">{{scope1.row.status | placeStata}}</span>
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
   <div class="pagination">
      <el-pagination
         layout="prev, pager, next" 
         @current-change="current_change"
         :page-size="pagesize"
         :total="total"
       />
    </div>
  </div>
</template>

<script>
  import { cancelOrder , orderList} from '@/api'
  import {timestampToTimes} from '@/assets/js/time.js'
  // 交易账户tab页
  export default {
    filters:{
       // 订单状态
      placeStata(status) {
        const statusMap = {
          '-1':'已撤单',
          0: '已下单',
          1: '待撮合',
          2: '撮合中',
          3: '已完成'
        }
        return statusMap[status]
      },
      // 颜色转换
      placeFilter(status) {
        const statusMap = {
          '-1': 'color_three',
          0:'color_one',
          1:'color_four',
          2:'color_five',
          3: 'color_two',
        }
        return statusMap[status]
      },
      // 颜色转换
      statusFilter(status) {
        const statusMap = {
          1: 'color_two',
          2: 'color_three',
        }
        return statusMap[status]
      },
      // 状态显示转换
      formatStata(status) {
        const statusMap = {
          1: '买入',
          2: '卖出',
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        timestampToTimes:timestampToTimes,
        tableData: [],
        pagesize: 15, // 一页15条
        currentPage:1,// 默认第一页
        total: 0,// 总页数
        pull:'',// 下拉
        down:'',// 下拉1 
        direction:1, // 第一个
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
        value2: '0',
        value3: '0',
        
      }
    },
    created() {
      this.orderList()
    },
    methods: {
      selectchange(e,index,value){
        // e,方向，index是哪个按钮,value，状态
        this.currentPage = 1;
        if(index == 1){
          this.orderList(value,e)
          this.direction=index
          this.pull = value
          this.down = e
        }else{
          this.orderList(e,value)
          this.direction=index
          this.pull = e
          this.down = value
        }
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
           this.orderList()
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      current_change(currentPage) {
        this.currentPage = currentPage;
        if(this.direction == 1){
          this.orderList(this.pull,this.down)
        }else{
          this.orderList(this.pull,this.down)
        }
        
      },
      // 订单详情接口
      async orderList(e,v) {
        this.tableData=[]
        let parm = {
            "orderType": "1",
            "pageNumber": this.currentPage,
            "pageSize": this.pagesize,
            "status":e==0?'':e, // 状态
            "type":v==0?'': v // 方向
          }
          console.log('shuju',this.pagesize)
        const result = await orderList(parm)
        if (result.code == 200) {
          let a = result.data.records
          this.total = result.data.total
          if(a.length!=0){
            this.tableData = result.data.records
            
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
    .subcontainer-top {
      padding: 15px 20px;
      color: #fff;
      // border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      font-size: 14px;
      .el-input__inner {
        height: 35px !important;
        background: #031937;
        border-color: #4d5c71;
      }
      .el-table th>.cell{
        width: 60%;
      }
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
