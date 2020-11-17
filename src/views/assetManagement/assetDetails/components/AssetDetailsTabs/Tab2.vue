<template>
  <div class="Tab2-subcontainer height678">
    <div class="top">
       <ul>
         <li v-for="(item,index) in arrlist" :key="index" :class="{active:num==index}" @click="handleClick(index)">{{item.name}}</li>
       </ul>
    </div>
    <div style="height: 100%;">
      <div class="subcontainer-bottom" v-show="num==0">
        <el-table :data="otcBalance" style="width: 100%">
          <el-table-column prop="coinName" label="币种" min-width="180" align="center" />
          <el-table-column prop="allowanceBalance" label="可用" min-width="180" align="center" />
          <el-table-column prop="walletFreezingBalance" label="冻结" min-width="180" align="center" />
        </el-table>
      </div>
      <div class="subcontainer-bottom" v-show="num==1">
        <el-table :data="balance" style="width: 100%">
          <el-table-column prop="coinName" label="币种" min-width="180" align="center" />
          <el-table-column prop="allowanceBalance" label="可用" min-width="180" align="center" />
          <el-table-column prop="walletFreezingBalance" label="冻结" min-width="180" align="center" />
        </el-table>
      </div>
      <div class="subcontainer-bottom" v-show="num==2">
       <ul>
          <li>永续合约净资产  <span>{{numFilter(headnav.contractBalance)}}USDT</span><span> ≈ {{numFilter(headnav.contractBalance*sumListcny)}} CNY</span></li>
          <li>USDT保证金合约净资产<span>{{ numFilter(headnav.contractUsedMargin) }}USDT</span><span> ≈ {{ numFilter(headnav.contractUsedMargin*sumListcny) }} CNY</span></li>
        </ul>
        <el-table :data="contractBalance" style="width: 100%">
          <el-table-column prop="coinName" label="币种" min-width="180" align="center"/>
          <el-table-column prop="contractBalance" label="账户权益" min-width="180" align="center" :formatter="fmtLengthFloat"/>
          <el-table-column prop="contractProfitLoss" label="已实现盈亏" min-width="180" align="center" :formatter="fmtLengthFloat" />
<!--          <el-table-column prop="contractProfitLossNo" label="未实现盈亏" min-width="180" align="center" :formatter="fmtLengthFloat" /> -->
          <el-table-column prop="contractUsedMargin" label="已用保证金" min-width="180" align="center" :formatter="fmtLengthFloat" />
          <el-table-column prop="contractBalance1" label="可用保证金" min-width="180" align="center" :formatter="fmtLengthFloat"/>
          <el-table-column prop="contractMarginRate" label="保证金率 (%)" min-width="180" align="center" :formatter="fmtLengthFloat" />
        </el-table>
      </div>
      <div class="subcontainer-bottom" v-show="num==3">
       <ul>
          <li>理财净资产  <span>{{ numFilter(financialheadnav.financialheadnav) }}</span><span> ≈ ￥{{ numFilter(financialheadnav.financialheadnav*sumListcny) }} </span></li>
          <li>冻结资产    <span style="color: #1476FE;">{{ numFilter(financialheadnav.financialFreezingBalance) }}AUTT</span></li>
          <li>理财累计收益   <span style="color: #1476FE;">{{numbertal}}AUTT</span></li>
        </ul>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="earnTime" label="理财类别" min-width="180" align="center" >
            <template slot-scope="scope1" align="center">
              <span class="listnum">{{scope1.row.financialType == 2 ? "推荐收益" : "理财收益",}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="earnTime" label="理财时间" min-width="180" align="center" />
          <el-table-column prop="earn" label="收益" min-width="180" align="center" />
        </el-table>
      </div>
      <div class="pagination" v-show="num==4">
         <el-pagination
            layout="prev, pager, next" 
            @current-change="current_change"
            :page-size="pagesize"
            :total="total"
          />
       </div>
      <div class="subcontainer-bottom flexcentercenter" v-show="num==4">
          <div class=" thread">
            <img src="@/views/images/zanwujilu@2x.png" alt="">
            <p>即将上线，敬请期待</p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { financialUserRecord } from '@/api'
  import { fmtLengthFloat, numFilter } from '@/assets/js/time.js'
  // 交易账户tab页
  export default {
    // filters: {
    //   numFilter (value) {
    //     // 截取当前数据到小数点后两位
    //     let realVal = parseFloat(value).toFixed(2)
    //     return realVal
    //   }
    // },
    data() {
      return {
        arrlist:[{name:'法币'},{name:'币币'},{name:'永续合约'},{name:'理财'},{name:'跟单账户'}],
        num:0,
        value: true,
        activeName: 'tab1',
        tableData: [],
        fmtLengthFloat:fmtLengthFloat, // 
        numFilter:numFilter, // 保留两位小数
        pagesize: 10, // 一页14条
        currentPage:1,// 默认第一页
        total: 0,// 总页数
        numbertal:0,
      }
    },
    computed: {
      ...mapState({
        sumListcny: state => state.property.sumlistcny,
        otcBalance: state => state.property.otcBalance,
        balance: state => state.property.balance,
        contractBalance: state => state.property.contractBalance,
        // financialBalance: state => state.property.financialBalance,
        headnav: state => state.property.headnav,
        financialheadnav: state => state.property.financialheadnav,
      })
    },
    created(){
      this.financialUserRecord()
    },
    methods: {
      // tab切换
      handleClick(index) {
        this.currentPage = 1
        this.num=index
      },
      // 分页
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      // 理财明细
      async financialUserRecord() {
        let parms = this.currentPage+'/'+this.pagesize
        let result = await financialUserRecord (parms)
        if (result.code == 200) {
          this.numbertal = result.data.total
          this.tableData = result.data.list
        } else {
          that.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
    }
  }
</script>
<style lang="scss" scoped="scoped">
  .Tab2-subcontainer {
    display: flex;
    flex-direction: column;
    color: #fff;
    ul{
      padding: 20px 0;
      border-bottom: 1px dashed #1f324d;
      display: flex;
      li{
        padding: 0 35px;
      }
      .active{
        color: #1476FE;
      }
    }
    .top{
      li:hover{
        color: #1476FE;
        cursor:pointer;
      }
    }
    .subcontainer-bottom {
      flex: 1;
      font-size: 12px;
      height: 100%;
      .thread{
        img{
          width: 210px;
          height: 115px;
        }
        p{
          text-align: center;
          color: #677587;
        }
      }
      ul{
        span{
          padding: 0 5px;
          color: #1476FE;
        }
        span:last-child{
          color: #8a94a2;
        }
      }
      .el-table::before {
        background-color: $blue;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }
      .el-table__header {
        background-color: $blue;
      }
      .el-table__empty-block{
        background: #031937;
        color: #9ca5b1;
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
      margin: 27px;
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