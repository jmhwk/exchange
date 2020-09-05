<template>
  <div class="AssetDetailsTabs-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的持仓" name="tab1"><Tab1 /></el-tab-pane>
      <el-tab-pane label="委托记录" name="tab2"><Tab2 /></el-tab-pane>
      <el-tab-pane label="平仓记录" name="tab3"><Tab3 /></el-tab-pane>
      <el-tab-pane label="划转记录" name="tab4"><Tab4 /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tab1 from './position'
import Tab2 from './entrust'
import Tab3 from './tab3'
import Tab4 from './tab4'
export default {
  name: 'AssetDetailsTabs',
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
  },
  data() {
    return {
      activeName: 'tab1'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
.AssetDetailsTabs-container {
  width: 100%;
  height: 733px;
  background-color: $blue;
  .el-tabs {
    .el-tabs__header {
      margin: unset;
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          background-color: rgba($color: #1476FE, $alpha: 0.06);
          .el-tabs__item{
            height: 55px;
            line-height: 55px;
            text-align: center;
            padding: unset;
            width: 120px;
            color: #fff;
            opacity: 1;
          }
          .el-tabs__item.is-active{
            background-color: $blue;
          }
        }
      }
      .el-tabs__nav-wrap::after{
        background-color: $blue;
      }
    }
  }
}
</style>
