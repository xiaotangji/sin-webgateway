<template>
  <div style="background: white">
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-name">状态</span>
            </div>
            <div>
              /*这儿三个*/
              <el-col :span="6" v-for="(item,index) in pieDataList" :key="index" style="display: flex;justify-content: center;">
                <echarts-status v-bind:pieData="item" v-bind:systemArrOfSon="systemArrOfFather"/>
              </el-col>
            </div>
<!--            <echarts-status v-bind:systemArrOfSon="systemArrOfFather"/>-->
          </el-card>
        </el-row>
        <el-row>
          <el-col :span="12">
            <status-card-form :formParams="formParamsLeft"/>
          </el-col>
          <el-col :span="12">
              <status-card-form :formParams="formParamsRight"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {getSystemInfo} from "../../../api/system";
  import echartsStatus from "./components/echartsStatus";
  import statusCardForm from "./components/statusCardForm";

  const formModelLeft = {
    name: '',
    type: '',
    serialNumber: '',
    MACAddress: '',
    firmwareVersion: ''
  }
  const formLabelLeft = [
    {prop:"name", label:"名称:", width:"180",type: 'input'},
    {prop:"type", label:"型号:", width:"180",type: 'input'},
    {prop:"serialNumber", label:"序列号:", width:"180",type: 'input'},
    {prop:"MACAddress", label:"MAC地址:", width:"180",type: 'input'},
    {prop:"firmwareVersion", label:"固件版本:", width:"180",type: 'input'},
  ]
  const formModelRight = {
    version: '',
    type: '',
    operatingStatus: '',
    usedInternalMemory: '',
    operationHours: ''
  }
  const formLabelRight = [
    {prop:"version", label:"版本:", width:"180",type: 'input'},
    {prop:"type", label:"型号:", width:"180",type: 'input'},
    {prop:"operatingStatus", label:"运行状态:", width:"180",type: 'input'},
    {prop:"usedInternalMemory", label:"占用内存:", width:"180",type: 'input'},
    {prop:"operationHours", label:"运行时间:", width:"180",type: 'input'},
  ]
  export default {
    name: "systemStatus",
    components: {statusCardForm,echartsStatus},
    data() {
      return {
        formParamsLeft: {
          cardName: '系统信息',
          formModel: formModelLeft,
          formLabel: formLabelLeft,
        },
        formParamsRight: {
          cardName: '网关服务',
          formModel: formModelRight,
          formLabel: formLabelRight,
        },
        pieDataList: [
          /*{pieTitle: '负载状态', pieStatus: '运行流畅',
            data: [{value:40, name:'负载量'}, {value:60, name:'剩余量'}],
            color: ['#2D8cF0','#d1d7dc']},
          {pieTitle: 'CPU使用率', pieStatus: '1核心',
            data: [{value:40, name:'CPU使用量'}, {value:60, name:'剩余量'}],
            color: ['#d01a44','#d1d7dc']},
          {pieTitle: '内存使用率', pieStatus: '545/772(MB)',
            data: [{value:40, name:'内存使用量'}, {value:60, name:'剩余量'}],
            color: ['#2D8cF0','#d1d7dc']},
          {pieTitle: '/', pieStatus: '11G/20G',
            data: [{value:40, name:'负载量'}, {value:60, name:'剩余量'}],
            color: ['#d01a44','#d1d7dc']},*/
        ],
        systemArrOfFather:[]
        /*pieData: {
          pieTitle: '负载状态',
          pieStatus: '运行流畅',
          data: [
            {value:40, name:'负载量'},
            {value:60, name:'剩余量'}
          ]
        }*/
      }
    },
    created() {
      this.formParamsLeft.formModel = {
        name: '1',
        type: '2',
        serialNumber: 'a',
        MACAddress: 'b',
        firmwareVersion: 'c'
      },
        this.getSystemInfo();
    },
    methods: {
      getSystemInfo(){
        getSystemInfo(null).then(res=>{
          if(res.data.result){
            let data = res.data.data;
            let cpu = data.cpuPercent;
            let cpu_count = data.cpuCount;
            let cpuSurplus = 100 - cpu;
            let pieDataListNew = [];
            pieDataListNew.push({pieTitle: 'CPU使用率', pieStatus: cpu_count+'核心',
              data: [{value:cpu, name:'CPU使用量'}, {value:cpuSurplus, name:'剩余量'}],
              color: ['#2D8cF0','#d1d7dc']});
            // setTimeout(()=> {
            //   // Vue.set(this.systemArrOfFather, 0, cpu)
            //   Vue.set(this.pieDataList, 0, {pieTitle: 'CPU使用率', pieStatus: cpu_count+'核心',
            //     data: [{value:cpu, name:'CPU使用量'}, {value:cpuSurplus, name:'剩余量'}],
            //     color: ['#2D8cF0','#d1d7dc']})
            // }, 0);
            Vue.set(this.systemArrOfFather, 0, cpu)

            let memory = data.memory_percent;
            let memorySurplus =  100-memory;
            let memory_used_total = data.memory_used_total;
            pieDataListNew.push({pieTitle: '内存使用率', pieStatus: memory_used_total+'(MB)',
              data: [{value:memory, name:'内存使用量'}, {value:memorySurplus, name:'剩余量'}],
              color: ['#d01a44','#d1d7dc']});
            Vue.set(this.systemArrOfFather, 1, memory)

            let disk_percent = data.disk.percent;
            let diskSurplus = 100 -disk_percent;
            let disk_used_total = Math.round(data.disk.used/1024/1024/1024) + 'G/'+Math.round(data.disk.total/1024/1024/1024)+'G';
            pieDataListNew.push({pieTitle: '磁盘使用率', pieStatus: disk_used_total,
              data: [{value:disk_percent, name:'负载量'}, {value:diskSurplus, name:'剩余量'}],
              color: ['#2D8cF0','#d1d7dc']});
              Vue.set(this.systemArrOfFather, 2, disk_percent)

            this.pieDataList = pieDataListNew;
          }else{
            this.$message({
              type: 'error',
              message: '查询失败!'
            });
          }
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
