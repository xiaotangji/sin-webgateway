<template>
  <div style="height: 80%">
    <el-row class="basicCan">
      <h2>设备名称： {{this.deviceName}}</h2>
      <h3>json配置</h3>
      <el-col :span="8"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleFormJson" :label-position="labelPosition" :rules="rulesJson" ref="ruleFormJson" label-width="100px" class="demo-ruleForm">
          <el-form-item label="unitId:" size="medium" style="width: 80%" prop="unitId">
            <el-input
            style="margin-left: 35%"
            disabled
            v-model="ruleFormJson.unitId">
          </el-input>
          </el-form-item>
          <el-form-item label="deviceName:" size="medium" style="margin-top:5%;width: 80%" prop="deviceName">
            <el-input
              disabled
            placeholder="请输入"
            style="margin-left: 35%"
            v-model="ruleFormJson.deviceName">
          </el-input>
          </el-form-item>
          <el-form-item label="attributesPollPeriod:" size="medium" style="margin-top:5%;width: 80%" prop="attributesPollPeriod">
            <el-input
              placeholder="请输入"
              style="margin-left: 35%"
              v-model="ruleFormJson.attributesPollPeriod">
            </el-input>
          </el-form-item>
          <el-form-item label="timeseriesPollPeriod:" size="medium" style="margin-top:5%;width: 80%" prop="timeseriesPollPeriod">
            <el-input
              placeholder="请输入"
              style="margin-left: 35%"
              v-model="ruleFormJson.timeseriesPollPeriod">
            </el-input>
          </el-form-item>
          <el-form-item label="sendDataOnlyOnChange：" size="medium"  prop="sendDataOnlyOnChange" style="margin-top:5%;width: 80%">
            <el-select  style="margin-left:35%;width: 100%" v-model="ruleFormJson.sendDataOnlyOnChange">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-button style="margin-left: 45%;margin-top: 10px" type="primary" @click="submitFormSaveJson('ruleFormJson')">保存</el-button>
          <el-button style="margin-left: 8%;margin-top: 10px" @click="resetFormJson('ruleFormJson')">重置</el-button>
        </el-form>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleFormRpc" :rules="rulesRpc" ref="ruleFormRpc" label-width="100px" class="demo-ruleForm">
          <el-form-item style="margin-left: 25%;width: 80%" prop="textareaJsonRpc">
            rpcJson:<el-input
              type="textarea"
              :rows="7"
              placeholder="请输入json"
              v-model="ruleFormRpc.textareaJsonRpc">
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item style="margin-left: 0%;width: 80%" prop="textareaJsonUpdate">
            updateJson:
            <el-input
              type="textarea"
              :rows="7"
              placeholder="请输入json"
              v-model="ruleForm.textareaJsonUpdate">
            </el-input>
          </el-form-item>
          <el-button style="margin-left: -5%;margin-top: 19%" type="primary" @click="submitFormSave('ruleForm','ruleFormRpc')">保存</el-button>
          <el-button style="margin-left: 8%;margin-top: 10px" @click="resetForm('ruleForm','ruleFormRpc')">重置</el-button>
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
      <h3>变量列表(Rtu配置)</h3>
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
          prop="value"
          label="byteOrder"
          width="150">
        </el-table-column>
        <el-table-column
          prop="tag_name"
          label="tag"
          width="150">
        </el-table-column>
        <el-table-column
          prop="tag_type"
          label="type"
          width="150">
        </el-table-column>
        <el-table-column
          prop="function_code"
          label="functionCode">
        </el-table-column>
        <el-table-column
          prop="count"
          label="registerCount">
        </el-table-column>
        <el-table-column
          prop="address"
          label="address">
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
    <el-dialog title="添加Rtu变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="rtuFormAdd" style="margin-left: 27%" :rules="rtuRulesAdd" ref="rtuFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="device_name" style="width: 60%">
          <el-input v-model="rtuFormAdd.device_name" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select v-model="rtuFormAdd.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="byteOrder：" prop="byteOrder" style="width: 60%">
          <el-input v-model="rtuFormAdd.byteOrder" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="tag：" prop="tag" style="width: 60%">
          <el-input v-model="rtuFormAdd.tag" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="type：" prop="type" style="width: 60%">
          <el-input v-model="rtuFormAdd.type" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="functionCode：" prop="functionCode" style="width: 60%">
          <el-input v-model="rtuFormAdd.functionCode" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="registerCount：" prop="registerCount" style="width: 60%">
          <el-input v-model="rtuFormAdd.registerCount" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="address：" prop="address" style="width: 60%">
          <el-input v-model="rtuFormAdd.address" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="rtuFormAdd.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRtuFormAdd('rtuFormAdd')">确定</el-button>
          <el-button @click="cancleFormAdd('rtuFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑Rtu变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="rtuFormEdit" style="margin-left: 27%" :rules="rtuRulesEdit" ref="rtuFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="device_name" style="width: 60%">
          <el-input v-model="rtuFormEdit.device_name" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别："  prop="tag_category" style="width: 60%">
          <el-select disabled v-model="rtuFormEdit.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="byteOrder：" prop="byteOrder" style="width: 60%">
          <el-input v-model="rtuFormEdit.byteOrder" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="tag：" prop="tag " style="width: 60%">
          <el-input v-model="rtuFormEdit.tag " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="type：" prop="type " style="width: 60%">
          <el-input v-model="rtuFormEdit.type " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="functionCode：" prop="functionCode " style="width: 60%">
          <el-input v-model="rtuFormEdit.functionCode " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="registerCount：" prop="registerCount  " style="width: 60%">
          <el-input v-model="rtuFormEdit.registerCount  " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="address：" prop="address  " style="width: 60%">
          <el-input v-model="rtuFormEdit.address  " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="rtuFormEdit.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRtuFormEdit('rtuFormEdit')">确定</el-button>
          <el-button @click="cancleFormEdit('rtuFormEdit')">取消</el-button>
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
import {
  selectJsonUpdateJsonRpcJsonFromDeviceByDeviceName,
  updateDeviceByDeviceName
} from "../../../api/device";

