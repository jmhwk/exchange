<template>
  <div class="AssetDetailsPanel-container">
    <el-row class="top">
      <el-col :span="17">
        <span class="money-title">总资产</span>&nbsp;
        <span class="money">{{numFilter(newaccountArr)}}</span>
        <span class="money1">≈{{numFilter(newaccountArr*CNY)}}CNY</span>
      </el-col>
      <el-col :span="7">
        <el-button class="btn" @click="$router.push({name:'rechargeCurrency'})">充币</el-button>
        <el-button class="btn" @click="$router.push({name:'withdrawal'})">提币</el-button>
        <el-button class="btn" @click="dialogVisible = true">资金划转</el-button>
      </el-col>
    </el-row>
    <div class="centerlist">
      <el-row>
        <el-col :span="8">资产账户</el-col>
        <el-col :span="8">交易账户</el-col>
        <el-col :span="8">补贴账户</el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><span>{{numFilter(sumlist.walletBalance)}}USDT</span> <span> ≈
            {{numFilter(sumlist.walletBalance*CNY)}}CNY</span> </el-col>
        <el-col :span="8"><span>{{numFilter(sumlist.balance)}}USDT</span> <span> ≈ {{numFilter(sumlist.balance*CNY)}}CNY</span>
        </el-col>
        <el-col :span="8"><span>{{ numFilter(sumlist.allowanceBalance)}}USDT</span> <span> ≈
            {{numFilter(sumlist.allowanceBalance*CNY)}}CNY</span> </el-col>
      </el-row>
    </div>

    <div class="pop-up">
      <el-dialog :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
        <h2 slot="title" class="dialog-title">资金划转 </h2>
        <div class="capitalTran">
          <div class="transfer" style="padding: 5px 10px;">
            <el-row>
              <el-col :span="8">
                <el-cascader v-model="value1" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
              </el-col>
              <el-col :span="8" style="text-align: center;">
                <b ><img src="../../../../images/icon/hzicon.png" style="width: 24px;" @click="reverselist"></b>
              </el-col>
              <el-col :span="8">
                <el-cascader v-model="value2" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange1"></el-cascader>
              </el-col>
            </el-row>

          </div>
          <el-row class="turnover">
            <el-col :span="3" style="line-height: 35px;">币种</el-col>
            <el-col :span="21">
              <el-select v-model="value" placeholder="请选择" @change="fullName(value)">
                <el-option v-for="(item,index) in allOptions" :key="index" :label="item.shortName" :value="index">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="turnover">可用 {{ numFilter(available) }}</div>
          <div class="tranInt transfer flexcenter"><input placeholder="请输入转入数量" v-model="prams.amount"><em>{{accountList.coinName}}</em><span
              @click="complete(numFilter(available))">全部</span></div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="transferAccount" style="width: 100%;background-color: #1476FE;">确认划转</el-button>
        </span>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import {
    accountList,
    transferAccount,
    getContractAccount
  } from '@/api'
  import {
    mapState
  } from 'vuex'
  import {
    numFilter
  } from '@/assets/js/time.js'
  import {
    ASSET_MANAGEMENT,
    SUMLIST_MANAGEMENT
  } from '@/store/mutation-types' // 存储用户信息
  export default {
    data() {
      return {
        dialogVisible: false,
        numFilter: numFilter,
        accountArr: [],
        sumlist: [],
        available:'',// 可用
        // overturn:{
        //   left:0,
          
        // },
        CNY: 0,
        shortName: '',
        newaccountArr: 0,
        prams: {
          amount: '',
          coinId: '',
          coinName: '',
          fromAccount: 1,
          toAccount: 2,
          toCoinId: 0, // 过去的币id
        }, // 接口参数
        items: [{
            title: '资产账户'
          },
          {
            title: '交易账户'
          },
          {
            title: '补贴账户'
          }
        ],
        value: 2,
        value1: [1],
        value2: [2],
        options: [
        {
          value: 1,
          label: '币币账户'
        },
        {
          value: 2,
          label: '法币账户',
        },
        {
          value: 3,
          label: '合约账户',
          disabled: true,
          children: []
        },
        {
            value: 5,
            label: '资金钱包账户'
        },
        {
            value: 6,
            label: '补贴账户'
        }]
      }
    },
    created() {
      this.accountListlist()
      this.getContractAccount()
      this.$store.dispatch('accountList', 3)
    },
    computed: {
      ...mapState({
        allOptions: function(state) {
          if (state.property.allOptions.length > 0) {
            let ids = state.property.allOptions[2]
            this.$store.dispatch('getAccountlist', ids.id)
          }
          return state.property.allOptions
        },
        accountList: function(state) {
          if ( JSON.stringify(state.property.accountList) != '{}') {
              let accountList = state.property.accountList
              this.prams.toCoinId = accountList.coinId
              this.prams.coinId = accountList.coinId
              this.available = accountList.balance
          }
          return state.property.accountList
        },
        // accountList: state => state.property.accountList,
      })
    },

    methods: {
      getAmount(_fromid,accountList) {
        switch (_fromid) {
          case 1:
            this.available = this.accountList.balance;
            break;
          case 2:
            this.available =  this.accountList.otcBalance;
            break;
          case 3:
            this.available = this.accountList.minemoney;
            break;
          case 4:
            this.available = this.accountList.financialBalance;
            break;
          case 5:
            this.available =this.accountList.walletBalance;
            break;
          case 6:
            this.available = this.accountList.allowanceBalance;
            break;
          default:
        }
      },
      handleClose() {
        this.dialogVisible = false
      },
      fullName(v) {
        if(this.value==2){
          this.options[2].disabled=false
        }else{
          this.options[2].disabled=true
        }
        let id = this.allOptions[v].id
        this.value1=[1]
        this.value2= [2]
        this.$store.dispatch('getAccountlist', id)
      },
      handleChange(v) {
        if(v.length>1){
          let a = this.options[2].children
          let b = v[1]
          this.prams.coinId = a[b].coinId
          this.accountList.minemoney = a[b].contractBalance
          this.prams.fromAccount = v[0]
          this.getAmount(3)
        }else{
          this.getAmount(v[0])
          this.prams.fromAccount = v[0]
          // this.value1 = v[0]
          this.prams.coinId = this.accountList.coinId
          // let a = v[0]
        }
      },
      handleChange1(v) {
        if(v.length>1){
          this.prams.toAccount = v[0]
          let a = this.options[2].children
          let b = v[1]
          this.prams.toCoinId = a[b].coinId
          // this.accountList.balance = a[b].contractBalance
        }else{
          this.prams.toAccount = v[0]
          this.prams.toCoinId = this.accountList.coinId
        }

      },
      // 全部
      complete(n) {
        this.prams.amount = this.numFilter(n)
      },
      // 反转
      reverselist() {
        // debugger
        // let a = this.prams.fromAccount
        // let b = this.prams.toAccount 
        // this.value1 = [b]
        // this.value2 = [a]
        // console.log(a,'翻转w',b)
        // console.log(this.value1,'翻转',this.value2)
        // this.prams.fromAccount = b
        // this.prams.toAccount = a
      },

      // 划转接口
      async getContractAccount() {
        let arr = []
        let result = await getContractAccount()
        if (result.code == 200) {
          result.data.forEach((i, n) => {
            let src = i.contractBalance
            arr.push({
              value: n,
              coinId:i.coinId,
              contractBalance:i.contractBalance,
              label: i.coinName + 'USDT' + '  ' + '余额' + '  ' + this.numFilter(i.contractBalance)
            })
          })
          if(this.value==2){
            this.options[2].disabled=false
          }
          this.options[2].children = arr
        }
      },
      async transferAccount() {
        if (this.prams.fromAccount == this.prams.toAccount) {
          this.$message({
            message: '请选择不同账户划转',
            type: 'error'
          })
          return
        } else if (this.prams.amount == '') {
          this.$message({
            message: '请输入转入数量',
            type: 'error'
          })
          return
        }
        this.prams.coinName = this.accountList.coinName
        const {
          amount,
          coinId,
          coinName,
          fromAccount,
          toAccount,
          toCoinId
        } = this.prams
        let results = await transferAccount({
          amount,
          coinId,
          coinName,
          fromAccount,
          toAccount,
          toCoinId
        })
        if (results.code == 200) {
          this.$message({
            message: '划转成功',
            type: 'success'
          })
          window.location.reload(); 
          this.dialogVisible = false
        } else {
          this.$message({
            message: results.msg,
            type: 'error'
          })
        }
      },

      // 资产
      async accountListlist() {
        let that = this
        let allowanceBalance = [] // 资金账户
        let otcBalance = [] // 法币
        let balance = [] // 币币
        let object = {} // 永续合约
        let headnav = {} // 永续干净合约
        let contractBalance = [] // 永续合约
        let financialBalance = [] // 理财
        let financialheadnav = {} // 理财
        // let // 跟单账户
        const result = await accountList()
        if (result.code == 200) {
          that.accountArr = result.data.accountList
          let b = 0
          let c = 0
          let d = 0
          let e = 0
          let f = 0
          let g = 0
          let h = 0
          this.newaccountArr = that.accountArr.reduce(function(prev, i) {
            let a = (i.balance * i.usdtPrice) + (i.otcBalance * i.usdtPrice) + (i.contractBalance * i.usdtPrice) +
              (i.financialBalance * i.usdtPrice) + (i.walletBalance * i.usdtPrice) + (i.allowanceBalance * i.usdtPrice) +prev
            that.sumlist = {
              walletBalance: b += (i.walletBalance * i.usdtPrice), // 资金账户
              balance: c += (i.balance * i.usdtPrice) + (i.otcBalance * i.usdtPrice) + (i.contractBalance * i.usdtPrice) +
                (i.financialBalance * i.usdtPrice), // 交易
              allowanceBalance: d += (i.allowanceBalance * i.usdtPrice), // 补贴
              // totalFee: (i.allowanceBalance + i.allowanceFreezingBalance)*i.usdtPrice   // 可用
            }
            allowanceBalance.push({
              coinName: i.coinName,
              allowanceBalance: i.walletBalance,
              walletFreezingBalance: i.walletFreezingBalance,
              id: i.coinId
            }) // 资金
            otcBalance.push({
              coinName: i.coinName,
              allowanceBalance: i.otcBalance,
              walletFreezingBalance: i.otcFreezingBalance
            }) // 法币
            balance.push({
              coinName: i.coinName,
              allowanceBalance: i.balance,
              walletFreezingBalance: i.freezingBalance
            }) // 币币
            if(i.coinName != "USDT" && i.coinName!= "AUTT"){
              object = {
                coinName: i.coinName,
                contractBalance: i.contractBalance + i.contractFreezingBalance,
                contractProfitLoss: i.contractProfitLoss,
                contractProfitLossNo: i.contractProfitLossNo,
                contractMarginRate: i.contractMarginRate,
                contractUsedMargin: i.contractUsedMargin,
                contractBalance1:i.contractBalance
              } // 永续合约
              contractBalance.push(object) // 合约
            }


            headnav = {
              contractBalance: e += (i.contractBalance),
              contractUsedMargin: h += i.contractUsedMargin
            }
            // console.log('合约',i.contractBalance,'hhh1',i.usdtPrice)
            financialheadnav = {
              financialheadnav: f += ((i.financialBalance)),
              financialFreezingBalance: g += (i.financialFreezingBalance),
            }
            // contractBalance.push({coinName:i.coinName,allowanceBalance:i.contractBalance,walletFreezingBalance:i.contractFreezingBalance}) // 合约
            // financialBalance.push({coinName:i.coinName,allowanceBalance:i.balance,walletFreezingBalance:i.financialFreezingBalance}) // 理财
            return a
          }, 0);
          // contractBalance.push(object) // 合约
          // this.newaccountArr.cny = that.newaccountArr.sum * result.data.cnyPrice
          that.CNY = result.data.cnyPrice
          this.$store.commit(ASSET_MANAGEMENT, {
            allowanceBalance,
            otcBalance,
            balance,
            contractBalance,
            financialBalance,
            headnav,
            financialheadnav
          })
          that.items[0]['balance'] = that.sumlist.balance
          that.items[1]['balance'] = that.sumlist.allowanceBalance
          that.items[2]['balance'] = that.sumlist.walletBalance
          const {
            sumlist,
            CNY
          } = that
          this.$store.commit(SUMLIST_MANAGEMENT, {
            sumlist,
            CNY
          })
        } else {
          that.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
    }
  }
</script>

<style lang="scss">
  .AssetDetailsPanel-container {
    width: 100%;
    height: 200px;
    margin-bottom: 4px;
    background-color: $blue;
    font-size: 14px;

    .line {
      float: left;
      width: 1px;
      height: 40px;
      margin-top: 27px;
      margin-left: 31px;
      border-left: 1px solid #fff;
    }

    .top {
      height: 106px;
      line-height: 106px;
      padding-left: 20px;

      .money-title {
        font-size: 22px;
        color: #fff;
      }

      .money {
        font-size: 22px;
        color: $money-blue;
      }

      .money1 {
        color: #fff;
        font-size: 16px;
        opacity: 0.61;
      }

      .btn {
        width: 74px;
        height: 34px;
        padding: unset;
        background-color: transparent;
        color: $money-blue;
        border-color: $money-blue;
      }
    }

    .centerlist {
      color: #fff;
      padding-left: 20px;

      .el-row {
        padding: 10px 0 !important;
      }

      span {
        color: #1476FE;
      }

      span:last-child {
        color: #8a94a2;
      }
    }

    .pop-up {
      color: #fff;

      .el-dialog--center {
        text-align: center;
      }

      .el-dialog {
        background: #243858;
        // width: 480px;
        // height: 330px;
      }

      .dialog-title {
        text-align: center;
      }

      .el-input__icon {
        line-height: 0px !important;
      }

      .el-input__inner {
        height: 35px !important;
        border: none;
      }

      .el-select {
        width: 100%;
      }

      .capitalTran {
        .transfer {
          background: #fff;
          padding: 10px;
          border-radius: 3px;
          // display: flex;
          // justify-content: space-between;
          font-size: 14px;

          span {
            align-self: center;
          }

          b {
            cursor: pointer;
          }
        }

        .turnover {
          font-size: 14px;
          margin-top: 30px;
          color: #fff;
        }

        .capitalTran .turnover {
          font-size: 14px;
          margin-top: 30px;
          color: #fff;
        }

        .tranInt {
          display: flex;
          margin-top: 15px;
          font-size: 14px;

          em {
            font-style: normal;
            align-self: center;
          }

          span {
            cursor: pointer;
            border-left: 1px solid #ccc;
            padding: 0 12px;
            color: #357ce1;
          }
        }
      }

    }
  }
</style>
