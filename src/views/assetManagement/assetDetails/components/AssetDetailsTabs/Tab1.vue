<template>
  <div class="subcontainer height678">
    <div class="subcontainer-top">
      <div class="subcontainer-top-left">
        <span class="subcontainer-top-left1">资产折合</span>
        <span class="subcontainer-top-left2">0.00USDT</span>
        <span class="subcontainer-top-left3">≈0.00 CNY</span>
      </div>
      <div class="subcontainer-top-right">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="rgba(255,255,255, 0.41)"
        />
        <span class="subcontainer-top-right2">
          隐藏小额资产
        </span>
      </div>
    </div>
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="typesOfCurrency"
          label="币种"
          min-width="180"
          align="center"
        />
        <el-table-column
          prop="total"
          label="合计"
          min-width="180"
          align="center"
        />
        <el-table-column
          prop="available"
          label="可用"
          min-width="180"
          align="center"
        />
        <el-table-column
          prop="frozen"
          label="冻结"
          min-width="180"
          align="center"
        />
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn"
              @click="handleEdit(scope.$index, scope.row)"
            >充币</el-button>
            <el-button
              class="btn"
              @click="handleDelete(scope.$index, scope.row)"
            >提币</el-button>
          </template>
        </el-table-column>
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
        frozen: '30'
      }, {
        typesOfCurrency: 'AUTT',
        total: '156.09',
        available: '126.09',
        frozen: '30'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss">
.height678 {
  height: 678px;
}
.subcontainer {
  display: flex;
  flex-direction: column;
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
    .el-table--enable-row-hover .el-table__body tr:hover > td {
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
      > button,
      > ul li {
        color: rgba($color: #fefefe, $alpha: 0.8);
        background-color: $blue;
      }
      .active{
        color: #1476FE;
      }
    }
  }
}
</style>
