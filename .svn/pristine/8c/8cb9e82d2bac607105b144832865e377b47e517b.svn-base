<template>
  <div>
    <u-table :table-data="tableData" :formRule="formRule">

    </u-table>
  </div>
</template>

<script>
  const tableData = [
    {
    mc: 'warning',
    lx: '告警',
    lxjg: '10',
    scjg: '10'
    }, {
    mc: 'default',
    lx: '采集',
    lxjg: '10',
    scjg: '10'
    }
  ]
  /*const tableColumns = [
    {prop:"mc", label:"名称", width:"180",type: 'input',placeholder: 'testtest'},
    {prop:"lx", label:"类型", width:"180",type: 'input',disabled: true},
    {prop:"lxjg", label:"轮询间隔(秒)",width:"180",type: 'select',placeholder: '请选择'},
    { prop:"scjg", label:"上传间隔(秒)",width:"180"}
  ]*/
  const addRules = {
    mc: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
      lx: [
      { required: true, message: '请输入类型', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
      lxjg: [
      { required: true, message: '请输入轮询间隔时间', trigger: 'blur' },
      { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
    ],
      scjg: [
      { required: true, message: '请输入上传间隔时间', trigger: 'blur' },
      { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
    ],
  }
  const editRules = {
      mc: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
      ],
        lx: [
      { required: true, message: '请输入类型', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
      lxjg: [
      { required: true, message: '请输入轮询间隔时间', trigger: 'blur' },
      { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
    ],
      scjg: [
      { required: true, message: '请输入上传间隔时间', trigger: 'blur' },
      { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
    ],
  }
  const groupFormAdd = {
      mc: '',
      lx: '',
      lxjg: '',
      scjg: ''
  }
  const groupFormEdit = {
      mc: '',
      lx: '',
      lxjg: '',
      scjg: ''
    }

  import UTable from "../../components/table/UTable";
  export default {
    name: "testTable",
    components: { UTable },
    data() {
      return {
        tableData: {
          tableName: 'test',
          tableData,
          //tableColumns,
          tableColumns : [
            {prop:"mc", label:"名称", width:"180",type: 'input',placeholder: 'testtest'},
            {prop:"lx", label:"类型", width:"180",type: 'input',disabled: true},
            {prop:"lxjg", label:"轮询间隔(秒)",width:"180",type: 'select',placeholder: '请选择',options: []},
            { prop:"scjg", label:"上传间隔(秒)",width:"180",type: 'radioGroup',options: []}
            ]
        },
        formRule: {
          addRules,
          groupFormAdd,
          editRules,
          groupFormEdit
        },
      }

    },
    created() {
      this.tableData.tableColumns[2].options = [
        {label:'flsh',value: 'food'},{label: 'coke',value: 'drink'}
      ]
      this.tableData.tableColumns[3].options = [
        {label:'flsh',value: 'food'},{label: 'coke',value: 'drink'}
      ]
    }
  }
</script>

<style scoped>

</style>
