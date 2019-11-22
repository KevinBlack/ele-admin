<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{height: Height+'px'}">
      <el-card :class="{detailsContainer: seeClass, detailsContainerL:seeNo}">
        <h1>企业信息查询</h1>
        <el-input placeholder="请输入要查询的企业名称、法人或统一社会信用代码" v-model="formQuery.businessName" class="input-with-select" @keyup.enter.native="getTableList" style="width: 70%;vertical-align: middle;">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="getTableList">查 询</el-button>
        </el-input>
          <ul class="search_list" v-show="seeNo">
            <li v-for="(item) in tableData" :key="item.id">
              <p><a @click="handleClick(item.socialCode)">{{ item.businessName }}</a></p>
              <p><span><b>法定代表人：</b>{{ item.name }}</span><span><b>地址：</b>{{ item.businessAddress }}</span></p>
            </li>
          </ul>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import { selectComponyByParam } from "@/api/hxxd/agent";
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'

export default {
  components: { FooterReload, HeaderReload },
  data() {
    return {
      Height: 0,
      formQuery: {
        businessName: "",
        pageNo: 1,
        pageSize: 5,
      },
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      seeNo: false,
      seeClass: true
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194;
　　//监听浏览器窗口变化
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
  },
  methods: {
    handleClick(paramCode) {
      const socialCreditCode = paramCode
      this.$router.push({ path: "/firmInfo", query: {socialCreditCode} })
    },
    handleSizeChange(val) {
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true;
      selectComponyByParam(this.formQuery).then(response => {
        if(this.formQuery.businessName.split(" ").join("").length == 0){
          this.seeNo=false
            this.$message({
              type: "false",
              message: "请输入相关数据"
          })
        }else{
          this.seeNo = true
          this.seeClass = false
          this.tableData = response.data
          this.pageTotal = response.page.total
          this.tableLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/register.scss';

.detailsContainer, .detailsContainerL {
  min-height: 537px;
  height: 537px;
  overflow: hidden;
  text-align: center;
  padding-top: 150px;
  position: relative;
  .search_list {
    width: 70%;
    height: 400px;
    margin: auto;
    padding: 0;
    overflow-y: auto;
    li {
      text-align: left;
      line-height: 30px;
      margin-top: 20px;
      a {
        color:#409EFF;
        text-decoration: underline;
      }
      p {
        span {
          font-size: 12px;
          margin-right: 20px;
          b {
            font-size: 12px;
            color: #67C23A;
          }
        }
      }
    }
  }
  h1 {
    line-height: 50px;
    font-size: 30px;
    color: #409EFF;
    font-weight: bolder;
  }
}
.detailsContainerL {
  padding-top: 0;
}
</style>
