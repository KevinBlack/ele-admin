<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 企业注册信息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">注册信息</h5>
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
          <el-col :span="8">
            <el-form-item label="企业名称" prop="businessName">
              <el-input v-model="hxxdCompanyRegisterParam.businessName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司英文名称" prop="businessNameEn">
              <el-input v-model="hxxdCompanyRegisterParam.businessNameEn" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工商营业执照号" prop="licenseNo">
              <el-input v-model="hxxdCompanyRegisterParam.licenseNo" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="公司类型" prop="companyType" >
              <el-select
                    v-model="hxxdCompanyRegisterParam.companyType"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in ceshiOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经营模式" prop="manageModel">
              <el-select
                    v-model="hxxdCompanyRegisterParam.manageModel"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in ceshiOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售模式" prop="salesMode">
              <el-select
                    v-model="hxxdCompanyRegisterParam.salesMode"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in ceshiOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="社会信用代码" prop="socialCode">
              <el-input v-model="hxxdCompanyRegisterParam.socialCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="hxxdCompanyRegisterParam.contactName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人工作电话" prop="contactNum">
              <el-input v-model="hxxdCompanyRegisterParam.contactNum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人手机" prop="contactPhone">
              <el-input v-model="hxxdCompanyRegisterParam.contactPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人邮箱" prop="contactMail">
              <el-input v-model="hxxdCompanyRegisterParam.contactMail" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系地址" prop="contactAddr">
              <el-input v-model="hxxdCompanyRegisterParam.contactAddr" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码" prop="postalcode">
              <el-input v-model="hxxdCompanyRegisterParam.postalcode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通讯地址" prop="postalAddr">
              <el-input v-model="hxxdCompanyRegisterParam.postalAddr" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="附件选择" prop="expvmFiles">
              <el-upload
                class="upload-demo"
                action=""
                ref="upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="handleUpload"
                multiple
                :auto-upload="false"
              >
                <el-button type="primary" size="small">选择</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <!-- 按钮区 -->
      <el-row>
        <el-col :span="24" class="btn_bottom">
          <el-button type="primary" size="mini" @click="companyRegisterSave">保存</el-button>
          <el-button type="primary" size="mini" @click="companyRegisterReset">重置</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { companyRegisterSave,initCompanyRegister  } from "@/api/hxxd/agent";
import { isvalidPhone } from "@/utils/validate";
import { getToken } from '@/utils/auth';
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
      fileList: [],
      uploadHeaders: {
        'X-Token': getToken()
      },
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
   created() {
    //初始化页面时
    this.initCompanyRegister();
  },
  methods: {
     //初始化数据
    initCompanyRegister() {
      debugger;
      initCompanyRegister(this.hxxdCompanyRegisterParam).then(response => {
        debugger;
        var msg = response.status == 200 ? "初始成功" : "初始化失败";
        if (response.status == 200) {
          //保存成功
          this.hxxdCompanyRegisterParam = response.data;
        } else {
          //保存失败
          this.$message({
            type: "success",
            error: msg
          });
        }
      });
    },
    //文件上传方法
    handleUpload(file) {
      this.formData.append('file', file) // 附件文件导入
      return false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    //企业注册信息保存
    companyRegisterSave() {
      debugger;
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      this.$refs.upload.submit(); // 附件文件上传
      // this.formData.append('key','222')
      companyRegisterSave(this.hxxdCompanyRegisterParam).then(response => {
        var msg = response.status == 200 ? "保存成功" : "保存失败"
        debugger;
        if (response.status == 200) {
          //保存成功
          this.$message({
            type: "success",
            message: msg
          })
        } else {
          //保存失败
          this.$message({
            type: "success",
            error: msg
          })
          console.log(response.message);
        }
      })
      // } else {
      //   //校验失败
      //   this.$message({
      //     message: "请正确录入页面数据",
      //     type: "warning"
      //   });
      // }
      // });
    },
    companyRegisterReset() {
      this.hxxdCompanyRegisterParam.businessName = ''
      this.hxxdCompanyRegisterParam.businessNameEn = ''
      this.hxxdCompanyRegisterParam.contactMail = ''
      this.hxxdCompanyRegisterParam.contactAddr = ''
      this.hxxdCompanyRegisterParam.postalcode = ''
      this.hxxdCompanyRegisterParam.postalAddr = ''
      this.hxxdCompanyRegisterParam.licenseNo = ''
      this.hxxdCompanyRegisterParam.socialCode = ''
      this.hxxdCompanyRegisterParam.companyType = ''
      this.hxxdCompanyRegisterParam.manageModel = ''
      this.hxxdCompanyRegisterParam.salesMode = ''
      this.hxxdCompanyRegisterParam.contactName = ''
      this.hxxdCompanyRegisterParam.contactNum = ''
      this.hxxdCompanyRegisterParam.contactPhone = ''
    }
  }
};
</script>
<style>
 @import '~@/styles/hxxd.scss';
</style>
