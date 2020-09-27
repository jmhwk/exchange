<template>
  <div class="AssetDetailsTabs-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="当前委托" name="tab1"><Tab1 /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  const Tab1 = () => import ('./position')
export default {
  name: 'AssetDetailsTabs',
  components: {
    Tab1,
  },
  data() {
    return {
      activeName: 'tab1'
    }
  },
  methods: {
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
