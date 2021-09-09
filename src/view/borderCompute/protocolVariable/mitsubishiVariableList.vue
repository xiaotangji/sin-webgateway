<template>
  <div style="height: 80%">
    <el-row class="basicCan">
      <h2>设备名称： {{this.deviceName}}</h2>
      <h3>基础参数</h3>
      <el-col :span="12"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple"></div>
              <el-form-item label="unitId:" prop="unitId">
                <el-input style="width: 133%;margin-left: 25%" disabled  v-model="ruleForm.unitId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 20%"><div class="grid-content bg-purple-light"></div>
              <el-form-item label="sendDataOnlyOnChange:" prop="sendDataOnlyOnChange">
                <el-select style="margin-left: 75%;width: 213px" v-model="ruleForm.sendDataOnlyOnChange">
                  <el-option label="true" value="true"></el-option>
                  <el-option label="false" value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple"></div>
              <el-form-item label="deviceName:" prop="deviceName">
                <el-input style="width: 133%;margin-left: 25%" disabled placeholder="例如：Test"  v-model="ruleForm.deviceName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 20%"><div class="grid-content bg-purple-light"></div>
              <el-form-item label="connectAttemptTimeMs:" prop="connectAttemptTimeMs">
                <el-input  style="width: 197%;margin-left: 75%"clearable placeholder="例如：5000" v-model="ruleForm.connectAttemptTimeMs"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple"></div>
              <el-form-item label="attributesPollPeriod:" prop="attributesPollPeriod">
                <el-input style="width: 133%;margin-left: 25%" clearable placeholder="例如：5000" v-model="ruleForm.attributesPollPeriod"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 20%"><div class="grid-content bg-purple-light"></div>
              <el-form-item label="connectAttemptCount:" prop="connectAttemptCount">
                <el-input  style="width: 197%;margin-left: 75%" clearable placeholder="例如：5" v-model="ruleForm.connectAttemptCount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple"></div>
              <el-form-item label="timeseriesPollPeriod:" prop="timeseriesPollPeriod">
                <el-input style="width: 133%;margin-left: 25%" clearable placeholder="例如：5000" v-model="ruleForm.timeseriesPollPeriod"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 20%"><div class="grid-content bg-purple-light"></div>
              <el-form-item label="waitAfterFailedAttemptsMs:" prop="waitAfterFailedAttemptsMs">
                <el-input  style="width: 197%;margin-left: 75%" clearable placeholder="例如：300000"v-model="ruleForm.waitAfterFailedAttemptsMs"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align: right">
            <el-button type="primary" @click="submitFormAdd('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="toolPanel">
      <div style="float: right">
        <span style="font-size: medium">操作：</span>
        <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
          <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addVariable"></el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row>
      <div class="headName">
      <h3>变量列表(Mitsubishi配置)</h3>
      <span>&nbsp;</span>
      </div>
      <el-table
        :data="tableData.rows"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          width="50">
        </el-table-column>
        <el-table-column
          prop="device_name"
          label="设备名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="tag_category"
          label="变量类别"
          width="150">
        </el-table-column>
        <el-table-column
          prop="tag_name"
          label="变量名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="tag_type"
          label="数据类型">
        </el-table-column>
        <el-table-column
          prop="function_code"
          label="功能码">
        </el-table-column>
        <el-table-column
          prop="count"
          label="长度"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="value"
          label="值">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
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
    <el-dialog title="添加mitsubishi变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="mitsubishiFormAdd" style="margin-left: 27%" :rules="mitsubishiRulesAdd" ref="mitsubishiFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="deviceName" style="width: 60%">
          <el-input v-model="mitsubishiFormAdd.deviceName" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select v-model="mitsubishiFormAdd.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
            <el-option label="timeseries" value="timeseries"></el-option>
            <el-option label="attributeUpdates" value="attributeUpdates"></el-option>
            <el-option label="rpc" value="rpc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变量名：" prop="tag_name" style="width: 60%">
          <el-input v-model="mitsubishiFormAdd.tag_name" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="mitsubishiFormAdd.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="数据类型：" prop="tag_type" style="width: 60%">
          <el-select v-model="mitsubishiFormAdd.tag_type">
            <el-option label="Bool" value="Bool"></el-option>
            <el-option label="Int16" value="Int16"></el-option>
            <el-option label="UInt16" value="UInt16"></el-option>
            <el-option label="Int32" value="Int32"></el-option>
            <el-option label="UInt32" value="UInt32"></el-option>
            <el-option label="Int64" value="Int64"></el-option>
            <el-option label="Float" value="Float"></el-option>
            <el-option label="Double" value="Double"></el-option>
            <el-option label="String" value="String"></el-option>
            <el-option label="bits" value="bits"></el-option>
            <el-option label="32int" value="32int"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能码：" prop="function_code" style="width: 60%">
          <el-input v-model="mitsubishiFormAdd.function_code" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="长度：" prop="count" style="width: 60%">
          <el-input v-model="mitsubishiFormAdd.count" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address" style="width: 60%">
          <el-input v-model="mitsubishiFormAdd.address" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="数据计算：" prop="data_calculation" style="width: 60%">
          <el-select v-model="mitsubishiFormAdd.data_calculation">
            <el-option label="multiplier" value="multiplier"></el-option>
            <el-option label="Divisor" value="Divisor"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计算因子：" prop="calculation_factor" style="width: 60%">
          <el-input v-model="mitsubishiFormAdd.calculation_factor" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMitsubishiFormAdd('mitsubishiFormAdd')">确定</el-button>
          <el-button @click="cancleFormAdd('mitsubishiFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑mitsubishi变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="mitsubishiFormEdit" style="margin-left: 27%" :rules="mitsubishiRulesEdit" ref="mitsubishiFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="deviceName" style="width: 60%">
          <el-input v-model="mitsubishiFormEdit.deviceName" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select disabled v-model="mitsubishiFormEdit.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
            <el-option label="timeseries" value="timeseries"></el-option>
            <el-option label="attributeUpdates" value="attributeUpdates"></el-option>
            <el-option label="rpc" value="rpc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变量名：" prop="tag_name" style="width: 60%">
          <el-input v-model="mitsubishiFormEdit.tag_name" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="mitsubishiFormEdit.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="数据类型：" prop="tag_type" style="width: 60%">
          <el-select v-model="mitsubishiFormEdit.tag_type">
            <el-option label="Bool" value="Bool"></el-option>
            <el-option label="Int16" value="Int16"></el-option>
            <el-option label="UInt16" value="UInt16"></el-option>
            <el-option label="Int32" value="Int32"></el-option>
            <el-option label="UInt32" value="UInt32"></el-option>
            <el-option label="Int64" value="Int64"></el-option>
            <el-option label="Float" value="Float"></el-option>
            <el-option label="Double" value="Double"></el-option>
            <el-option label="String" value="String"></el-option>
            <el-option label="bits" value="bits"></el-option>
            <el-option label="32int" value="32int"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能码：" prop="function_code" style="width: 60%">
          <el-input v-model="mitsubishiFormEdit.function_code" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="长度：" prop="count" style="width: 60%">
          <el-input v-model="mitsubishiFormEdit.count" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address" style="width: 60%">
          <el-input v-model="mitsubishiFormEdit.address" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="数据计算：" prop="data_calculation" style="width: 60%">
          <el-select v-model="mitsubishiFormEdit.data_calculation">
            <el-option label="multiplier" value="multiplier"></el-option>
            <el-option label="Divisor" value="Divisor"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计算因子：" prop="calculation_factor" style="width: 60%">
          <el-input v-model="mitsubishiFormEdit.calculation_factor" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMitsubishiFormEdit('mitsubishiFormEdit')">确定</el-button>
          <el-button @click="cancleFormEdit('mitsubishiFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import {
  addDeviceVariable,
  deleteDeviceVariableById,
  selectAllFromDeviceVariable,
  updateDeviceVariableById
} from "../../../api/deviceVariable";
import {addDevice, selectJsonFromDeviceByDeviceName, updateDeviceByDeviceName} from "../../../api/device";

