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
   <!--     <div class="pagination">
          <el-pagination layout="prev, pager, next" :total="50" />
        </div> -->
      </div>
      <div class="subcontainer-bottom" v-show="num==1">
        <el-table :data="balance" style="width: 100%">
          <el-table-column prop="coinName" label="币种" min-width="180" align="center" />
          <el-table-column prop="allowanceBalance" label="可用" min-width="180" align="center" />
          <el-table-column prop="walletFreezingBalance" label="冻结" min-width="180" align="center" />
        </el-table>
<!--        <div class="pagination">
          <el-pagination layout="prev, pager, next" :total="50" />
        </div> -->
      </div>
      <div class="subcontainer-bottom" v-show="num==2">
       <ul>
          <li>永续合约净资产  <span>{{headnav.contractBalance|numFilter}}USDT</span><span> {{headnav.contractBalance*sumListcny|numFilter}} ≈ CNY</span></li>
          <li>USDT保证金合约净资产<span>0USDT</span><span>0 ≈ CNY</span></li>
        </ul>
        <el-table :data="contractBalance" style="width: 100%">
          <el-table-column prop="contractBalance" label="BTCUSD账户权益" min-width="180" align="center" />
          <el-table-column prop="contractProfitLoss" label="已实现盈亏" min-width="180" align="center" />
          <el-table-column prop="contractProfitLossNo" label="未实现盈亏" min-width="180" align="center" />
          <el-table-column prop="contractUsedMargin" label="已用保证金" min-width="180" align="center" />
          <el-table-column prop="contractMarginRate" label="保证金率" min-width="180" align="center" />
        </el-table>
      </div>
      <div class="subcontainer-bottom" v-show="num==3">
       <ul>
          <li>理财净资产  <span>{{financialheadnav.financialheadnav|numFilter}}</span><span> ≈ ￥{{financialheadnav.financialheadnav*sumListcny|numFilter}} </span></li>
          <li>冻结资产<span style="color: #1476FE;">{{financialheadnav.financialFreezingBalance|numFilter}}AUTT</span></li>
        </ul>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="earnTime" label="理财时间" min-width="180" align="center" />
          <el-table-column prop="earn" label="收益" min-width="180" align="center" />
        </el-table>
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
  // 交易账户tab页
  export default {
    filters: {
      numFilter (value) {
        // 截取当前数据到小数点后两位
        let realVal = parseFloat(value).toFixed(2)
        return realVal
      }
    },
    data() {
      return {
        arrlist:[{name:'法币'},{name:'币币'},{name:'永续合约'},{name:'理财'},{name:'跟单账户'}],
        num:0,
        value: true,
        activeName: 'tab1',
        tableData: [],
      }
    },
    computed: {
      ...mapState({
        sumListcny: state => state.property.sumlistcny,
        otcBalance: state => state.property.otcBalance,
        balance: state => state.property.balance,
        contractBalance: state => state.property.contractBalance,
        financialBalance: state => state.property.financialBalance,
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
        this.num=index
      },
      // 理财明细
      async financialUserRecord() {
        const result = await financialUserRecord()
        if (result.code == 200) {
          this.tableData = result.data
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

<style lang="scss">
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
