<template>
  <div>
    <el-row>
        <el-col :span="18" style="margin-top: 20px"><div class="grid-content bg-purple">
          <div style="float: right">
            <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
              <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addDhcp"></el-button>
            </el-tooltip>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="start_dhcp"
              label="启用DHCP服务"
              width="180">
            </el-table-column>
            <el-table-column
              prop="interface"
              label="接口"
              width="180">
            </el-table-column>
            <el-table-column
              prop="start_addr"
              label="起始地址">
            </el-table-column>
            <el-table-column
              prop="end_addr"
              label="结束地址">
            </el-table-column>
            <el-table-column
              prop="validity"
              label="有效期(分钟)">
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
          <span style="margin-left: 75%">注意：DHCP租期有效期为0表示无穷大.</span>
        </div>
        </el-col>
    </el-row>
    <el-row>
      <div><span style="color: black;font-size: 20px">Windows名称服务器(WINS)：</span><el-input style="width: 200px;margin-top: 10px;margin-left: 30px" v-model="input"></el-input></div>
      <div><span style="color: black;font-size: 20px;float: left">静态IP设置</span></div>
    </el-row>
    <el-row>
      <el-col :span="10"><div class="grid-content bg-purple"></div>
        <div style="float: right">
          <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
            <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addStaticIpConfig"></el-button>
          </el-tooltip>
        </div>
        <el-table
          :data="tableDataIp"
          border
          style="width: 100%">
          <el-table-column
            prop="mac_addr"
            label="MAC地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ip_addr"
            label="IP地址"
            width="180">
          </el-table-column>
          <el-table-column label="操作" width="167">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditIp(scope.$index, scope.row)" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteIp(scope.$index, scope.row)" circle></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog destroy-on-close    title="添加DHCP服务器" :close-on-click-modal="false":visible.sync="dialogFormVisibleAdd">
      <el-form :model="dhcpFormAdd" style="margin-left: 27%" :rules="rulesAdd" ref="dhcpFormAdd" size="mini"  label-width="130px" class="demo-ruleForm">
        <el-form-item label="启用DHCP服务:" prop="start_dhcp">
          <el-switch v-model="dhcpFormAdd.start_dhcp"></el-switch>
        </el-form-item>
        <el-form-item label="接口:" style="margin-left: -9px" prop="interface">
        <el-select v-model="dhcpFormAdd.interface" style="width: 185px;margin-left:9px"  placeholder="请选择">
          <el-option
            v-for="item in interfaceArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="起始地址：" prop="start_addr">
          <el-input v-model="dhcpFormAdd.start_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="结束地址：" prop="end_addr" style="width: 60%">
          <el-input v-model="dhcpFormAdd.end_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="有效期：" prop="validity" style="width: 60%">
          <el-input v-model="dhcpFormAdd.validity" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd('dhcpFormAdd')">确定</el-button>
          <el-button @click="cancleAdd('dhcpFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog destroy-on-close    title="编辑DHCP服务器" :close-on-click-modal="false":visible.sync="dialogFormVisibleEdit">
      <el-form :model="dhcpFormEdit" style="margin-left: 27%" :rules="rulesAdd" ref="dhcpFormEdit" size="mini"  label-width="130px" class="demo-ruleForm">
        <el-form-item label="启用DHCP服务:" prop="start_dhcp">
          <el-switch v-model="dhcpFormEdit.start_dhcp"></el-switch>
        </el-form-item>
        <el-form-item label="接口:" style="margin-left: -9px" prop="interface">
          <el-select clearable v-model="dhcpFormEdit.interface" style="width: 185px;margin-left:9px"  placeholder="请选择">
            <el-option
              filterable
              allow-create
              v-for="item in interfaceArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始地址：" prop="start_addr">
          <el-input v-model="dhcpFormEdit.start_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="结束地址：" prop="end_addr" style="width: 60%">
          <el-input v-model="dhcpFormEdit.end_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="有效期：" prop="validity" style="width: 60%">
          <el-input v-model="dhcpFormEdit.validity" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit('dhcpFormEdit')">确定</el-button>
          <el-button @click="cancleEdit('dhcpFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog destroy-on-close    title="添加静态ip" :close-on-click-modal="false":visible.sync="dialogFormVisibleAddIp">
      <el-form :model="ipFormAdd" style="margin-left: 27%" :rules="rulesAddIp" ref="ipFormAdd" size="mini"  label-width="130px" class="demo-ruleForm">
        <el-form-item label="MAC地址：" prop="mac_addr">
          <el-input v-model="ipFormAdd.mac_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="IP地址：" prop="ip_addr" style="width: 60%">
          <el-input v-model="ipFormAdd.ip_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAddIp('ipFormAdd')">确定</el-button>
          <el-button @click="cancleAddIp('ipFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog destroy-on-close    title="编辑静态ip" :close-on-click-modal="false":visible.sync="dialogFormVisibleEditIp">
      <el-form :model="ipFormEdit" style="margin-left: 27%" :rules="rulesAddIp" ref="ipFormEdit" size="mini"  label-width="130px" class="demo-ruleForm">
        <el-form-item label="MAC地址：" prop="mac_addr">
          <el-input v-model="ipFormEdit.mac_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="IP地址：" prop="ip_addr" style="width: 60%">
          <el-input v-model="ipFormEdit.ip_addr" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEditIp('ipFormEdit')">确定</el-button>
          <el-button @click="cancleEditIp('ipFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import CrudTable from "../components/context/CrudTable";
  import {
    addDhcp, addStaticIpConfig,
    deleteFromDhcpById, deleteFromStaticIpConfigById,
    selectFromDhcp,
    selectFromStaticIpConfig,
    updateDhcp, updateStaticIpconfig
  } from "../../../../api/dhcp";
  import {addDevice, deleteDeviceByDeviceName} from "../../../../api/device";
  export default {
    name: "DHCPService",
    data() {
      return {
        tableData:[],
        tableDataIp:[],
        interfaceArr:[],
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        dialogFormVisibleAddIp: false,
        dialogFormVisibleEditIp: false,
        dhcpFormAdd:{
          id:'',
          start_dhcp:false,
          interface: '',
          start_addr:'',
          end_addr:'',
          validity: ''
        },
        ipFormAdd:{
          id:'',
          mac_addr:'',
          ip_addr:''
        },
        ipFormEdit:{
          id:'',
          mac_addr:'',
          ip_addr:''
        },
        dhcpFormEdit:{
          id:'',
          start_dhcp:false,
          interface: '',
          start_addr:'',
          end_addr:'',
          validity: ''
        },
        rulesAdd:{
          interface: [
            { required: true, message: '请选择接口', trigger: 'change' }
          ],
          start_addr: [
            { required: true, message: '请输入起始地址', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          end_addr: [
            { required: true, message: '请输入结束地址', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          validity: [
            { required: true, message: '请输入有效期', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        },
        rulesAddIp:{
          mac_addr: [
            { required: true, message: '请输入MAC地址', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          ip_addr: [
            { required: true, message: '请输入IP地址', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {

    },
    created() {
        this.selectFromDhcp();
        this.selectFromStaticIpConfig();
    },
    methods: {
      selectFromDhcp() {
        selectFromDhcp().then(res => {
          let dhcpList = [];
          let data = res.data.data;
          let interfaceTmp = [];
          for (let i = 0; i < data.length; i++) {
            let dhcp = {}
            if(interfaceTmp.indexOf(data[i].interface) == -1){
              interfaceTmp.push(data[i].interface);
              this.interfaceArr.push({label:data[i].interface,value:data[i].interface});
            }
            dhcp.start_dhcp = data[i].start_dhcp == 1 ? '启用' : '未启用';
            dhcp.interface = data[i].interface;
            dhcp.start_addr = data[i].start_addr;
            dhcp.end_addr = data[i].end_addr;
            dhcp.validity = data[i].validity;
            dhcp.id = data[i].id;
            dhcpList.push(dhcp);
          }
          this.tableData = dhcpList;
        })
      },

      selectFromStaticIpConfig(){
        selectFromStaticIpConfig().then(res=>{
            if(res.data.result){
              this.tableDataIp = res.data.data;
            }
        })
      },

      addDhcp(){
        this.dialogFormVisibleAdd = true;
      },
      addStaticIpConfig(){
        this.dialogFormVisibleAddIp = true;
      },

      submitFormAdd(ruleFormAdd){
        this.$refs[ruleFormAdd].validate((valid) => {
          if (valid) {
              let dhcp = {};
              dhcp.start_dhcp = this.dhcpFormAdd.start_dhcp==true?1:0;
              dhcp.interface = this.dhcpFormAdd.interface;
              dhcp.start_addr = this.dhcpFormAdd.start_addr;
              dhcp.end_addr = this.dhcpFormAdd.end_addr;
              dhcp.validity = this.dhcpFormAdd.validity;
              addDhcp(dhcp).then(res=>{
                if(res.data.result){
                  this.$refs[ruleFormAdd].resetFields();
                  this.dialogFormVisibleAdd = false;
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.selectFromDhcp();
                }else{
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  });
                }
              })
          }
        });
      },

      submitFormAddIp(ruleFormAddIp){
        this.$refs[ruleFormAddIp].validate((valid) => {
          if (valid) {
            let staticIp = {};
            staticIp.mac_addr = this.ipFormAdd.mac_addr;
            staticIp.ip_addr = this.ipFormAdd.ip_addr;
            addStaticIpConfig(staticIp).then(res=>{
              if(res.data.result){
                this.$refs[ruleFormAddIp].resetFields();
                this.dialogFormVisibleAddIp = false;
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.selectFromStaticIpConfig();
              }else{
                this.$message({
                  type: 'error',
                  message: '添加失败!'
                });
              }
            })
          }
        });
      },
      submitFormEditIp(ipFormEdit){
        this.$refs[ipFormEdit].validate((valid) => {
          if (valid) {
            updateStaticIpconfig(this.ipFormEdit).then(res=>{
              if(res.data.result){
                this.$refs[ipFormEdit].resetFields();
                this.dialogFormVisibleEditIp = false;
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectFromStaticIpConfig();
              }else{
                this.$message({
                  type: 'error',
                  message: '编辑失败!'
                });
              }
            })
          }
        })
      },
      submitFormEdit(ruleFormEdit){
        this.$refs[ruleFormEdit].validate((valid) => {
          if (valid) {
            let dhcp = {};
            dhcp.id = this.dhcpFormEdit.id;
            dhcp.start_dhcp = this.dhcpFormEdit.start_dhcp==true?1:0;
            dhcp.interface = this.dhcpFormEdit.interface;
            dhcp.start_addr = this.dhcpFormEdit.start_addr;
            dhcp.end_addr = this.dhcpFormEdit.end_addr;
            dhcp.validity = this.dhcpFormEdit.validity;
            updateDhcp(dhcp).then(res=>{
              if(res.data.result){
                this.$refs[ruleFormEdit].resetFields();
                this.dialogFormVisibleEdit = false;
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectFromDhcp();
              }else{
                this.$message({
                  type: 'error',
                  message: '编辑失败!'
                });
              }
            })
          }
        });
      },

      handleDelete(index, row) {
        deleteFromDhcpById(row.id).then(res=>{
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.selectFromDhcp();
            }else{
              this.$message({
                type: 'success',
                message: '删除失败!'
              });
            }
          })
      },
      handleDeleteIp(index, row) {
        deleteFromStaticIpConfigById(row.id).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.selectFromStaticIpConfig();
          } else {
            this.$message({
              type: 'success',
              message: '删除失败!'
            });
          }
        })
      },
      handleEdit(index, row){
        this.dialogFormVisibleEdit = true;
        this.dhcpFormEdit.id = row.id;
        this.dhcpFormEdit.start_dhcp = row.start_dhcp=='启用'?true:false;
        this.dhcpFormEdit.interface = row.interface;
        this.dhcpFormEdit.start_addr = row.start_addr;
        this.dhcpFormEdit.end_addr = row.end_addr;
        this.dhcpFormEdit.validity = row.validity+'';
      },
      handleEditIp(index, row){
        this.dialogFormVisibleEditIp = true;
        this.ipFormEdit.id = row.id;
        this.ipFormEdit.mac_addr = row.mac_addr;
        this.ipFormEdit.ip_addr = row.ip_addr;
      },
      cancleAdd(dhcpFormAdd){
        this.$refs[dhcpFormAdd].resetFields();
        this.dialogFormVisibleAdd = false;
      },
      cancleAddIp(ipFormAdd){
        this.$refs[ipFormAdd].resetFields();
        this.dialogFormVisibleAddIp = false;
      },
      cancleEditIp(ipFormEdit){
        this.$refs[ipFormEdit].resetFields();
        this.dialogFormVisibleEditIp = false;
      },
      cancleEdit(ruleFormEdit){
        this.$refs[ruleFormEdit].resetFields();
        this.dialogFormVisibleEdit = false;
      },
    }
  }
</script>

<style scoped>

</style>
