<template>
  <div class="container">
    <el-row class="top">
      <el-col :span="17">
        <span class="money-title">总资产</span>&nbsp;
        <span class="money">0.00USDT</span>
        <span class="money1">≈0.00CNY</span>
      </el-col>
      <el-col :span="7">
        <el-button class="btn">充值</el-button>
        <el-button class="btn">提币</el-button>
        <el-button class="btn">资金划转</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        a
      </el-col>
      <el-col :span="8">
        a
      </el-col>
      <el-col :span="8">
        a
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 224px;
    margin-bottom: 4px;
    background-color: $blue;
    .top{
      height: 106px;
      line-height: 106px;
      padding-left: 20px;
      .money-title{
        font-size: 22px;
        color: #fff;
      }
      .money{
        font-size: 22px;
        color: #1476FE;
      }
      .money1{
        color: #fff;
        font-size: 16px;
        opacity: 0.61;
      }
      .btn{
        width: 74px;
        height: 34px;
        padding:unset;
        background-color: transparent;
        color: #1476FE;
        border-color: #1476FE;
      }
    }
  }
</style>
