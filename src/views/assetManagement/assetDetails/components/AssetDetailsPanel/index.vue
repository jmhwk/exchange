<template>
  <div class="AssetDetailsPanel-container">
    <el-row class="top">
      <el-col :span="17">
        <span class="money-title">总资产</span>&nbsp;
        <span class="money">0.00USDT</span>
        <span class="money1">≈0.00CNY</span>
      </el-col>
      <el-col :span="7">
        <el-button class="btn" @click="$router.push({name:'rechargeCurrency'})">充币</el-button>
        <el-button class="btn">提币</el-button>
        <el-button class="btn">资金划转</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="(item,i) in items" :key="i" :span="8">
        <AssetDetailsPanelItem :item="item" />
        <div v-if="(++i)%3!==0" class="line" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AssetDetailsPanelItem from './AssetDetailsPanelItem'
export default {
  name: 'AssetDetailsPanel',
  components: {
    AssetDetailsPanelItem
  },
  data() {
    return {
      items: [
        { title: '交易账户' },
        { title: '全仓账户' },
        { title: '逐仓账户' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 224px;
  margin-bottom: 4px;
  background-color: $blue;
  .line {
    float: left;
    width: 1px;
    height: 40px;
    margin-top: 27px;
    margin-left: 31px;
    border-left: 1px solid #fff;
  }
  .top {
    height: 106px;
    line-height: 106px;
    padding-left: 20px;
    .money-title {
      font-size: 22px;
      color: #fff;
    }
    .money {
      font-size: 22px;
      color: $money-blue;
    }
    .money1 {
      color: #fff;
      font-size: 16px;
      opacity: 0.61;
    }
    .btn {
      width: 74px;
      height: 34px;
      padding: unset;
      background-color: transparent;
      color: $money-blue;
      border-color: $money-blue;
    }
  }
}
</style>
