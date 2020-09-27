<template>
  <div class="AssetDetailsTabs-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="划转记录" name="tab1">
        <div class="Tab1-subcontainer height678">
            <div class="subcontainer-top">
              <el-row>
                <el-col :span="3"><h1>充币种类</h1></el-col>
                <el-col :span="10">
                  <el-select v-model="value" placeholder="请选择"  @change="fullName(value)">
                    <el-option 
                    v-for="item in options" 
                    :key="item.value" 
                    :label="item.label" 
                    :value="item.value"
                    >
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
    
                <el-table-column prop="remark" label="转向" min-width="130" align="center">
                  <template slot-scope="scope" align="center">
                   <!-- <span style="color: #F33E3F;">{{scope.row.remark||'--'}}</span> -->
                   <span>{{scope.row.fromAccountDesc}}</span>
                   <span style="color: #F33E3F;padding: 0 5px;"> ——> </span>
                   <span>{{scope.row.toAccountDesc}}</span>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getTransferDetail } from '@/api'
import { timestampToTime } from '@/assets/js/time.js'
import { mapState } from 'vuex'
import { SERVE_OPTIONS } from '@/store/mutation-types.js'
export default {
  data() {
    return {
      activeName: 'tab1',
      tableData: [],
      value: '1',
      pagesize: 15, // 一页15条
      currentPage:1,// 默认第一页
      total: 0,// 总页数
      timestampToTime:timestampToTime,
      options: [
        {
          value: '1',
          label: '币币账户'
        },
        {
          value: '2',
          label: '法币账户'
        },
        {
          value: '3',
          label: '合约账户'
        },
        {
          value: '4',
          label: '理财账户'
        },
        {
          value: '5',
          label: '资金钱包账户'
        },
        {
          value: '6',
          label: '补贴账户'
        },
        
      ],
    }
  },
    created() {
      this.getCoinRecord(this.value) 
    },
    methods: {
      // 提币记录
      async getCoinRecord(type) {
        let parms = type+'/'+this.currentPage+'/'+this.pagesize
        let result = await getTransferDetail (parms)
        if (result.code == 200) {
          this.tableData = result.data.records
          this.total = result.data.total
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      current_change(currentPage) {
        this.currentPage = currentPage;
        this.getCoinRecord(this.value)
      },
      fullName(type){
        this.getCoinRecord(type)
      },
    }
}
</script>

<style lang="scss">
.AssetDetailsTabs-container {
  width: 100%;
  height: 733px;
  background-color: $blue;

}
.height678 {
    height: 100%;
  }

  .Tab1-subcontainer {
    display: flex;
    flex-direction: column;
    h1{
      padding: 15px 0;
    }
    .subcontainer-bottom {
      flex: 1;
      .el-table::before {
        background-color: $blue;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.11);
      }

      .el-table__header {
        background-color: $blue;
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
      padding: 50px 0;
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
