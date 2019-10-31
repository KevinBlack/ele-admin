<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 企业注册信息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line bg-font-color">注册信息</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :model="hxxdCompanyRegisterParam"
        label-width="135px"
        size="mini"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业名称" prop="businessName">
              <el-input v-model="hxxdCompanyRegisterParam.businessName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司英文名称" prop="businessNameEn">
              <el-input v-model="hxxdCompanyRegisterParam.businessNameEn" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工商营业执照号" prop="licenseNo">
              <el-input v-model="hxxdCompanyRegisterParam.licenseNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社会信用代码" prop="socialCode">
              <el-input v-model="hxxdCompanyRegisterParam.socialCode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司类型" prop="companyType">
              <el-input v-model="hxxdCompanyRegisterParam.companyType" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经营模式" prop="manageModel">
              <el-input v-model="hxxdCompanyRegisterParam.manageModel" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售模式" prop="salesMode">
              <el-input v-model="hxxdCompanyRegisterParam.salesMode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="hxxdCompanyRegisterParam.contactName" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人工作电话" prop="contactNum">
              <el-input v-model="hxxdCompanyRegisterParam.contactNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人手机" prop="contactPhone">
              <el-input v-model="hxxdCompanyRegisterParam.contactPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人邮箱" prop="contactMail">
              <el-input v-model="hxxdCompanyRegisterParam.contactMail" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系地址" prop="contactAddr">
              <el-input v-model="hxxdCompanyRegisterParam.contactAddr" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮政编码" prop="postalcode">
              <el-input v-model="hxxdCompanyRegisterParam.postalcode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="通讯地址" prop="postalAddr">
              <el-input v-model="hxxdCompanyRegisterParam.postalAddr" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="22" style="text-align:right;margin-top:20px;">
          <el-button type="primary" size="mini" @click="companyRegisterSave">保存</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { companyRegisterSave } from "@/api/hxxd/agent";
import { isvalidPhone } from "@/utils/validate";
//电话号码校验
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      ceshiOptions: [
        {
          value: "0",
          label: "测试一"
        },
        {
          value: "1",
          label: "测试二"
        }
      ],
      hxxdCompanyRegisterParam: {
        businessName: "",
        businessNameEn: "",
        licenseNo: "",
        socialCode: "",
        companyType: "",
        manageModel: "",
        salesMode: "",
        contactName: "",
        contactNum: "",
        contactPhone: "",
        contactMail: "",
        contactAddr: "",
        postalcode: "",
        postalAddr: "",
      },
      rules: {
        businessName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        businessNameEn: [{ required: true, message: "不能为空" }],
        socialCode: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        contactPhone: [
          { required: true, trigger: "blur", validator: validPhone }
        ]
      }
    };
  },
  methods: {
    //企业注册信息保存
    companyRegisterSave() {
      debugger;
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      companyRegisterSave(this.hxxdCompanyRegisterParam).then(response => {
        debugger;
        var msg = response.status == 200 ? "保存成功" : "保存失败";
        debugger;
        if (response.status == 200) {
          //保存成功
          this.$message({
            type: "success",
            message: msg
          });
        } else {
          //保存失败
          this.$message({
            type: "success",
            error: msg
          });
          console.log(response.message);
        }
      });
      // } else {
      //   //校验失败
      //   this.$message({
      //     message: "请正确录入页面数据",
      //     type: "warning"
      //   });
      // }
      // });
    }
  }
};
</script>
<style>
.bg-font-color {
  color: #3665ca;
  font-weight: bold;
}

* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
</style>
