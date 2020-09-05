<template>
  <div class="sl-table">
    <el-table :data="tableData" ref="raw_table" style="width: 100%" :height="fixedHeight" @cell-click="CellClick"
      @sort-change="sortChange" @selection-change="handleSelectionChange" @expand-change="handleExpandRow">

      <!--      tableData: 表格数据列表-->
      <!--      tableKey: 表格对应名称和关键字-->
      <!--      isExpand: 是否显示展开行(true or false)-->
      <!--      isExpandOne: 展开行是否只显示一行(true of false)-->
      <!--      isSelect: 是否显示勾选框(true or false)-->
      <!--      isIndex: 是否显示索引列(true or false)-->
      <!--      fixedHeight: 固定高度-->
      <!--      selection-change 当选择项发生变化时会触发该事件  selection-->
      <!--      CellClick: 表格点击-->


      <!-- expand -->
      <el-table-column v-if="isExpand" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :$index="scope.$index" :row="scope.row"></slot>
        </template>
      </el-table-column>

      <!-- selection -->
      <el-table-column v-if="isSelect" type="selection" width="60" align="center"></el-table-column>

      <!-- index -->
      <el-table-column v-if="isIndex" type="index" width="50" align="center"></el-table-column>

      <!-- table head -->
      <el-table-column v-for="(data,key) in tableKey" :key="key" v-if="!data.operate" :prop="data.value" :label="data.name"
        :width="data.width" :min-width="data.minWidth" :fixed="data.isfixed" :sortable="data.sortable"></el-table-column>
      <!--      operate: 是否使用template模板(true or false)-->
      <!--      name: 对应列名-->
      <!--      value: 对应列的关键字-->
      <!--      width: 宽度-->
      <!--      minWidth: 最小宽度-->
      <!--      fixed: 是否固定列(left or right)-->
      <!--      sortable: 是否启用排序(tur or false or 'custom'=>服务器排序)-->

      <!-- oparation -->
      <el-table-column v-else :label="data.name" :prop="data.value" align="center" :width="data.width" :min-width="data.minWidth"
        :fixed="data.isfixed" :sortable="data.sortable">
        <template slot-scope="scope">
          <slot :name="data.value" :$index="scope.$index" :row="scope.row"></slot><!-- 对应slot name -->
        </template>
      </el-table-column>
    </el-table>
    <!-- paging-->
    <!-- <el-pagination @current-change="handleCurrentChange" :current-page="table.currentPage" :page-size="table.pagesize"
      background layout="prev, pager, next,total,jumper" :total="table.total">
    </el-pagination> -->
    <!--    current-change 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性-->
    <!--    current-page 当前页数，支持 .sync 修饰符  number —  1-->
    <!--    page-size  每页显示条目个数，支持 .sync 修饰符  number —  10-->
    <!--    background 是否为分页按钮添加背景色 boolean  —  false-->
    <!--    layout 组件布局，子组件名用逗号分隔 String sizes, prev, pager, next, jumper, ->, total, slot  'prev, pager, next, jumper, ->, total'-->
    <!--    total  总条目数 number —  —-->
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    // props:['tableData','tableKey','isSelect','fixedHeight','defaultSort','isExpand','isIndex','isExpandOne'],
    props: {
      // table: {
      //   type: Object,
      //   required: false
      // },
      app: {
        type: Boolean,
        required: false
      },
      tableData: {
        type: Array,
        required: true
      },
      tableKey: {
        type: Array,
        required: true
      },
      isSelect: {
        type: Boolean,
        required: false
      },
      isExpand: {
        type: Boolean,
        required: false
      },
      isExpandOne: {
        type: Boolean,
        required: false
      },
      isIndex: {
        type: Boolean,
        required: false
      },
      fixedHeight: {
        type: [Number, String],
        required: false
      }
    },
    methods: {
      // handleCurrentChange(val) {
      //   this.$emit('handleCurrentChange', val);
      // },
      // <!--      sortChange: 排序-->
      sortChange(argu) {
        this.$emit("sortChange", argu)
      },
      CellClick(row, col, cell) {
        // console.log(row,col,cell)
        this.$emit("CellClick", {
          row,
          col,
          cell
        })
      },
      handleSelectionChange(list) {
        this.$emit("SelectChange", list)
      },

      // <!--      handleExpandRow: 展开行-->
      handleExpandRow(row, expandRows) {
        // console.log(row,expandRows)
        if (this.isExpandOne) {
          this.$refs.raw_table.store.states.expandRows = expandRows.length !== 0 ? [row] : []
        } else {

        }
        /*if(this.isExpand && this.isExpandOne){
                  this.$refs.raw_table.store.states.expandRows = expanded ? [row] : []
              }*/
      }
    },
  }
</script>

<style>
  .sl-table .cell>span {
    word-break: normal;
  }
</style>
