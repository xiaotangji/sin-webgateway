<template>
<div>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="topic" name="first">
      <el-row class="toolPanelT">
      <div style="float: right">
        <span style="font-size: medium">操作：</span>
        <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
          <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addTopic"></el-button>
        </el-tooltip>
      </div>
    </el-row>
      <el-row>
        <h2>设备名称： {{this.deviceName}}</h2>
        <el-table
          :data="tableDataTopic.rows"
          stripe
          border
          style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethodTopic"
            width="50">
          </el-table-column>
          <el-table-column
            prop="topicFilter"
            label="主题"
            width="150">
          </el-table-column>
          <el-table-column
            prop="variableCategory"
            label="变量类别">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="nameJsonExp"
            label="设备名匹配">
          </el-table-column>
          <el-table-column
            prop="typeJsonExp"
            label="设备类型匹配"
            width="150">
          </el-table-column>
          <el-table-column
            prop="timeout"
            label="超时时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditTopic(scope.$index, scope.row)" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteTopic(scope.$index, scope.row)" circle></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="paginationPanelT">
        <el-pagination
          background
          @size-change="handleSizeChangeTopic"
          @current-change="handleCurrentChangeTopic" :current-page="this.tableDataTopic.currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="this.tableDataTopic.pageSize"
          layout="total,sizes, prev, pager,next,jumper"
          :total="this.tableDataTopic.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="监听topic" name="second">
      <el-row :gutter="20">
        <el-col :span="12"><div class="grid-content bg-purple"></div>
          监听连接Topic
          <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
            <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addConTopic"></el-button>
          </el-tooltip>
          <el-form :model="conTopicForm" style="margin-left: 27%" :rules="conTopicRules" ref="conTopicForm" size="mini" label-width="130px" class="demo-ruleForm">
            <el-form-item label="topic：" prop="topic">
              <el-input v-model="conTopicForm.topic" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="设备名匹配：" prop="deviceNamePp">
              <el-select v-model="conTopicForm.deviceNamePp" style="width: 58%;">
                <el-option label="json" value="json"></el-option>
                <el-option label="topic" value="topic"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表达式：" prop="exp">
              <el-input v-model="conTopicForm.exp" style="width: auto"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="ConDynamicForm" style="margin-left: 27%" ref="ConDynamicForm" size="mini" label-width="130px" class="demo-ruleForm">
            <div v-for="(item, index) in ConDynamicForm.dynamicItem" :key="index">
              <span style="margin-left: 15%">------------------------------------------------------</span>
              <el-form-item
                label="topic"
                :prop="'dynamicItem.' + index + '.topic'"
                :rules="[
             {required: true, message: 'topic不能为空', trigger: 'blur'},
             { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ]"
              >
                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                  <el-button type="warning" size="mini" icon="el-icon-delete" circle style="float: right" @click="deleteConTopicItem(item, index)"></el-button>
                </el-tooltip>

                <el-input v-model="item.topic" style="width: auto"></el-input>
              </el-form-item>
              <el-form-item
                label="设备名匹配"
                :prop="'dynamicItem.' + index + '.deviceNamePp'"
                :rules="[
             {required: true, message: '请选择设备名匹配', trigger: 'change'},
          ]"
              >
                <el-select v-model="item.deviceNamePp">
                  <el-option label="json" value="json"></el-option>
                  <el-option label="topic" value="topic"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="表达式"
                :prop="'dynamicItem.' + index + '.exp'"
                :rules="[
             {required: true, message: '表达式不能为空', trigger: 'blur'},
             { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ]"
              >
                <el-input v-model="item.exp" style="width: auto"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
        <el-col :span="12"><div class="grid-content bg-purple"></div>
          监听断开连接Topic
          <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
            <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addDisConTopic"></el-button>
          </el-tooltip>
          <el-form :model="disConTopicForm" style="margin-left: 27%" :rules="disConTopicRules" ref="disConTopicForm" size="mini" label-width="130px" class="demo-ruleForm">
            <el-form-item label="topic：" prop="topic">
              <el-input v-model="disConTopicForm.topic" style="width: auto"></el-input>
            </el-form-item>
            <el-form-item label="设备名匹配：" prop="deviceNamePp">
              <el-select v-model="disConTopicForm.deviceNamePp" style="width: 58%;">
                <el-option label="json" value="json"></el-option>
                <el-option label="topic" value="topic"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表达式：" prop="exp">
              <el-input v-model="disConTopicForm.exp" style="width: auto"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="disConDynamicForm" style="margin-left: 27%" ref="disConDynamicForm" size="mini" label-width="130px" class="demo-ruleForm">
            <div v-for="(item, index) in disConDynamicForm.dynamicItem" :key="index">
              <span style="margin-left: 15%">------------------------------------------------------</span>
              <el-form-item
                label="topic"
                :prop="'dynamicItem.' + index + '.topic'"
                :rules="[
             {required: true, message: 'topic不能为空', trigger: 'blur'},
             { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ]"
              >
                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                  <el-button type="warning" size="mini" icon="el-icon-delete" circle style="float: right" @click="deleteDisConTopicItem(item, index)"></el-button>
                </el-tooltip>

                <el-input v-model="item.topic" style="width: auto"></el-input>
              </el-form-item>
              <el-form-item
                label="设备名匹配"
                :prop="'dynamicItem.' + index + '.deviceNamePp'"
                :rules="[
            {required: true, message: '请选择设备名匹配', trigger: 'change'},

          ]"
              >
                <el-select v-model="item.deviceNamePp">
                  <el-option label="json" value="json"></el-option>
                  <el-option label="topic" value="topic"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="表达式"
                :prop="'dynamicItem.' + index + '.exp'"
                :rules="[
             {required: true, message: '表达式不能为空', trigger: 'blur'},
             { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ]"
              >
                <el-input v-model="item.exp" style="width: auto"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
        <el-col>
          <div style="margin-left: 45%">
            <el-button type="primary" @click="submitFormEdit('conTopicForm','disConTopicForm','ConDynamicForm','disConDynamicForm')">提交</el-button>
            <el-button @click="resetAdd('conTopicForm','disConTopicForm','ConDynamicForm','disConDynamicForm')">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>


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
      <h3>变量列表(Mqtt配置)</h3>
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
        prop="topic"
        label="主题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="tag_category"
        label="变量类别"
        width="150">
      </el-table-column>
      <el-table-column
        prop="tag_type"
        label="数据类型">
      </el-table-column>
      <el-table-column
        prop="key_express"
        label="变量名表达式">
      </el-table-column>
      <el-table-column
        prop="value_express"
        label="变量值表达式"
        width="150">
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
  <el-dialog title="添加主题"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleAddTopic">
    <el-form :model="topicFormAdd" style="margin-left: 27%" :rules="topicRulesAdd" ref="topicFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
      <el-form-item label="主题：" prop="topicFilter" style="width: 60%">
        <el-input v-model="topicFormAdd.topicFilter" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="type：" prop="type" style="width: 60%">
        <el-input v-model="topicFormAdd.type" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="设备名匹配：" prop="nameJsonExp" style="width: 60%">
        <el-input v-model="topicFormAdd.nameJsonExp" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="设备类型匹配：" prop="typeJsonExp" style="width: 60%">
        <el-input v-model="topicFormAdd.typeJsonExp" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="超时设置：" prop="timeout" style="width: 60%">
        <el-input v-model="topicFormAdd.timeout" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMqttFormAddTopic('topicFormAdd')">确定</el-button>
        <el-button @click="cancleFormAddTopic('topicFormAdd')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog title="编辑主题"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleEditTopic">
    <el-form :model="topicFormEdit" style="margin-left: 27%" :rules="topicRulesEdit" ref="topicFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
      <el-form-item label="主题：" prop="topicFilter" style="width: 60%">
        <el-input disabled v-model="topicFormEdit.topicFilter" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="type：" prop="type" style="width: 60%">
        <el-input v-model="topicFormEdit.type" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="设备名匹配：" prop="nameJsonExp" style="width: 60%">
        <el-input v-model="topicFormEdit.nameJsonExp" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="设备类型匹配：" prop="typeJsonExp" style="width: 60%">
        <el-input v-model="topicFormEdit.typeJsonExp" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="超时设置：" prop="timeout" style="width: 60%">
        <el-input v-model="topicFormEdit.timeout" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMqttFormEditTopic('topicFormEdit')">确定</el-button>
        <el-button @click="cancleFormEditTopic('topicFormEdit')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog title="添加mqtt变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleAdd">
    <el-form :model="mqttFormAdd" style="margin-left: 27%" :rules="mqttRulesAdd" ref="mqttFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
      <el-form-item label="设备名称：" prop="deviceName" style="width: 60%">
        <el-input v-model="mqttFormAdd.deviceName" disabled style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="主题：" prop="topic" style="width: 60%">
        <el-select v-model="mqttFormAdd.topic">
          <el-option
            v-for="item in topicArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
        <el-select v-model="mqttFormAdd.tag_category">
          <el-option label="attributes" value="attributes"></el-option>
          <el-option label="timeseries" value="timeseries"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：" prop="description" style="width: 60%">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="mqttFormAdd.description"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="变量类型：" prop="tag_type" style="width: 60%">
        <el-input v-model="mqttFormAdd.tag_type" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="变量名表达式：" prop="key_express" style="width: 60%">
        <el-input v-model="mqttFormAdd.key_express" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="变量值表达式：" prop="value_express" style="width: 60%">
        <el-input v-model="mqttFormAdd.value_express" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMqttFormAdd('mqttFormAdd')">确定</el-button>
        <el-button @click="cancleFormAdd('mqttFormAdd')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog title="编辑mqtt变量"  :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
    <el-form :model="mqttFormEdit" style="margin-left: 27%" :rules="mqttRulesEdit" ref="mqttFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
      <el-form-item label="设备名称：" prop="device_name" style="width: 60%">
        <el-input v-model="mqttFormEdit.device_name" disabled style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="主题：" prop="topic" style="width: 60%">
        <el-select v-model="mqttFormEdit.topic">
          <el-option
            v-for="item in topicArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="变量类别：" prop="tag_category" style="width: 60%">
        <el-select disabled v-model="mqttFormEdit.tag_category">
          <el-option label="attributes" value="attributes"></el-option>
          <el-option label="timeseries" value="timeseries"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：" prop="description" style="width: 60%">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="mqttFormEdit.description"
          maxlength="30"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="变量类型：" prop="tag_type" style="width: 60%">
        <el-input v-model="mqttFormEdit.tag_type" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="变量名表达式：" prop="key_express" style="width: 60%">
        <el-input v-model="mqttFormEdit.key_express" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="变量值表达式：" prop="value_express" style="width: 60%">
        <el-input v-model="mqttFormEdit.value_express" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitMqttFormEdit('mqttFormEdit')">确定</el-button>
        <el-button @click="cancleFormEdit('mqttFormEdit')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {
  addDeviceVariable,
  deleteDeviceVariableById,
  selectAllFromDeviceVariable,
  updateDeviceVariableById
} from "../../../api/deviceVariable";
import {addTopic, deleteFromTopicByTopicName, selectAllFromTopic, updateTopicByTopicName} from "../../../api/topic";
import $ from "jquery";
import {selectAllFromCon, updateConByName} from "../../../api/connector";
import {selectAllFromDevice, updateDeviceByDeviceName, updateRequestByDeviceName} from "../../../api/device";

