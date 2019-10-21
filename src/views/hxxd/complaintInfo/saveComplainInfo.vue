<template>
    <el-card class="detailsContainer">
      <el-row>
      <el-col :span="12">
        <h3><i class="el-icon-tickets" style="color: #67C23A;margin-right: 5px;" />投诉信息</h3>
      </el-col>
    </el-row>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row :gutter="20">
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
            </el-row>
            <el-row :gutter="20">
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
             </el-row>
            <el-row :gutter="20">
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
<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409EFF;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
</style>
