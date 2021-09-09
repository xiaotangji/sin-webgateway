<template>
  <div>
    <div ref="lineEcharts" class="charts-box"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  let option = {
    color: ['#50e50f','#1c67d9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['GPU', 'CPU'],
      bottom: '2%',
      left: 'center',
      icon: 'rect',
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine: {
          lineStyle: {
            color: 'rgb(182,178,178)'
          }
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 10,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(182,178,178)'
          }
        },
      }
    ],
    series: [
      {
        name: 'CPU',
        type: 'line',
        areaStyle: {
          color: '#50e50f'
        },
        lineStyle: {
          color: '#4dfc03'
        },
        //聚焦高亮
        emphasis: {
          focus: 'series'
        },
        data: []
      },

      {
        name: 'GPU',
        type: 'line',
        areaStyle: {
          color: '#1c67d9'
        },
        lineStyle: {
          color: '#045cf5'
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },

    ]
  }
  export default {
    name: "AreaLineEcharts",
    data() {
      return {
        myCharts: null,
        chartData: {},
        xValue: [],
        cpuTempData: [],
        gpuTempData: []
      }
    },
    props:{
      cpuTempDataOfSon:{
        type:Array,
      },
      gpuTempDataOfSon:{
        type:Array,
      },
      xValueArr:{
        type:Array,
      }
    },
    watch: {
      cpuTempDataOfSon: function (newData) {
        this.myCharts.resize()
        option.series[0].data =  newData;
        this.myCharts.setOption(option);
      },
      gpuTempDataOfSon: function (newData) {
        this.myCharts.resize()
        option.series[1].data =  newData;
        this.myCharts.setOption(option);
      },
      xValueArr: function (newData) {
        this.myCharts.resize()
        option.xAxis[0].data =  newData;
        this.myCharts.setOption(option);
      }
    },
    mounted() {
      this.initEcharts('lineEcharts')
      window.addEventListener('resize',() => {
        this.myCharts && this.myCharts.resize()
      })

    }
    ,methods: {
      initEcharts(chart) {
        this.myCharts = echarts.init(this.$refs[chart])
        /*let that = this
        window.onresize = () => {
          that.myCharts.resize()
        }*/
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
