<template>
  <div class="Tab2-subcontainer height678">
<!--    <div class="subcontainer-top">
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
    </div> -->
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="typesOfCurrency"
          label="合约"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="accountEquity"
          label="方向"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="available"
          label="平仓价格"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="margin"
          label="数量"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="realizedProfitAndLoss"
          label="杠杆"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="unrealizedProfitAndLoss"
          label="保证金"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="marginRate"
          label="持仓利息"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="fdyk"
          label="浮动盈亏"
          min-width="130"
          align="center"
        />
        <el-table-column
          prop="ziy"
          label="止盈"
          min-width="130"
          align="center"
        />
      </el-table>
    </div>
   <!-- <div class="pagination">
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
        realizedProfitAndLoss: '10x',
        unrealizedProfitAndLoss: '10000USDT',
        marginRate: '100U',
        fdyk:'+0.2BTC',
        ziy:'9165'
      }]
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss" scoped>
@import url(../../../assets/css/tabs.scss); 
.height678 {
  height: 678px;
    
}
</style>
