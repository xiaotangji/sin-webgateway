<template>
  <div>
          <el-row class="toolPanel">
            <div style="float: right">
              <span style="font-size: medium">操作：</span>
              <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
                <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addUser"></el-button>
              </el-tooltip>
            </div>
          </el-row>
          <el-row>
            <el-table
              :data="tableData.rows"
              :height="tableData.height"
              stripe
              border
              style="width: 100%">
              <el-table-column
                type="index"
                :index="indexMethod"
                width="50">
              </el-table-column>
              <el-table-column
                prop="user_name"
                label="用户名"
                width="150">
              </el-table-column>
              <el-table-column label="操作" width="150">
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
        <el-dialog title="添加用户" :close-on-click-modal="false":visible.sync="dialogFormVisibleAdd">
          <el-form :model="userFormAdd" style="margin-left: 27%" :rules="rulesAdd" ref="userFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="userName">
              <el-input v-model="userFormAdd.userName" @blur="checkeName($event)" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" style="width: 60%">
              <el-input v-model="userFormAdd.password" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="passwordConfirm" style="width: 60%">
              <el-input v-model="userFormAdd.passwordConfirm" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitFormAdd('userFormAdd')">确定</el-button>
              <el-button @click="cancleAdd('userFormAdd')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog title="编辑用户"  :close-on-click-modal="false" :modal-append-to-body = "false" :close-on-press-escape="false" :visible.sync="dialogFormVisibleEdit">
          <el-form :model="userFormEdit" style="margin-left: 27%" :rules="rulesEdit" ref="userFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="userName">
              <el-input v-model="userFormEdit.userName" disabled style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="password" style="width: 60%">
              <el-input v-model="userFormEdit.password" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="passwordConfirm" style="width: 60%">
              <el-input v-model="userFormEdit.passwordConfirm" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitFormEdit('userFormEdit')">确定</el-button>
              <el-button @click="cancleEdit('userFormEdit')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
  </div>
</template>

<script>


import $ from "jquery";
import {addUser, deleteFromUserByUserName, selectAllFromUser, updatePasswordByUserName} from "../../api/user";
import router from "../../router";
export default {
  name: 'user',
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
      userFormAdd: {
        userName: '',
        password: '',
        passwordConfirm: '',
      },
      userFormEdit: {
        userName: '',
        password: '',
        passwordConfirm: '',
      },
      rulesAdd: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      userNameArr: [],
      // 是否加载数据
      loading:true,
      deviceNameSearch: '',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      nameIsnotExist:false
    }
  },
  created () {
    this.selectAllFromUser();
  },
  methods: {
    selectAllFromUser(){
      selectAllFromUser((this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order).then(res => {
        this.updateHeight();
        if(res.data.result){
          this.userNameArr = [];
          this.tableData.rows = res.data.data.data;
          this.tableData.total =  res.data.data.count;
          this.userNameArr = res.data.data.userNameArr;
        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },

    addUser(){
      this.dialogFormVisibleAdd = true;
    },

    checkeName(e){
      let username = e.target.value
      if(this.userNameArr.indexOf(username)>=0){
          this.nameIsnotExist = true;
        this.$message({
          type: 'warning',
          message: '用户名已存在!'
        });
      }else{
        this.nameIsnotExist = false;
      }
    },

    handleEdit(index, row){
      this.dialogFormVisibleEdit = true;
      this.userFormEdit.userName = row.user_name;
    },


    submitFormAdd(userFormAdd){
      this.$refs[userFormAdd].validate((valid) => {
        if (valid) {
          if(!this.nameIsnotExist){
            if(this.userFormAdd.password == this.userFormAdd.passwordConfirm){
              this.$confirm('确定添加吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let user = {};
                user.user_name = this.userFormAdd.userName;
                user.password = this.userFormAdd.password;
                addUser(user).then(res=>{
                  if(res.data.result){
                    this.$refs[userFormAdd].resetFields();
                    this.dialogFormVisibleAdd = false;
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.selectAllFromUser();
                  }else{
                    this.$message({
                      type: 'error',
                      message: '添加失败!'
                    });
                  }
                })
              }).catch(() => {
                /*this.$message({
                  type: 'info',
                  message: '已取消添加'
                });*/
              });
            }else{
              this.$message({
                type: 'error',
                message: '两次输入的密码不一致!'
              });
            }
          }else{
            this.$message({
              type: 'warning',
              message: '用户名已存在!'
            });
          }
        } else {
          return false;
        }
      });
    },

    cancleAdd(ruleFormAdd){
      this.$refs[ruleFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },

    submitFormEdit(userFormEdit){
      this.$refs[userFormEdit].validate((valid) => {
        if (valid) {
          if(this.userFormEdit.password == this.userFormEdit.passwordConfirm){
            this.$confirm('确定编辑吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let user = {};
              user.user_name = this.userFormEdit.userName
              user.password = this.userFormEdit.password
              updatePasswordByUserName(user).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '修改成功，请重新登录!'
                  });
                  this.$refs[userFormEdit].resetFields();
                  this.dialogFormVisibleEdit = false;
                  this.selectAllFromUser();
                  router.replace({
                    path: '/login'
                  })
                }else{
                  this.$message({
                    type: 'error',
                    message: '编辑失败!'
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消编辑'
              });
            });
          }else{
            this.$message({
              type: 'warning',
              message: '两次输入密码!'
            });
          }
        } else {
          return false;
        }
      });
    },

    cancleEdit(deviceFormEdit){
      this.$refs[deviceFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },

    handleDelete(index, row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(row.user_name != 'adm'){
          deleteFromUserByUserName(row.user_name).then(res=>{
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.tableData.total = res.data.data;
              let totalPage = Math.ceil(this.tableData.total)/this.tableData.pageSize;
              this.tableData.currentPage = this.tableData.currentPage > totalPage ? totalPage : this.tableData.currentPage;
              this.selectAllFromUser();
            }else{
              this.$message({
                type: 'success',
                message: '删除失败!'
              });
            }
          })
        }else{
          this.$message({
            type: 'warning',
            message: '该用户不能删除!'
          });
        }
      }).catch(() => {
        /*this.$message({
          type: 'info',
          message: '已取消删除'
        });*/
      });
    },


    handleSizeChange: function (size) {
      this.tableData.pageSize = size;
      //this.handleCurrentChange(this.currentPage);
      this.selectAllFromDevice();
    },
    handleCurrentChange: function (currentPage) {
      this.tableData.currentPage = currentPage;
      //this.currentChangePage(this.tableData,currentPage)
      this.selectAllFromDevice();
    },
    //分页方法（重点）
    currentChangePage(list,currentPage) {
      let from = (currentPage - 1) * this.tableData.pageSize;
      let to = currentPage * this.tableData.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    },
    indexMethod(index) {
      return parseInt((this.tableData.currentPage - 1) * this.tableData.pageSize + index + 1)
    },
    // 更新表格高度
    updateHeight() {
      this.tableData.height =
        window.innerHeight -
        $(".paginationPanel").height() -
        $(".toolPanel").height()-120;
    },
  }
}
</script>

<style>

</style>
