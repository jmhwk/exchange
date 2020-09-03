<template>
  <div>
    <AssetDetailsPanel />
    <AssetDetailsTabs />
  </div>
</template>

<script>
import AssetDetailsPanel from './components/AssetDetailsPanel'
import AssetDetailsTabs from './components/AssetDetailsTabs'
export default {
  name: 'AssetDetails',
  components: {
    AssetDetailsPanel,
    AssetDetailsTabs
  }
}
</script>

<style>

</style>
