<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        </el-col>
        <el-col :span="6">
            <el-select v-model="value2" placeholder="请选择"  @change="selectchange(value2,1,value3)">
              <el-option 
              v-for="item in options2" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"
              >
              </el-option>
            </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value3" placeholder="请选择"  @change="selectchange(value3,2,value2)">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typesOfCurrency" label="币对" min-width="120" align="center">
          <template slot-scope="scope1" align="center">
            <span>{{scope1.row.leftCoinName}}&nbsp;/&nbsp;{{scope1.row.rightCoinName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typesOfCurrency" label="方向" min-width="80" align="center">
          <template slot-scope="scope1" align="center">
          <span class="statusSty" :class="scope1.row.type | statusFilter" >{{scope1.row.type| formatStata}}</span>
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
<!--          <template slot="header" slot-scope="scope">
            <span>委托量（{{name.leftCoinName}}）</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="tradeQty" label="成交量" min-width="120" align="center">
<!--          <template slot="header" slot-scope="scope">
            <span>成交量（{{name.leftCoinName}}）</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="" label="保证金" min-width="120" align="center">
          <template slot="header" slot-scope="scope">
            <span>保证金（{{name.rightCoinName}}）</span>
          </template>
          <template slot-scope="scope1" align="center">
            <span>{{numFilter(scope1.row.marginAmount*scope1.row.marginAmount)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态" min-width="80" align="center">
          <template slot-scope="scope1" align="center">
            <span class="statusSty"  :class=" scope1.row.status | placeFilter">{{scope1.row.status | placeStata}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status!= -1 && scope.row.status!=3" class="btn" @click="handleEdit(scope.row)">撤单</el-button>
            <span v-else>--</span>
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
  import { lendcancelOrder , lendorderList} from '@/api'
  import {timestampToTimes,numFilter} from '@/assets/js/time.js'
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
      },
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
        pull:'',// 下拉
        down:'',// 下拉1 
        direction:1, // 第一个
        name:{},
        options: [{
          value: '1',
          label: '全部交易对'
        }],
        options2: [{
            value: '0',
            label: '全部委托'
          },
          {
            value: '1',
            label: '限价委托'
          },
          {
            value: '3',
            label: '计划委托'
          },
        ],
        options3: [
          {
            value: '0',
            label: '全部方向'
          },
          {
            value: '1',
            label: '买入开多'
          },
          {
            value: '2',
            label: '卖出开空'
          },
          {
            value: '3',
            label: '买入平多'
          },
          {
            value: '4',
            label: '卖出平多'
          },
          
        ],
        value: '1',
        value2: '0',
        value3: '0',
        newparm:{}
      }
    },
    created() {
      this.orderList()
    },
    methods: {
      selectchange(e,index,value){
        // e,委托，index是哪个按钮,value，方向
        this.currentPage = 1;
        if(index == 1){
          this.orderList(value,e)
          this.direction=index
          this.pull = value
          this.down = e
        }else{
          this.orderList(e,value)
          this.direction=index
          this.pull = e
          this.down = value
        }
      },
      filterParams(obj){
          this.newparm = {};
          for (let key in obj) {
            //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                //记录属性
                this.newparm[key] = obj[key];
            }
          }
          //返回对象
          return this.newparm;
      },
      // 调用撤单接口
      async handleEdit(e){
        let pram = {
          id: e.id,
          orderType: 1,
          userId:this.user.id,
        }
        const result = await lendcancelOrder(pram)
        if (result.code == 200) {
           this.$message({
             message: '撤单成功',
             type: 'success'
           })
           this.orderList()
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      current_change(currentPage) {
        this.currentPage = currentPage;
        if(this.direction == 1){
          this.orderList(this.pull,this.down)
        }else{
          this.orderList(this.pull,this.down)
        }
        
      },
      // 订单详情接口
      async orderList(e,v) {
        this.tableData=[]
        let parm = {
            "marketId": '',
            "orderType": v==0? '' : v,
            "pageNumber": this.currentPage,
            "pageSize": this.pagesize,
            "type":e==0?'' : e // 方向
          }
        this.filterParams(parm)
        const result = await lendorderList(this.newparm)
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
  .bottomlist{
    .btn{
      width: 70px!important;
    }
  }
</style>
