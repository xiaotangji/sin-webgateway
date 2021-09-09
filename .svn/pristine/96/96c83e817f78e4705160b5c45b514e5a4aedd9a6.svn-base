<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="table-title">{{tableParams.tableTitle}}</span>
      </div>
      <div>
        <el-table :data="tableParams.tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row border>
          <el-table-column v-for="item in tableParams.tableCol"
                           :key="item.label"
                           :label="item.label"
                           :prop="item.prop"
                           :width="item.width" sortable>

          </el-table-column>
          <el-table-column >
            <template slot="header" slot-scope="scope">
              <el-button type="success" icon="el-icon-plus" circle size="small" title="添加"
                         @click="handleAdd(scope.$index,scope.row)"
                         :disabled="tableParams['btnDisabled']?tableParams['btnDisabled']:false">
              </el-button>
            </template>
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle title="修改"
                         @click="handleEdit(scope.$index,scope.row)" size="small" style="margin-right: 10px;"></el-button>
              <el-popconfirm title="是否确认删除？" @confirm="handleDelte(scope.$index,scope.row)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" circle title="删除"
                           size="small"></el-button>
              </el-popconfirm>

            </template>

          </el-table-column>
        </el-table>
        <!--不到十条数据就不分页了-->
        <el-pagination v-if="tableParams.tableData.length > 10"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize" @current-change="changeCurrentPage" :current-page="currentPage" @size-change="changeSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableParams.tableData.length" class="pagination-style">
        </el-pagination>
        <dialog-card-form :formParams="formParams"
                          :dialogVisible="dialogVisible"
                          @changDialogVisible="changDialogVisible"
                          @operateData="operateData"/>
      </div>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
  import DialogCardForm from "./DialogCardForm";

  export default {
    name: "CrudTable",
    components: {DialogCardForm},
    props: {
      tableParams: {
        type: Object
      },
      formParams: {
        type: Object
      }
    },
    data() {
      return {
        dialogVisible: false,
        cacheTableData: [],
        currentPage: 1,
        pageSize: 10,
        editIndex: 0,
        /*params: {
          title: this.formParams.title,
          formLabel: this.formParams.formLabel,
          formModel: {...this.formParams.formModel},
          rules: this.formParams.rules
        }*/
      }
    },
    mounted() {
      this.cacheTableData = this.tableParams.tableData

    },
    methods: {
      handleAdd(index,row) {
        this.formParams.title = '添加'
        //this.params.title = '添加'
        //值赋空，防止修改操作影响
        this.clearFormData()
        this.dialogVisible = true
      },
      handleEdit(index,row) {
        this.formParams.title = '修改'
        //this.params.title = '修改'
        //用点击修改行数据给formParams的formModel赋值
        this.initFormData(JSON.parse(JSON.stringify(row)))
        this.dialogVisible = true
        this.editIndex = (this.currentPage-1)*this.pageSize+index
        console.log(this.editIndex)
      },
      handleDelte(index,row) {
        //获取删除行数据，传给父组件，一般通过数据去数据库里删除
        //这里为了演示效果，把删除行下标也传给父组件，在假数据中删除
        let data = {
          title: '删除',
          index: (this.currentPage-1)*this.pageSize+index,
          data: row
        }
        this.$emit('operateDatas',data)
        //this.tableParams.tableData.splice((this.currentPage-1)*this.pageSize+index,1)
        //如果是页也最后一行数据，删除后记得进行翻页处理
        if(index==0&&this.currentPage>1&&((this.currentPage-1)*this.pageSize)==this.tableParams.tableData.length) {
          this.currentPage--
        }
      },
      changDialogVisible(flag) {
        this.dialogVisible = flag
      },
      initFormData(row) {
        this.formParams.formModel = {...row}
      },
      clearFormData() {
        for(let item in this.formParams.formModel) {
          if('nonModifyParams' in this.formParams && this.formParams.nonModifyParams.includes(item)) {
            continue
          } else {
            this.formParams.formModel[item] = ''
          }
        }
      },
      operateData(data) {
        //处理数据
        //this.cacheTableData = this.tableParams.tableData
        if(data.title == '添加') {
          //抛给父组件处理
          this.$emit('operateDatas',data)
        } else if(data.title == '修改') {
          data['index'] = this.editIndex
          console.log(data['index'])
          this.$emit('operateDatas',data)
        }
      },
      changeCurrentPage(page) {
        this.currentPage = page
      },
      changeSize(size) {
        this.pageSize = size
      }

    }
  }
</script>

<style scoped>
  .table-title {
    font-size: 15px;
    font-weight: bold;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .pagination-style {
    margin-top: 10px;
  }
</style>