export default {
  name: "rtuVariableList",
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
        textareaJsonUpdate: ''
      },
      ruleFormRpc:{
        textareaJsonRpc:'',
      },
      ruleFormJson:{
        unitId: '',
        deviceName: '',
        attributesPollPeriod: '',
        timeseriesPollPeriod: '',
        sendDataOnlyOnChange: ''
      },
      rtuFormAdd: {
        device_name: '',
        tag_category: '',
        byteOrder: '',
        tag: '',
        type:'',
        functionCode: '',
        registerCount: '',
        address: '',
        description: ''
      },
      rtuFormEdit: {
        device_name: '',
        tag_category: '',
        byteOrder: '',
        tag: '',
        type:'',
        functionCode: '',
        registerCount: '',
        address: '',
        description: ''
      },
      rules: {
        textareaJson: [
          { required: true, message: '请输入json', trigger: 'blur' },
          { min: 1, max:1000,message: '长度在 1 到 1000 个字符', trigger: 'blur' }
        ]
      },
      rulesRpc: {
        textareaJsonRpc: [
          { required: true, message: '请输入json', trigger: 'blur' },
          { min: 1, max:1000,message: '长度在 1 到 1000 个字符',trigger: 'blur' }
        ]
      },
      rulesJson: {
        unitId: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max:1000,message: '长度在 1 到 1000 个字符',trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max:100,message: '长度在 2 到 100 个字符',trigger: 'blur' }
        ],
        attributesPollPeriod: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max:100,message: '长度在 2 到 100 个字符',trigger: 'blur' }
        ],
        timeseriesPollPeriod: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max:100,message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        sendDataOnlyOnChange: [
        { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      rtuRulesAdd: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        byteOrder: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        tag: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        functionCode: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        registerCount: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ]
      },
      rtuRulesEdit: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        byteOrder: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        tag: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        functionCode: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        registerCount: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ]
      },
      deviceName: '',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      intervalVariable : null,
      labelPosition: 'left',
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
               this.id = this.$route.query.id;
               this.ruleFormJson.unitId = this.$route.query.unit_id;
               this.ruleFormJson.deviceName = this.deviceName;
             },

    selectAllFromDevice(deviceName){
      selectJsonUpdateJsonRpcJsonFromDeviceByDeviceName(deviceName).then(res=>{
        if(res.data.result){
          if(res.data.data.length>0){
            this.ruleForm.textareaJsonUpdate = JSON.parse(JSON.stringify(res.data.data[0].updateJson)) ==null? '':JSON.parse(JSON.stringify(res.data.data[0].updateJson))+'' ;
            this.ruleFormRpc.textareaJsonRpc = JSON.parse(JSON.stringify(res.data.data[0].rpcJson))==null? '':JSON.parse(JSON.stringify(res.data.data[0].rpcJson))+'';
            this.ruleFormJson.attributesPollPeriod = JSON.parse(JSON.stringify(res.data.data[0].json))==null? '':JSON.parse(res.data.data[0].json).attributesPollPeriod+'';
            this.ruleFormJson.timeseriesPollPeriod = JSON.parse(JSON.stringify(res.data.data[0].json))==null? '':JSON.parse(res.data.data[0].json).timeseriesPollPeriod+'';
            this.ruleFormJson.sendDataOnlyOnChange = JSON.parse(JSON.stringify(res.data.data[0].json))==null? '':JSON.parse(res.data.data[0].json).sendDataOnlyOnChange;
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
    submitFormSave(ruleForm,ruleFormRpc){
          this.$refs[ruleForm].validate((valid) => {
            if (valid){
              this.$refs[ruleFormRpc].validate((valid) => {
                if (valid){
                  this.$confirm('确定保存吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    let device = {};
                    device.rpcJson = this.ruleFormRpc.textareaJsonRpc;
                    device.updateJson = this.ruleForm.textareaJsonUpdate;
                    device.json = this.ruleFormJson.textareaJson;
                    device.device_name = this.deviceName;
                    updateDeviceByDeviceName(device).then(res => {
                      if (res.data.result) {
                        this.$message({
                          type: 'success',
                          message: '保存成功!'
                        });
                        this.selectAllFromDevice(this.deviceName);
                      } else {
                        this.$message({
                          type: 'error',
                          message: '保存失败!'
                        });
                      }
                    })
                  })
                }
              })
            }
          })
    },
    submitFormSaveJson(ruleFormJson){
      this.$refs[ruleFormJson].validate((valid) => {
        if (valid) {
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let device = {};
            device.json = '{"unitId":' + this.ruleFormJson.unitId+','
            + '"deviceName":"'+this.deviceName+'",'
            +  '"attributesPollPeriod":'+this.ruleFormJson.attributesPollPeriod+ ','
            +  '"timeseriesPollPeriod":' + this.ruleFormJson.timeseriesPollPeriod+','
            +  '"sendDataOnlyOnChange":'+ this.ruleFormJson.sendDataOnlyOnChange
            +  '}'
            device.device_name = this.deviceName;
            updateDeviceByDeviceName(device).then(res => {
              if (res.data.result) {
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                this.selectAllFromDevice(this.deviceName);
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败!'
                });
              }
            })
          })
        }
      })
    },

    cancleFormAdd(rtuFormAdd){
      this.$refs[rtuFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },

    cancleFormEdit(rtuFormEdit){
      this.$refs[rtuFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },

    resetForm(ruleForm,ruleFormRpc) {
      this.$refs[ruleForm].resetFields();
      this.$refs[ruleFormRpc].resetFields();
      this.ruleForm = {};
      this.ruleFormRpc = {};
    },
    resetFormJson(ruleFormJson) {
      this.$refs[ruleFormJson].resetFields();
      this.ruleFormJson = {};
    },
    indexMethod(index) {
      return (this.tableData.currentPage - 1) * this.tableData.pageSize + index + 1
    },

    submitRtuFormAdd(rtuFormAdd){
      this.$refs[rtuFormAdd].validate((valid) => {
        if (valid)
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deviceVariable = {};
            deviceVariable.tag_category = this.rtuFormAdd.tag_category;
            deviceVariable.value = this.rtuFormAdd.byteOrder;
            deviceVariable.tag_name = this.rtuFormAdd.tag;
            deviceVariable.tag_type = this.rtuFormAdd.type;
            deviceVariable.function_code = this.rtuFormAdd.functionCode;
            deviceVariable.count = this.rtuFormAdd.registerCount;
            deviceVariable.description = this.rtuFormAdd.description;
            deviceVariable.address = this.rtuFormAdd.address;
            deviceVariable.device_name = this.deviceName;
            addDeviceVariable(deviceVariable).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                  this.$refs[rtuFormAdd].resetFields();
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

    submitRtuFormEdit(rtuFormEdit){
      this.$refs[rtuFormEdit].validate((valid) => {
        if (valid)
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let rtu = {};
            rtu.description = this.rtuFormEdit.description;
            rtu.tag_category = this.rtuFormEdit.tag_category;
            rtu.tag_name = this.rtuFormEdit.tag;
            rtu.tag_type = this.rtuFormEdit.type;
            rtu.address = this.rtuFormEdit.address;
            rtu.count = this.rtuFormEdit.registerCount;
            rtu.value = this.rtuFormEdit.byteOrder;
            rtu.function_code = this.rtuFormEdit.functionCode;
            rtu.id = this.rtuFormEdit.id;
            updateDeviceVariableById(rtu).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                this.dialogFormVisibleEdit = false;
                this.$refs[rtuFormEdit].resetFields();
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
      this.rtuFormEdit.tag_category = row.tag_category;
      this.rtuFormEdit.byteOrder = row.value+'';
      this.rtuFormEdit.tag = row.tag_name+'';
      this.rtuFormEdit.type = row.tag_type+'';
      this.rtuFormEdit.description = row.description+'';
      this.rtuFormEdit.address = row.address +'';
      this.rtuFormEdit.functionCode = row.function_code +'';
      this.rtuFormEdit.registerCount = row.count +'';
      this.rtuFormEdit.device_name = this.deviceName;
      this.rtuFormEdit.id = row.id;
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
    // 判断是否为json格式
    isJSON(str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == 'object' && obj) {
            return true;
          } else {
            return false;
          }

        } catch (e) {
          console.log('error：' + str + '!!!' + e);
          return false;
        }
      }
    },
    addVariable(){
        this.dialogFormVisibleAdd = true;
        this.rtuFormAdd.device_name = this.deviceName;
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
