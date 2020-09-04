<template>
  <div class="AssetDetailsPanelItem-subcontainer">
    <el-row class="top">
      {{ item.title }}
    </el-row>
    <el-row class="mid">
      <span class="mid1">0.00USDT</span>
      <span class="mid2">≈0.00 CNY</span>
    </el-row>
    <el-row class="bottom">
      <span>可用：</span>
      <span>0.00</span>
      <span class="bottom3">交易冻结：</span>
      <span>0.00</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AssetDetailsPanelItem',
  props: {
    item: {
      type: Object,
      default: () => { return { title: '交易账户' } }
    }
  }

}
</script>

<style lang="scss" scoped>
.AssetDetailsPanelItem-subcontainer {
  padding-left: 20px;
  padding-top: 13px;
  float: left;
  .top {
    height: 24px;
    line-height: 24px;
    color: #fff;
    font-size: 14px;
  }
  .mid {
    font-size: 14px;
    height: 24;
    line-height: 24px;
    .mid1 {
      color: $money-blue;
    }
    .mid2 {
      color: #fff;
      opacity: 0.6;
    }
  }
  .bottom {
    color: #fff;
    font-size: 14;
    line-height: 24px;
    height: 24px;
    .bottom3 {
      padding-left: 50px;
    }
  }
}
</style>
