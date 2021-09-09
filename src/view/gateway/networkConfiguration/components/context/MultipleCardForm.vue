<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-name">{{formParams.cardName}}</span>
      </div>
      <div>
        <el-form :model="formParams.formModel"
                 style="margin-left: 0%"
                 ref="multipleCardForm"
                 size="mini"
                 label-width="150px"
                 class="demo-ruleForm"
                 label-position="left"
                 :rules="formParams.rules">
          <el-row v-if="formParams.isCol">
            <el-col  :span="8" v-for="colNumber in [0,1]" :key="colNumber">
              <el-form-item v-for="(item,index) in (formParams.formLabel.filter((it,ind) => ind%2==colNumber))"
                            :key="index"
                            :prop="item.prop"
                            :label="item.label" >
                <el-input v-if="item.type==='input'"
                          v-model="formParams.formModel[item.prop]"
                          :style="{width: item.width+'px'}"
                          :placeholder="item.placeholder?item.placeholder:''"
                          :readonly="item.readonly?item.readonly:false">

                </el-input>
                <!--下拉框-->
                <el-select v-else-if="item.type==='select'"
                           v-model="formParams.formModel[item.prop]"
                           :style="{width: item.width+'px'}"
                           :placeholder="item.placeholder?item.placeholder:''"
                           :readonly="item.readonly?item.readonly:false">
                  <el-option v-for="option in item.options"
                             :key="option.value"
                             :label="option.label"
                             :value="option.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="17">
              <el-form-item  v-for="(item,index) in formParams.formLabel"
                             :key="index"
                             :prop="item.prop"
                             :label="item.label" >
                <!--input输入框-->
                <el-input v-if="item.type==='input'"
                          :ref="item.prop"
                          v-model="formParams.formModel[item.prop]"
                          :style="{width: item.width+'px'}"
                          :placeholder="item.placeholder?item.placeholder:''"
                          :readonly="item.readonly?item.readonly:false">
                </el-input>
                <!--下拉框-->
                <el-select v-else-if="item.type==='select'"
                           :ref="item.prop"
                           v-model="formParams.formModel[item.prop]"
                           :style="{width: item.width+'px'}"
                           :placeholder="item.placeholder?item.placeholder:''"
                           :readonly="item.readonly?item.readonly:false">
                  <el-option v-for="option in item.options"
                             :key="option.value"
                             :label="option.label"
                             :value="option.value">

                  </el-option>
                </el-select>
                <!--switch开关-->
                <el-switch v-else-if="item.type==='switch'"
                           :ref="item.prop"
                           v-model="formParams.formModel[item.prop]">
                </el-switch>
                <!--radio-group单选框组-->
                <el-radio-group v-else-if="item.type==='radioGroup'"
                                :ref="item.prop"
                                v-model="formParams.formModel[item.prop]">
                  <el-radio v-for="label in item.labels"
                            :label="label.label" :key='label.label'>{{label.value}}
                  </el-radio>
                </el-radio-group>
                <el-input v-else-if="item.type==='password'" :type="item.prop==='PSKSecretKey'?typePwd:'password'"
                          v-model="formParams.formModel[item.prop]"
                          :style="{width: item.width+'px'}"
                          :placeholder="item.placeholder?item.placeholder:''"
                          :readonly="item.readonly?item.readonly:false">
                </el-input>
                <el-button v-if="item.prop==='ClientSSID'" @click="scanOperation(item)" class="scanner_btn">扫描</el-button>
                <i v-if="item.prop==='PSKSecretKey'" :class="'icon_style '+pwdVisible" @click="changeVisible"></i>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="17">
            <el-form-item>
              <el-button type="primary" @click="onsubmit('multipleCardForm')">提交</el-button>
              <el-button @click="reset('multipleCardForm')">重置</el-button>
            </el-form-item>
          </el-col>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "MultipleCardForm",
    props: {
      formParams: {
        type: Object,
      }
    },
    data() {
      return {
        typePwd: 'password',
        pwdVisible: 'iconfont iot-mimabukejian'
      }
    },
    mounted() {
      console.log(this.formParams)
    },
    watch: {
      selectOptions: {
        deep: true,
        handler(val) {
          this.formParams.formModel = val
          console.log( this.formParams.formModel)
        }
      }
    },
    computed: {
      selectOptions() {
        return this.formParams.formModel
      },

    },
    methods: {
      onsubmit(formName) {
        this.typePwd = 'password'
        this.$refs[formName].validate((valid) => {
          if(valid) {
            //执行提交表单操作

            console.log('submit')
          } else {
            console.log('校验未通过')
          }
        })
        this.changeVisible()
      },
      reset(formName) {
        //重置
        this.$refs[formName].resetFields()
        this.changeVisible()
      },
      scanOperation(item) {

      },
      changeVisible() {
        if(this.typePwd==='password') {
          this.typePwd = 'text'
          this.pwdVisible = 'iconfont iot-mimakejian'
        } else if(this.typePwd==='text') {
          this.typePwd = 'password'
          this.pwdVisible = 'iconfont iot-mimabukejian'
        }
      }

    }
  }
</script>

<style scoped>
  .card-name {
    font-size: 15px;
    font-weight: bold;
  }
  .scanner_btn {
    color: green;
    margin-left: 10px;
  }
  .icon_style {
    margin-left: 10px;
  }
  .el-col-17 /deep/ {
    margin-bottom: 20px;
  }
</style>
