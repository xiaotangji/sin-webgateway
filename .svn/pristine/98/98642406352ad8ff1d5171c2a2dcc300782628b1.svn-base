<template>
  <div>
          <el-row>
            <el-table
              :data="tableData.rows"
              :height="tableData.height"
              stripe
              border
              style="width: 100%">
              <el-table-column
                prop="level"
                label="级别"
                width="150">
              </el-table-column>
              <el-table-column
                prop="dateTime"
                label="时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="content"
                label="内容">
              </el-table-column>
            </el-table>
          </el-row>
          <el-row class="paginationPanel">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange" :current-page="this.tableData.currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="this.tableData.pageSize"
              layout="total,sizes, prev, pager,next,jumper"
              :total="this.tableData.total">
            </el-pagination>
          </el-row>
  </div>
</template>

<script>

export default {
  name: 'logList',
  data() {
    return {
      tableData: {
        height: 600,
        sort: "",
        order: "",
        page: 1,
        rows: [],
        currentPage: 1,
        pageSize: 10,
        total: null,
      }, // 表格数据源
      // 是否加载数据
      loading:true,
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style>

</style>
