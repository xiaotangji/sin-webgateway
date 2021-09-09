<template>
  <div style="height: 80%">
    <el-row class="basicCan">
      <h2>设备名称： {{this.deviceName}}</h2>
      <h3>json配置</h3>
      <el-col :span="8"><div class="grid-content bg-purple"></div>
        <el-form :model="ruleFormJson" :rules="rulesJson" ref="ruleFormJson" label-width="100px" class="demo-ruleForm">
          <el-form-item label="deviceNodePattern:" style="margin-left:10%;width: 80%;margin-top: 15%" prop="NodePattern">
            <el-input
              style="margin-left: 20%"
            placeholder="请输入"
            v-model="ruleFormJson.NodePattern">
          </el-input>
          </el-form-item>
          <el-form-item label="deviceNamePattern:" style="margin-left:10%;width: 80%" prop="NamePattern">
            <el-input
            placeholder="请输入"
            style="margin-left: 20%"
            v-model="ruleFormJson.NamePattern">
          </el-input>
          </el-form-item>
          <el-button style="margin-left: 45%;margin-top: 10%" type="primary" @click="submitFormSaveJson('ruleFormJson')">保存</el-button>
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
          <el-button style="margin-left: -5%;" type="primary" @click="submitFormSave('ruleForm','ruleFormRpc')">保存</el-button>
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
      <h3>变量列表(Opcua配置)</h3>
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
          label="键"
          width="150">
        </el-table-column>
        <el-table-column
          prop="value_express"
          label="路径"
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
    <el-dialog title="添加Opcua变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="opcuaFormAdd" style="margin-left: 27%" :rules="opcuaRulesAdd" ref="opcuaFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="device_name" style="width: 60%">
          <el-input v-model="opcuaFormAdd.device_name" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select v-model="opcuaFormAdd.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
            <el-option label="timeseries" value="timeseries"></el-option>
            <el-option label="attributeUpdates" value="attributeUpdates"></el-option>
            <el-option label="rpc" value="rpc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="键：" prop="key_express" style="width: 60%">
          <el-input v-model="opcuaFormAdd.key_express" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="路径：" prop="value_express" style="width: 60%">
          <el-input v-model="opcuaFormAdd.value_express" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="opcuaFormAdd.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitOpcuaFormAdd('opcuaFormAdd')">确定</el-button>
          <el-button @click="cancleFormAdd('opcuaFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑opcua变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="opcuaFormEdit" style="margin-left: 27%" :rules="opcuaRulesEdit" ref="opcuaFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="设备名称：" prop="device_name" style="width: 60%">
          <el-input v-model="opcuaFormEdit.device_name" disabled style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
          <el-select disabled v-model="opcuaFormEdit.tag_category">
            <el-option label="attributes" value="attributes"></el-option>
            <el-option label="timeseries" value="timeseries"></el-option>
            <el-option label="attributeUpdates" value="attributeUpdates"></el-option>
            <el-option label="rpc" value="rpc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="键：" prop="key_express" style="width: 60%">
          <el-input v-model="opcuaFormEdit.key_express" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="路径：" prop="value_express" style="width: 60%">
          <el-input v-model="opcuaFormEdit.value_express" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description" style="width: 60%">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="opcuaFormEdit.description"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitOpcuaFormEdit('opcuaFormEdit')">确定</el-button>
          <el-button @click="cancleFormEdit('opcuaFormEdit')">取消</el-button>
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
  selectUpdateJsonRpcJsonFromDeviceByDeviceName,
  updateDeviceByDeviceName
} from "../../../api/device";

