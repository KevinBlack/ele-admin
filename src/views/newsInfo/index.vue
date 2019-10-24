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
      <el-col :span="22" :offset="1">
        <el-card class="new-content">
          <h3>新闻标题</h3>
          <p>2019-10-23</p>
          <div v-html="editorContent" class="new-con-c">
            {{ this.editorContent }}
          </div>
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
  name: 'NewsInfo',
  data() {
      return {
        editorContent: ''
      };
    },
    mounted() {
      this.editorContent = this.$route.params.edCont
    },
    methods: {

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

  .new-content {
    margin-bottom: 20px;
    min-block-size: 650px;
    h3, p {
      text-align: center;
      margin: 0;
      padding: 0;
    }
    h3 {
      border-bottom: 1px solid #bfbfc0;
      font-size: 30px;
      line-height: 50px;
      margin-bottom: 10px;
    }
    p {
      line-height: 20px;
    }
    .new-con-c {
      padding: 0 20px;
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
