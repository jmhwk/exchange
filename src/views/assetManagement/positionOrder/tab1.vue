<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="8"><h1>委托状态</h1></el-col>
        <el-col :span="16">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="合约" align="center" />
        <el-table-column prop="total" label="方向" align="center" />
        <el-table-column prop="available" label="开仓时间" align="center" />
        <el-table-column prop="frozen" label="开仓价格" align="center" />
        <el-table-column prop="available" label="数量" align="center" />
        <el-table-column prop="frozen" label="杠杆" align="center" />
        <el-table-column prop="total" label="保证金" align="center" />
        <el-table-column prop="available" label="浮动盈亏" align="center" />
        <el-table-column prop="frozen" label="止盈" align="center" />
        <el-table-column prop="available" label="止损" align="center" />
        <el-table-column prop="frozen" label="订单号" align="center" />
        <el-table-column prop="frozen" label="操作" align="center" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script>
  // 交易账户tab页
  export default {
    data() {
      return {
        value: true,
        tableData: [{
          typesOfCurrency: 'AUTT',
          total: '156.09',
          available: '126.09',
          frozen: '--'
        }, {
          typesOfCurrency: 'AUTT',
          total: '156.09',
          available: '126.09',
          frozen: '--'
        }],
        options: [{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '委托中'
        }, {
          value: '3',
          label: '已完成'
        }, {
          value: '4',
          label: '已撤销'
        }],
        value: '1'
      }
    },
    methods: {
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
      .el-input__suffix{
        top: -2px;
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
