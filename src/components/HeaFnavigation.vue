<template>
  <div class="head flexcenter">
    <div class="head-left">
      <ul class="flexcenterlist">
        <img src="../assets/imgaes/logo.png" alt @click="goTo('/index')">
        <li :class="{active: $route.path==='/index'}" @click="goTo('/index')">{{$t('navbar.HOME')}}</li>
        <li :class="{active: $route.path==='/currency'}" @click="goTo('/currency')">{{$t('navbar.CURRENCY')}}</li>
        <li :class="{active: $route.path==='/products'}" @click="goTo('/products')">{{$t('navbar.PRODUCTS')}}</li>
        <li :class="{active: $route.path==='/solutions'}" @click="goTo('/solutions')">{{$t('navbar.SOLUTIONS')}}</li>
        <li :class="{active: $route.path==='/contactus'}" @click="goTo('/contactus')">{{$t('navbar.SERVICES')}}</li>
      </ul>
    </div>
    <div class="head-right flexcenterlist">
      <div v-if="token ==undefined " class="flexcenterlist" style="width: 200px;">
        <div class="btns btns-dl"  @click="goTo('/log')">{{$t('navbar.Log')}}</div>
        <div class="btns btns-zc"  @click="goTo('/regist')">{{$t('navbar.Sign')}}</div>
      </div>
      <div v-else class="flexcenterlist">
        <div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="color: #FFFFFF;">
              <router-link :to="{path:'/assetManagement'}" style="color: #FFFFFF;">
                资产管理
              </router-link>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="assetDetails">资产明细</el-dropdown-item>
              <el-dropdown-item command="entrustOrder">委托订单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

       <div >
        <el-dropdown @command="handleCommand1">
          <span class="el-dropdown-link" style="color: #FFFFFF;">
            <router-link :to="{path:'/userManagement'}" style="color: #FFFFFF;">
               <i class="el-icon-user-solid" style="font-size: 20px; padding: 0 10px 0 20px;" />
               {{user.phone | statusName}}
            </router-link>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="authentication">用户中心</el-dropdown-item>
            <el-dropdown-item command="log" style="color: #e2505b;">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      
      </div>
      </div>
        <el-popover placement="top-start" width="200" trigger="hover">
          <el-row :gutter="10">
            <el-col :span="12">
              <img src="../assets/imgaes/assetManagement/erweuna.png" alt="" style="width: 80px;">
            </el-col>
            <el-col :span="12">
              <ul>
                <li>扫码下载App</li>
                <li>IOS</li>
                <li>Android</li>
     <!--           <li><el-button type="primary" style="background: #1476fe;height: 30px;line-height: 2px;">查看更多</el-button></li> -->
              </ul>
            </el-col>
          </el-row>
          
          <img src="../assets/imgaes/xz.png" slot="reference" alt>
        </el-popover>
    <!--  <div :class="{active:active}" @click="handlen(1)">{{ $t('navbar.Language') }}</div>
      <div class="xian" />
      <div :class="{active:active1}" @click="handlen(2)">English</div> -->
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  filters: {
    statusName(val){
      if(val){
        let start = val.slice(0, 3)
        let end = val.slice(-4)
        return `${start}****${end}`
      }
    },
  },
  data() {
    return {
      active: true,
      active1: false,
      active2: 0,
      phone:0,
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      user:state => state.user.user,
    }),
  },
  created() {
    if(this.token){
      this.$store.dispatch('usermessage','')
    }
  },
  methods: {
    // 手机号省略
    // phonereg(){
    //   this.phone = this.user.phone.substr(0, 3) + '****' + this.user.phone.substr(7)
    // },
    handlen(lag) {
      // 语言切换
      if (lag == 1) {
        this.$i18n.locale = 'cn'
        this.active1 = false
        this.active = true
      } else {
        this.$i18n.locale = 'en'
        this.active1 = true
        this.active = false
      }
    },
    // 资产管理
    handleCommand(command) {
      let path = '/assetManagement/'+command
      this.goTo(path)
    },
    handleCommand1(command){
      let path = '/userManagement/'+command
      if(command !='log'){
         this.goTo(path)
      }else{
         this.$store.dispatch('FedLogOut','').then(res => {
            this.$router.push('/log')
            // window.location.reload();
          })
        
      }
     
    },
    goTo(path) {
      // 编程式路由跳转
      this.$router.push(
        { path: path },
        onComplete => {},
        onAbort => {}
      )
      window.location.reload();
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
    cursor:pointer;
    ul {
      img {
        width: 114px;
        height: 42px;
        padding-bottom: 10px;
      }
      li {
        padding: 10px 0;
        // cursor:pointer;
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
    cursor:pointer;
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
      width: 27px;
      height: 27px;
      cursor:pointer;
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
