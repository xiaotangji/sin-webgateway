<template>
  <div>
    <div style="float: right">
      <span style="font-size: medium">操作：</span>
      <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
        <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addGjjl"></el-button>
      </el-tooltip>
    </div>
    <el-table
      :data="tableDataGjcl"
      border
      style="width: 100%">
      <el-table-column
        prop="mc"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cftj"
        label="触发条件"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sb"
        label="设备"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-show="scope.row.dza != '' && scope.row.dza != null">地址: {{ scope.row.dza }}</p>
            <p v-show="scope.row.sjlxa != '' && scope.row.sjlxa != null">数据类型: {{ scope.row.sjlxa }}</p>
            <p v-show="scope.row.blm != '' && scope.row.blm != null">变量名: {{ scope.row.blm }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sb }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="fz"
        label="分组"
        width="180">
      </el-table-column>
      <el-table-column
        prop="msa"
        label="描述">
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
    <el-dialog title="添加告警策略" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="warnForm" style="margin-left: 25%" :rules="rules" ref="ruleFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="warnForm.name" style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item label="分组：" prop="fz" style="width: 60%">
          <el-select v-model="warnForm.fz" placeholder="请选择分组">
            <el-option label="warning" value="warning"></el-option>
            <el-option label="error" value="error"></el-option>
            <el-option label="normal" value="normal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="blms">
          <el-radio-group v-model="warnForm.blms">
            <el-radio :label="1">使用变量</el-radio>
            <el-radio :label="2">引用已有变量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备：" prop="sb" style="width: 60%">
          <el-select v-model="warnForm.sb" placeholder="请选择分组">
            <el-option label="modbus" value="modbus"></el-option>
            <el-option label="plc" value="plc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址：" prop="dz" v-if="warnForm.blms == 1">
          <el-input v-model="warnForm.dz"style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item label="数据类型：" prop="sjlx" style="width: 60%" v-if="warnForm.blms == 1">
          <el-select v-model="warnForm.sjlx" placeholder="请选择数据类型">
            <el-option label="WORD" value="WORD"></el-option>
            <el-option label="TEXT" value="TEXT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变量名："  prop="blm" v-if="warnForm.blms == 2">
          <el-input v-model="warnForm.blm"style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item label="告警条件：" required>
          <el-row>
            <el-col :span="10">
              <el-form-item prop="pdtjf">
                <el-select v-model="warnForm.pdtjf" style="width: 60%">
                  <el-option label=">" value=">"></el-option>
                  <el-option label="=" value="="></el-option>
                  <el-option label="!=" value="!="></el-option>
                  <el-option label="≥" value="≥"></el-option>
                  <el-option label="<" value="<"></el-option>
                  <el-option label="≤" value="≤"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="10" style="margin-left: -17%">
              <el-form-item prop="srkf">
                <el-input v-model="warnForm.srkf"style="width: 54%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item prop="ljtj" style="margin-left: 25%">
                <el-select v-model="warnForm.ljtj" style="width: 80%;margin-left: 0%">
                  <el-option label="&&" value="&&"></el-option>
                  <el-option label="||" value="||"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item prop="pdtjl">
                <el-select v-model="warnForm.pdtjl" style="width: 60%">
                  <el-option label=">" value=">"></el-option>
                  <el-option label="=" value="="></el-option>
                  <el-option label="!=" value="!="></el-option>
                  <el-option label="≥" value="≥"></el-option>
                  <el-option label="<" value="<"></el-option>
                  <el-option label="≤" value="≤"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: -17%">
              <el-form-item prop="srkl">
                <el-input v-model="warnForm.srkl"style="width: 54%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述：" prop="ms" >
          <el-input v-model="warnForm.ms" type="textarea"
                    placeholder="请输入内容" maxlength="30"
                    show-word-limit style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd('ruleFormAdd')">确定</el-button>
          <el-button @click="cancle('ruleFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改告警策略" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="warnForm" style="margin-left: 25%" :rules="rules" ref="ruleFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="warnForm.name" style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item label="分组：" prop="fz" style="width: 60%">
          <el-select v-model="warnForm.fz" placeholder="请选择分组">
            <el-option label="warning" value="warning"></el-option>
            <el-option label="error" value="error"></el-option>
            <el-option label="normal" value="normal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="blms">
          <el-radio-group v-model="warnForm.blms">
            <el-radio :label="1">使用变量</el-radio>
            <el-radio :label="2">引用已有变量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备：" prop="sb" style="width: 60%">
          <el-select v-model="warnForm.sb" placeholder="请选择分组">
            <el-option label="modbus" value="modbus"></el-option>
            <el-option label="plc" value="plc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址：" prop="dz" v-if="warnForm.blms == 1">
          <el-input v-model="warnForm.dz"style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item label="数据类型：" prop="sjlx" style="width: 60%" v-if="warnForm.blms == 1">
          <el-select v-model="warnForm.sjlx" placeholder="请选择数据类型">
            <el-option label="WORD" value="WORD"></el-option>
            <el-option label="TEXT" value="TEXT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变量名："  prop="blm" v-if="warnForm.blms == 2">
          <el-input v-model="warnForm.blm"style="width: 47%">%</el-input>
        </el-form-item>
        <el-form-item label="告警条件：" required>
          <el-row>
          <el-col :span="10">
          <el-form-item prop="pdtjf">
          <el-select v-model="warnForm.pdtjf" style="width: 60%">
            <el-option label=">" value=">"></el-option>
            <el-option label="=" value="="></el-option>
            <el-option label="!=" value="!="></el-option>
            <el-option label="≥" value="≥"></el-option>
            <el-option label="<" value="<"></el-option>
            <el-option label="≤" value="≤"></el-option>
          </el-select>
          </el-form-item>
          </el-col>
          <el-col class="line" :span="10" style="margin-left: -17%">
            <el-form-item prop="srkf">
              <el-input v-model="warnForm.srkf"style="width: auto;width: 54%"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item prop="ljtj" style="margin-left: 25%">
                <el-select v-model="warnForm.ljtj" style="width: 80%;margin-left: 0%">
                  <el-option label="&&" value="&&"></el-option>
                  <el-option label="||" value="||"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
           <el-col :span="10">
            <el-form-item prop="pdtjl">
          <el-select v-model="warnForm.pdtjl" style="width: 60%">
            <el-option label=">" value=">"></el-option>
            <el-option label="=" value="="></el-option>
            <el-option label="!=" value="!="></el-option>
            <el-option label="≥" value="≥"></el-option>
            <el-option label="<" value="<"></el-option>
            <el-option label="≤" value="≤"></el-option>
          </el-select>
           </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: -17%">
              <el-form-item prop="srkl">
              <el-input v-model="warnForm.srkl"style="width: 54%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述：" prop="ms" >
          <el-input v-model="warnForm.ms" type="textarea"
                    placeholder="请输入内容" maxlength="30"
                    show-word-limit style="width: 47%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">确定</el-button>
          <el-button @click="cancleEdit('ruleFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'alarmStrategy',
  data(){
    return {
      tableDataGjcl: [
        {
          mc: 'warn1',
          cftj: '> 30 && < 50',
          sb: 'modbus',
          dza: '40001',
          sjlxa: 'WORD',
          blm: '',
          fz: 'warning',
          msa: 'test1',
          blms: 'newUse'
        },
        {
          mc: 'warn2',
          cftj: '> 20 && < 40',
          sb: 'modbus',
          dza: '',
          sjlxa: '',
          blm: 'T2',
          fz: 'warning',
          msa: 'test2',
          blms: 'oldUse'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        fz: [
          { required: true, message: '请选择分组', trigger: 'change' }
        ],
        blms: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        dz: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ],
        sjlx: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        sb: [
          { required: true, message: '请选择设备', trigger: 'change' }
        ],
        blm: [
          { required: true, message: '请输入变量名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        ms: [
          { required: true, message: '请输入描述信息', trigger: 'blur' },
          { min: 10, max: 40, message: '长度在 10 到 40 个字符', trigger: 'blur' }
        ],
        pdtjf: [{ required: true, message: '请选择', trigger: 'change' }],
        srkf: [
          { required: true, message: '请输入范围', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        ljtj: [{ required: true, message: '请选择', trigger: 'change' }],

        pdtjl: [{ required: true, message: '请选择', trigger: 'change' }],

        srkl: [
          { required: true, message: '请输入范围', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ]
      },
      warnForm :{
        name: '',
        fz: '',
        blms: '',
        sb: '',
        dz: '',
        sjlx: '',
        blm: '',
        pdtjf: '',
        srkf: '',
        ljtj: '',
        pdtjl: '',
        srkl: '',
        ms: '',
        gjtj: ''
      },
      // 是否加载数据
      loading:true,
      currentPage: 1,
      pagesize: 10,
      total: 2,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAdd: false
    }
  },

  methods: {
    handleEdit(index, row) {
      this.dialogFormVisibleEdit = true;
      this.warnForm.name = row.mc;
      this.warnForm.fz = row.fz;
      this.warnForm.sb = row.sb;
      this.warnForm.dz = row.dza;
      this.warnForm.sjlx = row.sjlxa;
      this.warnForm.blm = row.blm;
      let gjjtarr = row.cftj.split(' ');
      this.warnForm.pdtjf = gjjtarr[0];
      this.warnForm.srkf = gjjtarr[1]
      this.warnForm.ljtj = gjjtarr[2];
      this.warnForm.pdtjl = gjjtarr[3];
      this.warnForm.srkl = gjjtarr[4];
      this.warnForm.ms = row.msa;
      this.warnForm.blms = row.blms=='newUse'?1:2;
    },

    addGjjl() {
      this.dialogFormVisibleAdd = true;
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
    submitFormEdit(ruleFormEdit) {
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            this.$refs[ruleFormEdit].resetFields();
            this.dialogFormVisibleEdit = false;
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    submitFormAdd(ruleFormAdd) {
      this.$refs[ruleFormAdd].validate((valid) => {
        if (valid) {
          this.$refs[ruleFormAdd].resetFields();
          this.dialogFormVisibleAdd = false;
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
    cancle(ruleFormAdd) {
      this.$refs[ruleFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },
    cancleEdit(ruleFormEdit){
      this.$refs[ruleFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    }
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
