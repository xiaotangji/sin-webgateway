<template>
  <div>
    <h2>重启系统</h2>
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="每天定时重启：">
        <el-switch v-model="form.restart"></el-switch>
      </el-form-item>
      <div v-show="this.form.restart">
        <el-form-item label="每天：">
          <el-select v-model="form.hour">
            <el-option
              v-for="item in hourArr"
              :key="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
          时
          <el-select v-model="form.second">
            <el-option
              v-for="item in secondArr"
              :key="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
          分
        </el-form-item>
      </div>
      <el-form-item label="立即重启：">
        <el-button type="danger" @click="restartGateway"  icon="el-icon-refresh-left">重启</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>



import {reboot} from "../../api/system";

export default {
  name: 'restart',
  data() {
    return {
      form: {
        hour: '00',
        second: '00',
        restart: false,
      },
      secondArr:[],
      hourArr:[],
      initForm:{
        hour: [],
        second: [],
        restart: false,
      },
      isnontSubmit: false
    }
  },
  created() {
      this.selectShow();
      this.initValue();
      if(!this.isnontSubmit){
        this.form.second = this.initForm.second == ""? '00': this.initForm.second;
        this.form.hour = this.initForm.hour == ""? '00': this.initForm.hour;;
        this.form.restart = this.initForm.restart;
      }
      if(this.form.restart){
        setInterval(this.timeRestart,20000);
      }
  },
  methods: {
    selectShow(){
      for(let i=0; i<24;i++){
        if(i<10){
          this.hourArr.push({label:'0'+i+'',value:'0'+i+''})
        }else{
          this.hourArr.push({label:i})
        }
      }
      for(let i = 0; i<60;i++){
        if(i<10){
          this.secondArr.push({label:'0'+i+'',value:'0'+i+''})
        }else{
          this.secondArr.push({label:i,value:i})
        }
      }
    },

    restartGateway(){
      reboot('sudo reboot').then(res=>{
        if(res.data.result){
          this.$message({
            type: 'success',
            message: '重启成功，请稍后!'
          });
        }else{
          this.$message({
            type: 'error',
            message: '重启失败!'
          });
        }
      })
    },

    timeRestart(){
      let hh = new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes():new Date().getMinutes();
      if(this.form.restart){
        if(hh == this.form.hour+'' && mf == this.form.hour+''){
          let aa =1;
        }
      }
    },

    onSubmit(){
      this.$message({
        type: 'success',
        message: '提交成功!'
      });
      this.isnontSubmit = true;
    },

    initValue(){
      document.cookie
      this.initForm.second = this.form.second;
      this.initForm.hour = this.form.hour;
      this.initForm.restart = this.form.restart;
    },
    reset(){
      this.form.second = this.initForm.second == ""? '00': this.initForm.second;
      this.form.hour = this.initForm.hour == ""? '00': this.initForm.hour;;
      this.form.restart = this.initForm.restart;

    }
  }
}
</script>

<style>

</style>
