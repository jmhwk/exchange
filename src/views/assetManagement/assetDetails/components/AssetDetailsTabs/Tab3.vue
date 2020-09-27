<template>
  <div class="Tab3-subcontainer">
<!--    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="币种" min-width="130" align="center" />
        <el-table-column prop="accountEquity" label="账户权益" min-width="130" align="center" />
        <el-table-column prop="available" label="可用" min-width="130" align="center" />
        <el-table-column prop="margin" label="保证金" min-width="130" align="center" />
        <el-table-column prop="realizedProfitAndLoss" label="已实现盈亏" min-width="130" align="center" />
        <el-table-column prop="unrealizedProfitAndLoss" label="未实现盈亏" min-width="130" align="center" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div> -->
    <div class="flexcentercenter" style="height: 100%;">
      <div>
        <img src="@/views/images/zanwujilu@2x.png" alt="">
        <p>即将上线，敬请期待</p>
      </div>
    </div>
  </div>
</template>

<script>
  // 交易账户tab页
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        value: true,
        tableData: []
      }
    },
    computed: {
      ...mapState({
        financialheadnav: state => state.property.financialheadnav,
        sumListcny: state => state.property.sumlistcny,
      })
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  // .height678 {
  //   height: 678px;
  // }

  .Tab3-subcontainer {
    display: flex;
    flex-direction: column;
    img{
      width: 210px;
      height: 115px;
    }
    p{
      text-align: center;
      color: #677587;
    }
    .subcontainer-top {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      color: #fff;
      font-size: 16px;
      border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);

      display: flex;
      justify-content: space-between;
      align-items: center;

      .subcontainer-top-left {
        .subcontainer-top-left2 {
          padding-left: 5px;
          color: $money-blue;
        }

        .subcontainer-top-left3 {
          font-size: 14px;
          opacity: 0.61;
        }
      }

      .subcontainer-top-right {
        padding-right: 20px;

        // .subcontainer-top-right1 {
        // }
        .subcontainer-top-right2 {
          opacity: 0.41;
        }
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
