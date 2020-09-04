<template>
  <div class="subcontainer">
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
  </div>
</template>

<script>
// 交易账户tab页
export default {
  data() {
    return {
      value: true
    }
  }
}
</script>

<style lang="scss" scoped>
.subcontainer {
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
}
</style>
