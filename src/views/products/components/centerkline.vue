<template>
  <div class="centerkline">
    <div class="center-top">
      <div class="centerk-nav">
        <el-row>
          <el-col :span="4">
            <h1>BTC-永续-USDT</h1>
          </el-col>
          <el-col :span="4">开盘价</el-col>
          <el-col :span="4">涨跌额</el-col>
          <el-col :span="4">24H最高</el-col>
          <el-col :span="4">24H最低</el-col>
        </el-row>
        <el-row class="center-row1">
          <el-col :span="4">涨跌幅+0.50%</el-col>
          <el-col :span="4">121212</el-col>
          <el-col :span="4">58.4</el-col>
          <el-col :span="4">423432</el-col>
          <el-col :span="4">4234234234</el-col>
        </el-row>
      </div>
      <div class="centerk-subject">


      </div>
    </div>
    <div class="center-bottom">
      <div class="centerb-nav">
        <h1>全仓账户信息</h1>
        <div class="centerb-left">
          <el-row>
            <el-col :span="4">
              <el-tooltip class="item" effect="light" content="账户权益=可用资产+冻结保证金+未实现盈亏" placement="bottom">
                <span>账户权益<i class="el-icon-question"></i> </span>
              </el-tooltip>
            </el-col>
            <el-col :span="4">可用资源</el-col>
            <el-col :span="4">冻结保证金</el-col>
            <el-col :span="4">
              <el-tooltip class="item" effect="light" content="持仓合约的未实现盈利综合" placement="bottom">
                <span>未实现盈亏<i class="el-icon-question"></i> </span>
              </el-tooltip>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="item" effect="light" placement="bottom">
                <div slot="content">
                  1.保证金率=账户权益/冻结保证金100%；<br />
                  2.保证金率≤100%时将无法买入合约，当全仓保证金率≤50%，逐仓保证金率≤5%时 ，系统将自动平仓；<br />
                  3.合约产品为杠杆产品，有可能招致您大于本金的损失。请确保您充分理解其中风险和注意管理；<br />
                  4.当价格触及限价委托价格时，如果保证金率≤100%，限价单将无法成交，系统会自动取消该限价单。
                </div>
                <span>保证金率<i class="el-icon-question"></i> </span>
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row class="center-row1">
            <el-col :span="4">0.00</el-col>
            <el-col :span="4">0.00</el-col>
            <el-col :span="4">0.00</el-col>
            <el-col :span="4">0.00</el-col>
            <el-col :span="4">0.00</el-col>
          </el-row>
        </div>

      </div>
      <div class="AssetDetailsTabs-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="市价交易" name="tab1">
            <div class="deal flexcenterlist">
              <div class="deal-top">
                <div class="ints">
                  <h5>价格(USDT)</h5>
                  <div class="its">
                    <input type="text" disabled="disabled">
                    <div class="lever">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">杠杆{{levername}}X<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="item.num" v-for="(item,index) in lever" :key="index">{{item.num}}X</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
                <div class="ints">
                  <h5>数量(BTC)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" placeholder="请输入数量"></div>
                </div>
                <div class="rate flexcenter">
                  <a>预估保证金：<label>0.0000</label></a>
                  <a>保证金率：<label>--</label></a>
                </div>
                <input type="button" value="买入开多" class="lbtns">
              </div>

              <div class="deal-top">
                <div class="ints">
                  <h5>价格(USDT)</h5>
                  <div class="its">
                    <input type="text" disabled="disabled">
                    <div class="lever">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">杠杆{{levername}}X<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="item.num" v-for="(item,index) in lever" :key="index">{{item.num}}X</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
                <div class="ints">
                  <h5>数量(BTC)</h5>
                  <div class="its">
                    <input type="text" maxlength="12" placeholder="请输入数量"></div>
                </div>
                <div class="rate flexcenter">
                  <a>预估保证金：<label>0.0000</label></a>
                  <a>保证金率：<label>--</label></a>
                </div>
                <input type="button" value="买入开多" class="lbtns lbtns1">
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="限价交易" name="tab2">

          </el-tab-pane>
        </el-tabs>
        <div class="explain">
          <span @click="dialogTableVisible = true">保证金率<i class="el-icon-question"></i> </span>
          <el-dialog title="费率说明" :visible.sync="dialogTableVisible">
            <table border="1" class="tables">
              <tr>
                <td>交易手续费率</td>
                <td><span class="red">0.08%</span>(买入时收取，平仓不收取)</td>
              </tr>
              <tr>
                <td>持仓利率</td>
                <td><span class="red">0.02% </span>(当天买入不收取，过夜收取)</td>
              </tr>
              <tr>
                <td>保证金</td>
                <td>买入合约需要缴纳的保证金额 (开仓价 * 数量 / 杠杆比例)</td>
              </tr>
            </table>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'tab1',
        dialogTableVisible: false,
        levername: '100',
        lever: [{
            num: '100'
          },
          {
            num: '5'
          },
          {
            num: '10'
          },
          {
            num: '20'
          },
          {
            num: '30'
          },
          {
            num: '50'
          },
          {
            num: '150'
          },
        ]
      };
    },
    created() {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleCommand(command) {
        this.levername = command
        console.log(command)
      },
    },
  }
