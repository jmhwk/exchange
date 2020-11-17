<template>
  <div class="container">
    <div class="box">
      <div class="left-side">
        <div class="left-side-title">
          用户管理
        </div>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical"
          background-color="transparent"
          active-text-color="#fff"
          text-color="#fff"
          router
        >
          <el-menu-item index="/userManagement/authentication">
            <img src="../images/icon/ionc1.png" alt="">
            <span slot="title">实名认证</span>
          </el-menu-item>
          <el-menu-item index="/userManagement/passwordmodify">
            <img src="../images/icon/icon2.png" alt="">
            <span slot="title">密码管理</span>
          </el-menu-item>
          <el-menu-item index="/userManagement/replacephone">
            <img src="../images/icon/ionc3.png" alt="">
            <span slot="title">更换手机</span>
          </el-menu-item>
          <el-menu-item index="/userManagement/replacepemal">
           <img src="../images/icon/emal.png" alt="">
<!--           <svg t="1604543549646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5517" width="200" height="200"><path d="M153.6 156.8h716.8c48 0 89.6 38.4 89.6 86.4L512 489.6 64 243.2c0-48 41.6-86.4 89.6-86.4zM64 339.2v435.2c0 48 38.4 89.6 89.6 89.6h716.8c51.2 0 89.6-38.4 89.6-89.6V339.2L524.8 576c-6.4 3.2-16 3.2-22.4 0L64 339.2z" p-id="5518" fill="#ffffff"></path></svg>
 -->            <span slot="title">绑定邮箱</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-side">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .container{
    height: 100%;
    background-color: $deep-blue;
    padding: 118px 0px 51px 0px;
    display: flex;
    justify-content: center;
    .box{
      width: 1200px;
      height: 961px;
      display: flex;
      .left-side{
        width: 280px;
        height: 100%;
        background-color: $blue;
        img{
          // display: inline-block;
          width: 16px;
          height: 16px;
          padding-right: 10px;
        }

        .left-side-title{
          height: 70px;
          width: 100%;
          line-height: 70px;
          color: $money-blue;
          padding-left: 20px;
          font-size: 16px;
        }
        .el-menu-vertical {
          border-right-width: 0px;
          .el-menu-item.is-active {
            background-color:#002658 !important;
            opacity: 1;
          }
          .el-menu-item:focus,.el-menu-item:hover{
            background-color:#002658 !important;
            opacity: 1;
          }
        }
      }
      .right-side{
        height: 100%;
        width: 100%;
        margin-left: 4px;
        // background-color: $blue;
      }
    }
  }
</style>
