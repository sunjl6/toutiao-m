<template>
  <div class="login-container">
    <!-- bar -->
    <van-nav-bar class="page-nav-bar" title="登入" >
      <van-icon class="icon" slot="left" name = "cross" @click="$router.back()"/>
    </van-nav-bar>
    <!-- bar -->
    <!-- 用户登入 -->
    <van-form @submit="onSubmit" ref="loginForm">
  <van-cell-group>
    <van-field
      v-model="user.username"
      name="mobile"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11"
      placeholder="请输入手机号码">
     <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
    <van-field
      v-model="user.password"
      name="验证码"
      maxlength="6"
      type="number"
      :rules="userFormRules.code"
      placeholder="请输入验证码">
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <van-count-down v-if="isCountDownShow"  @finish="isCountDownShow = false"  :time="1000 * 5" format="ss s" />
      <van-button  v-else @click="onSendSms"  class="send-sms-btn" size="small" type="default" native-type="button">发送验证码</van-button>
    </template>
    </van-field>
  </van-cell-group>
  <div  class="login-btn-wrap">
    <van-button class="login-btn" block type="info" native-type="submit">
      登入
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '不能空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '不能空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async onSubmit  () {
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
       forbidClick: true,
       duration: 0
      });
      try {
      const res = await login(user)
      this.$store.commit('setUser', res.data.token)
      if (res.data.status === 1) {
       return this.$toast.fail('登入失败');
      }
      this.$toast.success('登入成功')
      this.$store.commit('setUserId', res.data.id)
      this.$router.push('/home')
      } catch (err) {
      if (err.response.status === 400) {
        console.log(err)
        return this.$toast.fail('登入失败');
      }
      }
    },
    async onSendSms () {
      try {
        this.isCountDownShow = true
        await this.$refs.loginForm.validate('mobile')
        console.log('校验成功')
      } catch (err) {
        return console.log('验证失败', err)
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container{
  .page-nav-bar{
    .icon{
      color: #fff;
    }
  }
  .toutiao{
    font-size: 37px;
  }
  .send-sms-btn{
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color:  #6db4fb;
      border: none;
    }
  }
}
</style>
