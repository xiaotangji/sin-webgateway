<template>
  <div>
    <el-row class="toolPanel">
      <h2>默认处理策略：</h2>
      <div>
        <el-radio-group v-model="radio1" style="margin-left: 150px;margin-top: -40px">
          <el-radio-button label="放行"></el-radio-button>
          <el-radio-button label="阻止"></el-radio-button>
        </el-radio-group>
      </div>
      <h2>访问控制策略</h2>
      <div style="float: right">
        <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
          <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addStrategy"></el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="tableData.rows"
        :height="tableData.height"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="strategy_id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="number"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="action"
          width="130"
          label="动作">
        </el-table-column>
        <el-table-column
          prop="protocol"
          width="120"
          label="协议">
        </el-table-column>
        <el-table-column
          prop="source_port"
          label="源"
          width="152">
        </el-table-column>
        <el-table-column
          prop="destination_port"
          label="目的"
          width="150">
        </el-table-column>
        <el-table-column
          prop="other_condition"
          label="其他匹配条件"
          width="150">
        </el-table-column>
        <el-table-column
          prop="explain"
          label="说明"
          width="150">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditStrategy(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteStrategy(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="toolPanel">
      <div style="float: right">
        <el-tooltip class="item" effect="dark" content="创建容器" placement="top-start">
          <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addList"></el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row>
      <el-col :span="16">
      <el-table
        :data="tableDataList.rows"
        :height="tableDataList.height"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="interface_name"
          label="接口名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stack_rule"
          label="入栈规则"
          width="150">
        </el-table-column>
        <el-table-column
          prop="out_stack_rule"
          width="150"
          label="出栈规则">
        </el-table-column>
        <el-table-column
          prop="manage_rule"
          width="180"
          label="管理规则">
        </el-table-column>
        <el-table-column label="操作" width="164">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditList(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteList(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>

    <el-dialog title="添加控制策略" :close-on-click-modal="false":visible.sync="dialogFormVisibleAddStrategy">
      <el-form :model="strategyFormAdd" style="margin-left: 27%" :rules="rulesAddStrategy" ref="strategyFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="类型：" prop="type">
          <el-radio-group v-model="radio"  @change="typeChange">
            <el-radio label="1">标准</el-radio>
            <el-radio label="2">扩展</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="ID:" prop="strategy_id">
          <el-input v-model="strategyFormAdd.strategy_id" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item label="序号:" prop="number">
          <el-input v-model="strategyFormAdd.number" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item label="动作：" prop="action">
          <el-radio-group v-model="actionRadio">
            <el-radio label="1">放行</el-radio>
            <el-radio label="2">阻止</el-radio>
          </el-radio-group>
        </el-form-item>
<h3>匹配条件</h3>
        <el-form-item label="协议：" prop="protocol" v-show="protocolShow">
          <el-select v-model="strategyFormAdd.protocol" placeholder="请选择活动区域" @change="selectProtocol">
            <el-option label="IP" value="IP"></el-option>
            <el-option label="TCP" value="TCP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="源IP地址:" prop="source_ip">
            <el-input v-model="strategyFormAdd.source_ip" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item label="源地址反掩码:" prop="source_unmask">
          <el-input v-model="strategyFormAdd.source_unmask" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item label="源端口：" prop="source_port" v-show="sourcePortShow">
          <el-select v-model="strategyFormAdd.source_port"  placeholder="请选择活动区域" @change="selectChange">
            <el-option label="Any" value="Any"></el-option>
            <el-option label="=" value="="></el-option>
            <el-option label="!=" value="!="></el-option>
            <el-option label=">" value=">"></el-option>
            <el-option label="<" value="<"></el-option>
            <el-option label="Range" value="Range"></el-option>
          </el-select>
          <el-input v-model="strategyFormAdd.selectPort" v-show="selectPortShow" style="width: 25%;"></el-input>
          <el-input v-model="strategyFormAdd.selectPortRangeOne" v-show="rangeOneShow" style="width: 20%;"></el-input>
          <el-input v-model="strategyFormAdd.selectPortRangeTwo" v-show="rangeTwoShow" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="目的IP地址:" prop="destination_port" v-show="portShow">
          <el-input v-model="strategyFormAdd.destination_port" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item label="目的地址反掩码:" prop="destination_unmask" v-show="unmaskShow">
          <el-input v-model="strategyFormAdd.destination_unmask" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item label="片段:" v-show="fragmentShow">
          <el-switch v-model="strategyFormAdd.fragment"></el-switch>
        </el-form-item>
        <el-form-item label="记录日志:">
          <el-switch v-model="strategyFormAdd.log"></el-switch>
        </el-form-item>
        <el-form-item label="说明:">
          <el-input v-model="strategyFormAdd.explain" style="width: 51%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAddMirror('strategyFormAdd')">确定</el-button>
          <el-button @click="cancleAddMirror('strategyFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="添加访问控制列表" :close-on-click-modal="false":visible.sync="dialogFormVisibleAddList">
      <el-form :model="listFormAdd" style="margin-left: 27%" :rules="rulesAddList" ref="listFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
       <el-form-item label="接口名称：" prop="interface_name">
         <el-select v-model="listFormAdd.interface_name" clearable placeholder="请选择接口名称">
           <el-option
             v-for="item in interfaceNameArr"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>

        <el-form-item label="入栈规则：" prop="stackRule">
          <el-select v-model="listFormAdd.stackRule" clearable  placeholder="请选择入栈规则">
            <el-option
              v-for="item in RuleArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出栈规则：" prop="unStackRule">
          <el-select v-model="listFormAdd.unStackRule" clearable  placeholder="请选择出栈规则">
            <el-option
              v-for="item in RuleArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理规则：" prop="manageRule">
          <el-select v-model="listFormAdd.manageRule" clearable  placeholder="请选择管理规则">
            <el-option
              v-for="item in RuleArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitFormAddList('containerFormAdd')">生成镜像</el-button>
          <el-button @click="cancleAddList('containerFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import $ from "jquery";
import {selectFromAccessControl, selectFromAccessControlList} from "../../../../api/accessControl";

export default {
  name: 'dockerManagement',
  data() {
    return {
      tableData: {
        height: 200,
        rows: [],
      }, // 表格数据源
      tableDataList: {
        height: 200,
        rows: []
      }, // 表格数据源
      strategyFormAdd: {
        type: '',
        strategy_id: '',
        number: '',
        action:'',
        protocol:'',
        source_port:'',
        source_ip:'',
        source_unmask: '',
        destination_port: '',
        destination_unmask:'',
        fragment: false,
        log:false,
        explain:'',
        selectPort:'',
        selectPortRangeOne:'',
        selectPortRangeTwo: ''
      },
      listFormAdd: {
        interface_name: '',
        stackRule:'',
        unStackRule:'',
        manageRule:''
      },
      rulesAddStrategy: {
        protocol: [
          { required: true, message: '请选择协议', trigger: 'change' }
        ],

      },
      rulesAddContainer: {
        command: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'blur' }
        ]
      },
      deviceNameOptions: [],
      conNameArr: [],
      conNameId: [],
      idProtocol: '',
      radio1:'阻止',
      // 是否加载数据
      loading:true,
      deviceNameSearch: '',
      dialogFormVisibleAddStrategy: false,
      dialogFormVisibleAddList: false,
      protocolShow: false,
      portShow: false,
      unmaskShow:false,
      fragmentShow: false,
      radio: '1',
      actionRadio: '1',
      selectPortShow:false,
      rangeOneShow: false,
      rangeTwoShow: false,
      sourcePortShow: false,
      RuleArr: [],
      interfaceNameArr: []
    }
  },
  created () {
    this.selectFromAccessControl();
    this.selectFromAccessControlList();
  },
  methods: {
    selectFromAccessControl(){
      selectFromAccessControl().then(res=>{
        if(res.data.result){
          let data = res.data.data;
           this.tableData.rows = data;
           for(let i= 0;i <data.length; i++){
             this.RuleArr.push({value:data[i].strategy_id,label:data[i].strategy_id});
           }
        }
      })
    },
    selectFromAccessControlList(){
      selectFromAccessControlList().then(res=>{
        if(res.data.result){
          this.tableDataList.rows = res.data.data;
        }
      })
    },

    typeChange(val){
        if(val == '1'){
          this.protocolShow = false;
          this.portShow = false;
          this.unmaskShow = false;
          this.fragmentShow = false;
        }else{
          this.protocolShow = true;
          this.portShow = true;
          this.unmaskShow = true;
          this.fragmentShow = true;
        }
    },

    selectProtocol(val){
      if(val =='TCP'){
        this.sourcePortShow = true;
      }else{
        this.sourcePortShow = false;
      }
    },

    selectChange(val){
      if(val =='=' || val == '>' || val == '<' || val == '!='){
          this.selectPortShow = true;
          this.rangeOneShow = false;
          this.rangeTwoShow = false;
      }else if(val == 'Range'){
        this.selectPortShow = false;
        this.rangeOneShow = true;
        this.rangeTwoShow = true;
      }else {
        this.selectPortShow = false;
        this.rangeOneShow = false;
        this.rangeTwoShow = false;
      }
    },

    addStrategy(){
      this.dialogFormVisibleAddStrategy = true;
    },

    addList(){
      this.dialogFormVisibleAddList = true;
    },

    //生成镜像
    submitFormAddMirror(mirrorFormAdd){

    },

    //创建容器
    submitFormAddList(mirrorFormAdd){

    },

    cancleAddMirror(mirrorFormAdd){
      this.$refs[mirrorFormAdd].resetFields();
      this.dialogFormVisibleAddMirror = false;
    },

    cancleAddList(containerFormAdd){
      this.$refs[containerFormAdd].resetFields();
      this.dialogFormVisibleAddContainer = false;
    },

    //删除镜像
    handleDeleteMirror(index, row) {

    },

    //开启容器
    handleEditList(index, row) {

    },

    //结束容器
    handleDeleteList(index, row) {

    },

    //重启容器
    handleRestartContainer(index, row) {

    },

    //删除容器
    handleDeleteContainer(index, row) {

    },


    // 更新表格高度
    updateHeight() {
      this.tableData.height =
        (window.innerHeight -
        $(".paginationPanel").height() -
        $(".toolPanel").height()-120)/14;
      this.tableDataList.height =
        (window.innerHeight -
        $(".paginationPanel").height() -
        $(".toolPanel").height()-120)/14;
    },
  }
}
</script>

<style>

</style>
