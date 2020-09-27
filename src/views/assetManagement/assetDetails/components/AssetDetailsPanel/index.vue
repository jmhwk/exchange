<template>
  <div class="AssetDetailsPanel-container">
    <el-row class="top">
      <el-col :span="17">
        <span class="money-title">总资产</span>&nbsp;
        <span class="money">{{newaccountArr|numFilter}}</span>
        <span class="money1">≈{{newaccountArr*CNY|numFilter}}CNY</span>
      </el-col>
      <el-col :span="7">
        <el-button class="btn" @click="$router.push({name:'rechargeCurrency'})">充币</el-button>
        <el-button class="btn" @click="$router.push({name:'withdrawal'})">提币</el-button>
        <el-button class="btn" @click="dialogVisible = true">资金划转</el-button>
      </el-col>
    </el-row>
    <div class="centerlist">
      <el-row >
        <el-col :span="8">资产账户</el-col>
        <el-col :span="8">交易账户</el-col>
        <el-col :span="8">补贴账户</el-col>
      </el-row>
      <el-row >
        <el-col :span="8"><span>{{sumlist.walletBalance|numFilter}}USDT</span> <span> ≈  {{sumlist.walletBalance*CNY|numFilter}}CNY</span> </el-col>
        <el-col :span="8"><span>{{sumlist.balance|numFilter}}USDT</span> <span> ≈  {{sumlist.balance*CNY|numFilter}}CNY</span> </el-col>
        <el-col :span="8"><span>{{sumlist.allowanceBalance|numFilter}}USDT</span> <span> ≈  {{sumlist.allowanceBalance*CNY|numFilter}}CNY</span> </el-col>
      </el-row>
    </div>

    <div class="pop-up">
      <el-dialog :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
        <h2 slot="title" class="dialog-title">资金划转 </h2>
        <div class="capitalTran">
          <div class="transfer" style="padding: 5px 10px;">
            <el-row>
              <el-col :span="8"> <span style="line-height: 20px;">{{prams.fromAccount|titleFilter}}</span></el-col>
              <el-col :span="8" style="text-align: center;">
                <b @click="reverselist"><img src="../../../../images/icon/hzicon.png" style="width: 24px;"></b>
              </el-col>
              <el-col :span="8">
                <span style="line-height: 20px;">{{prams.toAccount|titleFilter}}</span>
              </el-col>
            </el-row>

          </div>
          <el-row class="turnover">
             <el-col :span="3" style="line-height: 35px;">币种</el-col>
             <el-col :span="21">
              <el-select v-model="value" placeholder="请选择"  @change="fullName(value)">
                <el-option v-for="(item,index) in allOptions" :key="index" :label="item.shortName" :value="index">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="turnover">可用 {{accountList.balance|numFilter}}</div>
          <div class="tranInt transfer flexcenter"><input placeholder="请输入转入数量" v-model="prams.amount"><em>{{accountList.coinName}}</em><span @click="complete(accountList.balance)">全部</span></div>
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
    transferAccount
  } from '@/api'
  import { mapState } from 'vuex'
  import {
    ASSET_MANAGEMENT,
    SUMLIST_MANAGEMENT
  } from '@/store/mutation-types' // 存储用户信息
  export default {
    filters: {
      numFilter (value) {
        // 截取当前数据到小数点后两位
        let realVal = parseFloat(value).toFixed(2)
        return realVal
      },
      titleFilter(status) {
        const statusMap = {
          1: '币币交易',
          2: '法币交易',
        }
        return statusMap[status]
      }
    },

    data() {
      return {
        dialogVisible: false,
        accountArr: [],
        sumlist: [],
        CNY: 0,
        shortName:'',
        newaccountArr: 0,
        prams:{ 
          amount:'' , 
          coinId:'',
          coinName:'', 
          fromAccount: 1, 
          toAccount: 2
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
       value: 0,
      }
    },
    created() {
      this.accountListlist()
      this.$store.dispatch('accountList', 3)
    },
    computed: {
      ...mapState({
        allOptions:function (state){
          if(state.property.allOptions.length>0){
            let ids = state.property.allOptions[0]
            this.$store.dispatch('getAccountlist', ids.id)
          }
          return state.property.allOptions
        },
        accountList :state => state.property.accountList,
      })
    },
    
    methods: {
      handleClose() {
        this.dialogVisible = false
      },
      fullName(v){
        let id = this.allOptions[v].id
        this.$store.dispatch('getAccountlist', id)  
      },
      // 全部
      complete(n){
       this.prams.amount=this.$options.filters['numFilter'](n)
      },
      // 反转
      reverselist(){
        this.prams.fromAccount = this.prams.fromAccount=='1'?'2':'1'
        this.prams.toAccount = this.prams.toAccount=='2'?'1':'2'
      },
      
      // 划转接口
      
      async transferAccount () {
        this.prams.coinId = this.accountList.coinId
        this.prams.coinName = this.accountList.coinName
        const { amount , coinId, coinName, fromAccount, toAccount } = this.prams
        let results  = await transferAccount({ amount , coinId, coinName, fromAccount, toAccount })
        if(results.code == 200){
          console.log(results.data)
          this.$message({
            message: '划转成功',
            type: 'success'
          })
        }else {
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
        let headnav = {} // 永续合约
        let contractBalance = [] // 永续合约
        let financialBalance = [] // 理财
        let financialheadnav = {}// 理财
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
          this.newaccountArr= that.accountArr.reduce(function(prev, i) {
            let a = (i.balance * i.usdtPrice) + (i.otcBalance * i.usdtPrice) + (i.contractBalance *i.usdtPrice) + (i.financialBalance * i.usdtPrice) + (i.walletBalance * i.usdtPrice) + (i.allowanceBalance * i.usdtPrice)+prev
            that.sumlist={
              walletBalance:b+=(i.walletBalance*i.usdtPrice), // 资金账户
              balance:c+=(i.balance*i.usdtPrice)+(i.otcBalance * i.usdtPrice)+(i.contractBalance *i.usdtPrice)+(i.financialBalance * i.usdtPrice), // 交易
              allowanceBalance:d+=(i.allowanceBalance*i.usdtPrice), // 补贴
              }
            allowanceBalance.push({
              coinName: i.coinName,
              allowanceBalance: i.walletBalance,
              walletFreezingBalance: i.walletFreezingBalance,
              id:i.coinId
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
            
            object={
              contractBalance:0,
              contractProfitLoss:i.contractProfitLoss,
              contractProfitLossNo:i.contractProfitLossNo,
              contractMarginRate:i.contractMarginRate,
              contractUsedMargin:i.contractUsedMargin
            } // 永续合约
            
            headnav={
              contractBalance:e+=(i.contractBalance *i.usdtPrice)
            }
            financialheadnav={
              financialheadnav: f+=((i.financialBalance * i.usdtPrice)),
              financialFreezingBalance: g+=((i.financialFreezingBalance * i.usdtPrice)),
            }
            // contractBalance.push({coinName:i.coinName,allowanceBalance:i.contractBalance,walletFreezingBalance:i.contractFreezingBalance}) // 合约
            // financialBalance.push({coinName:i.coinName,allowanceBalance:i.balance,walletFreezingBalance:i.financialFreezingBalance}) // 理财
            return a
          }, 0);
   
          contractBalance.push(object)
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
    .centerlist{
      color: #fff;
      padding-left: 20px;
      .el-row{
        padding: 10px 0 !important;
      }
      span{
        color: #1476FE;
      }
      span:last-child{
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
      .el-select{
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