export default {
  name: "opcuaVariableList",
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
      },
      ruleForm: {
        textareaJsonUpdate: ''
      },
      ruleFormRpc:{
        textareaJsonRpc:'',
      },
      ruleFormJson:{
        NodePattern: '',
        NamePattern: ''
      },
      opcuaFormAdd: {
        device_name: '',
        tag_category: '',
        key_express:'',
        value_express: '',
        description: '',
      },
      opcuaFormEdit: {
        id:'',
        device_name: '',
        tag_category: '',
        key_express:'',
        value_express: '',
        description: '',
      },
      rules: {
        textareaJson: [
          { required: true, message: '请输入json', trigger: 'blur' },
          { min: 1, max:1000,message: '长度在 1 到 1000 个字符',trigger: 'blur' }
        ]
      },
      rulesRpc: {
        textareaJsonRpc: [
          { required: true, message: '请输入json', trigger: 'blur' },
          { min: 1, max:1000,message: '长度在 1 到 1000 个字符',trigger: 'blur' }
        ]
      },
      rulesJson: {
        NodePattern: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max:100,message: '长度在 1 到 100 个字符',trigger: 'blur' }
        ],
        NamePattern: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1,max:100,message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      opcuaRulesAdd: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        key_express: [
          {required: true, message: '请输入键', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        value_express: [
          {required: true, message: '请输入路径', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ]
      },
      opcuaRulesEdit: {
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        key_express: [
          {required: true, message: '请输入键', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        value_express: [
          {required: true, message: '请输入路径', trigger: 'blur'},
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
               this.id = this.$route.query.id;
             },

    selectAllFromDevice(deviceName){
      selectJsonUpdateJsonRpcJsonFromDeviceByDeviceName(deviceName).then(res=>{
        if(res.data.result){
          if(res.data.data.length>0){
            this.ruleForm.textareaJsonUpdate = JSON.parse(JSON.stringify(res.data.data[0].updateJson)) ==null? '':JSON.parse(JSON.stringify(res.data.data[0].updateJson))+'' ;
            this.ruleFormRpc.textareaJsonRpc = JSON.parse(JSON.stringify(res.data.data[0].rpcJson))==null? '':JSON.parse(JSON.stringify(res.data.data[0].rpcJson))+'';
            this.ruleFormJson.NodePattern = JSON.parse(JSON.stringify(res.data.data[0].json))==null? '':JSON.parse(res.data.data[0].json).deviceNodePattern+'';
            this.ruleFormJson.NamePattern = JSON.parse(JSON.stringify(res.data.data[0].json))==null? '':JSON.parse(res.data.data[0].json).deviceNamePattern+'';
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
            device.json = '{"deviceNodePattern":"' + this.ruleFormJson.NamePattern+'",'
            + '"deviceNamePattern":"'+this.ruleFormJson.NodePattern+'"}'
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

    cancleFormAdd(opcuaFormAdd){
      this.$refs[opcuaFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },

    cancleFormEdit(opcuaFormEdit){
      this.$refs[opcuaFormEdit].resetFields();
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

    submitOpcuaFormAdd(opcuaFormAdd){
      this.$refs[opcuaFormAdd].validate((valid) => {
        if (valid)
          this.$confirm('确定保存吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deviceVariable = {};
            deviceVariable.tag_category = this.opcuaFormAdd.tag_category;
            deviceVariable.key_express = this.opcuaFormAdd.key_express;
            deviceVariable.value_express = this.opcuaFormAdd.value_express;
            deviceVariable.description = this.opcuaFormAdd.description;
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

    submitOpcuaFormEdit(opcuaFormEdit){
      this.$refs[opcuaFormEdit].validate((valid) => {
        if (valid)
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateDeviceVariableById(this.opcuaFormEdit).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                this.dialogFormVisibleEdit = false;
                this.$refs[opcuaFormEdit].resetFields();
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
      this.opcuaFormEdit.tag_category = row.tag_category;
      this.opcuaFormEdit.key_express = row.key_express;
      this.opcuaFormEdit.value_express = row.value_express;
      this.opcuaFormEdit.description = row.description;
      this.opcuaFormEdit.device_name = this.deviceName;
      this.opcuaFormEdit.id = row.id;
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
        this.opcuaFormAdd.device_name = this.deviceName;
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