export default {
  name: "mqttVariableList",
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
      mqttFormAdd: {
        deviceName: '',
        tag_category: '',
        description: '',
        tag_type: '',
        topic: '',
        value_express: '',
        key_express: ''
      },
      mqttFormEdit: {
        device_name: '',
        tag_category: '',
        description: '',
        tag_type: '',
        topic: '',
        value_express: '',
        key_express: ''
      },
      conTopicForm: {
        topic: '',
        deviceNamePp: '',
        exp: ''
      },
      disConTopicForm: {
        topic: '',
        deviceNamePp: '',
        exp: ''
      },
      ConDynamicForm: {
        dynamicItem: []
      },
      disConDynamicForm: {
        dynamicItem: []
      },
      topicFormAdd: {
        topicFilter: '',
        type: '',
        nameJsonExp: '',
        typeJsonExp: '',
        timeout: ''
      },
      topicFormEdit: {
        topicFilter: '',
        type: '',
        nameJsonExp: '',
        typeJsonExp: '',
        timeout: ''
      },

      tableDataTopic: {
        sort: "",
        order: "",
        page: 1,
        rows: [],
        currentPage: 1,
        pageSize: 10,
        total: null,
      },
      conTopicRules: {
        topic: [
          { required: true, message: '请输入topic', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        deviceNamePp: [
          {required: true, message: '设备名匹配不能为空', trigger: 'change'},
        ],
        exp: [
          { required: true, message: '请输入表达式', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      disConTopicRules: {
        topic: [
          { required: true, message: '请输入topic', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        deviceNamePp: [
          {required: true, message: '设备名匹配不能为空', trigger: 'change'},
        ],
        exp: [
          { required: true, message: '请输入表达式', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      topicRulesAdd: {
        topicFilter: [
          {required: true, message: '请输入主题', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入类型', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        nameJsonExp: [
          {required: true, message: '请输入设备名', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        typeJsonExp: [
          {required: true, message: '请输入设备类型', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        timeout: [
          {required: true, message: '请输入超时时间', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ]
      },
      topicRulesEdit: {
        topicFilter: [
          {required: true, message: '请输入主题', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入类型', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        nameJsonExp: [
          {required: true, message: '请输入设备名', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        typeJsonExp: [
          {required: true, message: '请输入设备类型', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        timeout: [
          {required: true, message: '请输入超时时间', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ]
      },
      mqttRulesAdd: {
        topic: [
          { required: true, message: '请选择主题', trigger: 'change' }
        ],
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        tag_type: [
          {required: true, message: '请输入变量类型', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        key_express: [
          {required: true, message: '请输入变量名表达式', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],
        value_express: [
          {required: true, message: '请输入变量值表达式', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ]
      },
      mqttRulesEdit: {
        topic: [
          { required: true, message: '请选择主题', trigger: 'change' }
        ],
        tag_category: [
          { required: true, message: '请选择变量类别', trigger: 'change' }
        ],
        tag_type: [
          {required: true, message: '请输入变量类型', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        key_express: [
          {required: true, message: '请输入变量名表达式', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],
        value_express: [
          {required: true, message: '请输入变量值表达式', trigger: 'blur'},
          {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述信息', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ]
      },
      deviceName: '',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAddTopic: false,
      dialogFormVisibleEditTopic: false,
      topicArr:[],
      topicMap: new Map(),
      id: '',
      editId:'',
      activeName: 'first'
    }
  },
  created () {
    this.getParams();
    this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
    this.selectAllToipic((this.tableDataTopic.currentPage-1)*this.tableDataTopic.pageSize,this.tableDataTopic.pageSize,this.tableDataTopic.sort,this.tableDataTopic.order);
    this.selectAllFromDevice(this.deviceName,0,1,'','');
  },
  watch: {
    '$route' (to, from) {
      // 路由发生变化页面刷新
      this.getParams();
      if(this.id != undefined){
        this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
      }
      this.selectAllToipic((this.tableDataTopic.currentPage-1)*this.tableDataTopic.pageSize,this.tableDataTopic.pageSize,this.tableDataTopic.sort,this.tableDataTopic.order);
    }
  },
  methods:{
    getParams(){
      // 取到路由带过来的参数
      this.deviceName = this.$route.query.name;
      this.id = this.$route.query.id;
    },

    selectAllFromDevice(conName,sqlStartIndex, sqlNumber, sortField, sortType){
      selectAllFromDevice(conName,sqlStartIndex, sqlNumber, sortField, sortType).then(res=>{
          if(res.data.result){
            let dataReq = res.data.data.data;
              let rowCon = eval(dataReq[0].con_request);
              let rowDisCon = eval(dataReq[0].discon_request);
              for(let i=0;i<rowCon.length;i++){
                let conReq = JSON.parse(rowCon[i]);
                if(i==0){
                  this.conTopicForm.topic = conReq.topicFilter;
                  if(conReq.deviceNameTopicExpression != undefined){
                    this.conTopicForm.deviceNamePp = "topic";
                    this.conTopicForm.exp = conReq.deviceNameTopicExpression;
                  }else{
                    this.conTopicForm.deviceNamePp = "json";
                    this.conTopicForm.exp = conReq.deviceNameJsonExpression;
                  }
                }
                if(i>0){
                  let dynamicReq = conReq;
                  this.ConDynamicForm.dynamicItem = [];
                  if (dynamicReq.deviceNameTopicExpression != undefined) {
                    this.ConDynamicForm.dynamicItem.push({
                      topic: dynamicReq.topicFilter,
                      deviceNamePp: "topic",
                      exp: dynamicReq.deviceNameTopicExpression
                    });
                  } else {
                    this.ConDynamicForm.dynamicItem.push({
                      topic: dynamicReq.topicFilter,
                      deviceNamePp: "json",
                      exp: dynamicReq.deviceNameJsonExpression
                    });
                  }
                }
              }
            for(let i=0;i<rowDisCon.length;i++){
              let disConReq = JSON.parse(rowDisCon[i]);
              if(i==0){
                this.disConTopicForm.topic = disConReq.topicFilter;
                if(disConReq.deviceNameTopicExpression != undefined){
                  this.disConTopicForm.deviceNamePp = "topic";
                  this.disConTopicForm.exp = disConReq.deviceNameTopicExpression;
                }else{
                  this.disConTopicForm.deviceNamePp = "json";
                  this.disConTopicForm.exp = disConReq.deviceNameJsonExpression;
                }
              }
              if(i>0){
                let dynamicReqDisCon = disConReq;
                this.disConDynamicForm.dynamicItem = [];
                  if(dynamicReqDisCon.deviceNameTopicExpression != undefined){
                    this.disConDynamicForm.dynamicItem.push({topic:dynamicReqDisCon.topicFilter,deviceNamePp:"topic",exp:dynamicReqDisCon.deviceNameTopicExpression});
                  }else{
                    this.disConDynamicForm.dynamicItem.push({topic:dynamicReqDisCon.topicFilter,deviceNamePp:"json",exp:dynamicReqDisCon.deviceNameJsonExpression});
                  }
              }
            }

            }
      })
    },
    selectAllToipic(sqlStartIndex, sqlNumber, sortField, sortType){
      this.tableDataTopic.rows = [];
      this.tableDataTopic.total = null;
      selectAllFromTopic(sqlStartIndex, sqlNumber, sortField, sortType).then(res=>{
       // this.updateHeightTopic();
        if(res.data.result){
          this.tableDataTopic.rows = res.data.data.data;
          this.tableDataTopic.total =  res.data.data.count;
          let topicList = res.data.data.topicList;
          for(let i=0;i<topicList.length;i++){
            this.topicArr.push({value:topicList[i]})
            this.topicMap.set(topicList[i],1);
          }
        }
      })
    },
    selectAllFromDeviceVariable(id,sqlStartIndex, sqlNumber, sortField, sortType){
      selectAllFromDeviceVariable(id,sqlStartIndex, sqlNumber, sortField, sortType).then(res=>{
        this.tableData.rows = [];
        this.tableData.total = [];
        //this.updateHeight();
        if(res.data.result){
          this.tableData.rows = res.data.data.data;
          this.tableData.total =  res.data.data.count;
        }
      })
    },

    handleEditTopic(index,row){
      this.topicFormEdit.topicFilter = row.topicFilter;
      this.topicFormEdit.type = row.type;
      this.topicFormEdit.nameJsonExp = row.nameJsonExp;
      this.topicFormEdit.typeJsonExp = row.typeJsonExp;
      this.topicFormEdit.timeout = row.timeout;
      this.dialogFormVisibleEditTopic = true;
    },
    handleEdit(index,row){
      this.mqttFormEdit.tag_category = row.tag_category+'';
      this.mqttFormEdit.description = row.description;
      this.mqttFormEdit.tag_type = row.tag_type;
      this.mqttFormEdit.topic = row.topic;
      this.mqttFormEdit.value_express = row.value_express;
      this.mqttFormEdit.key_express = row.key_express;
      this.mqttFormEdit.device_name = this.deviceName;
      this.editId = row.id;
      this.dialogFormVisibleEdit = true;
    },

    submitMqttFormEdit(mqttFormEdit){
      this.$refs[mqttFormEdit].validate((valid) => {
        if (valid)
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.mqttFormEdit.id = this.editId;
            updateDeviceVariableById(this.mqttFormEdit).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                this.dialogFormVisibleEdit = false;
                this.$refs[mqttFormEdit].resetFields();
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

    handleDeleteTopic(index,row){
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFromTopicByTopicName(row.topicFilter).then(res=>{
          if(res.data.result){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.selectAllToipic((this.tableDataTopic.currentPage-1)*this.tableDataTopic.pageSize,this.tableDataTopic.pageSize,this.tableDataTopic.sort,this.tableDataTopic.order);
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      })
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
      this.mqttFormAdd.deviceName = this.deviceName;
    },
    addTopic(){
      this.dialogFormVisibleAddTopic = true;
      this.mqttFormAdd.deviceName = this.deviceName;
    },

    submitMqttFormAddTopic(topicFormAdd){
      this.$refs[topicFormAdd].validate((valid) => {
        if (valid)
          this.$confirm('确定添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let topic = this.topicFormAdd.topicFilter;
            let topicMap = this.topicMap;
            if(topicMap.get(topic) != null){
              this.$message({
                type: 'warning',
                message: '主题已存在，请重新输入!'
              });
            }else{
              addTopic(this.topicFormAdd).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.selectAllToipic((this.tableDataTopic.currentPage-1)*this.tableDataTopic.pageSize,this.tableDataTopic.pageSize,this.tableDataTopic.sort,this.tableDataTopic.order);
                  this.dialogFormVisibleAddTopic = false;
                  this.$refs[topicFormAdd].resetFields();
                }else{
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  });
                }
              })
            }
          })
      })
    },

    submitMqttFormEditTopic(topicFormEdit){
      this.$refs[topicFormEdit].validate((valid) => {
        if (valid)
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              updateTopicByTopicName(this.topicFormEdit).then(res=>{
                if(res.data.result){
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  });
                  this.selectAllToipic((this.tableDataTopic.currentPage-1)*this.tableDataTopic.pageSize,this.tableDataTopic.pageSize,this.tableDataTopic.sort,this.tableDataTopic.order);
                  this.dialogFormVisibleEditTopic = false;
                  this.$refs[topicFormEdit].resetFields();
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

    submitMqttFormAdd(mqttFormAdd){
      this.$refs[mqttFormAdd].validate((valid) => {
        if (valid)
          this.$confirm('确定添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deviceVariable = {};
            deviceVariable.tag_category = this.mqttFormAdd.tag_category;
            deviceVariable.tag_type = this.mqttFormAdd.tag_type;
            deviceVariable.key_express = this.mqttFormAdd.key_express;
            deviceVariable.value_express = this.mqttFormAdd.value_express;
            deviceVariable.description = this.mqttFormAdd.description;
            deviceVariable.topic = this.mqttFormAdd.topic;
            deviceVariable.device_name = this.deviceName;
            addDeviceVariable(deviceVariable).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.selectAllFromDeviceVariable(this.id,(this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order);
                this.dialogFormVisibleAdd = false;
                this.$refs[mqttFormAdd].resetFields();
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


    submitFormEdit(conTopicForm,disConTopicForm,ConDynamicForm,disConDynamicForm){
      this.$refs[conTopicForm].validate((valid) => {
        if(valid){
          this.$refs[disConTopicForm].validate((valid) => {
            if(valid){
              this.$refs[ConDynamicForm].validate((valid) => {
                if(valid){
                  this.$refs[disConDynamicForm].validate((valid) => {
                    if(valid){
                                let con = {};
                                con.device_name = this.deviceName;
                                let disConDynamicArr = this.disConDynamicForm.dynamicItem;
                                let conDynamicArr = this.ConDynamicForm.dynamicItem;
                                let conJsons=[];
                                let disConJsons=[];
                                let lsJson={};
                                if(this.conTopicForm.deviceNamePp == 'topic'){
                                    lsJson = '{"topicFilter":"'+this.conTopicForm.topic+'",'+
                                      '"deviceNameTopicExpression":"'+this.conTopicForm.exp+'"}'
                                    conJsons.push(lsJson);
                                }else{
                                  lsJson = '{"topicFilter":"'+this.conTopicForm.topic+'",'+
                                    '"deviceNameJsonExpression":"'+this.conTopicForm.exp+'"}'
                                  conJsons.push(lsJson);
                                }
                                if(this.disConTopicForm.deviceNamePp == 'topic'){
                                  lsJson = '{"topicFilter":"'+this.disConTopicForm.topic+'",'+
                                    '"deviceNameTopicExpression":"'+this.disConTopicForm.exp+'"}'
                                  disConJsons.push(lsJson);
                                }else{
                                    lsJson = '{"topicFilter":"'+this.disConTopicForm.topic+'",'+
                                      '"deviceNameJsonExpression":"'+this.disConTopicForm.exp+'"}'
                                    disConJsons.push(lsJson);
                                }

                                for(let i=0; i<disConDynamicArr.length;i++){
                                  if(disConDynamicArr[i].deviceNamePp == 'topic'){
                                    if(disConDynamicArr.length==1){
                                      lsJson = '{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                        '"deviceNameTopicExpression":"'+disConDynamicArr[i].exp+'"}'
                                      disConJsons.push(lsJson);
                                    }else {
                                      lsJson = '{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                        '"deviceNameTopicExpression":"'+disConDynamicArr[i].exp+'"},'
                                      disConJsons.push(lsJson);
                                      if(i==disConDynamicArr.length-1){
                                        lsJson ='{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                          '"deviceNameTopicExpression":"'+disConDynamicArr[i].exp+'"}';
                                      }else{
                                        lsJson ='{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                          '"deviceNameTopicExpression":"'+disConDynamicArr[i].exp+'"},';
                                      }
                                      disConJsons.push(lsJson);
                                    }
                                  }else{
                                    if(disConDynamicArr.length==1){
                                      lsJson ='{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                        '"deviceNameJsonExpression":"'+disConDynamicArr[i].exp+'"}'
                                      disConJsons.push(lsJson);
                                    }else {
                                      lsJson ='{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                        '"deviceNameJsonExpression":"'+disConDynamicArr[i].exp+'"},'
                                      disConJsons.push(lsJson);
                                      if(i==disConDynamicArr.length-1){
                                        lsJson = '{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                          '"deviceNameJsonExpression":"'+disConDynamicArr[i].exp+'"}'
                                      }else{
                                        lsJson = '{"topicFilter":"'+disConDynamicArr[i].topic+'",'+
                                          '"deviceNameJsonExpression":"'+disConDynamicArr[i].exp+'"},'
                                      }
                                      disConJsons.push(lsJson);
                                    }
                                  }
                                }
                                for(let i=0; i<conDynamicArr.length;i++){
                                  if(conDynamicArr[i].deviceNamePp == 'topic'){
                                    if(conDynamicArr.length==1){
                                      lsJson = '{"topicFilter":"'+conDynamicArr[i].topic+'",'+
                                        '"deviceNameTopicExpression":"'+conDynamicArr[i].exp+'"}'
                                      conJsons.push(lsJson);
                                    }else {
                                      lsJson ='{"topicFilter":"'+conDynamicArr[i].topic+'",'
                                        '"deviceNameTopicExpression":"'+conDynamicArr[i].exp+'"},'
                                      conJsons.push(lsJson);
                                    }
                                  }else{
                                    if(conDynamicArr.length==1){
                                      lsJson = '{"topicFilter":"'+conDynamicArr[i].topic+'",'
                                        '"deviceNameJsonExpression":"'+conDynamicArr[i].exp+'"}'
                                      conJsons.push(lsJson);
                                    }else {
                                      lsJson = '{"topicFilter":"'+conDynamicArr[i].topic+'",'
                                        '"deviceNameJsonExpression":"'+conDynamicArr[i].exp+'"},'
                                      conJsons.push(lsJson);
                                    }
                                  }
                                }
                                con.con_request = conJsons;
                                con.discon_request = disConJsons;
                      updateRequestByDeviceName(con).then(res=> {
                                  if(res.data.result){
                                    this.$message({
                                      type: 'info',
                                      message: '编辑成功'
                                    });
                                    this.selectAllFromDevice();
                                  }else{
                                    this.$message({
                                      type: 'error',
                                      message: '编辑失败'
                                    })
                                  }
                                })
                    }
                  })
                }
              })
            }
          })
        }
      })
    },

    addConTopic () {
      this.ConDynamicForm.dynamicItem.push({
      })
    },

    addDisConTopic () {
      this.disConDynamicForm.dynamicItem.push({
      })
    },

    resetAdd(conTopicForm,disConTopicForm,ConDynamicForm,disConDynamicForm){
      this.$refs[conTopicForm].resetFields();
      this.$refs[disConTopicForm].resetFields();
      this.$refs[ConDynamicForm].resetFields();
      this.$refs[disConDynamicForm].resetFields();
      if(this.ConDynamicForm.dynamicItem.length>0){
        this.$refs[ConDynamicForm].resetFields();
      }
      if(this.disConDynamicForm.dynamicItem.length>0){
        this.$refs[disConDynamicForm].resetFields();
      }
    },

    deleteDisConTopicItem (item, index) {
      this.disConDynamicForm.dynamicItem.splice(index, 1)
    },

    deleteConTopicItem (item, index) {
      this.ConDynamicForm.dynamicItem.splice(index, 1)
    },

    cancleFormAddTopic(topicFormAdd){
      this.$refs[topicFormAdd].resetFields();
      this.dialogFormVisibleAddTopic = false;
    },

    cancleFormEditTopic(topicFormEdit){
      this.$refs[topicFormEdit].resetFields();
      this.dialogFormVisibleEditTopic = false;
    },
    cancleFormAdd(mqttFormAdd){
      this.$refs[mqttFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },
    cancleFormEdit(mqttFormEdit){
      this.$refs[mqttFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },

    indexMethod(index) {
      return (this.tableData.currentPage - 1) * this.tableData.pageSize + index + 1
    },
    indexMethodTopic(index) {
      return (this.tableData.currentPage - 1) * this.tableData.pageSize + index + 1
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
    handleSizeChangeTopic: function (size) {
      this.tableData.pageSize = size;
      //this.handleCurrentChange(this.currentPage);
      this.selectAllFromDevice();
    },
    handleCurrentChangeTopic: function (currentPage) {
      this.tableData.currentPage = currentPage;
      //this.currentChangePage(this.tableData,currentPage)
      this.selectAllFromDevice();
    },
    //分页方法（重点）
    currentChangePageTopic(list,currentPage) {
      let from = (currentPage - 1) * this.tableData.pageSize;
      let to = currentPage * this.tableData.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    },


    // 更新表格高度
    updateHeight() {
      this.tableData.height =
        (window.innerHeight -
        $(".paginationPanel").height() -
        $(".toolPanel").height()-$(".paginationPanelT").height()-$(".headName")-$(".toolPanelT").height())/2;
    },
    // 更新表格高度
    updateHeightTopic() {
      this.tableDataTopic.height =(window.innerHeight -
        $(".paginationPanel").height() -
        $(".toolPanel").height()-$(".paginationPanelT").height()-$(".headName")-$(".toolPanelT").height())/2;
    },

  }
}
</script>

<style scoped>

</style>
