<template>
  <div>
    <el-row>
      <readonly-card-form :formParams="formParamsStatus" :labelWidth="labelWidth"/>
    </el-row>
    <el-row>
<!--      <multiple-card-form :formParams="formParamsConfiguration"></multiple-card-form>-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
        <el-form-item label="启用Wi-Fi:" prop="start_wifi">
          <el-switch v-model="ruleForm.start_wifi"></el-switch>
        </el-form-item>
        <el-form-item label="接口类型:" prop="interface_type">
          <el-radio-group v-model="ruleForm.interface_type">
            <el-radio label="客户端"></el-radio>
            <el-radio label="接入点"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认路由:" prop="default_route">
          <el-switch v-model="ruleForm.default_route"></el-switch>
        </el-form-item>
        <el-form-item label="客户端SSID:" prop="ssid">
          <el-input style="width: 220px" v-model="ruleForm.ssid"></el-input>
          <el-button type="primary" plain>扫描</el-button>
        </el-form-item>
        <el-form-item label="认证方式:" prop="authentication_mode">
          <el-select v-model="ruleForm.authentication_mode" placeholder="请选择认证方式">
            <el-option v-for="item in Authentication_modeArr" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加密方式:" prop="encryption_mode">
          <el-select v-model="ruleForm.encryption_mode" placeholder="请选择加密方式">
            <el-option label="TKIP" value="TKIP"></el-option>
            <el-option label="AES" value="AES"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="WPA/WPA2 PSK密钥:" prop="wpa_secret">
          <el-input style="width: 220px" show-password v-model="ruleForm.wpa_secret"></el-input>
        </el-form-item>
        <el-form-item label="网络类型:" prop="network_type">
          <el-radio-group v-model="ruleForm.network_type">
            <el-radio :label="1">静态IP</el-radio>
            <el-radio :label="2">动态地址(DHCP)</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormConfig('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button @click="getStatusData">请求</el-button>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card-name">SSID扫描</span>
        </div>
      </el-card>
    </el-row>
    <el-table ref="singleTable"
              :data="tableData.tableData"
              highlight-current-row
              style="width: 100%" border>
      <el-table-column v-for="(item,index) in tableData.tableColumns"
                       :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width" sortable>
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
    <el-dialog title="编辑设备"  :close-on-click-modal="false" :modal-append-to-body = "false" :close-on-press-escape="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="ssidFormEdit" style="margin-left: 27%" :rules="rulesEdit" ref="ssidFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="信道：" prop="channel">
          <el-input  v-model="ssidFormEdit.channel" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="SSID：" prop="ssid" style="width: 60%">
          <el-input v-model="ssidFormEdit.ssid" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="BSSID：" prop="bssid" style="width: 60%">
          <el-input v-model="ssidFormEdit.bssid" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="是否安全：" prop="safe" style="width: 60%">
          <el-select v-model="ssidFormEdit.safe">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信号：" prop="signal" style="width: 60%">
          <el-input v-model="ssidFormEdit.signal" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state" style="width: 60%">
          <el-select v-model="ssidFormEdit.state">
            <el-option label="在线" value="1"></el-option>
            <el-option label="离线" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit('ssidFormEdit')">确定</el-button>
          <el-button @click="cancleEdit('ssidFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import ReadonlyCardForm from "./components/context/ReadonlyCardForm";
  import MultipleCardForm from "./components/context/MultipleCardForm";
  import SSIDScanTable from "./components/wlan/SSIDScanTable";
  import {getStatusParams} from "@/api/gateway/networkConfiguration/WLANRequest";
  import {
    deleteFromSsidById,
    selectFromSsid,
    selectFromWlanConfig,
    updateSsid,
    updateWlanSetting
  } from "../../../api/wlan";
  import {deleteDeviceByDeviceName, updateDeviceByDeviceName} from "../../../api/device";

  const formModelStatus = {
    interfaceType: '',
    WALNStatus: '',
    MACAddress: '',
    SSID: '',
    verificationMethod: '',
    encryption: '',
    host: '',
    subnetMask: '',
    gateway: '',
    DNS: '',
    wirelessConnectStatus: '',
    connectionTime: ''
  }
  const formLabelStatus = [
    {prop:"interfaceType", label:"接口类型:", width:"180",type: 'input'},
    {prop:"WALNStatus", label:"WALN状态:", width:"180",type: 'input'},
    {prop:"MACAddress", label:"MAC地址:", width:"180",type: 'input'},
    {prop:"SSID", label:"SSID:", width:"180",type: 'input'},
    {prop:"verificationMethod", label:"认证方式:", width:"180",type: 'input'},
    {prop:"encryption", label:"加密方式:", width:"180",type: 'input'},
    {prop:"host", label:"IP地址:", width:"180",type: 'input'},
    {prop:"subnetMask", label:"子网掩码:", width:"180",type: 'input'},
    {prop:"gateway", label:"网关:", width:"180",type: 'input'},
    {prop:"DNS", label:"DNS:", width:"180",type: 'input'},
    {prop:"wirelessConnectStatus", label:"无线连接状态:", width:"180",type: 'input'},
    {prop:"connectionTime", label:"连接时间:", width:"180",type: 'input'}
  ]

  const formModelConfiguration = {
    enableWifi: true,
    interfaceType: 'client',
    defaultRoute: true,
    ClientSSID: '',
    verificationMethod: '',
    encryption: '',
    PSKSecretKey: '',
    networkType: 'dynamicIP'
  }

  let formLabelConfiguration = [
    {prop:"enableWifi", label:"启用Wi-Fi:", width:"180",type: 'switch'},
    {prop:"interfaceType", label:"接口类型:", width:"180",type: 'radioGroup',labels: [
        {label: 'client',value: '客户端'},{label: 'accessPoint',value: '接入点'}]},
    {prop:"defaultRoute", label:"默认路由:", width:"180",type: 'switch'},
    {prop:"ClientSSID", label:"客户端SSID:", width:"180",type: 'input'},
    {prop:"verificationMethod", label:"认证方式:", width:"180",type: 'select',options: []},
    {prop:"encryption", label:"加密方式:", width:"180",type: 'select',options: []},
    {prop:"PSKSecretKey", label:"WPA/WPA2 PSK密钥:", width:"180",type: 'password'},
    {prop:"networkType", label:"网络类型:", width:"180",type: 'radioGroup',labels: [
        {label: 'staticIP',value: '静态IP'},{label: 'dynamicIP',value: '动态地址(DHCP)'}]},
  ]

  const rules = {
    ClientSSID: [
      { required: true, message: '请输入客户端SSID', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    PSKSecretKey: [
      { required: true, message: '请输入WPA/WPA2 PSK密钥', trigger: 'blur' },
      { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
    ],
  }

  const tableColumns = [
    {prop:"channel", label:"信道", width:"180"},
    {prop:"ssid", label:"ssid", width:"180"},
    {prop:"bssid", label:"bssid",width:"180"},
    {prop:"safe", label:"安全",width:"180"},
    {prop:"signal", label:"信号(dBm)", width:"180"},
    {prop:"state", label:"状态",width:"180"},
  ]

  export default {
    name: "WLAN",
    components: {ReadonlyCardForm,MultipleCardForm,SSIDScanTable},
    data() {
      return {
        formParamsStatus: {
          cardName: '状态',
          formModel: formModelStatus,
          formLabel: formLabelStatus,
        },
        Authentication_modeArr: [{value: '开放式', label: '开放式'},{value: '共享式', label: '共享式'},{value: 'WPA-PSK', label: 'WPA-PSK'},{value: 'WPA', label: 'WPA'},{value: 'WPA2-PSK', label: 'WPA2-PSK'},{value: 'WPA2', label: 'WPA2'}],
        labelWidth: '120px',
        dialogFormVisibleEdit: false,
        /*formParamsConfiguration: {
          isCol: false,
          cardName: '配置',
          formModel: formModelConfiguration,
          formLabel: formLabelConfiguration,
          rules
        },*/
        tableData: {
          tableData: [],
          //tableColumns,
          tableColumns,
        },
        ssidFormEdit:{
          id:'',
          channel:'',
          ssid:'',
          bssid:'',
          safe:'',
          signal:'',
          state:''
        },
        ruleForm: {
          id:'',
          start_wifi:false,
          interface_type:'',
          default_route: false,
          ssid:'',
          authentication_mode: '',
          wpa_secret: '',
          encryption_mode: '',
          network_type: ''
        },
        rulesEdit: {
          channel: [
            { required: true, message: '请输入信道', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
          ssid: [
            { required: true, message: '请输入SSID', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
          bssid: [
            { required: true, message: '请输入BSSID', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
          safe: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          signal: [
            { required: true, message: '请输入信号', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
        },
        rules: {
          ssid: [
            { required: true, message: '请输入ssid', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          wpa_secret: [
            { required: true, message: '请输入密钥', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {

    },
    created() {
      this.selectFromSsid();
      this.selectFromWlanConfig();
    },

    methods: {
      submitFormConfig(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let wlan = {};
            wlan.id = this.ruleForm.id;
            wlan.start_wifi = this.ruleForm.start_wifi==true?1:0;
            wlan.interface_type = this.ruleForm.interface_type;
            wlan.default_route = this.ruleForm.default_route == true?1:0;
            wlan.ssid = this.ruleForm.ssid;
            wlan.authentication_mode = this.ruleForm.authentication_mode;
            wlan.encryption_mode = this.ruleForm.encryption_mode;
            wlan.wpa_secret = this.ruleForm.wpa_secret;
            wlan.network_type = this.ruleForm.network_type==1?'静态ip':'动态地址(DHCP)';
            updateWlanSetting(wlan).then(res=> {
                if(res.data.result){}
                this.$message({
                type: 'success',
                message: '编辑成功!'
              });
            })
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败!'
            });
          }
        });
      },

    selectFromWlanConfig() {
      selectFromWlanConfig().then(res=> {
          if(res.data.result){
            let data = res.data.data;
              if(data.length >0){
                  this.ruleForm.id = data[0].id;
                  this.ruleForm.start_wifi = data[0].start_wifi == 1?true:false;
                  this.ruleForm.interface_type = data[0].interface_type;
                  this.ruleForm.default_route = data[0].default_route == 1?true:false;
                  this.ruleForm.ssid = data[0].ssid;
                  this.ruleForm.authentication_mode = data[0].authentication_mode;
                  this.ruleForm.encryption_mode = data[0].encryption_mode;
                  this.ruleForm.wpa_secret = data[0].wpa_secret;
                  this.ruleForm.network_type = data[0].network_type=='静态ip'?1:2;
              }
      }
    })
    },
      selectFromSsid(){
        selectFromSsid().then(res=>{
            let ssidArr = []
            let arrTemp = res.data.data;
            for(let i = 0; i< arrTemp.length ;i++){
              let ssidDic = {}
              ssidDic.id = arrTemp[i].id;
              ssidDic.channel = arrTemp[i].channel;
              ssidDic.ssid = arrTemp[i].ssid;
              ssidDic.bssid = arrTemp[i].bssid;
              ssidDic.safe = arrTemp[i].safe== 1?'是':'否'
              ssidDic.signal = arrTemp[i].signal;
              ssidDic.state = arrTemp[i].state== 1?'在线':'离线'
              ssidArr.push(ssidDic);
            }
            this.tableData.tableData = ssidArr;
        })
      },

      handleEdit(index, row){
        this.dialogFormVisibleEdit = true;
        this.ssidFormEdit.channel = row.channel;
        this.ssidFormEdit.id = row.id;
        this.ssidFormEdit.ssid = row.ssid;
        this.ssidFormEdit.bssid = row.bssid;
        this.ssidFormEdit.safe = row.safe;
        this.ssidFormEdit.signal =  row.signal;
        this.ssidFormEdit.state = row.state;

      },
      submitFormEdit(ssidFormEdit){
        this.$refs[ssidFormEdit].validate((valid) => {
          if (valid) {
              let ssid = this.ssidFormEdit;
              let ssidDic = {};
              ssidDic.id = ssid.id;
              ssidDic.channel = ssid.channel;
              ssidDic.ssid = ssid.ssid;
              ssidDic.bssid = ssid.bssid ;
              ssidDic.safe = ssid.safe=='是'?1:0;
              ssidDic.signal = ssid.signal;
              ssidDic.state = ssid.state;
              updateSsid(ssidDic).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  });
                  this.$refs[ssidFormEdit].resetFields();
                  this.dialogFormVisibleEdit = false;
                  this.selectFromSsid();
                }else{
                  this.$message({
                    type: 'error',
                    message: '编辑失败!'
                  });
                }
              })
          } else {
            return false;
          }
        });
      },

      handleDelete(index, row) {
        deleteFromSsidById(row.id).then(res=>{
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //location.reload()
              this.selectFromSsid();
            }else{
              this.$message({
                type: 'success',
                message: '删除失败!'
              });
            }
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.start_wifi = false;
      },
      cancleEdit(ssidFormEdit){
        this.$refs[ssidFormEdit].resetFields();
        this.dialogFormVisibleEdit = false;
      },
      getStatusData() {
        getStatusParams('').then(res => {

        })
      }
    }
  }
</script>

<style scoped>
  .card-name {
    font-size: 15px;
    font-weight: bold;
  }
</style>
