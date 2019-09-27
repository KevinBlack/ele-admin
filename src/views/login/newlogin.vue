<template>
  <div class="app-wrapper">
    <el-row>
      <el-col :span="24">
        <el-header class="header-throwsf">
          <el-row>
            <el-col :span="20">
              <img src="../../assets/img/logo.png" style="margin-top: 20px;" height="60"/>
            </el-col>
            <el-col :span="4">
              <el-row>
                <img src='../../assets/img/menology_n.png' style="vertical-align: middle;margin-right: 5px;" height="30" />
                <div class="head_group">
                  <span class="head_group_day">2019年9月26日</span>
                  <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;<span class="head_group_time">14:44</span></span>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-header>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18" class="newlog">
        <el-row>
          <el-col :span="8">
            <div class="nl_l">
              <ul>
                <li><h2>用户登录&nbsp;&nbsp;<span>USER&nbsp;LOGIN</span></h2></li>
                <li><el-input placeholder="请输入您的登录账号" prefix-icon="el-icon-s-custom" size="big"  /></li>
                <li><el-input placeholder="请输入正确的登录密码" prefix-icon="el-icon-lock" size="big" /></li>
                <li><el-input placeholder="请输入验证码" prefix-icon="el-icon-house" size="big" class="ipt_login" style="margin-right: 2%;" /><el-input size="big" class="ipt_login" /></li>
                <li><el-button type="primary" class="btn_login">立即登录</el-button></li>
                <li><a href="javascript:;">账户注册</a> | <a href="javascript:;">忘记密码</a> | <a href="javascript:;">修改密码</a></li>
              </ul>
              <a href="javascript:;" class="nl_l_btn"><img src="../../assets/img/online.png"/>在线投诉处理</a>
              <a href="javascript:;" class="nl_l_btn"><img src="../../assets/img/menology_h.png"/>企业信息查询</a>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col class="nl_r_list">
                <h5>公示信息<a href="javascript:;" class="btn_more">更多</a></h5>
                <ul>
                  <li><b>&nbsp;</b><a href="javascript:;">航协数据显示：全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
                  <li><b>&nbsp;</b><a href="javascript:;">全球最高级别！山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
                  <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
                  <li><b>&nbsp;</b><a href="javascript:;">航空工业金城：党建引领 助推经营</a><span>2019-02-07</span></li>
                  <li><b>&nbsp;</b><a href="javascript:;">航空工业洪都岗位梁小春：潜心钻研的数控机加能手</a><span>2019-02-07</span></li>
                  <li><b>&nbsp;</b><a href="javascript:;">航空工业西飞模具锻铸厂钳工任晓洲：微薄之力献航空</a><span>2019-02-07</span></li>
                </ul>
              </el-col>
              <el-col>
                <el-row>
                  <el-col :span="12" style="box-sizing: border-box;padding-right:5px;height: 228px;">
                    <div class="nl_r_list">
                      <h5>公示信息<a href="javascript:;" class="btn_more">更多</a></h5>
                      <ul>
                        <li><b>&nbsp;</b><a href="javascript:;">全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
                      </ul>
                    </div>
                  </el-col>
                  <el-col :span="12" style="box-sizing: border-box;padding-left:5px;height: 228px;">
                    <div class="nl_r_list">
                      <h5>公示信息<a href="javascript:;" class="btn_more">更多</a></h5>
                      <ul>
                        <li><b>&nbsp;</b><a href="javascript:;">全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">党建引领 助推经营</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">航空工业洪都岗位梁小春</a><span>2019-02-07</span></li>
                        <li><b>&nbsp;</b><a href="javascript:;">航空工业西飞模具锻铸厂</a><span>2019-02-07</span></li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col>
        <el-footer class="footer-throwsf">
          <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'Microsoft Yahe';
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  ul, li {
    list-style: none;
  }

  .header-throwsf {
    width: 100%;
    position: fixed;
    left: 0;
    height: 120px !important;
    line-height: 120px;
    background: url('../../assets/img/header_bg.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    padding-left: 120px;
    top: 0;
    color: #fff;
    z-index: 1002;
    .head_group {
      display: inline-block;
      position: absolute;
      width: 120px;
      top: -10px;
      span {
        display: inline-block;
        position: absolute;
        color: #000;
      }
      .head_group_week {
        top: 20px;
      }
    }
  }

  .newlog {
    margin-top: 130px;
    .nl_l {
      box-sizing: border-box;
      padding-right: 10px;
      ul {
        border: 1px solid #007aad;
        background-color: #e2f5ff;
        margin-bottom: 10px;
        padding: 0 19px 19px 19px;
        li {
          margin-bottom: 10px;
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
          .ipt_login {
            display: inline-block;
            width: 49%;
          }
          .btn_login {
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;
            font-size: 24px;
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
        height: 100px;
        width: 100%;
        line-height: 100px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }

    .nl_r_list {
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
        height: 250px;
      }
      ul li {
        line-height: 38px;
        border-bottom: 1px dashed #e5e5e5;
        position: relative;
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
  }


  .footer-throwsf {
    width: 100%;
    position: fixed;
    height: 120px !important;
    line-height: 120px;
    font-size: 20px;
    text-align: center;
    bottom: 0;
    color: #000;
    z-index: 1000;
    background: #e8f5fc;
    a {
      font-size: 20px;
    }
  }
</style>
