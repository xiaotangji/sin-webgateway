<template>
  <div>
    <el-card style="position: relative;">
      <div slot="header" class="clearfix">
        <span>{{tableData.tableName}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addGroup">添加</el-button>
      </div>
      <div>
        <el-table ref="singleTable"
                  :data="tableData.tableData"
                  highlight-current-row
                  style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>

          <el-table-column v-for="(item,index) in tableData.tableColumns"
                           :key="index"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <div id="tools">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total,sizes, prev, pager,next,jumper"
            :total="total">
          </el-pagination>
        </div>

        <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd">
          <el-form :model="formRule.groupFormAdd" style="margin-left: 27%"
                   :rules="formRule.addRules" ref="ruleFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
            <el-form-item v-for="(item,index) in tableData.tableColumns"
                          :key="index"
                          :prop="item.prop"
                          :label="item.label">
              <!--input输入框-->
              <el-input v-if="item.type==='input'"
                        v-model="formRule.groupFormAdd[item.prop]"
                        style="width: auto"
                        :placeholder="item.placeholder?item.placeholder:''"
                        :disabled="item.disabled?item.disabled:false">

              </el-input>
              <!--select下拉框-->
              <el-select v-if="item.type==='select'"
                         v-model="formRule.groupFormAdd[item.prop]"
                         style="width: auto"
                         :placeholder="item.placeholder?item.placeholder:''"
                         :disabled="item.disabled?item.disabled:false" >
                <el-option v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
              </el-select>
              <!--radio-group组合单选框-->
              <el-radio-group v-if="item.type==='radioGroup'" v-model="formRule.groupFormAdd[item.prop]">
                <el-radio v-for="option in item.options"
                          :label="option.label"
                          :key="option.value"
                          :disabled="item.disabled?item.disabled:false">option.value</el-radio>
              </el-radio-group>

              <!--...其他类型待完善-->
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click= "submitFormAndValidate('ruleFormAdd')">确定</el-button>
              <el-button @click="cancleFormAndValidate('ruleFormAdd')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog title="修改" :visible.sync="dialogFormVisibleEdit">
          <el-form :model="formRule.groupFormEdit" style="margin-left: 27%"
                   :rules="formRule.editRules" ref="ruleFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
            <el-form-item v-for="(item,index) in tableData.tableColumns"
                          :key="index"
                          :prop="item.prop"
                          :label="item.label">
              <el-input v-if="item.type==='input'"
                        v-model="formRule.groupFormEdit[item.prop]"
                        style="width: auto"
                        :placeholder="item.placeholder?item.placeholder:''"
                        :disabled="item.disabled?item.disabled:false">

              </el-input>
              <el-select v-else-if="item.type==='select'"
                         v-model="formRule.groupFormEdit[item.prop]"
                         style="width: auto"
                         :placeholder="item.placeholder?item.placeholder:''"
                         :disabled="item.disabled?item.disabled:false" >
                <el-option v-for="option in item.options"
                           :key="option.value"
                           :label="option.label"
                           :value="option.value">
                </el-option>
              </el-select>
              <el-radio-group v-else-if="item.type==='radioGroup'" v-model="formRule.groupFormEdit[item.prop]">
                <el-radio v-for="option in item.options"
                          :label="option.label"
                          :key="option.value"
                          :disabled="item.disabled?item.disabled:false">{{option.value}}</el-radio>
              </el-radio-group>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click= "submitFormAndValidate('ruleFormEdit')">确定</el-button>
              <el-button @click="cancleFormAndValidate('ruleFormEdit')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "UTable",
    props: {
      tableData: {
        type: Object
        //{tableName,tableData,tableColumns}
      },
      formRule: {
        type: Object
        //{groupFormAdd,addRules,groupFormEdit,editRules}
      }
    },
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
        total: 200,
        dialogFormVisibleAdd: false,
        dialogFormVisibleEdit: false,
      }
    },
    methods: {
      //查询
      loadData() {

      },
      //修改操作
      handleEdit(index,row) {
        console.log(row)
        console.log(index)
        for(let item in this.formRule.groupFormEdit) {
          this.formRule.groupFormEdit[item] = row[item]
        }
        this.dialogFormVisibleEdit = true
      },
      //删除操作
      handleDelete(index,row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //改变每页size
      handleSizeChange(val) {
        this.pageSize = val
        console.log(this.pageSize)
        //调用loadData加载数据
        this.loadData()
      },
      //翻页处理
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(this.currentPage)
        //调用loadData加载数据
        this.loadData()
      },
      //校验加提交
      submitFormAndValidate(ruleFormRef) {
        if(ruleFormRef === 'ruleFormAdd') {
          this.$refs[ruleFormRef].validate((valid) => {
            if (valid) {
              this.$refs[ruleFormRef].resetFields();
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        } else if(ruleFormRef === 'ruleFormEdit') {
          this.$refs[ruleFormRef].validate((valid) => {
            if (valid) {
              this.$refs[ruleFormRef].resetFields();
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        }
      },
      //取消提交
      cancleFormAndValidate(ruleFormRef) {
        if(ruleFormRef === 'ruleFormAdd') {
          this.$refs[ruleFormRef].resetFields();
          this.dialogFormVisibleAdd = false;
        } else if(ruleFormRef === 'ruleFormEdit') {
          this.$refs[ruleFormRef].resetFields();
          this.dialogFormVisibleEdit = false;
        }

      },
      //添加操作
      addGroup(){
        this.dialogFormVisibleAdd = true;
        for(let item in this.formRule.groupFormAdd) {
          this.formRule.groupFormAdd[item] = ''
        }
      },
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  #tools
  {
    position: absolute;
    bottom: 5px;
    left: 16px;
    width: 82.3%;
    height: 33px;
    text-align: left;
    z-index: 2;
    overflow: hidden;
  }
  /deep/ .el-card__body {
    padding-bottom: 50px;
  }

</style>