export default {
  name: "mitsubishiVariableList",
  data() {
    return {
      tableData: {
        sort: "",
        order: "",
        page: 1,
        rows: [],
        currentPage: 1,
        pageSize: 10,
        total: null,
      },
      ruleForm: {
        unitId: '',
        sendDataOnlyOnChange: false,
        deviceName: '',
        connectAttemptTimeMs: '',
        attributesPollPeriod: '',
        connectAttemptCount: '',
        timeseriesPollPeriod: '',
        waitAfterFailedAttemptsMs: ''
      },
      mitsubishiFormAdd: {
        tag_category: '',
        deviceName: '',
        tag_name: '',
        description: '',
        tag_type: '',
        function_code: '',
        count: '',
        address: '',
        data_calculation: '',
        calculation_factor: ''
      },
      mitsubishiFormEdit: {
        id:'',
        tag_category: '',
        deviceName: '',
        tag_name: '',
        description: '',
        tag_type: '',
        function_code: '',
        count: '',
        address: '',
        data_calculation: '',
        calculation_factor: ''
      },
      rules: {
        unitId: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        sendDataOnlyOnChange: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        deviceName: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        connectAttemptTimeMs: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        attributesPollPeriod: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        connectAttemptCount: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        timeseriesPollPeriod: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        waitAfterFailedAttemptsMs: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ]
      },
      mitsubishiRulesAdd: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        tag_name: [
          {required: true, message: '请输入变量名', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        tag_type: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        function_code: [
          {required: true, message: '请输入功能码', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        count: [
          {required: true, message: '请输入长度', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        data_calculation: [
          { required: true, message: '请选择计算方式', trigger: 'change' }
        ],
        calculation_factor: [
          {required: true, message: '请输入计算因子', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
      },
      mitsubishiRulesEdit: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        tag_name: [
          {required: true, message: '请输入变量名', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        tag_type: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        function_code: [
          {required: true, message: '请输入功能码', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        count: [
          {required: true, message: '请输入长度', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        data_calculation: [
          { required: true, message: '请选择计算方式', trigger: 'change' }
        ],
        calculation_factor: [
          {required: true, message: '请输入计算因子', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
      },
      deviceName: '',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      intervalVariable : null
    }
  },
  created () {
    this.getParams();
    this.selectAllFromDeviceVariable();
    this.selectAllFromDevice(this.deviceName);
  },
  beforeDestroy(){
    clearInterval(this.intervalVariable);
  },
  watch: {
    '$route' (to, from) {
      // 路由发生变化页面刷新
      this.getParams();
      if(this.id != undefined){
        this.selectAllFromDeviceVariable();
      }

      if(this.deviceName != undefined){
        this.selectAllFromDevice(this.deviceName);
      }
    }
  },


  methods: {
    setInterval(){
      if (this.intervalVariable) {
        clearInterval(this.intervalVariable);
        this.intervalVariable = null;
        this.setInterval()
      } else {
        this.intervalVariable = setInterval(() => {
          setTimeout(this.selectAllFromDeviceVariable,0);
        }, 5000)
      }
    },

    getParams(){
               // 取到路由带过来的参数
               this.deviceName = this.$route.query.name;
                this.ruleForm.deviceName = this.deviceName;
               this.id = this.$route.query.id;
               this.ruleForm.unitId = this.$route.query.unit_id;
             },

    selectAllFromDevice(deviceName){
      selectJsonFromDeviceByDeviceName(deviceName).then(res=>{
        if(res.data.result){
           let json = JSON.parse(res.data.data);
           if(json != null && json != undefined){
             this.ruleForm.attributesPollPeriod = json.attributesPollPeriod+"";
             this.ruleForm.timeseriesPollPeriod = json.timeseriesPollPeriod + "";
             this.ruleForm.sendDataOnlyOnChange = json.sendDataOnlyOnChange+"";
             this.ruleForm.connectAttemptTimeMs = json.connectAttemptTimeMs+"";
             this.ruleForm.connectAttemptCount = json.connectAttemptCount + "";
             this.ruleForm.waitAfterFailedAttemptsMs = json.waitAfterFailedAttemptsMs+"";
           }
        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },

    selectAllFromDeviceVariable(){
      selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order).then(res=>{
        this.tableData.rows = [];
        this.tableData.total = null;
        this.updateHeight();
        clearInterval(this.intervalVariable);
        if(res.data.result){
          this.tableData.rows = res.data.data.data;
          this.tableData.total =  res.data.data.count;
          this.setInterval();
        }
      })
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
    submitFormAdd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid)
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let device = {};
            device.json = '{"unitId":'+this.ruleForm.unitId+',"deviceName":'+'"'+this.deviceName+'"'+',"attributesPollPeriod":'+this.ruleForm.attributesPollPeriod+
              ',"timeseriesPollPeriod":'+this.ruleForm.timeseriesPollPeriod+',"sendDataOnlyOnChange":'+this.ruleForm.sendDataOnlyOnChange+
              ',"connectAttemptTimeMs":'+this.ruleForm.connectAttemptTimeMs+',"connectAttemptCount":'+this.ruleForm.connectAttemptCount+
              ',"waitAfterFailedAttemptsMs":'+this.ruleForm.waitAfterFailedAttemptsMs
            +'}';
            device.device_name = this.deviceName;
            updateDeviceByDeviceName(device).then(res => {
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                  this.selectAllFromDevice(this.deviceName);
                  this.$refs[formName].resetFields();
                }else{
                  this.$message({
                    type: 'error',
                    message: '保存失败!'
                  });
                }
            })
          })
      })
    },

    cancleFormAdd(mitsubishiFormAdd){
      this.$refs[mitsubishiFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },

    cancleFormEdit(mitsubishiFormEdit){
      this.$refs[mitsubishiFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    indexMethod(index) {
      return (this.tableData.currentPage - 1) * this.tableData.pageSize + index + 1
    },

    submitMitsubishiFormAdd(mitsubishiFormAdd){
      this.$refs[mitsubishiFormAdd].validate((valid) => {
        if (valid)
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deviceVariable = {};
            deviceVariable.tag_category = this.mitsubishiFormAdd.tag_category;
            deviceVariable.tag_name = this.mitsubishiFormAdd.tag_name;
            deviceVariable.tag_type = this.mitsubishiFormAdd.tag_type;
            deviceVariable.function_code = this.mitsubishiFormAdd.function_code;
            deviceVariable.count = this.mitsubishiFormAdd.count;
            deviceVariable.address = this.mitsubishiFormAdd.address;
            deviceVariable.description = this.mitsubishiFormAdd.description;
            deviceVariable.data_calculation = this.mitsubishiFormAdd.data_calculation;
            deviceVariable.calculation_factor = this.mitsubishiFormAdd.calculation_factor;
            deviceVariable.device_name = this.deviceName;
            addDeviceVariable(deviceVariable).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                  this.dialogFormVisibleAdd = false;
                }else{
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  });
                }
            })
          })
      })
    },

    submitMitsubishiFormEdit(mitsubishiFormEdit){
      this.$refs[mitsubishiFormEdit].validate((valid) => {
        if (valid)
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateDeviceVariableById(this.mitsubishiFormEdit).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                this.dialogFormVisibleEdit = false;
                this.$refs[mitsubishiFormEdit].resetFields();
              }else{
                this.$message({
                  type: 'error',
                  message: '编辑失败!'
                });
              }
            })
          })
      })
    },

    handleEdit(index,row){
      this.mitsubishiFormEdit.calculation_factor = row.calculation_factor+'';
      this.mitsubishiFormEdit.tag_category = row.tag_category;
      this.mitsubishiFormEdit.address = row.address;
      this.mitsubishiFormEdit.count = row.count+'';
      this.mitsubishiFormEdit.data_calculation = row.data_calculation;
      this.mitsubishiFormEdit.description = row.description;
      this.mitsubishiFormEdit.function_code = row.function_code;
      this.mitsubishiFormEdit.deviceName = this.deviceName;
      this.mitsubishiFormEdit.id = row.id;
      this.mitsubishiFormEdit.tag_name = row.tag_name;
      this.mitsubishiFormEdit.tag_type = row.tag_type;
      this.dialogFormVisibleEdit = true;
    },
    handleDelete(index,row){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDeviceVariableById(row.id).then(res=>{
          if(res.data.result){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      })
    },
    addVariable(){
        this.dialogFormVisibleAdd = true;
        this.mitsubishiFormAdd.deviceName = this.deviceName;
    },
    // 更新表格高度
    updateHeight() {
      this.tableData.height =
        window.innerHeight -
          $(".paginationPanel").height() -
          $(".toolPanel").height()-$(".basicCan").height()-$(".headName").height()-120;
    },
  }
}
</script>

<style scoped>

</style>
