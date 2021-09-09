<template>
  <div style="height: 80%">
    <el-row class="basicCan">
      <h2>设备名称： {{this.deviceName}}</h2>
      <h3>json配置</h3>
      <el-col :span="12"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleFormJson" :label-position="labelPosition" :rules="rulesJson" ref="ruleFormJson" label-width="100px" class="demo-ruleForm">
          <el-form-item label="type:" size="medium" style="width: 80%" prop="type">
            <el-input
            placeholder="请输入"
            style="margin-left: 35%;width: 50%"
            v-model="ruleFormJson.type">
          </el-input>
          </el-form-item>
          <el-form-item label="name:" size="medium" style="margin-top:5%;width: 80%" prop="name">
            <el-input
            placeholder="请输入"
            style="margin-left: 35%;width: 50%;"
            v-model="ruleFormJson.name">
          </el-input>
          </el-form-item>
          <el-form-item label="sendDataOnlyOnChange：" size="medium"  prop="sendDataOnlyOnChange" style="margin-top:5%;width: 60%">
            <el-select  style="margin-left:51%;width: 73%" v-model="ruleFormJson.sendDataOnlyOnChange">
              <el-option label="true" value="true"></el-option>
              <el-option label="false" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-button style="margin-left: 39%;margin-top: 10px" type="primary" @click="submitFormSaveJson('ruleFormJson')">保存</el-button>
          <el-button style="margin-left: 8%;margin-top: 10px" @click="resetFormJson('ruleFormJson')">重置</el-button>
        </el-form>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleFormRpc" :rules="rulesRpc" ref="ruleFormRpc" label-width="100px" class="demo-ruleForm">
          <el-form-item style="margin-top: -6%;width: 60%" prop="textareaJsonRpc">
            rpcJson:<el-input
              type="textarea"
              placeholder="请输入json"
              :rows="7"
              v-model="ruleFormRpc.textareaJsonRpc">
            </el-input>
          </el-form-item>
          <el-button style="margin-left: 25%;margin-top: 3%" type="primary" @click="submitFormSave('ruleFormRpc')">保存</el-button>
          <el-button style="margin-left: 8%;margin-top: 10px" @click="resetForm('ruleFormRpc')">重置</el-button>
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
          prop="key_express"
          label="name"
          width="150">
        </el-table-column>
        <el-table-column
          prop="value_express"
          label="value"
          width="150">
        </el-table-column>
        <el-table-column
          prop="value"
          label="attributeValue"
          width="150">
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
    <el-dialog title="添加Odbc变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="odbcFormAdd" style="margin-left: 27%" :rules="odbcRulesAdd" ref="odbcFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="device_name" style="width: 60%">
          <el-input v-model="odbcFormAdd.device_name" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select v-model="odbcFormAdd.tag_category" @change="selectValue">
            <el-option label="attributes" value="attributes"></el-option>
            <el-option label="timeseries" value="timeseries"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="name：" prop="name"  v-if="this.nameShow"style="width: 60%">
          <el-input v-model="odbcFormAdd.name"  style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="value：" prop="value"  v-if="this.nameShow" style="width: 60%">
          <el-input v-model="odbcFormAdd.value"  style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="attributeValue：" v-if="this.attributeValueShow" prop="attributeValue" style="width: 60%">
          <el-input v-model="odbcFormAdd.attributeValue"  style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="odbcFormAdd.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitOdbcFormAdd('odbcFormAdd')">确定</el-button>
          <el-button @click="cancleFormAdd('odbcFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑Odbc变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="odbcFormEdit" style="margin-left: 27%" :rules="odbcRulesEdit" ref="odbcFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select disabled v-model="odbcFormEdit.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
            <el-option label="timeseries" value="timeseries"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="name：" v-if="this.nameShow" prop="name" style="width: 60%">
          <el-input v-model="odbcFormEdit.name" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="value：" v-if="this.valueShow" prop="value " style="width: 60%">
          <el-input v-model="odbcFormEdit.value " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="attributeValue：" v-if="this.attributeValueShow" prop="attributeValue " style="width: 60%">
          <el-input v-model="odbcFormEdit.attributeValue " style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="odbcFormEdit.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitOdbcFormEdit('odbcFormEdit')">确定</el-button>
          <el-button @click="cancleFormEdit('odbcFormEdit')">取消</el-button>
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
  name: "odbcVariableList",
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
        type: '',
        name: '',
        sendDataOnlyOnChange: ''
      },
      odbcFormAdd: {
        device_name: '',
        name: '',
        value: '',
        tag_category: '',
        attributeValue: '',
        description: ''
      },
      odbcFormEdit: {
        device_name: '',
        name: '',
        value: '',
        tag_category: '',
        attributeValue: '',
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
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max:1000,message: '长度在 1 到 1000 个字符',trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max:100,message: '长度在 2 到 100 个字符',trigger: 'blur' }
        ],
        sendDataOnlyOnChange: [
        { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      odbcRulesAdd: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        name: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        value: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        attributeValue: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ]
      },
      odbcRulesEdit: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        name: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        value: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        attributeValue: [
          {required: true, message: '请输入', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
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
      nameShow: false,
      valueShow: false,
      attributeValueShow: false
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
    /*'$route' (to, from) {
      // 路由发生变化页面刷新
      this.getParams();
      if(this.id != undefined){
        this.selectAllFromDeviceVariable();
      }

      if(this.deviceName != undefined){
        this.selectAllFromDevice(this.deviceName);
      }
    }*/
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
             },

    selectAllFromDevice(deviceName){
      selectJsonUpdateJsonRpcJsonFromDeviceByDeviceName(deviceName).then(res=>{
        if(res.data.result){
          if(res.data.data.length>0){
            this.ruleForm.textareaJsonUpdate = JSON.parse(JSON.stringify(res.data.data[0].updateJson)) ==""? '':JSON.parse(JSON.stringify(res.data.data[0].updateJson))+'' ;
            this.ruleFormRpc.textareaJsonRpc = JSON.parse(JSON.stringify(res.data.data[0].rpcJson))==""? '':JSON.parse(JSON.stringify(res.data.data[0].rpcJson))+'';
            this.ruleFormJson.type  = JSON.stringify(res.data.data[0].json)==""? '':JSON.parse(res.data.data[0].json).device.type+'';
            this.ruleFormJson.name = JSON.stringify(res.data.data[0].json)==""? '':JSON.parse(res.data.data[0].json).device.name+'';
            this.ruleFormJson.sendDataOnlyOnChange = JSON.parse(JSON.stringify(res.data.data[0].json))==""? '':JSON.parse(res.data.data[0].json).sendDataOnlyOnChange;
          }
        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },

    selectValue(v){
      if(v == 'timeseries'){
        this.attributeValueShow = false;
        this.nameShow = true;
        this.valueShow =true;
      }else if(v == 'attributes'){
        this.attributeValueShow = true;
        this.nameShow = false;
        this.valueShow =false;
      }
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
    submitFormSave(ruleFormRpc){
              this.$refs[ruleFormRpc].validate((valid) => {
                if (valid){
                  this.$confirm('确定保存吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    let device = {};
                    device.rpcJson = this.ruleFormRpc.textareaJsonRpc;
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

    },
    submitFormSaveJson(ruleFormJson){
      this.$refs[ruleFormJson].validate((valid) => {
        if (valid) {
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let device = {}
            device.json = '{"device":{'+'"type":"' + this.ruleFormJson.type+'",'
            + '"name":"'+this.ruleFormJson.name+'"},'
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

    cancleFormAdd(odbcFormAdd){
      this.$refs[odbcFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
      this.nameShow = false;
      this.valueShow =false;
      this.attributeValueShow = false;
    },

    cancleFormEdit(odbcFormEdit){
      this.$refs[odbcFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },

    resetForm(ruleFormRpc) {
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

    submitOdbcFormAdd(odbcFormAdd){
      this.$refs[odbcFormAdd].validate((valid) => {
        if (valid)
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deviceVariable = {};
            deviceVariable.tag_category = this.odbcFormAdd.tag_category;
            deviceVariable.key_express = this.odbcFormAdd.name;
            deviceVariable.value_express = this.odbcFormAdd.value;
            deviceVariable.value = this.odbcFormAdd.attributeValue;
            deviceVariable.description = this.odbcFormAdd.description;
            deviceVariable.device_name = this.deviceName;
            addDeviceVariable(deviceVariable).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                  this.$refs[odbcFormAdd].resetFields();
                  this.dialogFormVisibleAdd = false;
                  this.nameShow = false;
                  this.valueShow =false;
                  this.attributeValueShow = false;
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

    submitOdbcFormEdit(odbcFormEdit){
      this.$refs[odbcFormEdit].validate((valid) => {
        if (valid)
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let odbc = {};
            odbc.description = this.odbcFormEdit.description;
            odbc.tag_category = this.odbcFormEdit.tag_category;
            odbc.key_express = this.odbcFormEdit.name;
            odbc.value_express = this.odbcFormEdit.value;
            odbc.value = this.odbcFormEdit.attributeValue;
            odbc.id = this.odbcFormEdit.id;
            updateDeviceVariableById(odbc).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                this.dialogFormVisibleEdit = false;
                this.$refs[odbcFormEdit].resetFields();
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
      if(row.tag_category == 'timeseries'){
        this.nameShow = true;
        this.valueShow =true;
        this.attributeValueShow = false;
      }else if(row.tag_category == 'attributes'){
        this.nameShow = false;
        this.valueShow =false;
        this.attributeValueShow = true;
      }
      this.odbcFormEdit.tag_category = row.tag_category+'';
      this.odbcFormEdit.name = row.key_express+'';
      this.odbcFormEdit.value = row.value_express+'';
      this.odbcFormEdit.attributeValue = row.value+'';
      this.odbcFormEdit.description = row.description+'';
      this.odbcFormEdit.device_name = this.deviceName;
      this.odbcFormEdit.id = row.id;
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
        this.odbcFormAdd.device_name = this.deviceName;
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
