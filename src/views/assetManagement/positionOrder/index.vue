<template>
  <div class="AssetDetailsTabs-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全仓账户" name="tab1"><Tab1 /></el-tab-pane>
      <el-tab-pane label="逐仓账户" name="tab2"><Tab2 /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tab1 from './tab1'
import Tab2 from './tab2'
export default {
  components: {
    Tab1,
    Tab2,
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

}
</style>
