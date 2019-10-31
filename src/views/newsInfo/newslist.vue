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
      <div class="news-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/newlogin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="new-content">
        <el-card>
          <ul>
            <li><b>&nbsp;</b><router-link to="/news">中国航协秘书长刘树国带队赴意大利米兰参加国际餐饮食品展览会</router-link><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业西飞模具锻铸厂钳工任晓洲：微薄之力献航空</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">全球最高级别！山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业金城：党建引领 助推经营</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业洪都岗位梁小春：潜心钻研的数控机加能手</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">全球航空客运需求增长放缓</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业西飞模具锻铸厂钳工任晓洲：微薄之力献航空</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><router-link to="/news">国人免签国家新增27个</router-link><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">全球最高级别！山航获得国际航协NDC Level 4认证！</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">中国航协召开新闻媒体交流座谈会</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业金城：党建引领 助推经营</a><span>2019-02-07</span></li>
            <li><b>&nbsp;</b><a href="javascript:;">航空工业洪都岗位梁小春：潜心钻研的数控机加能手</a><span>2019-02-07</span></li>
          </ul>
        </el-card>
      </div>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NewsList',
  data() {
      return {
      }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/register.scss';
  .contont-main {
    overflow: hidden;
    padding-bottom: 10px;
    .news-breadcrumb {
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      .news_title {
        width: 84px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .new-content {
      height: 520px;
      overflow-y: auto;
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
  }

</style>
