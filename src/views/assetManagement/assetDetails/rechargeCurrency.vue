<template>
  <div class="rechargeCurrency-subcontainer">
    <div class="subcontainer-top">充币</div>
    <div class="subcontainer-mid">
      <div class="subcontainer-mid-select">
        <div>币种</div>
        <el-select v-model="value" placeholder="请选择"  @change="fullName(value)">
          <el-option v-for="(item,index) in serveOptions" :key="index" :label="item.shortName" :value="item.id" />
        </el-select>
     <!--   <div>可用：0.00</div> -->
      </div>
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="ERC20" />
      <!--    <el-radio-button label="ERC30" />
          <el-radio-button label="ERC40" />
          <el-radio-button label="ERC50" /> -->
        </el-radio-group>
      </div>
      <div class="image-box flexzxlist">
        <vue-qr :text="userInvite" :size="700"></vue-qr>
        <p>充币地址</p>
        <el-row>
          <el-col :span="20">
            <div class="invite-left">
              {{userInvite}}
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="jys-btns" style="width: 100px;"
              v-clipboard:copy="userInvite" 
              v-clipboard:success="onCopy" 
              v-clipboard:error="onError"
            >点击复制</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="subcontainer-bottom">
      <p>温馨提示：</p>
      <p>1.不要向上述地址充值任何非ERC20_USDT资产，否则资产将不可找回;</p>
      <p>
        2.您充值至上述地址后，需要整个网络路由器的确认，12次网络确认后到账，12次网络确认后可提币；
      </p>
      <p>
        3.<span class="warn">最小充值：{{minimum}}个</span>，最小充值金额将不会上账且无法退回;
      </p>
      <p>4.请官方确认电脑及浏览器安全，防止信息被纠正改正或替换；</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { recharge } from '@/api'
import { SERVE_OPTIONS } from '@/store/mutation-types.js'
import vueQr from 'vue-qr'
export default {
  data() {
    return {
      url:'../../images/erweuna@2x(1).png',
      value: 'USDT',
      radio1: 'ERC20',
      userInvite: '0xe16c0825cd324e7eacf915fe6803b10535308fcd',
      minimum :10,
    }
  },
  created() {
    this.$store.dispatch('accountList', 1)
  },
  computed: {
    ...mapState({
      serveOptions: function(state) {
        if (state.property.serveOptions.length > 0) {
          let ids = state.property.serveOptions[0].id
          this.recharge(ids)
        }
        return state.property.serveOptions
      },
    })
  },
  // 二维码
  components: { vueQr },
  methods: {
    // 复制成功时的回调函数
    onCopy (e) {
       this.$message.success("内容已复制到剪切板！")
    },
    // 复制失败时的回调函数
    onError (e) {
       this.$message.error("抱歉，复制失败！")
    },
    fullName(v){
      this.recharge(v)
      if(v==70){
        this.minimum = 10
      }else {
        this.minimum = 100
      }
    },
    async recharge(type) {
      const result = await recharge(type)
      if (result.code == 200) {
        this.userInvite = result.data.address
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
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
  // .el-input{
  //   i{
  //     line-height: 30px!important;
  //   }
  // }
  .subcontainer-mid {
    padding-left: 34px;
    padding-top: 12px;
    flex: 1;
    position: relative;
    .subcontainer-mid-select {
      color: rgba($color: #fff, $alpha: 0.81);
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 24px;
      .el-select {
        padding: 0px 15px;
        .el-input__inner {
          height: 35px !important;
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
    .image-box {
      padding-top: 10%;
      height: 400px;
      img{
        width: 150px;
        height: 150px;
      }
      p{
        padding: 20px 0;
        color:#ffffffcc;
      }
    }
    .invite-left{
      // width: 100%;
      padding: 20px 10px;
      background-color: rgba($color: #243b5d, $alpha: 0.41);
      border-radius: 4px;
      text-align: center;
      word-break: break-all;
      color:#fff;
      margin: 0 15px;
    }
    .el-button {
      margin-left: 30px;
      width: 80px;
      height: 45px;
      font-size: 14px;
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
