<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择"  @change="selectchange(value)">
            <el-option v-for="item in options" :key="item.id" :label="item.symbol" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        </el-col>
<!--        <el-col :span="6">
            <el-select v-model="value2" placeholder="请选择"  @change="selectchange(value2,1,value3)">
              <el-option 
              v-for="item in options2" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"
              >
              </el-option>
            </el-select>
        </el-col> -->
<!--        <el-col :span="6">
          <el-select v-model="value3" placeholder="请选择"  @change="selectchange(value3,2,value2)">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col> -->
      </el-row>
    </div>
    
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="合约" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.leftCoinName}}{{scope1.row.rightCoinName}}永续合约</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="方向" min-width="80" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty" :class="scope1.row.type | statusFilter" v-if="scope1.row.isBrust">{{scope1.row.isBrust==1?'强制平仓':''}}</span>
            <span class="statusSty"  :class="scope1.row.type | statusFilter" v-else>{{scope1.row.type| formatStata}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="时间" min-width="110" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{timestampToTimes(scope1.row.createTime)}}</span>
          </template>
        </el-table-column>
       <el-table-column prop="price" label="委托价" min-width="120" align="center">
         <template slot="header" slot-scope="scope">
           <span>委托价（{{name.rightCoinName}}）</span>
         </template>
       </el-table-column>
        
        <el-table-column prop="qty" label="委托量" min-width="120" align="center">
          <template slot="header" slot-scope="scope">
            <span>委托量（{{name.leftCoinName}}）</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="成交量" min-width="120" align="center">
          <template slot="header" slot-scope="scope">
            <span>成交量（{{name.leftCoinName}}）</span>
          </template>
        </el-table-column>
<!--        <el-table-column prop="--" label="成交均价" min-width="120" align="center">
          <template slot="header" slot-scope="scope1">
            <span>成交均价（{{name.rightCoinName}}）</span>
          </template>
          <template slot-scope="scope" align="center">
            <span>--</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="" label="保证金" min-width="120" align="center">
          <template slot="header" slot-scope="scope">
            <span>保证金（{{name.rightCoinName}}）</span>
          </template>
          <template slot-scope="scope1" align="center">
            <span>{{numFilter(scope1.row.marginAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="平仓盈亏" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{fromlist(1,scope1.row.lendTradeList)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeQty" label="手续费" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
           <span>{{fromlist(2,scope1.row.lendTradeList)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" min-width="80" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty"  :class=" scope1.row.status | placeFilter">{{scope1.row.status | placeStata}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <div class="pagination">
      <el-pagination
         layout="prev, pager, next" 
         @current-change="current_change"
         :page-size="pagesize"
         :total="total"
       />
    </div>
  </div>
</template>

<script>
  import { getNewHistory,getMarket} from '@/api'
  import {timestampToTimes, numFilter} from '@/assets/js/time.js'
  import { mapState } from 'vuex'
  // 交易账户tab页
  export default {
    filters:{
       // 订单状态
      placeStata(status) {
        const statusMap = {
          '-1':'已撤单',
          0: '已下单',
          1: '待撮合',
          2: '撮合中',
          3: '已完成'
        }
        return statusMap[status]
      },
      // 颜色转换
      placeFilter(status) {
        const statusMap = {
          '-1': 'color_three',
          0:'color_one',
          1:'color_four',
          2:'color_five',
          3:'color_two',
        }
        return statusMap[status]
      },
      // 颜色转换
      statusFilter(status) {
        const statusMap = {
          1: 'color_two',
          2: 'color_three',
          3: 'color_two',
          4: 'color_three', 
        }
        return statusMap[status]
      },
      // 状态显示转换1 买入开多 2 卖出开空 3卖出平多 4买入平空
      formatStata(status) {
        const statusMap = {
          1: '买入开多',
          2: '卖出开空',
          3: '买入平空',
          4: '卖出平多'
        }
        return statusMap[status]
      }
    },
    computed: {
      ...mapState({
        user:state => state.user.user
      }),
    },
    data() {
      return {
        timestampToTimes:timestampToTimes,
        numFilter:numFilter,
        tableData: [],
        pagesize: 14, // 一页14条
        currentPage:1,// 默认第一页
        total: 0,// 总页数
        name:{},
        options: [],
        value: 1, 
        current:1,
      }
    },
    created() {
      this.getMarket()
      this.orderList(1)
    },
    methods: {
      selectchange(e){
        // e,委托，index是哪个按钮,value，方向
        this.currentPage = 1;
        this.current =1
        this.orderList(e)
      },
      fromlist(index,list){
        let that = this
        if(index==1){
          let b = list.reduce(function(prev, i) {
             return i.earn + prev
          }, 0);
          return this.numFilter(b)
        }else{
          let a = list.reduce(function(prev, i) {
             return i.fee + prev
          }, 0);
          return this.numFilter(a)
        }
      },
      current_change(currentPage) {
        this.currentPage = currentPage;
        this.orderList(this.current)
      },
      // 币种列表
      async getMarket () {
        const result = await getMarket()
        if (result.code == 200) {
          this.options=result.data
        }
      },
      // 订单详情接口
      async orderList(e) {
        this.tableData=[]
        let parms = e +'/'+this.currentPage+'/'+this.pagesize
        let result = await getNewHistory (parms)
        if (result.code == 200) {
          let a = result.data.records
          this.total = result.data.total
          if(a.length!=0){
            this.tableData = result.data.records
            let b = this.tableData[0]
            this.name={
              leftCoinName:b.leftCoinName,
              rightCoinName:b.rightCoinName
            }
          }else{
            this.tableData=[]
          }
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
<style lang="scss" scoped="scoped">
  .statusSty {
    width: 70px;
  }
</style>
