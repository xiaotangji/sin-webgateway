<template>
  <div class="outer-box">
    <div ref="pieTitle" class="title-box">{{pieData.pieTitle}}</div>
    <div ref="statusCharts" class="charts-box">
    </div>
    <div ref="pieStatus" class="status-box">{{pieData.pieStatus}}</div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "echartsStatus",
    props: {
      pieData: {
        type: Object
      },
      systemArrOfSon:{
        type: Array
      }
    },
    data() {
      return {
        myCharts: null,
        loadNum: 20,
        // newSystemArrOfSon: [],
        // newPieData:''
        //圆环上标题

        //圆环下标题
      }
    },
    created() {
      console.log(this);
    },
    mounted() {
      if(this.pieData != undefined){
        if(this.pieData.pieTitle =='CPU使用率'){
          let aa = this.systemArrOfSon;
          this.loadNum = 20;
          this.initEcharts('statusCharts')
        }else if(this.pieData.pieTitle =='内存使用率'){
          this.loadNum = 30;
          this.initEcharts('statusCharts')
        }else {
          this.loadNum = 40;
          this.initEcharts('statusCharts')
        }
      }
    },
    // watch: {
    //   systemArrOfSon: function (newData) {
    //     this.newSystemArrOfSon = newData;
    //   },
    //   pieData: function (newData) {
    //     this.newPieData = newData;
    //   },
    // },
    methods: {
      initEcharts(chart) {
        this.myCharts = echarts.init(this.$refs[chart])
        this.myCharts.setOption({
          //设置扇形图颜色，默认逆时针
          //color: ['#2D8cF0','#d1d7dc'],
          color: this.pieData.color,
          //设置标题
          title: {
            text: this.loadNum+'%',
            textStyle: {
              color: '#000',
              fontSize: 25
            },
            left: 'center',
            top: '40%',

            /*subtext: '负载状态',subtextStyle: {
              verticalAlign: 'top'
            },
            itemGap: -50*/
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: "负载状态",
              type: "pie",
              radius: ["70%", "85%"],
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.pieData.data
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>
  .outer-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

  }
  .title-box {
    margin-bottom: 10px;
    margin-top: 10px;
    width: 120px;
    text-align: center;
    font-size: 15px;
    color: #a8afb4;
  }
  .charts-box {
    width: 120px;
    height: 120px;
  }
  .status-box {
    margin-bottom: 40px;
    margin-top: 10px;
    width: 120px;
    text-align: center;
    font-size: 15px;
    color: #a8afb4;
  }
</style>
