<template>
  <div class="app-wrapper">
    <header class="header-throwsf">
      <div class="header-position">
        <img class="logo" src="../../assets/img/logo.png">
        <div class="head_group">
          <img src='../../assets/img/menology_n.png'>
          <div class="head_group_day">
            <span>2019年9月26日</span>
            <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;14:44</span>
          </div>
        </div>
      </div>
    </header>
    <div class="contont-main">
      <div class="nl_l">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
          <ul>
            <li><h2>用户登录&nbsp;&nbsp;<span>USER&nbsp;LOGIN</span></h2></li>
            <li>
              <el-form-item prop="username">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  name="username"
                  placeholder="请输入您的登录账号"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                  prefix-icon="el-icon-s-custom"
                  size="big"
                />
              </el-form-item>
            </li>
            <li>
              <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="请输入正确的登录密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                    prefix-icon="el-icon-lock"
                    size="big"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>
              </el-tooltip>
            </li>
            <li>
              <el-form-item prop="identifyCode">
                <el-input
                  ref="identifyCode"
                  v-model="loginForm.identifyCode"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-house"
                  name="identifyCode"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                  maxlength="6"
                  size="big"
                  class="ipt_login"
                  style="margin-right: 2%;"
                />
              </el-form-item>
              <div class="sIdentify" @click="refreshCode">
                <s-identify :identify-code="identifyCode" :contentWidth="contentWidth" :contentHeight="contentHeight" />
              </div>
            </li>
            <li><el-button :loading="loading" type="primary" class="btn_login" @click.native.prevent="handleLogin">立即登录</el-button></li>
            <li><router-link to="/register">账户注册</router-link> | <router-link :to="{ path: '/forgetPwd' }">忘记密码</router-link> | <router-link :to="{ path: '/resetPwd' }">修改密码</router-link></li>
          </ul>
          <router-link :to="{ path: '/online-complaints' }" class="nl_l_btn"><img src="../../assets/img/online.png">在线投诉处理</router-link>
          <router-link :to="{ path: '/firmInfo-search' }" class="nl_l_btn"><img src="../../assets/img/menology_h.png">企业信息查询</router-link>
        </el-form>
      </div>
      <div class="nl_r">
        <div class="nl_r_list">
          <h5>公示信息<router-link to="/newslist" class="btn_more">更多</router-link></h5>
          <ul>
            <li><b>&nbsp;</b><router-link to="/news">国人免签国家新增27个</router-link><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">全球最高级别！山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业金城：党建引领 助推经营</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业洪都岗位梁小春：潜心钻研的数控机加能手</a><span>2019-02-07</span></li>
          </ul>
        </div>
        <div class="nl_r_list nl_r_list_b">
          <h5>公示信息<a href="javascript:;" class="btn_more">更多</a></h5>
          <ul>
            <li><b>&nbsp;</b><a href="javascript:;">全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业西飞模具锻铸厂钳工任晓洲：微薄之力献航空</a><span>2019-02-07</span></li>
          </ul>
        </div>
        <div class="nl_r_list nl_r_list_b" style="margin-left: 6px;">
          <h5>公示信息<a href="javascript:;" class="btn_more">更多</a></h5>
          <ul>
            <li><b>&nbsp;</b><a href="javascript:;">全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">党建引领 助推经营</a><span>2019-02-07</span></li>
          </ul>
        </div>
      </div>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
    </footer>
  </div>
</template>

<script>
import SIdentify from './components/identify'
import { getValidateCode } from '@/api/system/comm/comm'

export default {
  name: 'newLogin',
  components: { SIdentify },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不能少于8个字符！'))
      } else {
        callback()
      }
    }
    return {
      identifyCode: '',
      contentWidth: 150,
      contentHeight: 40,
      loginForm: {
        username: '李科建',
        password: '123456789',
        identifyCode: ''
      },
      loginRules: {
        username: [],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        // identifyCode: [{ required: true, trigger: ['blur', 'change'], validator: validateIdentifyCode }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.loginForm.identifyCode = ''
    this.makeCode()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    refreshCode() {
      this.loginForm.identifyCode = ''
      this.makeCode()
    },
    makeCode() {
      getValidateCode().then(response => {
        this.identifyCode = response.data.validateCode
        this.loginForm.identifyCode = response.data.validateCode
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$router.push({ path: "/register", query: {} });
    },
    handleLogin() {
      var loginFormEcode = {
        username: this.loginForm.username,
        password: this.$encruption(this.loginForm.password.trim()),
        validateCode: this.loginForm.identifyCode
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', loginFormEcode)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((err) => {
              this.$message.error(err)
              this.loginForm.username = ''
              this.loginForm.password = ''
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/register.scss';
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .contont-main {
    .nl_l, .nl_r {
      position: absolute;
      top: 10px;
    }

    .nl_l {
      width: 368px;
      height: 520px;
      left: 0;
      box-sizing: border-box;
      ul {
        border: 1px solid #007aad;
        background-color: #e2f5ff;
        margin-bottom: 12px;
        padding: 0 19px 19px 19px;
        li {
          margin-bottom: 10px;
          position: relative;
          h2 {
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #999;
            background: url('../../assets/img/login.png') left center no-repeat;
            padding-left: 60px;
            color: #000;
            font-size: 25px;
            span {
              font-size: 18px;
              color: #666;
            }
          }
          .show-pwd {
            position: absolute;
            right: 10px;
            top: 3px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
          }
          .sIdentify {
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;
          }
          .ipt_login {
            display: inline-block;
            width: 49%;
          }
          .btn_login {
            width: 100%;
            text-align: center;
            color: #fff;
            font-size: 20px;
          }
        }
        li:last-child {
          text-align: center;
          margin-top: 30px;
          color: #008dff;
        }
      }
      .nl_l_btn {
        display: block;
        background-color: #008dff;
        margin-bottom: 10px;
        height: 50px;
        width: 100%;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        img {
          width: 40px;
          height: 37px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }

    .nl_r {
      right: 0px;
      width: 820px;
      .nl_r_list, .nl_r_list_b {
        overflow: hidden;
        border: 1px solid #e5e5e5;
        margin-bottom: 10px;
        h5 {
          background-color: #008dff;
          padding-left: 20px;
          color: #fff;
          height: 46px;
          line-height: 46px;
          font-size: 16px;
          position: relative;
          a {
            display: inline-block;
            position: absolute;
            right: 20px;
            top: 0px;
          }
        }
        ul {
          padding: 0 20px;
          background-color: #fff;
          padding-bottom: 10px;
        }
        ul li {
          line-height: 38px;
          border-bottom: 1px dashed #e5e5e5;
          position: relative;
          a {
            display: inline-block;
            list-style: none;
            width: 65%;
            height: inherit;
            vertical-align: middle;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          b {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            width: 5px;
            height: 5px !important;
            background-color: #000;
          }
          span {
            position: absolute;
            right: 5px;;
          }
        }
        ul li:last-child {
          border: none;
        }
      }
      .nl_r_list_b {
        width: 407px;
        float: left;
        box-sizing: border-box;
      }
    }
  }
</style>
