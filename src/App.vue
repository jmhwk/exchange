<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
      <HeaFnavigation></HeaFnavigation>
      <keep-alive>
      <router-view/>
      </keep-alive>
      <HeadFooter></HeadFooter>
  </div>
</template>
<script>
  import HeaFnavigation from './components/HeaFnavigation'
  import HeadFooter from './components/HeadFooter'
  export default {
    components: {
      HeaFnavigation,
      HeadFooter
    }
  }
</script>
<style lang="css" scoped>
</style>
