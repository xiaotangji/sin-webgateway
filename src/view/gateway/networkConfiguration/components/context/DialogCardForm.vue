<template>
  <el-dialog :title="formParams.title" :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <div class="dialog-display">
      <el-form :model="formParams.formModel"
               style="margin-left: 0%;clear: both;"
               ref="dialogForm"
               size="mini"
               :label-width="formParams.labelWidth?formParams.labelWidth:'120px'"
               class="demo-ruleForm"
               label-position="left"
               :rules="formParams.rules">
        <div v-for="item in formParams.formLabel">
          <div v-if="item.type==='title'" class="header-style">
            {{item.header}}
          </div>
          <el-form-item v-else
                        :key="item.label"
                        :prop="item.prop"
                        :label="item.label">
            <el-input v-if="item.type==='input'"
                      v-model="formParams.formModel[item.prop]"
                      :style="{width: item.width}"
                      :placeholder="item.placeholder?item.placeholder:''"
                      :readonly="item.readonly?item.readonly:false">

            </el-input>
            <!--下拉框-->
            <el-select v-else-if="item.type==='select'"
                       v-model="formParams.formModel[item.prop]"
                       :style="{width: item.width}"
                       :placeholder="item.placeholder?item.placeholder:''"
                       :readonly="item.readonly?item.readonly:false">
              <el-option v-for="option in item.options"
                         :key="option.value?option.value:option"
                         :label="option.label?option.label:option"
                         :value="option.value?option.value:option">
              </el-option>
            </el-select>
            <!--number-->
            <el-input v-else-if="item.type==='number'"
                      type="number"
                      v-model="formParams.formModel[item.prop]"
                      :style="{width: item.width}"
                      :placeholder="item.placeholder?item.placeholder:''"
                      :readonly="item.readonly?item.readonly:false">

            </el-input>
            <!--单选按钮-->
            <el-radio-group v-else-if="item.type==='radio'"
                            v-model="formParams.formModel[item.prop]"
                            :style="{width: item.width}"
                            :placeholder="item.placeholder?item.placeholder:''"
                            :readonly="item.readonly?item.readonly:false">
              <el-radio v-for="labs in item.labels" :label="labs.label" :key="labs.value">{{labs.value}}</el-radio>
            </el-radio-group>
            <!--switch开关按钮-->
            <el-switch v-else-if="item.type==='switch'"
                       v-model="formParams.formModel[item.prop]"
                       :style="{width: item.width}"
                       :placeholder="item.placeholder?item.placeholder:''"
                       :readonly="item.readonly?item.readonly:false"
                       :active-value="item.active?item.active[0]:true"
                       :inactive-value="item.active?item.active[1]:false">

            </el-switch>
            <span v-if="item.slot" v-html="item.slot" class="slot-style"></span>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>

</template>

<script>
  export default {
    name: "DialogCardForm",
    props: {
      formParams: {
        type: Object
      },
      dialogVisible: {
        type: Boolean
      }
    },
    data() {
      return {

      }
    },
    watch: {
      dialogVisible(newVal) {
        this.dialogVisible = newVal
      },
    },
    methods: {
      cancel() {
        this.$refs['dialogForm'].resetFields()
        this.$emit('changDialogVisible',false)
        this.$message.info('退出'+this.formParams.title+'操作')
      },
      confirm() {

        this.$refs['dialogForm'].validate((valid) => {
          if(valid) {
            this.$emit('changDialogVisible',false)
            let params = {
              title : this.formParams.title,
              data: this.formParams.formModel
            }
            this.$emit('operateData',params)
            this.$message.success(this.formParams.title+'操作成功')

          } else {
            console.log('error')
          }
        })

      },
      closeDialog() {
        this.$refs['dialogForm'].resetFields()
        this.$emit('changDialogVisible',false)
      }
    },
  }
</script>

<style scoped>
  .dialog-display {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*缩小窗口时文字超出范围，待完善*/
  .header-style {
    float: left;
    position: relative;
    width: 100%;
    left: -30%;
    font-weight: bold;
  }
  .slot-style {
    margin-left: 5px;
  }
</style>
