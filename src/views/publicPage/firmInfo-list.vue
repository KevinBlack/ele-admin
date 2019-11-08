<template>
  <div class="app-wrapper">
    <el-row>
      <el-col :span="24">
        <el-header class="header-throwsf">
          <el-row>
            <el-col :span="20">
              <img src="../../assets/img/logo.png" style="margin-top: 20px;" height="60">
            </el-col>
            <el-col :span="4">
              <el-row>
                <img src='../../assets/img/menology_n.png' style="vertical-align: middle;margin-right: 5px;" height="30">
                <div class="head_group">
                  <span class="head_group_day">2019年9月26日</span>
                  <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;<span class="head_group_time">14:44</span></span>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-header>
      </el-col>
      <el-col :span="20" :offset="2">
        <el-card class="detailsContainer" style="min-height: 600px;text-align: center;padding-top: 0px;">
          <h1>企业信息查询</h1>
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width: 70%;vertical-align: middle;">
            <el-button slot="append" type="primary" icon="el-icon-search">查 询</el-button>
          </el-input>
          <ul>
            <li><a href="#" @click="next">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
            <li><a href="#">信息列表</a></li>
          </ul>
        </el-card>
      </el-col>
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
  data() {
    return {
      input3: ''
    }
  },
  methods: {
    next() {
      this.$router.push({ path: "/firmInfo", query: {} });
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  font-weight: normal;
  font-size: 14px;
}
ul, li {
  list-style: none;
}
.header-throwsf {
    width: 100%;
    // position: fixed;
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
    // position: fixed;
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
.detailsContainer {
  position: relative;
  margin-bottom: 20px;
  h1 {
    line-height: 50px;
    font-size: 30px;
    color: #409EFF;
    font-weight: bolder;
  }
  ul {
    width: 70%;
    height: 400px;
    margin: 30px auto;
    overflow-y: auto;
    li {
      line-height: 40px;
      text-align: left;
    }
  }
}
.comName {
  position: absolute;
  text-align: right;
  right: 50px;
  top: 35px;
  z-index: 9000;
  color: #409EFF;
}
.dtl-hint {
  border-radius: 3px;
  text-align: center;
  background-color: #eef5fe;
}
.dtl-hint, .status-pass, .status-unpass {
  height: 40px;
  line-height: 40px;
}
.dtl-hint, .status-pass {
  color: #67C23A;
}
.status-unpass {
  color: #F56C6C;
}
table {
  width: 100%;
  border: 1px solid #e6e6e6;
  border-collapse: collapse;
}
table tr {
  border-bottom: 1px solid #e6e6e6;
  height: 40px;
  line-height: 40px;
}
table tr th {
  text-align: left;
  color: #409EFF;
  font-weight: bolder;
  padding-left: 1em;
}
table tr td {
  padding-left: 1em;
  border-right: 1px solid #e6e6e6;
}
.table_title {
  background-color: #f2f2f2;
  color: #555;
  width: 150px;
  text-align: center;
  padding: 0;
}
</style>
