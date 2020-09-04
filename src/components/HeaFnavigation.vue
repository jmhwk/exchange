<template>
  <div class="head flexcenter">
    <div class="head-left">
      <ul class="flexcenterlist">
        <img src="../assets/imgaes/logo.png" alt @click="goTo('/index')">
        <li
          v-for="(item,index) in tablis"
          :key="index"
          :class="{active:active2==index}"
          @click="tabcut(index,item.path)"
        >{{ item.name }}</li>
      </ul>
    </div>
    <div class="head-right flexcenterlist">
      <!-- <div class="btns btns-dl"  @click="goTo('/log')">{{$t('navbar.Log')}}</div>
      <div class="btns btns-zc"  @click="goTo('/regist')">{{$t('navbar.Sign')}}</div>-->
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" style="color: #FFFFFF;">
            <router-link :to="{path:'/assetManagement'}">
              资产管理
            </router-link>
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">资产明细</el-dropdown-item>
            <el-dropdown-item command="b">委托订单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div>
        <i class="el-icon-user-solid" style="font-size: 20px; padding: 0 10px 0 20px;" />188****7673
      </div>
      <img src="../assets/imgaes/xz.png" alt>
      <div :class="{active:active}" @click="handlen(1)">{{ $t('navbar.Language') }}</div>
      <div class="xian" />
      <div :class="{active:active1}" @click="handlen(2)">English</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: true,
      active1: false,
      active2: 0,
      tablis: [
        { name: this.$t('navbar.HOME'), path: '/index' },
        { name: this.$t('navbar.PRODUCTS'), path: '/products' },
        { name: this.$t('navbar.SOLUTIONS'), path: '/solutions' },
        { name: this.$t('navbar.SERVICES'), path: '/services' },
        { name: this.$t('navbar.ABOUT'), path: '/about' }
      ]
    }
  },
  mounted() {},
  methods: {
    handlen(lag) {
      // 语言切换
      if (lag == 1) {
        this.$i18n.locale = 'cn'
        this.active1 = false
        this.active = true
        this.tablis = [
          { name: this.$t('navbar.HOME'), path: '/index' },
          { name: this.$t('navbar.PRODUCTS'), path: '/products' },
          { name: this.$t('navbar.SOLUTIONS'), path: '/solutions' },
          { name: this.$t('navbar.SERVICES'), path: '/services' },
          { name: this.$t('navbar.ABOUT'), path: '/about' }
        ]
      } else {
        this.$i18n.locale = 'en'
        this.active1 = true
        this.active = false
        this.tablis = [
          { name: this.$t('navbar.HOME'), path: '/index' },
          { name: this.$t('navbar.PRODUCTS'), path: '/products' },
          { name: this.$t('navbar.SOLUTIONS'), path: '/solutions' },
          { name: this.$t('navbar.SERVICES'), path: '/services' },
          { name: this.$t('navbar.ABOUT'), path: '/about' }
        ]
      }
    },
    // tab切换
    tabcut(index, path) {
      this.active2 = index
      this.goTo(path)
    },
    goTo(path) {
      // 编程式路由跳转
      this.$router.push(
        { path: path },
        onComplete => {},
        onAbort => {}
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.head {
  width: 100%;
  height: 70px;
  background: #031d44;
  color: #fff;
  font-size: 14px;
  position: fixed;
  z-index: 99;
  .head-left {
    padding: 0 30px;
    width: 600px;
    ul {
      img {
        width: 114px;
        height: 42px;
        padding-bottom: 10px;
      }
      li {
        padding: 10px 0;
      }
      li:hover {
        color: #1476fe;
        border-bottom: 2px solid #1476fe;
      }
      .active {
        border-bottom: 2px solid #1476fe;
        color: #1476fe;
      }
    }
  }
  .head-right {
    padding: 0 30px;
    width: 400px;
    .xian {
      width: 2px;
      height: 15px;
      background: #1476fe;
    }
    .btns {
      width: 64px;
      padding: 8px 0;
      border-radius: 4px;
      text-align: center;
    }
    .active {
      color: #1476fe;
    }
    img {
      width: 15px;
      height: 15px;
    }
    .btns-dl {
      color: #fff;
      background: #1476fe;
    }
    .btns-zc {
      color: #1476fe;
      border: 1px solid #1476fe;
    }
  }
}
</style>
