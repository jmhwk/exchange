<template>
  <div id="app">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Home</router-link> |-->
    <!--      <router-link to="/about">About</router-link>-->
    <!--    </div>-->
    <HeaFnavigation />
  <!--  <keep-alive> -->
      <router-view v-if="isRouterAlive"/>
<!--    </keep-alive> -->
    <HeadFooter />
  </div>
</template>
<script>
import HeaFnavigation from './components/HeaFnavigation'
import HeadFooter from './components/HeadFooter'
export default {
  name: 'App',
  provide (){
     return {
       reload:this.reload
     }
  },
  data(){
    return {
       isRouterAlive:true
    }
  },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
  },
  components: {
    HeaFnavigation,
    HeadFooter
  },
  // created() {
  //   this.socketApi.initWebSocket('ws://47.242.81.154:8086/ws');
  // },
}
</script>
<style lang="css" scoped>
</style>
