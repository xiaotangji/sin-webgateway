<template>
  <div>
    <el-row>
      <crud-table :tableParams="addressTableParams" :formParams="addressFormParams" @operateDatas="addressOperation"/>
    </el-row>
    <el-row>
      <crud-table :tableParams="interfaceTableParams" :formParams="interfaceFormParams" @operateDatas="interfaceOperation"/>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>
  const addressTableCol = [
    {label: '动作',prop: 'action',width: '180px'},
    {label: '源网络',prop: 'sourceNetwork',width: '180px'},
    {label: '匹配',prop: 'match',width: '180px'},
    {label: '转换成的地址',prop: 'translateAddress',width: '180px'},
    {label: '描述信息',prop: 'descriptInfo',width: '180px'},
  ]
  const interfaceTableCol = [
    {label: '接口',prop: 'interfaces',width: '600px'},
    {label: '类型',prop: 'types',width: '300px'},
  ]
  const addressFormModel = {
    action: '',
    sourceNetwork: '内部',
    conversionType: '',
    match: '',
    translateAddress: '',
    isLog: false,
    descriptInfo: '',
  }
  const interfaceFormModel = {
    interfaces: '',
    types: '内部',
  }
  const addressFormLabel = [
    {label: '动作',prop: 'action',width: '180px',type: 'select'},
    {label: '源网络',prop: 'sourceNetwork',width: '180px',type: 'radio',labels: [{label: '内部',value: '内部'},{label: '外部',value: '外部'}]},
    {label: '转换类型',prop: 'conversionType',width: '180px',type: 'select'},
    {type:'title',header: '匹配'},
    {label: 'IP地址',prop: 'match',width: '180px',type: 'input'},
    {type:'title',header: '转换成的地址'},
    {label: 'IP地址',prop: 'translateAddress',width: '180px',type: 'input'},
    {label: '记录日志',prop: 'isLog',width: '180px',type: 'switch'},
    {label: '描述信息',prop: 'descriptInfo',width: '180px',type: 'input'},
  ]
  const interfaceFormLabel = [
    {label: '接口',prop: 'interfaces',width: '180px',type: 'select'},
    {label: '类型',prop: 'types',width: '180px',type: 'radio',labels: [{label: '内部',value: '内部'},{label: '外部',value: '外部'}]},
  ]
  const addressRules = {

  }
  const interfaceRules = {
    interfaces: [
      {required: true,message: '请选择接口',trigger: ['blur']}
    ],
    types: [
      {required: true,message: '请选择类型',trigger: ['blur']}
    ]
  }

  import CrudTable from "../components/context/CrudTable";
  export default {
    name: "NetWorkAddressTranslate",
    components: {CrudTable},
    data() {
      return {
        addressTableParams: {
          tableTitle: '网络地址转换(NAT)规则',
          tableData: [],
          tableCol: addressTableCol
        },
        addressFormParams: {
          formModel: addressFormModel,
          formLabel: addressFormLabel,
          rules: addressRules,
          title: '',
          nonModifyParams: ['isLog','sourceNetwork']
        },
        interfaceTableParams: {
          tableTitle: '网络接口',
          tableData: [],
          tableCol: interfaceTableCol
        },
        interfaceFormParams: {
          formModel: interfaceFormModel,
          formLabel: interfaceFormLabel,
          rules: interfaceRules,
          title: '',
          nonModifyParams: ['types']
        },
      }
    },
    mounted() {
      this.addressTableParams.tableData = [
        {action: 'SNAT',sourceNetwork: '内部',match: 'ACL:100',translateAddress: 'Cellular 1',descriptInfo: ''},
      ]
      this.interfaceTableParams.tableData = [
        {interfaces: 'Cellular 1',types: '外部'},
        {interfaces: 'Gigabitethernet 0/1',types: '内部'},
      ]
    },
    watch: {
      modelChange(newVal) {
        console.log(newVal)
      }
    },
    computed: {
      modelChange() {
        return this.addressFormParams.formModel.translateAddress
      }
    },
    methods: {
      addressOperation() {

      },
      interfaceOperation() {

      }
    }
  }
</script>

<style scoped>

</style>
