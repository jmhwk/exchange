<template>
  <div class="rechargeCurrency-subcontainer">
    <div class="subcontainer-top">
      充币
    </div>
    <div class="subcontainer-mid">
      <div class="subcontainer-mid-select">
        <div>币种</div>
        <el-select
          v-model="value"
          popper-class="rechargeCurrency-select-down"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div>可用：0.00</div>
      </div>
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="ERC20" />
          <el-radio-button label="ERC30" />
          <el-radio-button label="ERC40" />
          <el-radio-button label="ERC50" />
        </el-radio-group>
      </div>
    </div>
    <div class="subcontainer-bottom">
      <p>温馨提示：</p>
      <p>1.不要向上述地址充值任何非ERC20_USDT资产，否则资产将不可找回;</p>
      <p>
        2.您充值至上述地址后，需要整个网络路由器的确认，12次网络确认后到账，12次网络确认后可提币；
      </p>
      <p>
        3.<span class="warn">最小充值金额：2</span>，最小充值金额将不会上账且无法退回;
      </p>
      <p>4.请官方确认电脑及浏览器安全，防止信息被纠正改正或替换；</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: 'USDT',
        label: 'USDT'
      },
      {
        value: 'USDT1',
        label: 'USDT1'
      }],
      value: 'USDT',
      radio1: 'ERC20'
    }
  }
}
</script>

<style lang="scss">
.rechargeCurrency-subcontainer {
  width: 916px;
  height: 961px;
  background-color: $blue;
  display: flex;
  flex-direction: column;
  .subcontainer-top {
    height: 55px;
    background-color: rgba($color: $money-blue, $alpha: 0.06);
    border: none;
    font-size: 13px;
    padding-left: 34px;
    line-height: 55px;
    color: $money-blue;
  }
  .subcontainer-mid {
    padding-left: 34px;
    padding-top: 12px;
    flex: 1;
    .subcontainer-mid-select {
      color: rgba($color: #fff, $alpha: 0.81);
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 24px;
    }
    .el-select {
      padding: 0px 15px;
      .el-input__inner {
        height: 30px !important;
        background-color: $blue;
        color: rgba($color: #fff, $alpha: 0.81);
      }
    }
    .el-radio-group {
      margin-top: 30px;
      .el-radio-button {
        margin-right: 10px;
        .el-radio-button__inner {
          border: 1px solid #fff;
          border-radius: 2px;
          background-color: $blue;
        }
      }
      .el-radio-button.is-active{
        .el-radio-button__inner{
          border-color: $money-blue;
        }

      }
      .el-radio-button.is-active::before{
        width: 25px;
        height: 26px;
        background: url("../../../assets/imgaes/assetManagement/gouxuan.png");
        position: absolute;
        left: 0px;
        top: 0px;
        content: "";
        z-index: 10;
      }
    }
  }
  .subcontainer-bottom {
    height: 110px;
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    opacity: 0.81;
    margin: 0px 0px 44px 34px;
    .warn {
      color: $money-blue;
    }
  }
}
.rechargeCurrency-select-down {
  .el-scrollbar__view {
    background-color: $blue;
    .el-select-dropdown__item {
      background-color: $blue;
      height: 30px;
    }
    .el-select-dropdown__item.selected {
      background-color: $blue;
    }
    .el-select-dropdown__item:hover {
      background-color: #002658 !important;
    }
  }
}
</style>
