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
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <el-row :gutter="20" class="area_border">
          <el-col><h2>name</h2></el-col>
        </el-row>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="princeInfo">
            111
          </el-tab-pane>
          <el-tab-pane label="投诉信息" name="princeList">
            222
          </el-tab-pane>
          <el-tab-pane label="安全事件" name="princeList">
            333
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
    </footer>
  </div>
</template>

<script>
import { selectComponyRelevent } from "@/api/hxxd/agent";

export default {
  data() {
    return {
      Height: 0,
      input3: '',
      activeName: 'princeInfo'
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194;
    if (this.Height < 520) {
      this.Height = 520
    }
　　//监听浏览器窗口变化
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    next() {
      this.$router.push({ path: "/firmInfo", query: {} });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/register.scss';
@import '~@/styles/hxxd.scss';

.detailsContainer {
  min-height: 520px;
  overflow: hidden;
  text-align: center;
  position: relative;
}
</style>
