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
    <el-card style="min-height: 520px;">
      <el-col :span="24" class="rstpswd-c" style="padding-top: 20px;">
        <h3>重置密码</h3>
      </el-col>
      <el-form label-width="150px">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="12">
            <el-row>
              <el-col>
                <el-form-item label="新密码" size="mini">
                  <el-input size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="确认新密码" size="mini">
                  <el-input size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <div style="text-align: center;">
                  <el-button type="primary" style="padding: 10px 20px;margin-top: 20px;" @click="handleSbmit">提交</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">&nbsp;</el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
  <footer class="footer-throwsf">
    <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
  </footer>
</div>
</template>

<script>
export default {
  name: 'CheckPwd',
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    handleSbmit() {
      this.$router.push('/successPage')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/register.scss';
  .contont-main {
    .rstpswd-c {
      text-align: center;
      margin-bottom: 100px;
      h3 {
        border-bottom: 1px solid #bfbfc0;
        font-size: 30px;
        height: 60px;
        line-height: 10px;
      }
    }
  }

</style>
