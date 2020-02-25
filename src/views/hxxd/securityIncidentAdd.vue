<template>
  <div class="app-container">
    <el-card class="box-card">
      <!-- part1 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">安全事件信息</h5>
        </el-col>
      </el-row>
      <el-form
        ref="detailForm"
        :model="detailForm"
        label-width="170px"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              :key="Math.random()"
              label="销售代理人"
              size="mini"
              prop="salesAgent"
            >
              <el-input
                v-model="detailForm.salesAgent"
                filterable
                placeholder="请选择"
                style="width:100%"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="showSelect('1')"
                />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :key="Math.random()"
              label="航空公司"
              size="mini"
              prop="airlineCompany"
            >
              <el-input
                v-model="detailForm.airlineCompany"
                filterable
                placeholder="请选择"
                style="width:100%"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="showSelect('2')"
                />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类别" size="mini" prop="businessCategory">
              <el-select
                v-model="detailForm.businessCategory"
                filterable
                placeholder="请选择"
                style="width: 100%;"
                size="mini"
              >
                <el-option
                  v-for="item in businessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="协议有效期(天)"
              size="mini"
              prop="validityAgreement"
            >
              <el-input
                type="tel"
                v-model="detailForm.validityAgreement"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="签约航空公司两字代码"
              size="mini"
              prop="signAirlinesTwoWordCord"
            >
              <el-input
                v-model="detailForm.signAirlinesTwoWordCord"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处罚类别" size="mini" prop="punishmentType">
              <el-select
                v-model="detailForm.punishmentType"
                filterable
                placeholder="请选择"
                style="width: 100%;"
                size="mini"
              >
                <el-option
                  v-for="item in punishOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处罚原因" size="mini" prop="punishmentReasons">
              <el-input
                type="textarea"
                v-model="detailForm.punishmentReasons"
                :rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24" class="btn_bottom">
            <el-button type="primary" size="mini" @click="saveSecurityIncident"
              >保存</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="resetForm('detailForm')"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-dialog :title="dialogTitle" :visible.sync="isShowSelect">
        <security-query
          :fdmsg="memberForm"
          :ttmsg="inptTitLe"
          @closeDalogPay="closeSelect"
        />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { saveSecurityIncident } from "@/api/hxxd/complaintInfo";
import { componyQueryList } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
import { parse } from "path";
import SecurityQuery from "./security-query";

export default {
  name: "SecurityIncidentAdd",
  components: { SecurityQuery },
  data() {
    return {
      detailForm: {
        salesAgent: "",
        salesAgentId: "",
        airlineCompany: "",
        airlineCompanyId: "",
        businessCategory: "",
        validityAgreement: "",
        signAirlinesTwoWordCord: "",
        punishmentType: "",
        punishmentReasons: "",
        praiseEvent: "",
        businessStatus: "",
        punishStatus: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "companyName",
        children: "childs"
      },
      rules: {
        salesAgent: [
          { required: true, message: "销售代理人不能为空", trigger: "blur" }
        ],
        airlineCompany: [
          { required: true, message: "航空公司不能为空", trigger: "blur" }
        ],
        businessCategory: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        validityAgreement: [
          {
            required: true,
            pattern: /^[1-9]+[0-9]*$/,
            message: "请输入数字",
            trigger: ["blur", "change"]
          }
        ],
        signAirlinesTwoWordCord: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9]{2}$/,
            message: "请输入正确的两字代码",
            trigger: "blur"
          }
        ],
        punishmentType: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        punishmentReasons: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      dialogTitle: "",
      cascaderOpts: [],
      memberForm: "",
      inptTitLe: "",
      isShowSelect: false,
      businessOptions: [
        {
          value: "1",
          label: "业务类别1"
        },
        {
          value: "2",
          label: "业务类别2"
        }
      ],
      punishOptions: [
        {
          value: "1",
          label: "罚款"
        },
        {
          value: "2",
          label: "警告"
        }
      ]
    };
  },
  methods: {
    handleInput(e) {
      this.detailForm.validityAgreement = e.target.value.replace(/[^\d]/g, "");
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    showSelect(val) {
      if (val === "1") {
        this.memberForm = "";
        this.dialogTitle = "选择销售代理人";
        this.memberForm = val;
        this.inptTitLe = "公司名称：";
      } else if (val === "2") {
        this.memberForm = "";
        this.dialogTitle = "选择航空公司";
        this.memberForm = val;
        this.inptTitLe = "航空公司名称：";
      }
      this.isShowSelect = true;
    },
    closeSelect(chiledArr, fdmag, fdshow) {
      if (chiledArr.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择数据",
          type: "warning",
          duration: 2000
        });
      } else if (fdmag === "1") {
        console.log(chiledArr);
        this.detailForm.salesAgent = chiledArr.value;
        this.detailForm.salesAgentId = chiledArr.key;
      } else if (fdmag === "2") {
        this.detailForm.airlineCompany = chiledArr.value;
        this.detailForm.airlineCompanyId = chiledArr.key;
      }
      this.isShowSelect = fdshow;
      this.memberForm = fdmag;
    },
    saveSecurityIncident() {
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          const {
            salesAgent,
            salesAgentId,
            airlineCompany,
            airlineCompanyId,
            businessCategory,
            validityAgreement,
            signAirlinesTwoWordCord,
            punishmentType,
            punishmentReasons,
            praiseEvent
          } = this.detailForm;
          saveSecurityIncident({
            salesAgent,
            salesAgentId,
            airlineCompany,
            airlineCompanyId,
            businessCategory,
            validityAgreement,
            signAirlinesTwoWordCord,
            punishmentType,
            punishmentReasons,
            praiseEvent
          }).then(response => {
            if (response.status === 200) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              for (const key in this.detailForm) {
                this.detailForm[key] = "";
              }
              this.$router.push({
                path: "/security-incidents-manage/security-incidents-query"
              });
            } else {
              this.$message({
                type: "false",
                message: "添加失败"
              });
            }
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
            type: "warning"
          });
        }
      });
    },
    cancel() {
      this.$router.push({
        path: "/hxxd/securityIncidents",
        query: {}
      });
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
