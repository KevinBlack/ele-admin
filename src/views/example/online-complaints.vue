<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-header class="header-throwsf">
        <el-row>
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="14">
            <img src="../../assets/img/logo.png" style="margin-top: 20px;" height="60">
          </el-col>
          <el-col :span="2">
            <el-row>
              <img src='../../assets/img/menology_n.png' style="vertical-align: middle;margin-right: 5px;" height="30">
              <div class="head_group">
                <span class="head_group_day">2019年9月26日</span>
                <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;<span class="head_group_time">14:44</span></span>
              </div>
            </el-row>
          </el-col>
          <el-col :span="4">&nbsp;</el-col>
        </el-row>
      </el-header>
    </el-col>
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="16">
      <el-card style="min-height: 650px;margin-bottom: 140px;">
        <el-col :span="24" class="onl-con-c" style="padding-top: 20px;">
          <h3>在线投诉</h3>
        </el-col>
        <el-form ref="detailForm" :model="detailForm" label-width="150px">
          <el-row :gutter="22">
            <el-col :span="11">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="detailForm.complaintTheme" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉人" size="mini" prop="complainant">
                <el-input v-model="detailForm.complainant" size="mini"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="22">
            <el-col :span="11">
              <el-form-item label="联系方式" size="mini" prop="contractInformation">
                <el-input v-model.number="detailForm.contractInformation" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contractEmail">
                <el-input v-model.number="detailForm.contractEmail" size="mini"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="22">
            <el-col :span="22">
              <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
                <el-input
                  type="textarea"
                  v-model="detailForm.complaintsContents"
                  size="mini"
                  :rows="4"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <div style="text-align: right;">
                <el-button type="primary" icon="el-icon-check" style="padding: 10px 20px;" @click="saveComplainInfo">保存</el-button>
              </div>
            </el-col>
          </el-row>

        </el-form>
      </el-card>
    </el-col>
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="24">
      <el-footer class="footer-throwsf">
        <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
      </el-footer>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { saveComplainInfo } from "@/api/hxxd/complaintInfo";
export default {
  data() {
    return {
      detailForm: {
        complaintTheme: "",
        complainant: "",
        contractInformation: "",
        contractEmail: "",
        complaintsContents: ""
      }
    };
  },
  created() {
  },
  methods: {
    saveComplainInfo() {
      const {
        complaintTheme,
        complainant,
        contractInformation,
        contractEmail,
        complaintsContents
      } = this.detailForm;
      saveComplainInfo({
        complaintTheme,
        complainant,
        contractInformation,
        contractEmail,
        complaintsContents
      }).then(response => {
        if(response.status===200){
        this.$message({
          message: response.message,
          path: "/hxxd/complaintInfo"
        });
      this.$router.push({
        path: "/newlogin",
        query: {}
      });
      }else{
        this.$message({
          message: response.message,
          path: "/hxxd/complaintInfo"
        });
      }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/register.scss';

  .onl-con-c {
    text-align: center;
    margin-bottom: 50px;
    h3 {
      border-bottom: 1px solid #bfbfc0;
      font-size: 30px;
      height: 60px;
      line-height: 10px;
    }
  }
</style>
