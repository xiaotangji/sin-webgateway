<template>
  <div>
    <el-row style="width: 100%">
      <h2 style="color: black">状态</h2>
      <el-col :span="8">
        <el-form :label-position="labelPosition" label-width="100px" :model="formStatusOne">
          <el-form-item label="网络类型：">
            {{formStatusOne.networkType}}
          </el-form-item>
          <el-form-item label="网关：">
            {{formStatusOne.gateway}}
          </el-form-item>
          <el-form-item label="状态：">
            {{formStatusOne.status}}
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :label-position="labelPosition" label-width="100px" :model="formStatusTwo">
          <el-form-item label="IP地址：">
            {{formStatusTwo.ip}}
          </el-form-item>
          <el-form-item label="DNS：">
            {{formStatusTwo.dns}}
          </el-form-item>
          <el-form-item label="连接时间：">
            {{formStatusTwo.conTime}}
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form :label-position="labelPosition" label-width="100px" :model="formStatusThree">
          <el-form-item label="子网掩码：">
            {{formStatusThree.subnetMask}}
          </el-form-item>
          <el-form-item label="MTU：">
            {{formStatusThree.mtu}}
          </el-form-item>
          <el-form-item label="说明：">
            {{formStatusThree.desp}}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <h2 style="color: black">配置</h2>
      <el-col :span="22">
        <el-form ref="form" :label-position="labelPosition" :model="form"  :rules="rules" label-width="155px">
          <el-form-item label="网络类型：" style="width: 335px" prop="network_type">
            <el-select v-model="form.network_type" placeholder="请选择网络类型">
              <el-option label="静态IP" value="静态IP"></el-option>
              <el-option label="动态地址(DHCP)" value="动态地址(DHCP)"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple"></div>
              <el-form-item label="主IP：" prop="master_ip">
                <el-input v-model="form.master_ip" style="width: 180px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
              <el-form-item label="子网掩码：" prop="master_ip">
                <el-input v-model="form.subnet_mask" style="width: 180px;margin-left: 25px"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple"></div>
              <el-form-item label="MTU：" prop="mtu">
                <el-input v-model="form.mtu" style="width: 180px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">
              <el-form-item label="端口速率/端口模式：" prop="port_mode">
                <el-select v-model="form.port_mode" style="width: 180px;margin-left: 25px" placeholder="请选择模式">
                  <el-option   v-for="item in port_speed_modelArr" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-form-item label="二层状态联动：">
            <el-switch v-model="form.linkage"></el-switch>
          </el-form-item>
          <el-form-item label="关闭：">
            <el-switch v-model="form.open_close"></el-switch>
          </el-form-item>
          <el-form-item label="说明：">
            <el-input v-model="form.explain" style="width: 180px"></el-input>
          </el-form-item>
          <h2 style="color: black">从IP支持</h2>
          <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
            <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addSlave"></el-button>
          </el-tooltip>
          <el-table
            :data="tableData"
            border
            style="width: 50%">
            <el-table-column
              prop="slave_ip"
              label="从IP"
              width="200">
            </el-table-column>
            <el-table-column
              prop="subnet_mask"
              label="子网掩码"
              width="200">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-button type="primary" @click="submitFormEdit('form')">提交</el-button>
        <el-button @click="resetEdit('form')">重置</el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加从ip" :close-on-click-modal="false":visible.sync="dialogFormVisibleAdd">
      <el-form :model="slaveIp" style="margin-left: 27%" :rules="rulesSlave" ref="slaveIp" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="从IP：" prop="slave_ip">
          <el-input v-model="slaveIp.slave_ip" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="子网掩码：" prop="subnetMask" style="width: 60%">
          <el-input v-model="slaveIp.subnetMask" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd('slaveIp')">确定</el-button>
          <el-button @click="cancleAdd('slaveIp')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import {
  addEthernet,
  addSlaveIp,
  deleteSlaveById,
  selectFromEthernetByName,
  selectFromSlaveIpConfig
} from "../../../api/ethernet";
import {getSystemInfo} from "../../../api/system";

