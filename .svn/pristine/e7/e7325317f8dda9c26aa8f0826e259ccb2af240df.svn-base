<template>
  <div>
    <el-card>
      <div class="header-select">
        <span class="select-label">{{selectLabel}}</span>
        <el-select v-model="routingType">
          <el-option v-for="item in statusOptions"
                     :key="item"
                     :value="item"
                     :label="item">

          </el-option>
        </el-select>
      </div>
      <div>
        <el-table :data="tableData"
                  highlight-current-row
                  border :header-cell-style="{backgroundColor: '#efefef'}">
          <el-table-column v-for="item in tableColumns"
                           :key="item.label"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width"
                           sortable>

          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  const tableColumns = [
    {label: '类型',prop: 'type',width: '180px'},
    {label: '目的网络',prop: 'destinationNetwork',width: '180px'},
    {label: '子网掩码',prop: 'subnetMask',width: '180px'},
    {label: '网关',prop: 'gateway',width: '180px'},
    {label: '接口',prop: 'interfaces',width: '180px'},
    {label: '距离/度量',prop: 'distanceAndMetric',width: '180px'},
    {label: '时间',prop: 'time',width: '180px'},
  ]


  export default {
    name: "RoutingStatus",
    data() {
      return {
        selectLabel: '类型:',
        routingType: '所有',
        statusOptions: [],
        tableData: [],
        tableColumns,
        cacheTableData: [],

      }
    },
    mounted() {
      //假数据
      this.statusOptions = ['所有','直连路由','静态路由','RIP','OSPF','BGP']
      this.cacheTableData = [
        {type:'直连路由',destinationNetwork: '127.0.0.0',subnetMask: '255.0.0.0',gateway: '',interfaces: 'Loopback 1',distanceAndMetric: '0/0',time: ''},
        {type:'直连路由',destinationNetwork: '192.168.2.0',subnetMask: '255.255.255.0',gateway: '',interfaces: 'Gigabitethernet 0/2',
          distanceAndMetric: '0/0',time: ''},
        {type:'直连路由',destinationNetwork: '192.168.4.0',subnetMask: '255.255.255.0',gateway: '',interfaces: 'Bridge 1',
          distanceAndMetric: '0/0',time: ''},
        {type:'静态路由',destinationNetwork: '192.168.4.0',subnetMask: '255.255.255.0',gateway: '',interfaces: 'Bridge 1',
          distanceAndMetric: '0/0',time: ''},
        {type:'RIP',destinationNetwork: '192.168.4.0',subnetMask: '255.255.255.0',gateway: '',interfaces: 'Bridge 1',
          distanceAndMetric: '0/0',time: ''},
      ]
      if(this.routingType === '所有') {
        this.tableData = this.cacheTableData
      }
    },
    watch: {
      routingType(newVal,oldVal) {
        this.filterTableData(newVal)
      }
    },
    methods: {
      filterTableData(routingType) {
        if(routingType === '所有') {
          this.tableData = this.cacheTableData
        } else {
          this.tableData = this.cacheTableData.filter(item => {
            if(item.type === routingType) {
              return item
            }
          })
        }
      },
    }
  }
</script>

<style scoped>
  .select-label {
    font-size: 15px;
    margin-right: 15px;
  }
  .header-select {
    margin-bottom: 20px;
  }
  .test {
    background-color: #606161;
  }
</style>
