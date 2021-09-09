<template>
  <div>
    <el-row>
      <el-row>
        <el-col :span="24">
          <monitor-card-form :formData="formData" :formRules="formRules" :cacheDays="cacheDays"/>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="header-card">
              <span class="header-title">采集器内存使用率</span>
              <el-radio-group v-model="rangeTimeM"  @change="selectChangeM" style="margin-bottom: 30px;">
                <el-radio-button :disabled="this.isshowM" label="today">本日</el-radio-button>
                <el-radio-button :disabled="this.isshowM"label="thisWeek">本周</el-radio-button>
                <el-radio-button :disabled="this.isshowM" label="thisMonth">本月</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeValueMemory"
                type="date"
                @change="selectDateM"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div>
              <line-echarts v-bind:memoryofSon="memoryOfFather" v-bind:xValueArrMeory="xValueMemory"  class="footer-card"/>
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="header-card">
              <span class="header-title">采集器cpu使用率</span>
              <el-radio-group v-model="rangeTimeC"  @change="selectChangeC" style="margin-bottom: 30px;">
                <el-radio-button :disabled="this.isshowC" label="today">本日</el-radio-button>
                <el-radio-button :disabled="this.isshowC" label="thisWeek">本周</el-radio-button>
                <el-radio-button :disabled="this.isshowC" label="thisMonth">本月</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeValueCpu"
                type="date"
                @change="selectDateC"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div>
              <line-echarts v-bind:cpuOfSon="cpuOfFather" v-bind:xValueArrCpu="xValueCpu"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="header-card">
              <span class="header-title">磁盘IO</span>
              <el-radio-group v-model="rangeTimeD"  @change="selectChangeD"  style="margin-bottom: 30px;">
                <el-radio-button :disabled="this.isshowD" label="today">本日</el-radio-button>
                <el-radio-button :disabled="this.isshowD" label="thisWeek">本周</el-radio-button>
                <el-radio-button :disabled="this.isshowD" label="thisMonth">本月</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeValueDisk"
                type="date"
                @change="selectDateD"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div>
              <line-echarts v-bind:diskOfSon="diskOfFather" v-bind:xValueArrDisk="xValueDisk"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="header-card">
              <span class="header-title">网络IO</span>
              <el-radio-group v-model="rangeTimeN"  @change="selectChangeN"   style="margin-bottom: 30px;">
                <el-radio-button  :disabled="this.isshowN" label="today">本日</el-radio-button>
                <el-radio-button  :disabled="this.isshowN" label="thisWeek">本周</el-radio-button>
                <el-radio-button  :disabled="this.isshowN" label="thisMonth">本月</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeValueNetwork"
                type="date"
                @change="selectDateN"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div>
              <line-echarts v-bind:networkOfSon="networkOfFather" v-bind:xValueArrNetwork="xValueNetwork"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="header-card">
              <span class="header-title">温度</span>
              <el-radio-group v-model="rangeTimeWD"  @change="selectChangeWD" style="margin-bottom: 30px;">
                <el-radio-button :disabled="this.isshowWD" label="today">本日</el-radio-button>
                <el-radio-button :disabled="this.isshowWD" label="thisWeek">本周</el-radio-button>
                <el-radio-button :disabled="this.isshowWD" label="thisMonth">本月</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-model="timeValueWD"
                type="date"
                @change="selectDateWD"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div>
              <area-line-echarts v-bind:cpuTempDataOfSon="cpuTempDataOfFather" v-bind:gpuTempDataOfSon="gpuTempDataOfFather" v-bind:xValueArr="xValue" ></area-line-echarts>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import MonitorCardForm from "./components/operationMonitoring/MonitorCardForm";
  import LineEcharts from "./components/operationMonitoring/LineEcharts";
  import AreaLineEcharts from "./components/operationMonitoring/AreaLineEcharts";
  import {selectFromCollectorByTime} from "../../../api/collector";
  import {selectFromMonitor} from "../../../api/monitorSetting";
  const formData = {
    switch: false,
    days: 30
  }

  export default {
    name: "operationMonitoring",
    components: {MonitorCardForm,LineEcharts,AreaLineEcharts},
    data() {
      return {
        //AreaLineEcharts子组件相关变量
        cpuTempDataOfFather:[],
        gpuTempDataOfFather:[],
        memoryOfFather:[],
        xValueMemory:[],
        cpuOfFather:[],
        xValueCpu:[],
        diskOfFather: [],
        xValueDisk:[],
        networkOfFather: [],
        xValueNetwork: [],
        xValue: [],
        //今日之后的日期不可选
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        formData,
        formRules: {
          days: [
            { required: true, message: '天数不能为空'},
            { type: 'number', message: '天数必须为数字值',trigger: 'blur'}
          ]
        },
        cacheDays: 0,
        rangeDate: '',
        rangeTimeM: '',
        rangeTimeC: '',
        rangeTimeD: '',
        rangeTimeN: '',
        rangeTimeWD: '',
        timeValueMemory: '',
        timeValueCpu: '',
        timeValueDisk: '',
        timeValueNetwork: '',
        timeValueWD: '',
        todayMemoryT: [],
        todayMemoryV: [],
        todayCpuT: [],
        todayCpuV: [],
        todayNetworkT: [],
        todayNetworkV: [],
        todayDiskT: [],
        todayDiskV: [],
        todayCpuWdV: [],
        todayCpuWdT: [],
        todayGpuWdV: [],
        todayGpuWdT: [],
        weekMemoryT: [],
        weekMemoryV: [],
        weekCpuT: [],
        weekCpuV: [],
        weekNetworkT: [],
        weekNetworkV: [],
        weekDiskT: [],
        weekDiskV: [],
        weekCpuWdV:[],
        weekCpuWdT:[],
        weekGpuWdV:[],
        weekGpuWdT:[],
        monthMemoryT: [],
        monthMemoryV: [],
        monthCpuT: [],
        monthCpuV: [],
        monthNetworkT: [],
        monthNetworkV: [],
        monthDiskT: [],
        monthDiskV: [],
        monthCpuWdV:[],
        monthCpuWdT:[],
        monthGpuWdV:[],
        monthGpuWdT:[],
        isshowM: false,
        isshowC: false,
        isshowD: false,
        isshowN: false,
        isshowWD: false,
        //折线图数据
        lineData: {
          /*xAxisType: '',
          xAxisData: [],*/
          seriesData: []
        },
        memoryData:{
          seriesData: [],
        },
        cpuData:{
          seriesData: [],
        },
        networkData:{
          seriesData: []
        },
        diskData:{
          seriesData: []
        },
        /*lineData : {
          xAxisType: 'category',
          xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          seriesData: [10, 20, 5, 67, 45, 0, 33]
        }*/
      }
    },
    mounted() {
      this.formData = {
        switch: false,
        days: 30
      }
      this.cacheDays = this.formData.days
      //默认显示本日数据
      this.rangeTimeM = 'today'
      this.rangeTimeC = 'today'
      this.rangeTimeD = 'today'
      this.rangeTimeN = 'today'
      this.rangeTimeWD = 'today'
    },
    watch: {
      rangeDate(val) {
        if(val) {
          this.rangeTime = ''
        } else {
          this.rangeTime == this.rangeTime ? this.rangeTime: 'today'
        }
      },
      /*rangeTime(val) {
        if(val) {
          this.rangeDate = null
          if('today' === val) {
            this.lineData = {
              //xAxisType: 'category',
              //xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              seriesData: [["2018-07-04 00:00:29", 14],["2018-07-04 01:00:49", 36],["2018-07-04 02:00:29", 20],["2018-07-04 03:00:29", 50],["2018-07-04 04:00:29",60],
                ["2018-07-04 05:00:29", 44],["2018-07-04 06:00:29", 38],["2018-07-04 07:00:29", 56],["2018-07-04 08:00:29", 90],["2018-07-04 09:00:29", 72],["2018-07-04 10:00:29",88],
                ["2018-07-04 11:00:29", 14],["2018-07-04 12:00:29", 36],["2018-07-04 13:00:29",50],["2018-07-04 14:00:29"],["2018-07-04 15:00:29"],
                ["2018-07-04 16:00:29"],["2018-07-04 17:00:29"],["2018-07-04 18:00:29"],["2018-07-04 19:00:29"],["2018-07-04 20:00:29"],
                ["2018-07-04 21:00:29"],["2018-07-04 22:00:29"],["2018-07-04 23:00:29"]]
            }
          } else if('thisWeek' === val) {
            this.lineData = {
              //xAxisType: 'category',
              //xAxisData: ['a', 'b', 'c', 'd', 'Feri', 'f', 'g'],
              seriesData: [["2021-06-07", 14],["2021-06-08", 36],["2021-06-09", 20],["2021-06-10", 50],["2021-06-11"],
                ["2021-06-12"],["2021-06-13"]]
            }
          } else if('thisMonth' === val) {
            this.lineData = {
              seriesData: [["2021-06-01", 14],["2021-06-02", 36],["2021-06-03", 20],["2021-06-04", 50],["2021-06-05",60],
                ["2021-06-06", 44],["2021-06-07", 38],["2021-06-08", 56],["2021-06-09", 72],["2021-06-10",88],
                ["2021-06-11"],["2021-06-12"],["2021-06-13"],["2021-06-14"],["2021-06-15"],
                ["2021-06-16"],["2021-06-17"],["2021-06-18"],["2021-06-19"],["2021-06-20"],
                ["2021-06-21"],["2021-06-22"],["2021-06-23"],["2021-06-24"],["2021-06-25"],
                ["2021-06-26"],["2021-06-27"],["2021-06-28"],["2021-06-29"],["2021-06-30"]]
            }
          }
        }
      }*/
    },
    created() {
      this.selectFromMonitor();
      this.selectAllCollector("");
    },
    methods: {
      selectFromMonitor(){
        selectFromMonitor().then(res=>{
          if(res.data.result){
            this.formData.days = Number(res.data.data.day);
            this.formData.switch = res.data.data.start_stop==1?true:false;
          }else{
            this.$message({
              type: 'error',
              message: '查询失败!'
            });
          }
        })
      },
      selectAllCollector(time){
        selectFromCollectorByTime(time).then(res=>{
          this.memoryofSon = [];
            if(res.data.result){
              this.todayMemoryT = res.data.data.todayMemoryTime;
              this.todayMemoryV = res.data.data.todayMemoryValue;
              this.weekMemoryT = res.data.data.weekMemoryTime;
              this.weekMemoryV = res.data.data.weekMemoryValue;
              this.monthMemoryT = res.data.data.monthMemoryTime;
              this.monthMemoryV = res.data.data.monthMemoryValue;
              this.memoryOfFather = this.todayMemoryV;
              this.xValueMemory = this.todayMemoryT;

              this.todayCpuT = res.data.data.todayCpuTime;
              this.todayCpuV = res.data.data.todayCpuValue;
              this.weekCpuT = res.data.data.weekCpuTime;
              this.weekCpuV = res.data.data.weekCpuValue;
              this.monthCpuT = res.data.data.monthCpuTime;
              this.monthCpuV = res.data.data.monthCpuValue;
              this.cpuOfFather = this.todayCpuV;
              this.xValueCpu = this.todayCpuT;

              this.todayNetworkT = res.data.data.todayNetworkTime;
              this.todayNetworkV = res.data.data.todayNetworkValue;
              this.weekNetworkT = res.data.data.weekNetworkTime;
              this.weekNetworkV = res.data.data.weekNetworkValue;
              this.monthNetworkT = res.data.data.monthNetworkTime;
              this.monthNetworkV = res.data.data.monthNetworkValue;
              this.networkOfFather = this.todayNetworkV;
              this.xValueNetwork = this.todayNetworkT;


              this.todayDiskT = res.data.data.todayDiskTime;
              this.todayDiskV = res.data.data.todayDiskValue;
              this.weekDiskT = res.data.data.weekDiskTime;
              this.weekDiskV = res.data.data.weekDiskValue;
              this.monthDiskT = res.data.data.monthDiskTime;
              this.monthDiskV = res.data.data.monthDiskValue;
              this.diskOfFather = this.todayDiskV;
              this.xValueDisk = this.todayDiskT;

              this.todayCpuWdV = res.data.data.todayCpuTempValue;
              this.todayCpuWdT = res.data.data.todayCpuTempTime;
              this.todayGpuWdV = res.data.data.todayGpuTempValue;
              this.todayGpuWdT = res.data.data.todayGpuTempTime;

              this.weekCpuWdV = res.data.data.weekCpuTempValue;
              this.weekCpuWdT= res.data.data.weekCpuTempTime;
              this.weekGpuWdV = res.data.data.weekGpuTempValue;
              this.weekGpuWdT = res.data.data.weekGpuTempTime;

              this.monthCpuWdV = res.data.data.monthCpuTempValue;
              this.monthCpuWdT= res.data.data.monthCpuTempTime;
              this.monthGpuWdV = res.data.data.monthGpuTempValue;
              this.monthGpuWdT = res.data.data.monthGpuTempTime;

              this.cpuTempDataOfFather = res.data.data.todayCpuTempValue;
              this.gpuTempDataOfFather = res.data.data.todayGpuTempValue;
              this.xValue = this.todayCpuWdT;
            }else{
              this.$message({
                type: 'error',
                message: '查询失败!'
              });
            }
        })
      },
      selectChangeM(val){
        if(val =='today'){
          this.memoryOfFather = this.todayMemoryV;
          this.xValueMemory = this.todayMemoryT;
        }else if(val == 'thisWeek') {
          this.memoryOfFather = this.weekMemoryV;
          this.xValueMemory = this.weekMemoryT;
        }else{
          this.memoryOfFather = this.monthMemoryV;
          this.xValueMemory = this.monthMemoryT;
        }
      },
      selectDateM(){
        if(this.timeValueMemory != null){
            this.isshowM = true;
          selectFromCollectorByTime(this.timeValueMemory).then(res=>{
            if(res.data.result){
              this.memoryOfFather = res.data.data.anyDayMemoryValue;
              this.xValueMemory = res.data.data.anyDayMemoryTime;
            }
          })
        }else{
          this.isshowM = false;
          this.rangeTimeM = 'today'
          this.memoryOfFather = this.todayMemoryV;
          this.xValueMemory = this.todayMemoryT;
        }
      },

      selectChangeC(val){
        if(val =='today'){
          this.cpuOfFather = this.todayCpuV;
          this.xValueCpu = this.todayCpuT;
        }else if(val == 'thisWeek') {
          this.cpuOfFather = this.weekCpuV;
          this.xValueCpu = this.weekCpuT;
        }else{
          this.cpuOfFather = this.monthCpuV;
          this.xValueCpu = this.monthCpuT;
        }
      },

      selectDateC(){
        if(this.timeValueCpu != null){
          this.isshowC = true;
          selectFromCollectorByTime(this.timeValueCpu).then(res=>{
            if(res.data.result){
              this.cpuOfFather = res.data.data.anyDayCpuValue;
              this.xValueCpu = res.data.data.anyDayCpuTime;
            }
          })
        }else{
          this.isshowC = false;
          this.rangeTimeC = 'today'
          this.cpuOfFather = this.todayCpuV;
          this.xValueCpu = this.todayCpuT;
        }
      },
      selectChangeD(val){
        if(val =='today'){
          this.diskOfFather = this.todayDiskV;
          this.xValueDisk = this.todayDiskT;
        }else if(val == 'thisWeek') {
          this.diskOfFather = this.weekDiskV;
          this.xValueDisk = this.weekDiskT;
        }else{
          this.diskOfFather = this.monthDiskV;
          this.xValueDisk = this.monthDiskT;
        }
      },
      selectDateD(){
        if(this.timeValueDisk != null){
          this.isshowD = true;
          selectFromCollectorByTime(this.timeValueDisk).then(res=>{
            if(res.data.result){
              this.diskOfFather = res.data.data.anyDayDiskValue;
              this.xValueDisk = res.data.data.anyDayDiskTime;
            }
          })
        }else{
          this.isshowD = false;
          this.rangeTimeD = 'today'
          this.diskOfFather = this.todayDiskV;
          this.xValueDisk = this.todayDiskT;
        }
      },

      selectChangeN(val){
        if(val =='today'){
          this.networkOfFather = this.todayNetworkV;
          this.xValueNetwork = this.todayNetworkT;
        }else if(val == 'thisWeek') {
          this.networkOfFather = this.weekNetworkV;
          this.xValueNetwork = this.weekNetworkT;
        }else{
          this.networkOfFather = this.monthNetworkV;
          this.xValueNetwork = this.monthNetworkT;
        }
      },
      selectDateN(){
        if(this.timeValueNetwork != null){
          this.isshowN = true;
          selectFromCollectorByTime(this.timeValueNetwork).then(res=>{
            if(res.data.result){
              this.networkOfFather = res.data.data.anyDayNetworkValue;
              this.xValueNetwork = res.data.data.anyDayNetworkTime;
            }
          })
        }else{
          this.isshowN = false;
          this.rangeTimeN= 'today'
          this.networkOfFather = this.todayNetworkV;
          this.xValueNetwork = this.todayNetworkT;
        }
      },

      selectChangeWD(val){
        if(val =='today'){
          this.cpuTempDataOfFather = this.todayCpuWdV;
          this.gpuTempDataOfFather =   this.todayGpuWdV;
          this.xValue = this.todayCpuWdT;
        }else if(val == 'thisWeek') {
          this.cpuTempDataOfFather = this.weekCpuWdV;
          this.gpuTempDataOfFather =  this.weekGpuWdV;
          this.xValue = this.weekCpuWdT;
        }else{
          this.cpuTempDataOfFather = this.monthCpuWdV;
          this.gpuTempDataOfFather =  this.monthGpuWdV;
          this.xValue = this.monthCpuWdT;
        }
      },
      selectDateWD(){
        if(this.timeValueWD != null){
          this.isshowWD = true;
          selectFromCollectorByTime(this.timeValueWD).then(res=>{
            if(res.data.result){
              this.cpuTempDataOfFather = res.data.data.anyDayCpuTempValue;
              this.gpuTempDataOfFather = res.data.data.anyDayGpuTempValue;
              this.xValue = res.data.data.anyDayCpuTempTime;
            }
          })
        }else{
          this.isshowWD = false;
          this.rangeTimeWD= 'today'
          this.cpuTempDataOfFather = this.todayCpuWdV;
          this.gpuTempDataOfFather = this.todayGpuWdV;
          this.xValue = this.todayCpuWdT;
        }
      },

    }
  }
</script>

<style scoped>
  .header-card {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .header-title {
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
  }
  .footer-card {
    width: 100%;
  }
</style>