export default {
  name: 'equipmentList',
  data() {
    return {
      tableData: [],
      dialogFormVisibleAdd: false,
      labelPosition: 'left',
      port_speed_modelArr: [{value: '自动协商', label: '自动协商'}, {value: '1000M全双工', label: '1000M全双工'}, {
        value: '1000M半双工',
        label: '1000M半双工'
      }, {value: '100M全双工', label: '100M全双工'}, {value: '100M半双工', label: '100M半双工'}, {
        value: '10M全双工',
        label: '10M全双工'
      }, {value: '10M半双工', label: '10M半双工'}],
      formStatusOne: {
        networkType: '',
        gateway: '',
        status: ''
      },
      formStatusTwo: {
        ip: '',
        dns: '',
        conTime: ''
      },
      formStatusThree: {
        subnetMask: '',
        mtu: '',
        desp: ''
      },
      form: {
        network_type: '',
        master_ip: '',
        mtu: '',
        linkage: false,
        open_close: false,
        explain: '',
        subnet_mask: '',
        port_mode: ''
      },
      slaveIp: {
        slave_ip: '',
        subnetMask: ''
      },
      rules: {
        network_type: [
          {required: true, message: '请选择网络类型', trigger: 'change'}
        ],
        master_ip: [
          {required: true, message: '请输入ip', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        mtu: [
          {required: true, message: '请输入mtu', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到  10个字符', trigger: 'blur'}
        ],
        subnet_mask: [
          {required: true, message: '请输入子网掩码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到  20个字符', trigger: 'blur'}
        ],
        port_mode: [
          {required: true, message: '请选择端口模式', trigger: 'change'}
        ]
      },
      rulesSlave: {
        slave_ip: [
          {required: true, message: '请输入从ip', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        subnetMask: [
          {required: true, message: '请输入子网掩码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.selectFromEthernetByName("ethernetOne")
    this.getSystemInfo(null);
    this.selectFromSlaveIpConfig();
  },
  methods: {
    selectFromEthernetByName(name){
      selectFromEthernetByName(name).then(res=>{
        if(res.data.result){
          if(res.data.data.length >0){
                let ethernet =  res.data.data[0];
                this.form = ethernet;
                this.form.open_close = ethernet.open_close == 1?true:false;
                this.form.linkage = ethernet.linkage == 1?true:false;
                this.formStatusThree.desp = ethernet.desp;

          }/*else{
            let ethernet = {}
            ethernet.name = "ethernetOne";
            ethernet.network_type = this.form.network_type;
            ethernet.master_ip = this.form.master_ip;
            ethernet.mtu = this.form.mtu;
            ethernet.linkage = this.form.linkage == true?1:0;
            ethernet.open_close = this.form.open_close == true?1:0;
            ethernet.explain = this.form.explain;
            ethernet.subnet_mask = this.form.subnet_mask;
            ethernet.port_mode = this.form.port_mode
            addEthernet(ethernet).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                }else{
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  });
                }
            })
          }*/
        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },
    getSystemInfo(){
      getSystemInfo(null).then(res=>{
        if(res.data.result){
            this.formStatusOne.networkType = this.form.network_type;
            this.formStatusOne.status = res.data.data.isup ==true?'Up':'Down';
            this.formStatusTwo.ip = res.data.data.ip;
            this.formStatusThree.subnetMask = res.data.data.netmask;
            this.formStatusThree.mtu = res.data.data.mtu;

        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },
    selectFromSlaveIpConfig(){
      selectFromSlaveIpConfig().then(res=>{
        if(res.data.result){
          this.tableData = res.data.data;
        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },
    addSlave(){
      this.dialogFormVisibleAdd = true;
      this.slaveIp.slave_ip = ''
      this.slaveIp.subnetMask = ''
    },
    submitFormAdd(slaveIp){
      this.$refs[slaveIp].validate((valid) => {
        if (valid) {
          let slave = {}
          slave.slave_ip = this.slaveIp.slave_ip;
          slave.name = 'ethernetOne';
          slave.subnet_mask = this.slaveIp.subnetMask;
          addSlaveIp(slave).then(res => {
            if (res.data.result) {
              this.$message({
                type: 'success',
                message: '查询成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '添加失败!'
              });
            }
          })
          this.selectFromSlaveIpConfig();
          this.dialogFormVisibleAdd = false;
        }
      })
    },
    cancleAdd(slaveIp){
      this.$refs[slaveIp].resetFields();
      this.dialogFormVisibleAdd = false;
    },
    handleDelete(index, row){
      deleteSlaveById(row.id).then(res=>{
        if(res.data.result){
          this.selectFromSlaveIpConfig();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
      })
    },
    resetEdit(form){
      this.$refs[form].resetFields();
    }
  }
}
</script>

<style>

</style>
