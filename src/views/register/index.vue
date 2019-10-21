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
      <el-col :span="18">
        <div class="reg-content">
          <el-row>
            <el-col :span="24" class="reg-con-c">
              <h3>账户注册</h3>
            </el-col>
            <el-col :span="24">
              <el-steps :active="active" finish-status="success" align-center>
                <el-step title="选择用户类型"></el-step>
                <el-step title="基本信息录入"></el-step>
                <el-step title="账户信息录入"></el-step>
                <el-step title="注册信息展示"></el-step>
              </el-steps>
            </el-col>
            <el-form ref="ruleForm" label-width="150px" size="mini">
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="19" style="margin-top: 90px;">
                <el-form-item label="公司名称" prop="number">
                  <el-input />
                </el-form-item>
                <el-form-item label="公司英文名称" prop="number">
                  <el-input />
                </el-form-item>
                <el-form-item label="社会统一信用代码" prop="number">
                  <el-input />
                </el-form-item>
                <el-form-item label="公司类型" prop="number">
                  <el-input />
                </el-form-item>
                <el-form-item label="账号" prop="number">
                  <el-input />
                </el-form-item>
                <el-form-item label="账号" prop="number">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="3">&nbsp;</el-col>
            </el-form>
            <el-col :span="24" class="reg-con-c">
              <el-button type="primary" style="margin-top: 50px;" @click="next">{{ btnMassage }}</el-button>
            </el-col>
          </el-row>
        </div>
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
        active: 0,
        btnMassage: '下一步'
      };
    },
    methods: {
      next() {
        console.log(this.active)
        if (this.active++ > 2) {
          this.btnMassage = '完成'
          this.$router.push({ path: "/newlogin", query: {} });
        }
      }
    }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'Microsoft Yahe';
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

  .reg-content {
    .reg-con-c {
      text-align: center;
      margin-bottom: 20px;
      h3 {
        border-bottom: 1px solid #bfbfc0;
        font-size: 30px;
        height: 60px;
        line-height: 10px;
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
  }
</style>
