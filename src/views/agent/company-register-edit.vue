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
            <el-form-item label="公司类型" prop="companyType">
              <el-select
                v-model="hxxdCompanyRegisterParam.companyType"
                filterable
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in compOptions"
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
                  v-for="item in businessOptions"
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
                  v-for="item in sellOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="社会信用代码" prop="socialCode">
              <el-input v-model="hxxdCompanyRegisterParam.socialCode" :readonly="true" />
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
          <!-- <el-col :span="8">
            <el-form-item label="通讯地址" prop="postalAddr">
              <el-input v-model="hxxdCompanyRegisterParam.postalAddr" />
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
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
          </el-col> -->
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row>
        <el-col :span="24" class="btn_bottom">
          <el-button
            type="primary"
            size="mini"
            v-show="btnShow('100020102010')"
            @click="companyRegisterSave"
            >保存</el-button
          >
          <el-button type="primary" size="mini" @click="companyRegisterReset"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import {
  companyRegisterSaveOrUpdate,
  initCompanyRegister
} from "@/api/hxxd/agent";
import { isvalidPhone } from "@/utils/validate";
import { getToken } from "@/utils/auth";
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
      btns: this.$store.getters.btns["1000201020"],
      fileList: [],
      uploadHeaders: {
        "X-Token": getToken()
      },
      compOptions: [
        {
          value: "1",
          label: "有限责任公司"
        },
        {
          value: "2",
          label: "股份有限责任公司"
        },
        {
          value: "3",
          label: "个人独资企业"
        },
        {
          value: "4",
          label: "合伙企业"
        }
      ],
      businessOptions: [
        {
          value: "1",
          label: "企业差旅"
        },
        {
          value: "2",
          label: "散客"
        }
      ],
      sellOptions: [
        {
          value: "1",
          label: "门店"
        },
        {
          value: "2",
          label: "去哪儿"
        },
        {
          value: "3",
          label: "自有网站"
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
        postalAddr: ""
      },
      hxxdCompanyRegisterParamReset: {},
      rules: {
        businessName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        licenseNo: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/,
            message: "请输入15位或18位正确格式的营业执照号",
            trigger: ["blur", "change"]
          }
        ],
        socialCode: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^[0-9A-Z]{18}$/,
            message: "请输入18位正确格式的社会信用代码",
            trigger: ["blur", "change"]
          }
        ],
        contactPhone: [
          { required: true, trigger: "blur", validator: validPhone }
        ],
        companyType: [{ required: true, message: "不能为空", trigger: "blur" }],
        manageModel: [{ required: true, message: "不能为空", trigger: "blur" }],
        salesMode: [{ required: true, message: "不能为空", trigger: "blur" }],
        contactName: [{ required: true, message: "不能为空", trigger: "blur" }],
        contactNum: [{ required: true, message: "不能为空", trigger: "blur" }],
        contactPhone: [
          { required: true, validator: validPhone, trigger: "blur" }
        ],
        contactMail: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        contactAddr: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    //初始化页面时
    this.initCompanyRegister();
  },
  methods: {
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === btns[i]) {
            return true;
          }
        }
      }
      return false;
    },
    //初始化数据
    initCompanyRegister() {
      initCompanyRegister(this.hxxdCompanyRegisterParam).then(response => {
        var msg = response.status == 200 ? "初始成功" : "初始化失败";
        if (response.status == 200) {
          //保存成功
          this.hxxdCompanyRegisterParam = response.data;
          //拷贝一份数据
          this.hxxdCompanyRegisterParamReset = Object.assign(
            {},
            this.hxxdCompanyRegisterParam
          );
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
      this.formData.append("file", file); // 附件文件导入
      return false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //企业注册信息保存
    companyRegisterSave() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          //数据校验成功
          //this.$refs.upload.submit(); // 附件文件上传
          // this.formData.append('key','222')
          companyRegisterSaveOrUpdate(this.hxxdCompanyRegisterParam).then(
            response => {
              var msg = response.status == 200 ? "保存成功" : "保存失败";
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
            }
          );
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
            type: "warning"
          });
        }
      });
    },
    companyRegisterReset() {
      debugger;
      //将初始化的值重新放入
      Object.assign(
        this.hxxdCompanyRegisterParam,
        this.hxxdCompanyRegisterParamReset
      );
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
