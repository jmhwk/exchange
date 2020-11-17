<template>
  <div class="Tab2-subcontainer height678">
      <h1>补贴明细（AUTT）</h1>
      <ul>
         <li>总补贴 ： <span style="color: #1476FE;">{{ numFilter(myAllowancelist.release+myAllowancelist.notRelease) }}</span></li>
         <li>已释放 ： <span style="color: #1476FE;">{{ numFilter(myAllowancelist.release) }}</span></li>
         <li>待解锁 ： <span style="color: #1476FE;">{{ numFilter(myAllowancelist.notRelease)}}</span></li>
         <li>可使用 ： <span style="color: #1476FE;">{{ numFilter(myAllowancelist.balance)}}</span></li>
       </ul>
    <div class="top">
       <ul>
         <li v-for="(item,index) in arrlist" :key="index" :class="{active:num==index}" @click="handleClick(index)">{{item.name}}</li>
       </ul>
    </div>
    <div style="height: 100%;">
      </div>
      <div class="subcontainer-bottom" v-show="num==0">
        <el-table :data="subsidy" style="width: 100%">
          <el-table-column prop="allowanceTime" label="补贴时间" min-width="180" align="center"/>
          <el-table-column prop="subAmount" label="亏损金额" min-width="180" align="center" :formatter="fmtLengthFloat" />
          <el-table-column prop="allowanceAmount" label="补贴金额" min-width="180" align="center" :formatter="fmtLengthFloat" />
        </el-table>
      </div>
      <div class="subcontainer-bottom" v-show="num==1">
        <el-table :data="release" style="width: 100%">
          <el-table-column prop="allowanceTime" label="释放时间" min-width="180" align="center">
           <template slot-scope="scope1" align="center">
            <span>{{timestampToTime(scope1.row.createTime)}}</span>
            </template>
          </el-table-column>  
          <el-table-column prop="releaseAmount" label="释放金额" min-width="180" align="center" :formatter="fmtLengthFloat" />
          <el-table-column prop="levelReleaseAmount" label="待释放金额" min-width="180" align="center" :formatter="fmtLengthFloat" />
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
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { allowanceDetail, myAllowance, releaseDetail  } from '@/api'
  import { fmtLengthFloat, numFilter,timestampToTime } from '@/assets/js/time.js'
  // 交易账户tab页
  export default {
    data() {
      return {
        arrlist:[{name:'补贴记录'},{name:'释放记录'}],
        num:0,
        value: true,
        activeName: 'tab1',
        fmtLengthFloat:fmtLengthFloat, // 
        numFilter:numFilter, // 保留两位小数
        timestampToTime:timestampToTime,
        pagesize: 10, // 一页10条
        currentPage:1,// 默认第一页
        total: 0,// 总页数
        numbertal:0,
        myAllowancelist:{},
        subsidy:[], // 补贴数据
        release :[], // 释放记录
      }
    },
    created(){
      this.allowanceDetail()
      this.myAllowance()
      this.releaseDetail()
    },
    methods: {
      // tab切换
      handleClick(index) {
        this.currentPage = 1
        this.num=index
      },
      // 分页
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      // 补贴明细
      async myAllowance () {
        let result = await myAllowance ()
        if(result.code == 200){
            this.myAllowancelist = result.data
        }
      },
      // 补贴记录
      async releaseDetail() {
        let parms = this.currentPage+'/'+this.pagesize
        let result = await releaseDetail (parms)
        if (result.code == 200) {
          this.release = result.data
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      // 释放明细
      async allowanceDetail() {
        let parms = this.currentPage+'/'+this.pagesize
        let result = await allowanceDetail (parms)
        if (result.code == 200) {
          this.numbertal = result.data.total
          this.subsidy = result.data
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
  .Tab2-subcontainer {
    display: flex;
    flex-direction: column;
    color: #fff;
    h1{
      padding: 20px 0 0 35px;
      font-size: 18px;
      color: #1476FE;
    }
    ul{
      padding: 20px 0;
      border-bottom: 1px dashed #1f324d;
      display: flex;
      li{
        padding: 0 35px;
      }
      .active{
        color: #1476FE;
      }
    }
    .top{
      li:hover{
        color: #1476FE;
        cursor:pointer;
      }
    }
    .subcontainer-bottom {
      flex: 1;
      font-size: 12px;
      height: 100%;
      .thread{
        img{
          width: 210px;
          height: 115px;
        }
        p{
          text-align: center;
          color: #677587;
        }
      }
      ul{
        span{
          padding: 0 5px;
          color: #1476FE;
        }
        span:last-child{
          color: #8a94a2;
        }
      }
      .el-table::before {
        background-color: $blue;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }
      .el-table__header {
        background-color: $blue;
      }
      .el-table__empty-block{
        background: #031937;
        color: #9ca5b1;
      }
      .el-table th {
        opacity: 0.61;
      }
      .el-table th,
      .el-table tr {
        color: #fff;
        background-color: $blue;
      }
      .el-table td,
      .el-table th.is-leaf {
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #002658 !important;
        opacity: 1;
      }
      .btn {
        width: 46px;
        height: 21px;
        padding: unset;
        font-size: 12px;
        background-color: $blue;
        color: $money-blue;
        border-color: $money-blue;
      }
    }
    .pagination {
      margin: 27px;
      display: flex;
      justify-content: center;
      .el-pagination {
        background-color: $blue;
        display: inline-block;
        >button,
        >ul li {
          color: rgba($color: #fefefe, $alpha: 0.8);
          background-color: $blue;
        }
        .active {
          color: #1476FE;
        }
      }
    }
  }
</style>