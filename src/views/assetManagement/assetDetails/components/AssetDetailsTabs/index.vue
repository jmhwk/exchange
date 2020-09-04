<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="交易账户" name="tab1"><Tab1 /></el-tab-pane>
      <el-tab-pane label="全仓账户" name="tab2"><Tab2 /></el-tab-pane>
      <el-tab-pane label="逐仓账户" name="tab3">逐仓账户</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tab1 from './Tab1'
import Tab2 from './Tab2'
export default {
  name: 'AssetDetailsTabs',
  components: {
    Tab1,
    Tab2
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
.container {
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
