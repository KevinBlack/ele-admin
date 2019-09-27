<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="title-cls">处理信息</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="处理人" size="mini" prop="handlePerson">
                <el-input v-model="detailForm.handlePerson" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理时间" size="mini" prop="processingTime">
                <el-date-picker
                  v-model="detailForm.processingTime"
                  type="date"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系邮箱" size="mini" prop="contactMail">
                <el-input v-model="detailForm.contactMail" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" size="mini" prop="contactTel">
                <el-input v-model.number="detailForm.contactTel" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="处理结果" size="mini" prop="processingResults">
                <el-input
                  type="textarea"
                  v-model="detailForm.processingResults"
                  size="mini"
                  :rows="4"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div style="text-align: center;">
                <el-button type="primary" icon="el-icon-check" @click="saveComplainProcessing">保存</el-button>
                <el-button icon="el-icon-close" @click="resetForm('detailForm')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { saveComplainProcessing } from "@/api/hxxd/complaintInfo";
import { parseTime } from "@/utils/index.js";
import { parse } from "path";
export default {
  data() {
    return {
      detailForm: {
        handlePerson: "",
        processingTime: "",
        contactMail: "",
        contactTel: "",
        processingResults: "",
        remarks: "",
        complaintId: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "companyName",
        children: "childs"
      },
      cascaderOpts: [],
      rules: {
        companyCode: [
          { required: true, message: "公司编码不能为空", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        treeSort: [
          { required: true, message: "排序号不能为空", trigger: "blur" },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
    };
  },
  created() {
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id;
    this.detailForm.complaintId = id;
    this.detailForm.processingTime = parse(new Date());
  },
  methods: {
    saveComplainProcessing() {
      const {
        processingResults,
        processingTime,
        contactMail,
        contactTel,
        remark,
        handlePerson,
        complaintId
      } = this.detailForm;
      saveComplainProcessing({
        processingResults,
        processingTime,
        contactMail,
        contactTel,
        remark,
        handlePerson,
        complaintId
      }).then(response => {
        this.$message({
          type: "success",
          message: "处理成功",
          path: "./complaintInfo/complaintInfo"
        });
        this.detailForm.complaintId = response.data.id;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    companyNameChange(val) {
      if (val) {
        toPinYinUppercase(val).then(response => {
          this.detailForm.companyCode = response.data.pinyin;
        });
      }
    },
    getSortNo() {
      getSortNo().then(response => {
        this.detailForm.treeSort = response.data;
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
