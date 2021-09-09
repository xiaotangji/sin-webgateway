<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="formData" :inline="true" :rules="formRules">
        <el-form-item label="开启监控" prop="switch">
          <el-switch v-model="formData.switch"></el-switch>
        </el-form-item>
        <el-form-item label="保存天数" prop="days">
          <el-input v-model.number="formData.days" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeDays('form')">更改</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearRecord">清空记录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {updateMonitorSetting} from "../../../../../api/monitorSetting";

  export default {
    name: "MonitorCardForm",
    props: {
      formData: {
        type: Object
      },
      formRules: {
        type: Object,
        days: [
          {required: true, message: '请输入天数', trigger: 'blur'},
          {min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur'}
        ],
      },

    },
    data() {
      return {
        //缓存更改前的天数
        cacheDays: 0,
        switch:'',
      }
    },
    mounted() {

    },
    beforeUpdate() {
      let cache = {...this.formData}
      this.cacheDays = cache.days
      this.switch = cache.switch
    },
    /*watch: {
      formDays(newVal,oldVal) {
        this.cacheDays = val
        console.log(val)
        console.log( this.cacheDays)
      }
    },
    computed: {
      formDays() {
        return this.formData.days;
      }
    },*/
    methods: {
      changeDays(form) {
        //校验
        this.formData.switch == true?1:0
        this.day = Number(this.switch);
        let monitor={start_stop: this.day,day:this.cacheDays}
        this.$refs[form].validate((valid) => {
          //校验通过，确认是否提交days天数
          if (valid) {
            this.$confirm('是否确认更改天数', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateMonitorSetting(monitor).then(res=>{
                  if(res.data.result){
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    });
                  }else{
                    this.$message({
                      type: 'error',
                      message: '修改失败!'
                    });
                  }
                })
            }).catch(() => {
              //取消更改操作
              this.formData.days = this.cacheDays
              this.$message({
                type: 'info',
                message: '已取消更改'
              });
            });
          } else {
            this.$confirm('更改失败，请确认天数', '提示', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return false;
          }
        });
      },

      clearRecord() {
        this.$confirm('是否确认清除记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //更改天数后操作
          this.cacheDays = 0;
          this.formData.day = 0;
          this.formData.switch = 0;
          let monitor={start_stop:0,day:0}
          updateMonitorSetting(monitor).then(res=>{
            this.formData.days = 0
            if(res.data.result){
              this.$message({
                type: 'success',
                message: '清除成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: '清除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
