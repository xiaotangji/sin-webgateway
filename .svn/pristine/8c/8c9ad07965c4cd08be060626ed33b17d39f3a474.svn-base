<!--
<template>
  <div>
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
    <WLAN ref="child" ></WLAN>
&lt;!&ndash;    <div><el-dialog title="编辑设备"  :close-on-click-modal="false" :modal-append-to-body = "false" :close-on-press-escape="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="ssidFormEdit" style="margin-left: 27%" :rules="rulesEdit" ref="ssidFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="信道：" prop="channel">
          <el-input disabled v-model="ssidFormEdit.channel" style="width: auto"></el-input>
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
    </el-dialog></div>&ndash;&gt;
  </div>
</template>

<script>
  import WLAN from "../../WLAN";

  export default {
    name: "SSIDScanTable",

    data:{
      dialogFormVisibleEdit: false,
      tableData: {
        tableData: [],
        //tableColumns,
        tableColumns,
      },
      ssidFormEdit:{
        channel:'',
        ssid:'',
        bssid:'',
        safe:'',
        signal:'',
        state:''
      },
      components: {
        WLAN
      },
      rulesEdit: {
        channel: [
          { required: true, message: '请输入信道', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        ss: [
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
      }
    },
    props: {
      tableData: {
        type: Object,
      }
    },
    watch: {
      scanData: {
        deep: true,
        handler(val) {
          this.tableData.tableData = val
        }
      }
    },
    computed: {
      scanData() {
        return this.tableData.tableData
      }
    },
    methods: {
      handleEdit: function (index, row) {
          this.$refs.child.parentMsg(index,row)
      },
      handleEdit11(index, row){
        this.dialogFormVisibleEdit = true;
        this.ssidFormEdit.channel = row.channel;
        this.ssidFormEdit.ssid = row.ssid;
        this.ssidFormEdit.bssid = row.bssid;
        this.ssidFormEdit.safe = row.safe;
        this.ssidFormEdit.signal =  row.signal;
        this.ssidFormEdit.state = row.state;

      },
    }
  }
</script>

<style scoped>

</style>
-->
