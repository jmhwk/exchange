<template>
  <div class="Tab1-subcontainer height678">
    <div class="subcontainer-top">
      <el-row>
        <el-col :span="3"><h1>提币种类</h1></el-col>
        <el-col :span="10">
          <el-select v-model="value" placeholder="请选择"  @change="fullName(value)">
            <el-option v-for="(item,index) in bringOptions" :key="index" :label="item.shortName" :value="index">
            </el-option>
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
  import { getTransferOut } from '@/api'
  import { timestampToTime } from '@/assets/js/time.js'
  import { mapState } from 'vuex'
  import { BRING_OPTIONS } from '@/store/mutation-types.js'
  // 交易账户tab页
  export default {
    data() {
      return {
        tableData: [],
        value: 0,
        timestampToTime:timestampToTime,
      }
    },
    created() {
      this.$store.dispatch('accountList', 2)
    },
    computed: {
      ...mapState({
        bringOptions:function (state){
          if(state.property.bringOptions.length>0){
            let name = state.property.bringOptions[0].shortName
            this.getTransferOuttype(name)  
          }
          return state.property.bringOptions
        },
      })
    },
    methods: {
      // 提币记录
      async getTransferOuttype(type) {
        let result = await getTransferOut (type)
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
        let name = this.bringOptions[v].fullName
        this.getTransferOuttype(name)
        
      },
    }
  }
</script>
