<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import {selectFromUserByUserNameAndPassword} from "../../api/user";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      let user = {};
      user.user_name = userName;
      user.password = password;
      selectFromUserByUserNameAndPassword(user).then(res=>{
        if(res.data.data == 1){
          this.$router.push({
            name: this.$config.homeName
          })
        }else if(res.data.data == -1){
           this.$Message.error('用户或密码错误')
        }else{
          this.$Message.error('未知错误')
        }
      })
    }
  }
}

</script>

<style>

</style>
