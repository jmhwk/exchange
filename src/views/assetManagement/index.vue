<template>
  <div class="container">
    <div class="box">
      <div class="left-side">
        <div class="left-side-title">
          资产管理
        </div>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical"
          background-color="transparent"
          active-text-color="#fff"
          text-color="#fff"
          router
        >
          <el-menu-item index="/assetManagement/assetDetails">
            <img src="../images/icon/zc1.png" alt="">
            <span slot="title">资产明细</span>
          </el-menu-item>
          <el-menu-item index="/assetManagement/entrustOrder">
            <img src="../images/icon/zc2.png" alt="">
            <span slot="title">币币订单</span>
          </el-menu-item>
          <el-menu-item index="/assetManagement/positionOrder">
            <img src="../images/icon/zc3.png" alt="">
            <span slot="title">合约订单</span>
          </el-menu-item>
          <el-menu-item index="/assetManagement/HoldOrder">
            <img src="../images/icon/zc4.png" alt="">
            <span slot="title">历史平仓</span>
          </el-menu-item>
          <el-menu-item index="/assetManagement/rechargeAndWithdrawRecord">
            <img src="../images/icon/zc5.png" alt="">
            <span slot="title">充提记录</span>
          </el-menu-item>
          <el-menu-item index="/assetManagement/fundsTransfer">
            <img src="../images/icon/zc6.png" alt="">
            <span slot="title">划转记录</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-side">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container{
    height: 100%;
    background-color: $deep-blue;
    padding: 118px 0px 51px 0px;
    display: flex;
    justify-content: center;
    .box{
      width: 1600px;
      height: 961px;
      display: flex;
      .left-side{
        width: 280px;
        height: 100%;
        background-color: $blue;
        img{
          width: 20px;
          height: 20px;
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
        background-color: $blue;
      }
    }
  }
</style>
