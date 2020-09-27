<template>
  <div class="AssetDetailsTabs-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资产账户" name="tab1"><Tab1/></el-tab-pane>
      <el-tab-pane label="交易账户" name="tab2"><Tab2/></el-tab-pane>
      <el-tab-pane label="补贴账户" name="tab3"><Tab3 /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
  import {
    mapState
  } from 'vuex'
export default {
  name: 'AssetDetailsTabs',
  components: {
    Tab1,
    Tab2,
    Tab3
  },
  data() {
    return {
      activeName: 'tab1',
    }
  },
  methods: {
    handleClick(tab) {
    }
  }
}
</script>

<style lang="scss">
.AssetDetailsTabs-container {
  width: 100%;
  height: 733px;
  background-color: $blue;
  font-size: 14px;
}
</style>
