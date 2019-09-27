<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="title-cls">投诉信息</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="detailForm.complaintTheme" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投诉人" size="mini" prop="complainant">
                <el-input v-model="detailForm.complainant" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" size="mini" prop="contractInformation">
                <el-input v-model.number="detailForm.contractInformation" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系邮箱" size="mini" prop="contractEmail">
                <el-input v-model.number="detailForm.contractEmail" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
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
            <el-col :span="24">
              <div style="text-align: right;">
                <el-button type="primary" icon="el-icon-check" @click="saveComplainInfo">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
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
        this.$message({
          type: "success",
          message: "处理成功",
          path: "/hxxd/complaintInfo"
        });
      this.$router.push({
        path: "/hxxd/complaintInfo",
        query: {}
      });

      })
    }
  }
}
</script>
<style>
.title-cls {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
}
</style>
