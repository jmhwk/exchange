<template>
  <div class="Tab2-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="typesOfCurrency"
          label="时间"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="accountEquity"
          label="类型"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="available"
          label="币种"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="margin"
          label="数量"
          min-width="130"
          align="center"
        />
      </el-table>
    </div>
<!--    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div> -->
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
        accountEquity: '买入开多',
        available: '0.00',
        margin: '10BTC',
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

<style scoped lang="scss" scoped>
@import url(../../../assets/css/tabs.scss);
.height678 {
  height: 678px;
}
</style>
