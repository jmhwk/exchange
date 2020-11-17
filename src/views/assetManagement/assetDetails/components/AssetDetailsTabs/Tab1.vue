<template>
  <div class="Tab2-subcontainer height678">
    <div class="subcontainer-bottom">
      <el-table :data="allowanceBalance" style="width: 100%">
        <el-table-column prop="coinName" label="币种" min-width="180" align="center" />
        <el-table-column prop="allowanceBalance" label="可用" min-width="180" align="center" />
        <el-table-column prop="walletFreezingBalance" label="冻结" min-width="180" align="center" />
<!--        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button class="btn" @click="$router.push({name:'rechargeCurrency',params:{id:scope.row.id}})">充币{{scope.row.id}}</el-button>
            <el-button class="btn"  @click="$router.push({name:'withdrawal',params:{id:scope.row.id}})" >提币</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
<!--    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div> -->
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  // 交易账户tab页
  export default {
    data() {
      return {
        value: true,
      }
    },
    computed: {
      ...mapState({
        sumList: state => state.property.sumList,
        sumListcny: state => state.property.sumlistcny,
        allowanceBalance: state => state.property.allowanceBalance,
      })
    },
    methods: {
      handleEdit(index, row) {
      },
      handleDelete(index, row) {
      }
    }
  }
</script>

