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
      <el-card>
        <h3>新闻标题</h3>
        <p>2019-10-23</p>
        <div v-html="editorContent" class="new-con-c">
          {{ this.editorContent }}
        </div>
      </el-card>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
    </footer>
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
  @import '../../styles/register.scss';
  .contont-main {
    width: 1200px;
    min-height: 520px;
    margin: 0 auto;
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
</style>
