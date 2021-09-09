<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-name">{{formParams.cardName}}</span>
      </div>
      <div>
        <el-form :model="formParams.formModel" style="margin-left: 0%"
                 ref="ruleFormAdd" size="mini" label-width="80px" class="demo-ruleForm">
          <el-col :span="8" v-for="colNumber in [0,1,2]" :key="colNumber">
            <el-form-item v-for="(item,index) in (formParams.formLabel.filter((it,ind) => ind%3==colNumber))"
                          :key="index"
                          :prop="item.prop"
                          :label="item.label">
              <el-input v-if="item.type==='input'"
                        v-model="formParams.formModel[item.prop]"
                        style="width: auto;"
                        :placeholder="item.placeholder?item.placeholder:''"
                        :readonly="item.readonly?item.readonly:true">

              </el-input>
            </el-form-item>
          </el-col>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "CardForm",
    props: {
      formParams: {
        type: Object,
      }
    }
  }
</script>

<style scoped>
  .el-input--mini /deep/ .el-input__inner {
    border: none;
  }
  .card-name {
    font-size: 15px;
    font-weight: bold;
  }
</style>



