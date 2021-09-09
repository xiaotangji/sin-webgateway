<template>
  <div>
    <span style="font-size: medium">串口设置</span>
    <div style="float: right">
      <span style="font-size: medium">操作：</span>
      <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
        <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addCkmc"></el-button>
      </el-tooltip>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="ckmc"
        label="串口名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="btl"
        label="波特率"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sjw"
        label="数据位">
      </el-table-column>
      <el-table-column
        prop="jyw"
        label="检验位">
      </el-table-column>
      <el-table-column
        prop="tzw"
        label="停止位">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total,sizes, prev, pager,next,jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="添加串口" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="ckForm" style="margin-left: 27%" :rules="rules" ref="ruleForm" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="串口名称：" prop="ckmc">
          <el-input v-model="ckForm.ckmc" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="波特率：" prop="btl" style="width: 60%">
          <el-select v-model="ckForm.btl">
            <el-option label="9600" value="9600"></el-option>
            <el-option label="3600" value="3600"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据位：" prop="sjw" style="width: 60%">
          <el-select v-model="ckForm.sjw">
            <el-option label="8" value="8"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验位：" prop="jyw" style="width: 60%">
          <el-select v-model="ckForm.jyw">
            <el-option label="无检验" value="无检验"></el-option>
            <el-option label="有检验" value="有检验"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停止位：" prop="tzw" style="width: 60%">
          <el-select v-model="ckForm.tzw">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="cancleAdd('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改串口" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="ckFormEdit" style="margin-left: 27%" :rules="rules" ref="ruleFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="串口名称：" prop="ckmc">
          <el-input v-model="ckFormEdit.ckmc" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="波特率：" prop="btl" style="width: 60%">
          <el-select v-model="ckFormEdit.btl">
            <el-option label="9600" value="9600"></el-option>
            <el-option label="3600" value="3600"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据位：" prop="sjw" style="width: 60%">
          <el-select v-model="ckFormEdit.sjw">
            <el-option label="8" value="8"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检验位：" prop="jyw" style="width: 60%">
          <el-select v-model="ckFormEdit.jyw">
            <el-option label="无检验" value="无检验"></el-option>
            <el-option label="有检验" value="有检验"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="停止位：" prop="tzw" style="width: 60%">
          <el-select v-model="ckFormEdit.tzw">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('ruleFormEdit')">确定</el-button>
          <el-button @click="cancleEdit('ruleFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div>
      <span style="font-size: medium">默认参数</span>
      <el-form :model="mrForm" :rules="mrRules" ref="mrForm" size="mini" label-width="13%" class="demo-ruleForm">
        <el-form-item label="日志等级：" prop="rzdj">
          <el-select v-model="mrForm.rzdj" style="width: 17%">
            <el-option label="DEBUG" value="DEBUG"></el-option>
            <el-option label="INFO" value="INFO"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="历史告警最大条数：" prop="lsgjzdts">
          <el-input v-model="mrForm.lsgjzdts" style="width: auto"></el-input>(1-10000)
        </el-form-item>
        <el-form-item label="历史数据最大条数：" prop="lssjzdts" style="width: 100%">
          <el-input v-model="mrForm.lssjzdts" style="width: auto"></el-input>(1-100000)
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMrcsForm('mrForm')">提交</el-button>
          <el-button @click="resetForm('mrForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span style="font-size: medium">自定义参数</span>
      <div style="float: right">
        <span style="font-size: medium">操作：</span>
        <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
          <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addZdy"></el-button>
        </el-tooltip>
      </div>
      <el-table
        :data="tableDataZdy"
        border
        style="width: 40%">
        <el-table-column
          prop="cs"
          label="参数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="csz"
          label="参数值"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditZdy(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteZdy(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total,sizes, prev, pager,next,jumper"
        :total="total">
      </el-pagination>
      <el-dialog title="添加参数" :visible.sync="dialogFormVisibleAddZdy">
        <el-form :model="zdyForm" style="margin-left: 27%" :rules="rulesZdy" ref="ruleFormZdy" size="mini" label-width="130px" class="demo-ruleForm">
          <el-form-item label="参数：" prop="cs">
            <el-input v-model="zdyForm.cs" style="width: auto"></el-input>
          </el-form-item>
          <el-form-item label="参数值：" prop="csz" style="width: 60%">
            <el-input v-model="zdyForm.csz" style="width: auto"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormZdy('ruleFormZdy')">确定</el-button>
            <el-button @click="cancleAddZdy('ruleFormZdy')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改参数" :visible.sync="dialogFormVisibleEditZdy">
        <el-form :model="zdyFormEdit" style="margin-left: 27%" :rules="rulesZdyEdit" ref="ruleFormZdyEdit" size="mini" label-width="130px" class="demo-ruleForm">
          <el-form-item label="参数：" prop="cs">
            <el-input v-model="zdyFormEdit.cs" style="width: auto"></el-input>
          </el-form-item>
          <el-form-item label="参数值：" prop="csz" style="width: 60%">
            <el-input v-model="zdyFormEdit.csz" style="width: auto"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormZdyEdit('ruleFormZdyEdit')">确定</el-button>
            <el-button @click="cancleEditZdy('ruleFormZdyEdit')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parameterSetting',
  data() {
    return {
      tableData: [{
        ckmc: 'RS-485',
        btl: 9000,
        sjw: 8,
        jyw: '无检验',
        tzw: 1
      }, {
        ckmc: 'RS-232',
        btl: 9000,
        sjw: 8,
        jyw: '无检验',
        tzw: 1
      }],
      tableDataZdy: [{
        cs: '参数1',
        csz: '0.5'
      }, {
        cs: '参数2',
        csz: '0.2'
      }],
      rules: {
        ckmc: [
          { required: true, message: '请输入串口名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        btl: [
          { required: true, message: '请选择波特率', trigger: 'change' }
        ],
        sjw: [
          { required: true, message: '请选择数据位', trigger: 'change' }
        ],
        jyw: [
          { required: true, message: '请选择检验位', trigger: 'change' }
        ],
        tzw: [
          { required: true, message: '请选择停止位', trigger: 'change' }
        ]
      },
      mrRules: {
        rzdj: [
          { required: true, message: '请选择日志等级', trigger: 'change' }
        ],
        lsgjzdts: [
          { required: true, message: '请输入历史告警最大条数', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        lssjzdts: [
          { required: true, message: '请输入历史数据最大条数', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      rulesZdy: {
        cs: [
          { required: true, message: '请输入参数', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        csz: [
          { required: true, message: '请输入参数值', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      rulesZdyEdit: {
        cs: [
          { required: true, message: '请输入参数', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        csz: [
          { required: true, message: '请输入参数值', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },

      ckForm: {
        ckmc: '',
        btl: '',
        sjw: '',
        jyw: '',
        tzw: ''
      },
      zdyForm:{
        cs: '',
        csz: ''
      },
      zdyFormEdit:{
        cs: '',
        csz: ''
      },

      ckFormEdit: {
        ckmc: '',
        btl: '',
        sjw: '',
        jyw: '',
        tzw: ''
      },
      mrForm: {
        rzdj:'',
        lsgjzdts: '',
        lssjzdts: ''
      },
      // 是否加载数据
      loading:true,
      currentPage: 1,
      pagesize: 10,
      total: 2,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAddZdy: false,
      dialogFormVisibleEditZdy: false,
    }
  },
  methods: {
    addCkmc(){
      this.dialogFormVisibleAdd = true;
      this.ckForm.ckmc = '';
      this.ckForm.btl = '';
      this.ckForm.tzw = '';
      this.ckForm.sjw = '';
      this.ckForm.jyw = '';
    },

    addZdy(){
      this.dialogFormVisibleAddZdy = true;
      this.zdyForm.cs = '';
      this.zdyForm.csz = ''
    },

    handleEditZdy(index, row){
      this.dialogFormVisibleEditZdy = true;
      this.zdyFormEdit.cs =  row.cs;
      this.zdyFormEdit.csz = row.csz;
    },

    cancleAddZdy(ruleFormZdy){
      this.dialogFormVisibleAddZdy = false;
      this.$refs[ruleFormZdy].resetFields();
    },

    submitFormZdyEdit(ruleFormZdyEdit){
      this.$refs[ruleFormZdyEdit].validate((valid) => {
        if (valid) {
          this.$confirm('确定修改吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs[ruleFormZdyEdit].resetFields();
            this.dialogFormVisibleEditZdy = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            });
          });
        } else {
          return false;
        }
      });
    },

    cancleEditZdy(ruleFormZdyEdit){
      this.dialogFormVisibleEditZdy = false;
      this.$refs[ruleFormZdyEdit].resetFields();

    },

    handleEdit(index, row) {
      this.dialogFormVisibleEdit = true;
      this.ckFormEdit.ckmc = row.ckmc;
      this.ckFormEdit.btl = row.btl;
      this.ckFormEdit.sjw = row.sjw;
      this.ckFormEdit.jyw = row.jyw;
      this.ckFormEdit.tzw = row.tzw;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitFormZdy(ruleFormZdy){
      this.$refs[ruleFormZdy].validate((valid) => {
        if (valid) {
          this.$confirm('确定添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs[ruleFormZdy].resetFields();
            this.dialogFormVisibleAddZdy = false;
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          });
        } else {
          return false;
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$confirm('确定添加吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$refs[formName].resetFields();
              this.dialogFormVisibleAdd = false;
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消添加'
              });
            });
        } else {
          return false;
        }
      });
    },
    submitMrcsForm(mrForm){
      this.$refs[mrForm].validate((valid) => {
        if (valid) {
          this.$confirm('确定提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            });
          });
        } else {
          return false;
        }
      });
    },
    submitEditForm(ruleFormEdit) {
      this.$refs[ruleFormEdit].validate((valid) => {
        if (valid) {
          this.$confirm('确定修改吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs[ruleFormEdit].resetFields();
            this.dialogFormVisibleEdit = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            });
          });
        } else {
          return false;
        }
      });
    },
    handleDeleteZdy(index, row){
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
    cancleAdd(ruleFormAdd){
      this.dialogFormVisibleAdd = false;
      this.$refs[ruleFormAdd].resetFields();
    },
    cancleEdit(ruleFormEdit){
      this.$refs[ruleFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.currentChangePage(this.tableData,currentPage)
    },
    //分页方法（重点）
    currentChangePageV(list,currentPage) {
      let from = (currentPage - 1) * this.pagesizeV;
      let to = currentPage * this.pagesizeV;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    }
  }
}
</script>

<style>
element.style {
  margin-left: 0%;
}
</style>
