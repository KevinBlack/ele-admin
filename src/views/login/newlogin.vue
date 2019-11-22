<template>
  <div class="app-wrapper">
    <header-reload />
    <div ref="contontMain" class="contont-main" v-bind:style="{minHeight: Height+'px'}">
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
            <li><router-link to="/register">账户注册</router-link> | <router-link :to="{ path: '/forgetPwd' }">忘记密码</router-link></li>
            <!--  | <router-link :to="{ path: '/resetPwd' }">修改密码</router-link> -->
          </ul>
          <router-link :to="{ path: '/online-complaints' }" class="nl_l_btn"><img src="../../assets/img/online.png">在线投诉处理</router-link>
          <router-link :to="{ path: '/firmInfo-search' }" class="nl_l_btn"><img src="../../assets/img/menology_h.png">企业信息查询</router-link>
        </el-form>
      </div>
      <div class="nl_r">
        <div class="nl_r_list">
          <!-- <h5><i class="iconfont">&#xe6aa;</i> 站内新闻<router-link :key="$route.fullPath" :to="{name: 'NewsList', query: {id: 1}}" class="btn_more">更多</router-link></h5> -->
          <h5><i class="iconfont">&#xe6aa;</i> 站内新闻<el-button type="text" @click="handleMoreNews" class="btn_more">更多</el-button></h5>
          <ul>
            <li v-for="(item, index) in newsList" v-if="index<6"><b>&nbsp;</b><router-link :to="{name: 'News', params: {id: item.id}}">{{ item.industryTitle }}</router-link><span>{{ item.publishTime }}</span></li>
          </ul>
        </div>
        <div class="nl_r_list nl_r_list_b">
          <h5><i class="iconfont">&#xe714;</i> 公示信息<router-link :key="$route.fullPath" :to="{name: 'NewsList', query: {id: 2}}" class="btn_more">更多</router-link></h5>
          <ul>
            <li v-for="(item, index) in pubList" v-if="index<5"><b>&nbsp;</b><router-link :to="{name: 'News', params: {id: item.id}}">{{ item.industryTitle }}</router-link><span>{{ item.publishTime }}</span></li>
          </ul>
        </div>
        <div class="nl_r_list nl_r_list_b" style="margin-left: 6px;">
          <h5><i class="iconfont">&#xe634;</i> 最新动态<router-link :key="$route.fullPath" :to="{name: 'NewsList', query: {id: 3}}" class="btn_more">更多</router-link></h5>
          <ul>
            <li v-for="(item, index) in hotList" v-if="index<5"><b>&nbsp;</b><router-link :to="{name: 'News', params: {id: item.id}}">{{ item.industryTitle }}</router-link><span>{{ item.publishTime }}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import SIdentify from './components/identify'
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'
import { getValidateCode } from '@/api/system/comm/comm'
import { selectIndustry } from '@/api/hxxd/industryInfoPublish';

export default {
  name: 'newLogin',
  components: { SIdentify, FooterReload, HeaderReload },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不能少于8个字符！'))
      } else {
        callback()
      }
    }
    return {
      Height: 0,
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
      otherQuery: {},
      newsList: [],
      pubList: [],
      hotList: [],
      formQuery: {
        industryType: '',
        industryTitle: '',
        industryContent: '',
        modifyTime: '',
        publishStatus: 1
      }
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
    console.log(this.$refs.contontMain.offsetHeight)
    this.Height = document.documentElement.clientHeight - 194;
　　//监听浏览器窗口变化　
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.loginForm.identifyCode = ''
    this.makeCode()
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.tableLoading = true
      selectIndustry(this.formQuery).then(response => {
        for (const k in response.data) {
          if (response.data[k].industryType === 1) {
            this.newsList.push(response.data[k])
          } else if (response.data[k].industryType === 2) {
            this.pubList.push(response.data[k])
          } else if (response.data[k].industryType === 3) {
            this.hotList.push(response.data[k])
          }
        }
      })
    },
    handleMoreNews() {
      this.$router.push({name:'NewsList', query:{id: 1}})
    },
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
  @import '~@/styles/register.scss';

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
            color: #889aa4;
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
        height: 80px;
        width: 100%;
        line-height: 77px;
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
      .nl_r_list {
        height: 290px;
      }
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
          i {
            font-weight: lighter;
          }
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
          min-height: 220px;
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
            display: inline-block;
            width: 100px;
            height: 38px;
            text-align: right;
            overflow: hidden;
            position: absolute;
            right: 0px;
          }
        }
        ul li:last-child {
          border: none;
        }
      }
      .nl_r_list_b {
        width: 407px;
        height: 250px;
        float: left;
        box-sizing: border-box;
      }
    }
  }
</style>
