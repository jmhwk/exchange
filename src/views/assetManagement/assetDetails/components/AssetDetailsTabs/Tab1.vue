<template>
  <div class="Tab2-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="allowanceBalance" style="width: 100%">
        <el-table-column prop="coinName" label="币种" min-width="180" align="center" />
        <el-table-column prop="allowanceBalance" label="可用" min-width="180" align="center" />
        <el-table-column prop="walletFreezingBalance" label="冻结" min-width="180" align="center" />
<!--        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button class="btn" @click="$router.push({name:'rechargeCurrency',params:{id:scope.row.id}})">充币{{scope.row.id}}</el-button>
            <el-button class="btn"  @click="$router.push({name:'withdrawal',params:{id:scope.row.id}})" >提币</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
<!--    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div> -->
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  // 交易账户tab页
  export default {
    data() {
      return {
        value: true,
      }
    },
    computed: {
      ...mapState({
        sumList: state => state.property.sumList,
        sumListcny: state => state.property.sumlistcny,
        allowanceBalance: state => state.property.allowanceBalance,
      })
    },
    created() {
      console.log(123,this.allowanceBalance)
    },
    methods: {
      handleEdit(index, row) {
      },
      handleDelete(index, row) {
      }
    }
  }
</script>

<style lang="scss">
  .Tab2-subcontainer {
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
      .el-table__empty-block{
        background: #031937;
        color: #9ca5b1;
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
