<template>
  <div>
    <div ref="lineEcharts" class="charts-box"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'line',
      smooth: true
    }]
  };
  export default {
    name: "LineEcharts",
    props: {
      lineData: {
        type: Object
      },
      memoryofSon:{
        type:Array,
      },
      xValueArrMeory:{
        type:Array,
      },
      cpuOfSon:{
        type:Array,
      },
      xValueArrCpu:{
        type:Array,
      },
      diskOfSon:{
        type:Array,
      },
      xValueArrDisk:{
        type:Array,
      },
      networkOfSon:{
        type:Array,
      },
      xValueArrNetwork:{
        type:Array,
      },
    },
    data() {
      return {
        myCharts: null,
        chartData: {}
      }
    },
    mounted() {
      this.initEcharts('lineEcharts')
      window.addEventListener('resize',() => {
        this.myCharts && this.myCharts.resize()
      })
    },
    watch: {
      lineData: {
        deep: true,
        //immediate: true,
        handler(val) {
          this.lineData = val
          this.initEcharts('lineEcharts')
          //this.chartData = val
        }
      },
      memoryofSon: function (newData) {
        this.myCharts.resize()
        option.series[0].data =  newData;
        this.myCharts.setOption(option);
      },
      xValueArrMeory: function (newData) {
        this.myCharts.resize()
        option.xAxis.data =  newData;
        this.myCharts.setOption(option);
      },
      cpuOfSon: function (newData) {
        this.myCharts.resize()
        option.series[0].data =  newData;
        this.myCharts.setOption(option);
      },
      xValueArrCpu: function (newData) {
        this.myCharts.resize()
        option.xAxis.data =  newData;
        this.myCharts.setOption(option);
      },
      diskOfSon: function (newData) {
        this.myCharts.resize()
        option.series[0].data =  newData;
        this.myCharts.setOption(option);
      },
      xValueArrDisk: function (newData) {
        this.myCharts.resize()
        option.xAxis.data =  newData;
        this.myCharts.setOption(option);
      },
      networkOfSon: function (newData) {
        this.myCharts.resize()
        option.series[0].data =  newData;
        this.myCharts.setOption(option);
      },
      xValueArrNetwork: function (newData) {
        this.myCharts.resize()
        option.xAxis.data =  newData;
        this.myCharts.setOption(option);
      }
    },

    methods: {
      initEcharts(chart) {
        //console.log(this.chartData.xAxisType)
        this.myCharts = echarts.init(this.$refs[chart])
        this.myCharts.resize()
        //let that = this
       /* window.onresize = () => {
          this.myCharts.resize()
        }*/
        window.addEventListener('resize',() => {
          this.myCharts.resize()
        })
      }
    }
  }
</script>

<style scoped>
  .charts-box {
    width: 100%;
    height: 400px;
    border: 1px solid rgb(127, 121, 121);
  }
</style>
