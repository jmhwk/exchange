<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="3"><h1>充币种类</h1></el-col>
        <el-col :span="10">
          <el-select v-model="value" placeholder="请选择"  @change="fullName(value)">
            <el-option v-for="(item,index) in serveOptions" :key="index" :label="item.shortName" :value="index" />
          </el-select>
        </el-col>
      </el-row>
    </div>
    
    <div class="subcontainer-bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="时间" min-width="100" align="center" >
          <template slot-scope="scope1" align="center">
            <span>{{timestampToTime(scope1.row.createTime,'all')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="coinName" label="币种" min-width="100" align="center" />
        <el-table-column prop="amount" label="数量" min-width="100" align="center" />
        <el-table-column prop="toAddress" label="提币地址" min-width="100" align="center" />
        <el-table-column prop="remark" label="状态" min-width="130" align="center">
          <template slot-scope="scope" align="center">
            <span style="color: #F33E3F;">{{scope.row.remark||'--'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div> -->
  </div>
</template>

<script>
  import { getCoinRecord } from '@/api'
  import { timestampToTime } from '@/assets/js/time.js'
  import { mapState } from 'vuex'
  import { SERVE_OPTIONS } from '@/store/mutation-types.js'
  // 交易账户tab页
  export default {
    data() {
      return {
        tableData: [],
        value: 'USDT',
        timestampToTime:timestampToTime,
      }
    },
    created() {
      this.$store.dispatch('accountList', 1)
    },
    computed: {
      ...mapState({
        serveOptions:function (state){
            if(state.property.serveOptions.length>0){
              let name = state.property.serveOptions[0].shortName
            }
            return state.property.serveOptions
          },
      })
    },
    methods: {
      // 提币记录
      async getCoinRecord(type) {
        let result = await getCoinRecord (type)
        if (result.code == 200) {
          this.tableData = result.data
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      fullName(v){
        let name = this.serveOptions[v].fullName
        this.getCoinRecord(name)
      },
    }
  }
</script>
