<template>
  <div>
    <h2>系统时间</h2>
      <el-row style="margin-top: 10px">
        <el-col :span="5" style="margin-top: 20px">
          <span style="font-size: 15px">本地时间：</span>
          <span style="font-size: 15px">{{localTime}}</span>
        </el-col>
      </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="5">
            <span style="font-size: 15px">设备时间：</span>
            <span style="font-size: 15px">{{equipmentTime}}</span>
            <el-button type="success">同步</el-button>
          </el-col>
        </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="15">
        <span style="font-size: 15px">设置时间：</span>
        <el-date-picker
          v-model="dateOnly"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <el-time-picker
          v-model="timeOnly"
          :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
          }"
          placeholder="任意时间点">
        </el-time-picker>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <el-button type="success">应用</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: 'systemTime',
  data () {
    return {
      localTime: '',
      equipmentTime: '',
      dateOnly: '',
      timeOnly: ''
    }
  },
  created () {
    setInterval(this.getCurrentTime,5000);
  },
  methods: {

    getCurrentTime(){
      let date = new Date();
      let month = this.zeroFill(date.getMonth() +1);
      let day =  this.zeroFill(date.getDate());
      let hour = this.zeroFill(date.getHours());
      let minute = this.zeroFill(date.getMinutes());
      let second = this.zeroFill(date.getSeconds());
      //当前时间
      let curTime = date.getFullYear()+"-"+ month+"-"+day+" "+ hour+":"+minute+":"+second;
      this.localTime = curTime;
    },
    zeroFill(i){
      if(i>=0 && i <= 9){
        return "0"+i;
      }else{
        return  i;
      }
    }


  }
}
</script>
<style lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

  .ivu-modal{
    top: 0;
  }
  }
</style>
