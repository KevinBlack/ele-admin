<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="title-cls">安全事件信息</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="销售代理人" size="mini" prop="salesAgent">
                <el-input v-model="detailForm.salesAgent" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="航空公司" size="mini" prop="airlineCompany">
                <el-input v-model="detailForm.airlineCompany" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务类别" size="mini" prop="businessCategory">
                <el-input v-model="detailForm.businessCategory" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统一社会信用代码" size="mini" prop="unifiedCreditCode">
                <el-input type="textarea" v-model="detailForm.unifiedCreditCode" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="协议有效期" size="mini" prop="validityAgreement">
                <el-input v-model="detailForm.validityAgreement" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约航空公司两字代码" size="mini" prop="signAirlinesTwoWordCord">
                <el-input v-model="detailForm.signAirlinesTwoWordCord" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处罚类别" size="mini" prop="punishmentType">
                <el-input v-model="detailForm.punishmentType" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处罚原因" size="mini" prop="punishmentReasons">
                <el-input v-model="detailForm.punishmentReasons" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="表扬事件" size="mini" prop="praiseEvent">
                <el-input v-model="detailForm.praiseEvent" type="textarea" placeholder="请输入表扬事件" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div style="text-align: center;">
                <el-button type="primary" icon="el-icon-check" @click="saveSecurityIncident">保存</el-button>
                <el-button icon="el-icon-close" @click="cancel()">取消</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { saveSecurityIncident } from "@/api/hxxd/complaintInfo";
import { parseTime } from "@/utils/index.js";
import { parse } from "path";
export default {
  data() {
    return {
      detailForm: {
        salesAgent: '',
        airlineCompany: '',
        businessCategory: '',
        unifiedCreditCode: '',
        validityAgreement: '',
        signAirlinesTwoWordCord: '',
        punishmentType: '',
        punishmentReasons: '',
        praiseEvent: ''
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "companyName",
        children: "childs"
      },
      cascaderOpts: []
    };
  },
  created() {
  },
  methods: {
    saveSecurityIncident() {
      const {
        salesAgent,
        airlineCompany,
        businessCategory,
        unifiedCreditCode,
        validityAgreement,
        signAirlinesTwoWordCord,
        punishmentType,
        punishmentReasons,
        praiseEvent
      } = this.detailForm;
      saveSecurityIncident({
        salesAgent,
        airlineCompany,
        businessCategory,
        unifiedCreditCode,
        validityAgreement,
        signAirlinesTwoWordCord,
        punishmentType,
        punishmentReasons,
        praiseEvent
      }).then(response => {
        this.$message({
          type: "success",
          message: "添加成功",
          path: "/securityIncidents"
        });
         this.$router.push({
        path: "/hxxd/securityIncidents",query: {}
      });
      });
    },
      cancel() {
       this.$router.push({
        path: "/hxxd/securityIncidents",query: {}
      });
    }
  }
};
</script>
<style>
.title-cls {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
}
</style>
