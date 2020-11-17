<template>
  <div>
    <AssetDetailsPanel/>
    <AssetDetailsTabs/>
  </div>
</template>

<script>
const AssetDetailsPanel = () => import('./components/AssetDetailsPanel')
const AssetDetailsTabs = () => import('./components/AssetDetailsTabs')
export default {
  name: 'AssetDetails',
  components: {
    AssetDetailsPanel,
    AssetDetailsTabs
  },
  // created() {
  //   this.$store.dispatch('accountList', 3)
  // },
}
</script>

<style>

</style>
