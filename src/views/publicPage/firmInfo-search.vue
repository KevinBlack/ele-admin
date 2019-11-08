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
    <el-card class="detailsContainer" style="min-height: 520px;text-align: center;padding-top: 150px;">
      <h1>企业信息查询</h1>
      <el-input placeholder="请输入内容" v-model="formQuery.businessName" class="input-with-select" style="width: 70%;vertical-align: middle;">
        <el-button slot="append" type="primary" icon="el-icon-search" @click="getTableList">查 询</el-button>
      </el-input>
        <ul class="search_list" v-show=seeNo>
          <li v-for="(item) in tableData" :key="item.id"><a @click="handleClick(item.id)">{{ item.businessName }}</a></li>
        </ul>
    </el-card>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
    </footer>
  </div>
</template>

<script>
import { getCompanyInfoList} from "@/api/hxxd/agent";
export default {
  data() {
    return {
       formQuery: {
        businessName: "",
        pageNo: 1,
        pageSize: 5,
      },
      pageTotal: 0,
      tableLoading: false,
      tableData: []
    }
  },
   created() {
    this.seeNo=false
  },
  methods: {
    handleClick(paramId) {
      console.log(paramId)
      var id = paramId
      this.$router.push({ path: "/firmInfo", query: {id} });
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      getCompanyInfoList(this.formQuery).then(response => {
        if(this.formQuery.businessName.split(" ").join("").length == 0){
          this.seeNo=false
              this.$message({
                type: "false",
                message: "请输入相关数据"
              });
        }else{
          this.seeNo=true
          this.tableData = response.data;
          this.pageTotal = response.page.total;
          this.tableLoading = false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/register.scss';

.detailsContainer {
  min-height: 520px;
  overflow: hidden;
  text-align: center;
  padding-top: 150px;
  position: relative;
  .search_list {
    width: 70%;
    height: 500px;
    margin: auto;
    padding: 0;
    overflow-y: auto
    li {
      text-align: left;
      line-height: 40px;
    }
  }
  h1 {
    line-height: 50px;
    font-size: 30px;
    color: #409EFF;
    font-weight: bolder;
  }
}
</style>
