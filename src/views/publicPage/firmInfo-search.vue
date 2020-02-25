<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{height: Height+'px'}">
      <!-- <el-card :class="{detailsContainer: seeClass, detailsContainerL:seeNo}"> -->
      <el-card :class="{detailsContainer: seeClass, detailsContainerL:seeNo}">
        <h1>企业信息查询</h1>
        <el-input placeholder="请输入要查询的企业名称、法人或统一社会信用代码" v-model="formQuery.businessName" class="input-with-select" @keyup.enter.native="getTableList" style="width: 70%;vertical-align: middle;">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="getTableList">查 询</el-button>
        </el-input>
          <ul class="search_list" v-show="seeNo">
            <li v-for="(item) in tableData" :key="item.id">
              <p><a @click="handleClick(item.socialCode)">{{ item.businessName }}</a></p>
              <p><span><i class="iconfont">&#xe634;</i>统一社会信用代码：{{ item.socialCode }}</span><span><i class="el-icon-user"></i>法定代表人：{{ item.name }}</span></p>
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
      if(this.formQuery.businessName.split(" ").join("").length == 0){
        this.seeNo=false
        this.seeClass=true
        this.$message({
          type: "false",
          message: "请输入相关数据"
        })
        return
      } else{
        selectComponyByParam(this.formQuery).then(response => {
          console.log(response.data)
          if (response.data.length === 0) {
            this.seeNo = false
            this.seeClass = true
            this.$message({
            type: "warning",
            message: "没有相应数据，请输入正确的信息"
          })
          } else {
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
        color:rgb(100, 100, 100);
        font-size: 18px;
        font-weight: 550;
      }
      p {
        span {
          display: inline-block;
          width: 35%;
          font-size: 12px;
          color: rgb(105, 105, 105);
          margin-right: 20px;
          i {
            font-size: 12px;
            margin-right: 5px;
            color: rgb(84, 156, 214);
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
