<template>
  <div>
      <el-form :model="formInline"  :label-position="labelPosition">
        <p style="font-size: x-large;color: black;">状态</p>
        <el-form-item label="云服务状态">
          <div v-for="o in formInline.conState" :key="o" style="margin-left: 11%">
            {{o}}
          </div>
        </el-form-item>
        <el-form-item label="连接时间">
          <div v-for="o in formInline.conTime" :key="o"  style="margin-left: 11%">
            {{o}}
          </div>
        </el-form-item>
        <el-form-item label="启用云服务" prop="startYunService">
          <el-switch v-model="formInline.startYunService" @change="startStopService()" style="margin-left: 4.5%"></el-switch>
        </el-form-item>
      </el-form>
     <div>
       <el-form :model="ruleForm" v-show="isDisplay" :rules="rules"  ref="ruleForm" class="demo-ruleForm">
         <el-form-item label="类型：" prop="region">
           <el-select v-model="ruleForm.region" size="mini" style="margin-left: 5.9%;width: 15%" placeholder="请选择类型">
             <el-option label="标准MQTT" value="选项一"></el-option>
             <el-option label="KAFKA" value="选项二"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="服务器地址：" prop="serverAddress">
           <el-input v-model="ruleForm.serverAddress" size="mini" style="width: auto; margin-left: 2.7%"></el-input>
         </el-form-item>
         <el-form-item label="MQTT客户端ID：" prop="mqttId">
           <el-input v-model="ruleForm.mqttId" size="mini"  style="width: auto;margin-left: 0.68%"></el-input>
         </el-form-item>
         <el-form-item label="启用用户验证" prop="checkUserStart">
           <el-switch v-model="ruleForm.checkUserStart" style="margin-left: 3.5%"></el-switch>
         </el-form-item>
         <el-form-item label="MQTT用户名：" prop="mqttUser">
           <el-input v-model="ruleForm.mqttUser" size="mini" style="width: 14.5%; margin-left: 2%"></el-input>
         </el-form-item>
         <el-form-item label="MQTT密码：" prop="mqttUser">
           <el-input placeholder="请输入密码" size="mini" v-model="ruleForm.mqttPwd" style="width: 14.5%;margin-left: 3.2%" show-password></el-input>
         </el-form-item>
         <el-form-item>
           <el-button @click="clickSet" type="text" style="color: black">高级设置<i v-show="jiantouRight" class="el-icon-arrow-right el-icon-arrow-right"></i><i v-show="jiantouDown" class="el-icon-arrow-down"></i></el-button>
         </el-form-item>
         <div style="padding-left: 11%">
           <el-form v-show="isNotShowHighSet" :model="ruleFormSet" :rules="rules" ref="ruleFormSet" class="demo-ruleForm">
             <el-form-item label="端口号：" prop="port">
               <el-input size="mini" style="width: auto;margin-left: 4.8%" v-model="ruleFormSet.port"></el-input>
             </el-form-item>
             <el-form-item  style="width: 100%" label="MQTT心跳间隔："  prop="heartInternal">
               <el-input size="mini" style="width: auto;" v-model="ruleFormSet.heartInternal">秒(1-3600)</el-input>
             </el-form-item>
             <el-form-item label="TLS加密：" prop="tlspwd">
               <el-radio-group v-model="ruleFormSet.tlspwd" style="margin-left: 3.8%">
                 <el-radio label="关闭"></el-radio>
                 <el-radio label="开启"></el-radio>
               </el-radio-group>
             </el-form-item>
             <el-form-item label="清除Session：" prop="cleanSession">
               <el-radio-group v-model="ruleFormSet.cleanSession" style="margin-left: 1.5%">
                 <el-radio label="否"></el-radio>
                 <el-radio label="是"></el-radio>
               </el-radio-group>
             </el-form-item>
             <el-form-item label="MQTT版本：" prop="mqttVersion">
               <el-radio-group v-model="ruleFormSet.mqttVersion" style="margin-left: 2.6%">
                 <el-radio label="MQTTv31"></el-radio>
                 <el-radio label="MQTTv311"></el-radio>
               </el-radio-group>
             </el-form-item>
           </el-form>
         </div>
         <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm','ruleFormSet')">提交</el-button>
           <el-button @click="resetForm('ruleForm','ruleFormSet')">重置</el-button>
         </el-form-item>
       </el-form>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'yunService',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        ruleForm: {
          serverAddress: '',
          mqttId: '',
          region: ['grt','ger'],
          checkUserStart: false,
          mqttUser: '',
          mqttPwd: ''
        },
        ruleFormSet: {
          port: '',
          heartInternal: '',
          tlspwd: '',
          cleanSession: '',
          mqttVersion: ''
        },
        labelPosition: 'left',
        isDisplay: false,
        isNotShowHighSet: false,
        jiantouRight: true,
        jiantouDown: false,
        formInline: {
          startYunService: false,
          conState: ["连接成功"],
          conTime: ['0天 10:22:30']
        },
        rules: {
          serverAddress: [
            { required: true, message: '请输入服务器地址', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8到 20 个字符', trigger: 'blur' }
          ],
          mqttId: [
            { required: true, message: '请输入客户端ID', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
          ],
          mqttUser: [
            { required: true, message: '请输入mqtt用户名', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1到 15 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '请输入端口号', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
          ],
          heartInternal: [
            { required: true, message: '请输入心跳间隔', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2到 5 个字符', trigger: 'blur' }
          ],
          tlspwd: [
            { required: true, message: '请选择是否加密', trigger: 'change' }
          ],
          cleanSession: [
            { required: true, message: '请选择是否清楚session', trigger: 'change' }
          ],
          mqttVersion: [
            { required: true, message: '请选择MTQQ版本', trigger: 'change' }
          ]
        }
      };
    },
    created () {
      if(this.formInline.startYunService){
        this.isDisplay = true;
      }
    },
    methods: {
      startStopService(){
         if(this.formInline.startYunService){
           this.isDisplay = true;
         }else{
           this.isDisplay = false;
         }
      },
      clickSet(){
        if(this.isNotShowHighSet){
          this.jiantouRight = true;
          this.jiantouDown =false;
          this.isNotShowHighSet = false;
        }else {
          this.jiantouRight = false;
          this.jiantouDown = true;
          this.isNotShowHighSet = true;
        }
      },
      submitForm(ruleForm,ruleFormSet) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$refs[ruleFormSet].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(ruleForm,ruleFormSet) {
        this.$refs[ruleForm].resetFields();
        this.$refs[ruleFormSet].resetFields();
      }
    }
}
</script>

<style>
  .el-form-item__error{
    margin-left: 12%;
  }
</style>
