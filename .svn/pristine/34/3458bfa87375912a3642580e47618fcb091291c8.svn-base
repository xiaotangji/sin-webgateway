<template>
  <div>
    <div style="float: right">
      <span style="font-size: medium">操作：</span>
      <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
        <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addGroup"></el-button>
      </el-tooltip>
    </div>
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="mc"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lx"
      label="类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lxjg"
      label="轮询间隔(秒)">
    </el-table-column>
    <el-table-column
      prop="scjg"
      label="上传间隔(秒)">
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
    <div id="toolbar">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total,sizes, prev, pager,next,jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="添加分组" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="groupFormAdd" style="margin-left: 27%" :rules="rules" ref="ruleFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="名称：" prop="mc">
          <el-input v-model="groupFormAdd.mc" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="lx">
          <el-input v-model="groupFormAdd.lx" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="轮询间隔：" prop="lxjg">
          <el-input v-model="groupFormAdd.lxjg" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="上传间隔：" prop="scjg">
          <el-input v-model="groupFormAdd.scjg" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click= "submitFormAdd('ruleFormAdd')">确定</el-button>
          <el-button @click="cancleAdd('ruleFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改分组" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="groupFormEdit" style="margin-left: 27%" :rules="rulesEdit" ref="ruleFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="名称：" prop="mc">
          <el-input v-model="groupFormEdit.mc" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="lx">
          <el-input v-model="groupFormEdit.lx" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="轮询间隔：" prop="lxjg">
          <el-input v-model="groupFormEdit.lxjg" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="上传间隔：" prop="scjg">
          <el-input v-model="groupFormEdit.scjg" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click= "submitFormEdit('ruleFormEdit')">确定</el-button>
          <el-button @click="cancleEdit('ruleFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'groupManage',
  data() {
    return {
      tableData: [{
        mc: 'warning',
        lx: '告警',
        lxjg: '10',
        scjg: '10'
      }, {
        mc: 'default',
        lx: '采集',
        lxjg: '10',
        scjg: '10'
      }],
      rules: {
        mc: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        lx: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        lxjg: [
          { required: true, message: '请输入轮询间隔时间', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        scjg: [
          { required: true, message: '请输入上传间隔时间', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
      },
      rulesEdit: {
        mc: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        lx: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        lxjg: [
          { required: true, message: '请输入轮询间隔时间', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        scjg: [
          { required: true, message: '请输入上传间隔时间', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
      },
      groupFormAdd: {
        mc: '',
        lx: '',
        lxjg: '',
        scjg: ''
      },
      groupFormEdit: {
        mc: '',
        lx: '',
        lxjg: '',
        scjg: ''
      },
      // 是否加载数据
      loading:true,
      currentPage: 1,
      pagesize: 10,
      total: 2,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false
    }
  },

  methods: {

    addGroup(){
      this.dialogFormVisibleAdd = true;
      this.groupFormAdd.mc = '';
      this.groupFormAdd.lx = '';
      this.groupFormAdd.lxjg = '';
      this.groupFormAdd.scjg = '';
    },

    submitFormAdd(ruleFormAdd) {
      this.$refs[ruleFormAdd].validate((valid) => {
        if (valid) {
          this.$refs[ruleFormAdd].resetFields();
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleEdit(index, row){
          this.dialogFormVisibleEdit = true;
          this.groupFormEdit.mc = row.mc;
          this.groupFormEdit.lx = row.lx;
          this.groupFormEdit.lxjg = row.lxjg;
          this.groupFormEdit.scjg = row.scjg;
    },

    submitFormEdit(ruleFormEdit) {
      this.$refs[ruleFormEdit].validate((valid) => {
        if (valid) {
          this.$refs[ruleFormEdit].resetFields();
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    cancleAdd(ruleFormAdd) {
      this.$refs[ruleFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },
    cancleEdit(ruleFormEdit) {
      this.$refs[ruleFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;

    },
    handleSizeChange: function (size) {
      this.pagesizeV = size;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPageV = currentPage;
      this.currentChangePage(this.tableDataGjcl,currentPage)
    },
    //分页方法（重点）
    currentChangePage(list,currentPage) {
      let from = (currentPage - 1) * this.pagesize;
      let to = currentPage * this.pagesize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    },
    handleDelete(index, row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
      console.log(index, row);
    },
  }
}
</script>

<style >
#toolbar
{
  position: absolute;
  bottom: 5px;
  right: 16px;
  width: 82.3%;
  height: 33px;
  text-align: left;
  z-index: 2;
  overflow: hidden;
}

</style>
