<template>
  <div class="container">
    <div class="box">
      <div class="left-side">
        <div class="left-side-title">
          资产管理
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-setting" />
            <span slot="title">资产明细</span>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-setting" />
            <span slot="title">委托订单</span>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-setting" />
            <span slot="title">持仓订单</span>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-setting" />
            <span slot="title">充提记录</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-side">
        <div class="title">
          aaa
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetManagement'
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
        .left-side-title{
          height: 70px;
          width: 100%;
          line-height: 70px;
          color: #1476FE;
          padding-left: 20px;
          font-size: 16px;
        }
      }
      .right-side{
        width: 916px;
        height: 100%;
        margin-left: 4px;
        background-color: $blue;
      }
    }
  }
</style>
