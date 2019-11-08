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
          <el-breadcrumb-item :to="{ path: '/newslist' }">新闻列表</el-breadcrumb-item>
          <el-breadcrumb-item class="news_title">中国航协秘书长刘树国带队赴意大利米兰参加国际餐饮食品展览会</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="new-content">
        <el-card>
          <h3>中国航协秘书长刘树国带队赴意大利米兰参加国际餐饮食品展览会</h3>
          <p>2019-10-23</p>
          <div class="new-con-c">
            <p>2019年10月17日-21日，中国航协秘书长刘树国带队赴意大利米兰参加国际餐饮食品展览会，中国航协航空食品分会主要会员单位负责人一行20余人一同随行前往。米兰国际餐饮食品展览会是意大利最有影响的餐饮食品专业展会，是欧洲最大的酒店餐饮和食品加工设备用品展览会之一。该展由米兰国际展览公司主办，每两年举办一届，来自世界各国的2000家相关企业参展，面积达到100000平方米。</p>
            <img src="http://www.cata.org.cn/XWZX/XHDT/201910/W020191024297702768285.jpg" />
            <p>代表团与主要参展商合影</p>
            <p>展会上，代表团成员与多家参展商积极交流，对目前国际食品行业的新理念、新技术、新设备有了耳目一新的直观认识，几家航空食品会员企业对参展展商的食品加工生产设备显示出浓厚的兴趣，初步达成了购买意向。</p>
            <img src="http://www.cata.org.cn/XWZX/XHDT/201910/W020191024297702928133.jpg" />
            <p>参观访问米兰佳美航空食品公司</p>
            <p>代表团还访问了米兰机场附近的佳美航空配餐公司，并参观其生产加工车间，了解流程管理、生产设备新技术。佳美公司的负责人专程从罗马赶到米兰，热情接待了中国航协代表团，并陪同参观详细介绍了公司的主要生产经营情况。</p>
            <p>通过此次参访，中国航协航空食品分会的主要会员单位进一步开拓了视野，掌握了国际食品行业的最新动态，增进了会员单位之间的交流沟通，增强了协会的凝聚力。大家纷纷表示组织出访交流是航食分会服务会员的一项重要工作内容，很多会员都是从始至终积极参与，并希望能够继续提供更多这样的机会，也同时对协会顺利组织此次出访所做的工作表示由衷的感谢。</p>
          </div>
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
  name: 'News',
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
      overflow: hidden;
      h3, p {
        text-align: center;
        margin: 0;
        padding: 0;
      }
      h3 {
        border-bottom: 1px solid #bfbfc0;
        font-size: 20px;
        line-height: 50px;
        margin-bottom: 10px;
      }
      p {
        line-height: 20px;
        margin-bottom: 20px;
      }
      .new-con-c {
        padding: 0 30px;
        text-align: center;
        height: 520px;
        overflow-y: auto;
        p {
          text-align: justify;
          line-height: 30px;
          text-indent: 2em;
        }
      }
    }
  }

</style>
