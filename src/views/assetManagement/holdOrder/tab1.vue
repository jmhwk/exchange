<template>
  <div class="Tab1-subcontainer height678">
<!--    <div class="subcontainer-top">
      <el-row>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择" @change="taboptione" >
            <el-option v-for="(item,index) in options" :key="'c'+index" :label="item.name" :value="item.marketId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div> -->
    
    <div class="subcontainer-bottom">
      <el-table :data="lenduserHold" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="合约" min-width="150" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.marketName}}永续合约</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="倍数" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty" :class="scope1.row.type | statusFilter" >{{scope1.row.type| formatStata}} {{scope1.row.lendRate}}X</span>
          </template>
        </el-table-column>
        <el-table-column prop="openAvgPrice" label="开仓价格 ($)" min-width="120" align="center" :formatter="fmtLengthFloat">
          <template slot-scope="scope1" align="center">
            <span class="listnum">{{scope1.row.openAvgPrice}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="earn" label="收益" min-width="100" align="center" :formatter="fmtLengthFloat"/>
        <el-table-column prop="burstPrice" label="预估强平价 ($)" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.burstPrice<0?0:scope1.row.burstPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="收益率" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.earnRate}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="marginAmount" label="委托金 (USDT) " min-width="180" align="center" :formatter="fmtLengthFloat"/>
        <el-table-column prop="tradeQty" label="持仓量" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{numFilter(scope1.row.holdQty - scope1.row.dealQty)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="可平量" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span class="listnum">{{numFilter(scope1.row.holdQty - scope1.row.dealQty - scope1.row.freezingQty)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="marginRate" label="保证金率" min-width="100" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{numFilter(scope1.row.marginRate*100)}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="170">
          <template slot-scope="scope">
            <el-row class="bottomlist">
              <el-col :span="12">
                <el-button class="btn" @click="open(scope.row)">止盈止损</el-button>
              </el-col>
              <el-col :span="12">
                <el-button class="btn" @click="open1(scope.row)">平仓</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pop-uplist">
      <el-dialog :visible.sync="dialogVisible" width="29%"  center>
        <h2 slot="title" class="dialog-title" style="font-size: 18px;">止盈止损</h2>
         <el-form :model="form">
            <el-form-item label="">
                <el-input v-model="form.earnPrice" placeholder="请输入止盈价格">
                  <template slot="prepend">止盈价</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="form.lossPrice" placeholder="请输入止损价格">
                  <template slot="prepend">止损价</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.qty" placeholder="平仓数量" >
                <template slot="prepend">平仓数量</template>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <ul class="leverlist">
                <li v-for="(i,n) in genrenum" :key="'A'+n"  @click="toggle(n,i.label,numFilter(opendata.holdQty - opendata.dealQty - opendata.freezingQty))" :class="{active:active2==n}" >{{i.name}}</li>
              </ul>
            </el-form-item>
            <el-row>
              <el-col :span="12"><span>可平数量 {{numFilter(opendata.holdQty - opendata.dealQty - opendata.freezingQty)}}</span></el-col>
              <el-col :span="12" style="text-align: end"><span>当前价格 {{numFilter(latesTcontract)}}</span></el-col>
            </el-row>
            
     <!--       <span>当前价格 {{numFilter(opendata1.holdQty - opendata1.dealQty - opendata1.freezingQty)}}</span> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary"style="width:100%;background-color: #1476FE;" @click="add1(4,opendata)">确定</el-button>
          </div>
      </el-dialog>
    </div>
    <div class="pop-uplist">
      <el-dialog :visible.sync="dialogVisible1" width="29%" center>
        <h2 slot="title" class="dialog-title" style="font-size: 18px;">平仓{{opendata1.marketName}}永续</h2>
         <el-form :model="form1">
            <el-form-item label="">
                <el-input v-model="form1.price" placeholder="平仓价格">
                  <template slot="prepend">平仓价格</template>
                  <template slot="append">限价委托</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form1.qty" placeholder="平仓数量" >
                <template slot="prepend">平仓数量</template>
                <template slot="append"></template>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <ul class="leverlist">
                <li v-for="(i,n) in genrenum" :key="'B'+n"  @click="toggle2(n,i.label,numFilter(opendata1.holdQty - opendata1.dealQty - opendata1.freezingQty))" :class="{active:active2==n}" >{{i.name}}</li>
              </ul>
            </el-form-item>
            <span>可平数量 {{numFilter(opendata1.holdQty - opendata1.dealQty - opendata1.freezingQty)}}</span>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-popover
              placement="top"
              width="300"
              v-model="visible1">
              <p>一键平仓会以市场最优价格平掉您当前所有仓位，是否继续？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="add2(1,opendata1)">确定</el-button>
              </div>
              <el-button type="primary" slot="reference" class="butnwindow">一键平仓</el-button>
            </el-popover>
            
            
          <!-- <el-button type="primary" slot="reference" style="width: 48%;background-color: #1476FE;" @click="add2(1,opendata1)">一键平仓</el-button> -->
            <el-button type="primary" @click="add2(2,opendata1)" class="butnwindow">平仓</el-button>
          </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { lendorderList, lendUserHold,lendadd } from '@/api'
  import {timestampToTimes,fmtLengthFloat, numFilter} from '@/assets/js/time.js'
  import { mapState } from 'vuex'
  // 交易账户tab页
  export default {
    filters:{
      // 颜色转换
      statusFilter(status) {
        const statusMap = {
          1: 'color_three',
          2: 'color_two',
        }
        return statusMap[status]
      },
      // 状态显示转换1 买入开多 2 卖出开空 3卖出平多 4买入平空
      formatStata(status) {
        const statusMap = {
          1: '空头',
          2: '多头',
        }
        return statusMap[status]
      }
    },
    computed: {
      ...mapState({
        latesTcontract: state => state.property.latesTcontract,
        lenduserHold: state => state.websocket.lenduserHold,
      }),
    },
    data() {
      return {
        dialogVisible: false,
        dialogVisible1: false,
        timer:null,
        timestampToTimes:timestampToTimes,
        fmtLengthFloat:fmtLengthFloat,
        numFilter:numFilter,
        tableData: [],
        name:{},
        options: [],
        value:1,
        opendata: {},
        opendata1: {},
        form:{
          price:'',
          qty:'',
          earnPrice :'',
          lossPrice:''
        },
        form1:{
          price:'',
          qty:'',
          earnPrice :'',
          lossPrice:''
        },
        genrenum:[{name:'10%',label:'0.1'},{name:'20%',label:'0.2'},{name:'50%',label:'0.5'},{name:'100%',label:'1'}],
        active2:-1,
        visible1:false,
      }
    },
    methods: {
      add1(orderType,options){
        // let a = this.form.lossPrice 
        this.add(this.form,orderType,options,1)
        // let b = this.form.earnPrice
        // if(this.form.lossPrice !='' && this.form.earnPrice !='' ){
        //   this.add(this.form,orderType,options,1)
        //   this.timer=setTimeout(()=>{
        //     this.form.lossPrice = a 
        //     this.add(this.form,orderType,options,2)
        //   }, 2000);
        // }else{
        //   if(this.form.earnPrice !=''){
        //     // this.form.lossPrice = this.form.earnPrice
        //     this.add(this.form,orderType,options,1)
        //   }else if(this.form.lossPrice !=''){
        //     // this.form.earnPrice = this.form.lossPrice
        //     this.add(this.form,orderType,options,2)
        //   }
        // }

      },
      add2(index,opendata1){
        if(index==1){
          this.visible1 = false
          this.form1.price=''
          this.form1.qty =this.numFilter(this.opendata1.holdQty - this.opendata1.dealQty - this.opendata1.freezingQty)
          this.add(this.form1,2,opendata1,3)
        }else{
          if(this.form.qty){
            this.add(this.form1,1,opendata1,3)
          }else{
            this.$message({
              message: '请输入平仓数量',
              type: 'error'
            })
          }
          
        }

      },
      // 买卖接口
      async add(form,orderType,options,call) {
        let type = options.type==2?4:3
        if(call==1){
          this.form.price = this.latesTcontract
        }
        const {marketId,lendRate } = options
        const { price, qty,earnPrice,lossPrice} = form
        const result = await lendadd({lendRate, marketId, orderType, price, qty,type,earnPrice ,lossPrice})
        if (result.code == 200) {
          this.dialogVisible = false
          this.dialogVisible1 = false
          this.$message({
            message: '委托成功',
            type: 'success'
          })
          window.location.reload();
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      getSocketData2(id) {
        let params = {
          channel: "lendMarketById", 
          marketId: id,
        }
        this.socketApi.sendSock(params, (data) =>{
         if(data.channel=="lendMarketById"){
           let listb = data.buyList ||[] // 买
           this.form1.price=listb.length>0?listb[0].price:0
          }
        });
      },
       // 止盈止损
      open(r){
        this.dialogVisible = true
        this.opendata = r
      },
      // 平仓按钮
      open1(r){
        this.dialogVisible1 = true
        this.getSocketData2(r.marketId)
        this.opendata1 = r
      },
      // 买入数量
      toggle(i,a,v){
        this.active2=i;
        this.form.qty =this.numFilter(v*a)
      },
      // 买入数量
      toggle2(i,a,v){
        this.active2=i;
        this.form1.qty =this.numFilter(v*a)
      },
    }
  }
</script>
<style lang="scss">
  .subcontainer-bottom{
    .statusSty {
      width: 80px;
    }
    .listnum{
      color: #1BAF82;
    }
  }
  .bottomlist{
    .btn{
      width: 70px!important;
    }
  }
  .pop-uplist {
    color: #fff;
    .el-dialog--center {
      text-align: center;
    }
    span{
      color: #fff;
    }
    .el-dialog {
      background: #243858;
      // width: 480px;
      height: 450px;
      // width: 480px;
      // height: 330px;
    }
    .el-dialog--center .el-dialog__body{
      padding: 15px 25px 10px;
    }
    .butnwindow{
      width: 40%;
      background-color: #1476FE;
      margin: 0 15px;
    }
    .leverlist {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      li {
        background: #fff;
        border-radius: 5px;
        text-align: center;
        // padding:0 30px;
        width: 17%;
      }
      .active{
        border: 1px solid #1476FE;
        color: #1476FE;
      }
      span {
        color: #708ad5;
      }
    }
  }
</style>