</script>

<style lang="scss">
  .centerkline {
      input::-webkit-input-placeholder {
          color: #ffffffcc;
        }
        input::-moz-input-placeholder {
          color: #ffffffcc;
        }
        input::-ms-input-placeholder {
          color: #ffffffcc;
        }
    .lbtns {
      width: 100%;
      border-radius: 2px;
      font-size: 13px;
      cursor: pointer;
      color: #fff;
      padding: 10px 0;
      border: 0;
    }
    .el-row {
      padding: 7px 0;
      font-size: 12px;
      color: #bfc5cd;
      span {
        padding-left:0!important;
        i{
          padding-left: 3px;
        }
      }
    }

    .center-row1 {
      color: #A8CCFF;
    }

    .center-top {

      // height: 556px;
      .centerk-subject {
        height: 500px;
        background: #031937;
        width: 100%;
      }

      .centerk-nav {
        // height: 63px;
        padding: 10px 20px;
        background: #002658;

        h1 {
          color: #1476FE;
          font-size: 14px;
        }
      }
    }

    .center-bottom {
      margin-top: 5px;
      .centerb-nav {
        display: flex;
        background: #031937;
        // padding: 0 20px;

        h1 {
          font-size: 18px;
          color: #1476FE;
          line-height: 100px;
          padding: 0 20px;
          width: 150px;
        }
      }

      .centerb-left {
        width: 100%;
        padding: 20px;
      }

      .AssetDetailsTabs-container {
        width: 100%;
        height: 100%;
        background-color: $blue;
        margin: 5px 0;
        position: relative;

        .deal {
          background: #031937;
          padding: 43px;

          .deal-top {
            width: 40%;
            h5 {
              font-size: 12px;
              display: block;
              margin-bottom: 5px;
              color: #ffffff99;
            }

            .ints {
              margin-bottom: 40px;

              .its {
                border-bottom: 1px solid #383f66;
                padding: 10px 0;
                display: flex;
                position: relative;

                input {
                  width: 70%;
                  background: none;
                  border: 0;
                  font-size: 12px;
                  color: #d2d6ec;
                }

                .lever {
                  position: absolute;
                  right: 0;
                  cursor: pointer;

                  span {
                    color: #708ad5;
                  }
                }
              }
            }
            
            .rate{
              margin-bottom: 35px;
              a {
                  color: #ffffff99;
                  font-size: 12px;
                  cursor: none;
              }
            }
            .lbtns{
              background: #13ad8f;
            }
            .lbtns1{
              background: #db465f;
            }
          }
        }
        .explain {
          // padding: 20px 30px;
          font-size: 12px;
          position: absolute;
          left: 240px;
          top: 20px;
          color: #495c77;
          i{
            padding-left: 3px;
          }
          .el-dialog {
            background: #e6e9ed;
            width: 480px;
            text-align: center;
          }

          .el-dialog__body {
            padding: 0 20px 20px 20px;
          }

          .tables {
            border-collapse: collapse;

            // color: #fff;
            td:first-of-type {
              width: 30%;
            }

            td {
              width: 50%;
              border: 1px solid #d0d1d1;
              padding: 10px;
            }
          }
        }

        .el-tabs {
          width: 100%;
          .el-tabs__header {
            margin: unset;

            .el-tabs__nav-wrap {
              .el-tabs__nav-scroll {
                background-color: rgba($color: #1476FE, $alpha: 0.06);

                .el-tabs__item {
                  height: 55px;
                  line-height: 55px;
                  text-align: center;
                  padding: unset;
                  width: 120px;
                  color: #fff;
                  opacity: 1;
                }

                .el-tabs__item.is-active {
                  background-color: $blue;
                }
              }
            }

            .el-tabs__nav-wrap::after {
              background-color: $blue;
            }
          }
        }
      }
    }

  }
</style>
