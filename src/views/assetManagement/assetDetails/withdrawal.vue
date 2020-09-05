<template>
  <div class="withdrawal-subcontainer">
    <div class="subcontainer-top">
      提币
    </div>
    <div class="subcontainer-mid">
      <div class="subcontainer-mid-select">
        <div>币种</div>
        <el-select
          v-model="value"
          popper-class="withdrawal-select-down"
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
      <div class="form">
        <el-form ref="form" :model="form" label-width="96px">
          <el-form-item label="提币地址">
            <el-select
              v-model="form.region"
              popper-class="withdrawal-select-down2"
              placeholder="请选择提币地址"
            >
              <el-option label="地址一" value="shanghai" />
              <el-option label="地址二" value="beijing" />
            </el-select>
            <span><a href="javascript:;">新增地址</a></span>
          </el-form-item>
          <el-form-item label="提币数量">
            <el-input v-model="form.name" placeholder="请输入提币数量">
              <template slot="append">
                <span>USDT |</span>
                <span><a href="javascript:;">全部提出</a></span>
              </template>
            </el-input>
            <div class="number-warn">
              <span>手续费：0.00</span>
              <span>实际到账：0.00</span>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.name" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item label="交易密码">
            <el-input v-model="form.name" placeholder="请输入交易密码" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.name" placeholder="请输入验证码">
              <template slot="append">
                <span><a href="javascript:;">获取验证码</a></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
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
      radio1: 'ERC20',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss">
.withdrawal-subcontainer {
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
      .el-select {
        padding: 0px 15px;
        .el-input__inner {
          height: 30px !important;
          background-color: $blue;
          color: rgba($color: #fff, $alpha: 0.81);
        }
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
      .el-radio-button.is-active {
        .el-radio-button__inner {
          border-color: $money-blue;
        }
      }
      .el-radio-button.is-active::before {
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
    .form {
      margin-top: 110px;
      margin-left: 141px;
      .el-form {
        .el-form-item {
          margin-bottom: 20px;;
          .el-form-item__label {
            color: rgba($color: #fff, $alpha: 0.8);
            padding: 0px 20px;
            text-align: justify;
            text-align-last: justify;
          }
          .el-form-item__content {
            width: 470px;
            // .el-select {
            //   width: 100%;
            // }
            span {
              padding-left: 16px;
              > a {
                font-size: 14px;
                color: $money-blue;
              }
            }
            input {
              width: 100%;
              background-color: rgba($color: #243b5d, $alpha: 0.41);
              height: 40px !important;
            }
            .el-button {
              width: 100%;
            }
          }
        }
      }
      .el-form-item:first-child .el-form-item__content {
        width: unset;
        .el-select {
          width: 470px;
        }
      }
      .el-form-item:nth-child(2) .el-form-item__content {
        input {
          border-right: none;
        }
        .el-input-group__append {
          padding: unset;
          font-size: 14px;
          background-color: rgba($color: #243b5d, $alpha: 0.41);
          span:nth-child(2) {
            padding: 0px 15px 0px 10px;
          }
        }
        .number-warn {
          > span {
            padding: unset;
          }
          color: rgba($color: #fff, $alpha: 0.8);
          display: flex;
          justify-content: space-between;
        }
      }
      .el-form-item:nth-child(5) .el-form-item__content {
        input {
          border-right: none;
        }
        .el-input-group__append {
          padding: unset;
          font-size: 14px;
          background-color: rgba($color: #243b5d, $alpha: 0.41);
          span:nth-child(1) {
            padding: 0px 15px 0px 10px;
          }
        }
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
.withdrawal-select-down,
.withdrawal-select-down2 {
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
