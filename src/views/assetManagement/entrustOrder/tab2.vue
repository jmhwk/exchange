<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="8">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
            <el-select v-model="value2" placeholder="请选择"  @change="selectchange(value2)">
              <el-option 
              v-for="item in options2" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"
              >
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
        <el-table-column prop="tradeQty" label="成交量" min-width="100" align="center"  :formatter="fmtLength" />
        <el-table-column prop="price" label="成交均价" min-width="100" align="center" :formatter="fmtLength" />
        <el-table-column prop="" label="成交总额" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.tradeQty*scope1.row.qty||0}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty color_two">已完成</span>
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
  import { tradeList } from '@/api'
  import {timestampToTimes,fmtLength} from '@/assets/js/time.js'
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
        fmtLength:fmtLength,
        value: true,
        pagesize: 15, // 一页15条
        currentPage:1,// 默认第一页
        total: 0,// 总页数
        pull:0, // 下拉菜单
        CoinName:{
          leftCoinName:'',
          rightCoinName:''
        },
        tableData: [],
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
        value: '1',
        value1: '1',
        value2: '0',
      }
    },
    created() {
      this.tradeList()
    },
    methods: {
    current_change(currentPage) {
      this.currentPage = currentPage;
      this.tradeList(this.pull)
    },
      // 历史订单详情接口
      async tradeList(e) {
        let parm = {}
        if(e>0){
          parm = {
            "pageNumber": this.currentPage,
            "pageSize": this.pagesize,
            "orderType":e ||'',
          }
        }else{
          parm = {
            "pageNumber": 1,
            "pageSize": this.pagesize,
          }
        }

        const result = await tradeList(parm)
        if (result.code == 200) {
          let a = result.data.records
          if(a.length!=0){
            this.tableData = result.data.records
            this.total = result.data.total
            this.CoinName = {
              leftCoinName:this.tableData[0].leftCoinName||'',
              rightCoinName:this.tableData[0].rightCoinName||""
            }
          }
        } else {
          that.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      selectchange(e){
        this.pull = e
        this.tradeList(e)
      },
    }
  }
</script>

<style lang="scss">
  .Tab1-subcontainer {
    display: flex;
    flex-direction: column;

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

      .el-table__header {
        background-color: $blue;
      }

      .el-table th {
        opacity: 0.61;
      }

      .el-table th,
      .el-table tr {
        color: #fff;
        background-color: $blue;
      }

      .el-table td,
      .el-table th.is-leaf {
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #002658 !important;
        opacity: 1;
      }

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
