<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{ minHeight: Height + 'px' }">
      <el-card class="detailsContainer">
        <el-row>
          <el-col :span="24">
            <h3 class="dtl-title-line register_title">账户注册</h3>
          </el-col>
          <el-col :span="24">
            <el-steps
              :active="active"
              finish-status="success"
              align-center
              style="margin-top: 20px;"
            >
              <el-step title="选择用户类型"></el-step>
              <el-step title="基本信息录入"></el-step>
              <el-step title="账户信息录入"></el-step>
              <el-step title="注册信息展示"></el-step>
            </el-steps>
          </el-col>
          <el-col :span="24" class="reg-con-c" v-if="active === 0">
            <button class="btn_usertype" @click="nextFrist('01')">
              <i class="iconfont airplane_com">&#xe637;</i><span>航空公司</span>
            </button>
            <button class="btn_usertype" @click="nextFrist('02')">
              <i class="iconfont">&#xe61c;</i><span>销售代理人</span>
            </button>
          </el-col>
          <el-col :span="24" style="padding-top: 50px;">
            <el-form
              ref="infoForm"
              :model="param"
              label-width="150px"
              size="mini"
              :rules="rules1"
            >
              <el-row v-if="active === 1">
                <el-col :span="8">
                  <el-form-item label="企业名称" prop="businessName">
                    <el-input
                      v-model="param.businessName"
                      placeholder="请输入工商执照上的公司名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司英文名称" prop="businessNameEn">
                    <el-input
                      v-model="param.businessNameEn"
                      placeholder="请输入公司英文名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="工商营业执照号" prop="licenseNo">
                    <el-input
                      v-model="param.licenseNo"
                      placeholder="请输入工商营业执照号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司类型" prop="companyType">
                    <el-select
                      v-model="param.companyType"
                      filterable
                      placeholder="请选择"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="item in compOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="经营模式" prop="manageModel">
                    <el-select
                      v-model="param.manageModel"
                      filterable
                      placeholder="请选择"
                      style="width: 100%;"
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
                <el-col :span="8">
                  <el-form-item label="销售模式" prop="salesMode">
                    <el-select
                      v-model="param.salesMode"
                      filterable
                      placeholder="请选择"
                      style="width: 100%;"
                    >
                      <el-option
                        v-for="item in sellOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="社会信用代码" prop="socialCode">
                    <el-input
                      v-model="param.socialCode"
                      placeholder="请输入统一社会信用代码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人姓名" prop="contactName">
                    <el-input
                      v-model="param.contactName"
                      placeholder="请输入联系人姓名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人工作电话" prop="contactNum">
                    <el-input
                      v-model="param.contactNum"
                      placeholder="请输入联系人工作电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人手机" prop="contactPhone">
                    <el-input
                      v-model="param.contactPhone"
                      placeholder="请输入联系人手机"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人邮箱" prop="contactMail">
                    <el-input
                      v-model="param.contactMail"
                      placeholder="请输入联系人邮箱"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系地址" prop="contactAddr">
                    <el-input
                      v-model="param.contactAddr"
                      placeholder="请输入联系地址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="邮政编码" prop="postalcode">
                    <el-input
                      v-model="param.postalcode"
                      placeholder="请输入邮政编码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24" class="reg-con-c" style="margin-top: 50px;">
                  <el-button
                    type="primary"
                    size="mini"
                    v-if="active != 3"
                    class="a"
                    @click="pre"
                    style="padding: 7px 20px;font-size: 14px;"
                    >上一步</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="nextSecond"
                    style="padding: 7px 20px;font-size: 14px;"
                    >下一步</el-button
                  >
                </el-col>
              </el-row>

              <el-row v-if="active === 2">
                <el-col :span="7">&nbsp;</el-col>
                <el-col :span="10">
                  <el-row>
                    <el-col>
                      <el-form-item label="账号" prop="loginCode">
                        <el-input
                          v-model="param.loginCode"
                          placeholder="请输入账号"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item label="用户姓名" prop="userName">
                        <el-input
                          v-model="param.userName"
                          placeholder="请输入用户姓名"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item label="手机号码" prop="mobile">
                        <el-input
                          v-model="param.mobile"
                          placeholder="请输入手机号码"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item label="验证码" prop="mobileCode">
                        <el-input
                          v-model="param.mobileCode"
                          placeholder="请输入验证码"
                          style="width: 49%;"
                        />
                        <el-button
                          type="primary"
                          size="mini"
                          v-show="show"
                          @click="getCode"
                          class="getCode"
                          >发送验证码</el-button
                        >
                        <el-button
                          type="primary"
                          size="mini"
                          v-show="!show"
                          disabled
                          class="getCode"
                          >{{ count }} s后重新发送</el-button
                        >
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item label="密码" prop="password">
                        <el-input
                          type="password"
                          v-model="param.password"
                          placeholder="请输入密码"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <el-form-item label="确认密码" prop="confiPassword">
                        <el-input
                          type="password"
                          v-model="param.confiPassword"
                          placeholder="请输入确认密码"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col
                      :span="24"
                      class="reg-con-c"
                      style="margin-top: 50px;"
                    >
                      <el-button
                        type="primary"
                        size="mini"
                        v-if="active != 3"
                        class="a"
                        @click="pre"
                        style="padding: 7px 20px;font-size: 14px;"
                        >上一步</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="nextThird"
                        style="padding: 7px 20px;font-size: 14px;"
                        >下一步</el-button
                      >
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="7">&nbsp;</el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="24" class="reg-con-c suc_info" v-if="active === 3">
            尊敬的用户{{ this.param.loginCode }},恭喜您完成注册
            <el-col
              :span="24"
              class="reg-con-c"
              v-if="active != 0"
              style="margin-top: 50px;"
            >
              <el-button
                type="primary"
                size="mini"
                v-if="active != 3"
                class="a"
                @click="pre"
                style="padding: 7px 20px;font-size: 14px;"
                >上一步</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="nextForth"
                style="padding: 7px 20px;font-size: 14px;"
                >{{ btnMassage }}</el-button
              >
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import { companyRegisterSave } from "@/api/hxxd/agent";
import { registerSave, registerCheckMobile } from "@/api/system/user";
import HeaderReload from "@/components/HeaderReload";
import FooterReload from "@/components/FooterReload";
import { isvalidPhone } from "@/utils/validate";
import { registerSendCode, registerCheckCode } from "@/api/hxxd/member";
//电话号码校验
var validPhone = (rule, value, callback) => {
  if (!value) {
    console.log(validPhone);
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};

export default {
  name: "register",
  components: { FooterReload, HeaderReload },
  data() {
    return {
      Height: 0,
      active: 0,
      isNext: true,
      btnMassage: "",
      show: true,
      count: "",
      param: {
        businessName: "",
        businessNameEn: "",
        licenseNo: "",
        socialCode: "",
        companyType: "国营",
        manageModel: "国营",
        salesMode: "国营",
        contactName: "",
        contactNum: "",
        contactPhone: "",
        contactMail: "",
        contactAddr: "",
        userName: "",
        loginCode: "",
        mobile: "",
        mobileCode: "",
        password: "",
        confiPassword: "",
        userType: ""
      },
      rules1: {
        businessName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        businessNameEn: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z_]+$/,
            message: "请输入英文",
            trigger: ["blur", "change"]
          }
        ],
        licenseNo: [{ required: true, message: "不能为空", trigger: "blur" }],
        socialCode: [{ required: true, message: "不能为空", trigger: "blur" }],
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
        contactAddr: [{ required: true, message: "不能为空", trigger: "blur" }],
        loginCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        userName: [{ required: true, message: "不能为空", trigger: "blur" }],
        mobile: [{ required: true, validator: validPhone, trigger: "blur" }],
        mobileCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,8}$/,
            message: "请输入8位由数字和英文字母组成的密码",
            trigger: ["blur", "change"]
          }
        ],
        confiPassword: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,8}$/,
            message: "请输入8位由数字和英文字母组成的密码",
            trigger: ["blur", "change"]
          }
        ]
      },
      compOptions: [
        {
          value: "1",
          label: "有限责任公司"
        },
        {
          value: "2",
          label: "股份有限责任公"
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
      ]
    };
  },
  watch: {
    param: function(val, oldVal) {
      if (val) {
        this.nextSecond();
      }
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194; //监听浏览器窗口变化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 194;
    };
  },
  methods: {
    message(success, msg) {
      if (success) {
        this.$message({
          type: "success",
          message: msg
        });
      } else {
        this.$message({
          type: "error",
          message: msg
        });
      }
    },
    checkMobileCode() {
      registerCheckCode(this.param.mobile, this.param.mobileCode).then(
        response => {
          var success = response.data;
          var msg = success ? "验证码校验成功" : "验证码校验失败";
          if (msg == "验证码校验成功") {
            this.companyRegisterSave();
          } else {
            this.message(success, msg);
            this.active = 2;
            this.btnMassage = "下一步";
          }
        }
      );
    },
    checkMobile() {
      registerCheckMobile(this.param.mobile).then(response => {
        var success = response.data;
        if (success) {
          this.message(false, "手机号已经注册");
          return;
        } else {
          registerSendCode(this.param.mobile).then(response => {
            var msg = response.message;
            if (msg != "false") {
              this.$message({
                type: "success",
                message: msg
              });
            } else {
              this.$message({
                type: "false",
                message: "获取验证码失败"
              });
            }
          });
        }
      });
    },
    getCode() {
      this.checkMobile();
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    nextFrist(userType) {
      this.param.userType = userType;
      this.active = 1;
    },
    nextSecond() {
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
      });
      this.pageJump(1);
    },
    pageJump(val) {
      if (val === 1) {
        if (this.isNext) {
          this.active = 2;
        } else {
          this.active = 1;
          this.$message({
            type: "error",
            message: "请完善信息"
          });
        }
      } else if (val === 2) {
        if (this.isNext) {
          this.active = 2;
          this.checkMobileCode();
        } else {
          this.active = 2;
          this.$message({
            type: "error",
            message: "请完善信息"
          });
        }
      }
    },
    nextThird() {
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
      });
      this.pageJump(2);
    },
    nextForth() {
      this.$router.push({ path: "/newlogin", query: {} });
    },
    pre() {
      if (this.active != 0) {
        this.active--;
        this.btnMassage = "下一步";
      }
      if (this.active == 3) {
        this.btnMassage = "跳转到登陆页面";
      }
    },
    // 企业注册信息保存
    companyRegisterSave() {
      if (this.param.password != this.param.confiPassword) {
        this.$message({
          type: "error",
          message: "两次输入的密码不一致"
        });
        this.active = 2;
        this.btnMassage = "下一步";
        return;
      }
      // 数据校验成功
      // 若果密码存在，则对密码进行加密操作
      else if (this.param.password) {
        var password = this.$encruption(this.param.password);
        this.param.password = password;
      }
      // 企业和用户的都保存成功
      registerSave(this.param).then(response => {
        if (response.status == 200) {
          debugger;
          // 保存成功
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.active = 3;
          this.btnMassage = "跳转到登陆页面";
        } else {
          this.active = 2;
          this.btnMassage = "下一步";
          this.$message({
            type: "success",
            message: "注册失败"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/register.scss";
@import "~@/styles/hxxd.scss";
.btn_usertype {
  width: 100px;
  height: 100px;
  border: none;
  outline: none;
  margin: 70px 10px 0 10px;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  background-color: #409eff;
  color: #3893f0;
  font-size: 100px;
  font-weight: bolder;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  i,
  span {
    color: #fff;
    position: absolute;
    display: block;
  }
  i {
    font-size: 40px;
    top: 20px;
    left: 30px;
  }
  .airplane_com {
    font-size: 50px;
    font-weight: bolder;
    top: 20px;
    left: 25px;
  }
  span {
    width: 100px;
    height: 25px;
    font-size: 14px;
    text-align: center;
    bottom: 10px;
    left: 0;
  }
}

.btn_usertype:hover {
  background-color: #77b1f9;
}

.contont-main {
  .register_title {
    width: 100%;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .reg-con-c {
    text-align: center;
  }

  .suc_info {
    margin-top: 80px;
  }
  .getCode {
    width: 49%;
    overflow: hidden;
    margin: 0;
  }
}
</style>
