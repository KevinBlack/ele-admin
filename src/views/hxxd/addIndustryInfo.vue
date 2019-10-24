<template>
    <el-card class="detailsContainer">
      <el-row>
      <el-col :span="12">
        <h3><i class="el-icon-tickets" style="color: #67C23A;margin-right: 5px;" />行业信息</h3>
      </el-col>
    </el-row>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="行业类型" size="mini" prop="industryType">
                <el-select v-model="detailForm.industryType" filterable placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    style="width:100%"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布内容" size="mini" prop="industryContent">
                <el-input v-model="detailForm.industryContent" size="mini"></el-input>
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
import { addIndustryInfo } from "@/api/hxxd/industryInfoPublish";
export default {
  data() {
    return {
      detailForm: {
        industryType: "",
        industryContent: ""
      },
      statusOptions: [
        {
          value: 1,
          label: '消代分会'
        },
        {
          value: 2,
          label: '航食分会'
        }
      ]
    };
  },
  created() {
  },
  methods: {
    saveComplainInfo() {
      const {
        industryType,
        industryContent
      } = this.detailForm;
      addIndustryInfo({
        industryType,
        industryContent
      }).then(response => {
        this.$message({
          type: response.type,
          message: response.message,
          path: "/hxxd/complaintInfo"
        });
      this.$router.push({
        path: "/hxxd/selectIndustryInfo",
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
