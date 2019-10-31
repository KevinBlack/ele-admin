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
        <el-card class="detailsContainer" style="min-height: 600px;text-align: center;padding-top: 150px;">
          <h1>企业信息查询</h1>
          <el-input placeholder="请输入内容" v-model="formQuery.businessName" class="input-with-select" style="width: 70%;vertical-align: middle;">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="getTableList">查 询</el-button>
          </el-input>
            <ul class="search_list" v-if="seeNo">
              <li v-for="(item) in tableData" :key="item.id"><a @click="handleClick(item.id)">{{ item.businessName }}</a></li>
            </ul>
        </el-card>
        <!-- 分页 -->
          <el-pagination
            background
            style="text-align: margin-top: 20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="formQuery.pageNo"
            :page-size.sync="formQuery.pageSize"
            :page-sizes="[5, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          ></el-pagination>
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

  .detailsContainer{
    .search_list {
      width: 70%;
      margin: auto;
      padding: 0;
      li {
        text-align: left;
        line-height: 40px;
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
