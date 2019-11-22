<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{ minHeight: Height + 'px' }">
      <el-card class="detailsContainer">
        <el-row>
          <el-col :span="24">
            <h3 class="dtl-title-line register_title">忘记密码</h3>
          </el-col>
          <el-col :span="24">
            <el-steps
              :active="active"
              finish-status="success"
              align-center
              style="margin-top: 20px;"
            >
              <el-step title="选择找回方式"></el-step>
              <el-step title="身份验证"></el-step>
              <el-step title="设置新密码"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
          <el-col :span="24" class="reg-con-c" v-if="active == 0">
            <button class="btn_usertype" :findType="1" @click="nextFrist(1)">
              ?<i class="iconfont">&#xe63c;</i><span>短信验证</span>
            </button>
            <button class="btn_usertype" :findType="2" @click="nextFrist(2)">
              ?<i class="iconfont">&#xe6ad;</i><span>EMAIL验证</span>
            </button>
          </el-col>
          <el-col :span="9">&nbsp;</el-col>
          <el-col :span="6" style="padding-top: 50px;">
            <el-form
              ref="infoForm"
              :model="param"
              label-width="0px"
              size="mini"
              :rules="rules1"
            >
              <el-row v-if="active == 1">
                <el-col>
                  <p class="point_msg">请输入您绑定的密保{{ findWay }}：</p>
                </el-col>
                <el-col v-if="isPhone">
                  <el-form-item prop="contactPhone">
                    <el-input v-model="param.contactPhone" />
                  </el-form-item>
                </el-col>
                <el-col v-if="!isPhone">
                  <el-form-item prop="contactMail">
                    <el-input v-model="param.contactMail" />
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item size="mini" prop="mobile">
                    <el-button
                      type="primary"
                      size="mini"
                      plain
                      style="font-size: 12px;"
                      @click="sendCode"
                       class="getCode"
                       v-show="showSend"
                      >免费获取验证码</el-button>
                    <el-button type="primary" size="mini" v-show="!showSend" disabled class="getCode">{{count}} s后重新发送</el-button>
                    <p class="point_msg">{{ loginCodeMsg }}</p>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item size="mini" prop="loginCode">
                    <el-input
                      size="mini"
                      v-model="param.loginCode"
                      placeholder="请输入验证码"
                    ></el-input>
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
              <el-row v-if="active == 2">
                <el-col :span="4">&nbsp;</el-col>
                <el-col :span="16">
                  <el-row>
                    <el-col>
                      <p class="point_msg">请输入您的新密码：</p>
                    </el-col>
                    <el-col>
                      <el-form-item prop="password">
                        <el-input
                          type="password"
                          v-model="param.password"
                          placeholder="请输入密码"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col>
                      <p class="point_msg">请再次输入您的新密码：</p>
                    </el-col>
                    <el-col>
                      <el-form-item prop="confiPassword">
                        <el-input
                          type="password"
                          v-model="param.confiPassword"
                          placeholder="请输入密码"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col class="reg-con-c" style="margin-top: 50px;">
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
                <el-col :span="4">&nbsp;</el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="9">&nbsp;</el-col>
          <el-col :span="24" class="reg-con-c suc_info" v-if="active == 3">
            修改成功！
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
import {
  registerSave,
  modifyPassWrod,
  checkMobile,
  checkEmail
} from "@/api/system/user";
import HeaderReload from "@/components/HeaderReload";
import FooterReload from "@/components/FooterReload";
import { isvalidPhone } from "@/utils/validate";
import {
  sendCode,
  checkCode,
  sendEmailCode,
  checkEmailCode
} from "@/api/hxxd/member";
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
      btnMassage: "下一步",
      findWay: "手机号码",
      isPhone: true,
      isNext: true,
      showSend: true,
      loginCodeMsg: "验证码将以短信形式发送到密保手机",
      param: {
        contactPhone: "",
        contactMail: "",
        loginCode: "",
        password: "",
        confiPassword: ""
      },
      count: '',
      rules1: {
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
        loginCode: [{ required: true, message: "不能为空", trigger: "blur" }],
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
      }
    };
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194; //监听浏览器窗口变化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 194;
    };
  },
  methods: {
    getCode() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.showSend = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.showSend = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    nextFrist(val) {
      if (val === 1) {
        this.findWay = "手机号码";
        this.isPhone = true;
        this.loginCodeMsg = "验证码将以短信形式发送到密保手机";
      } else {
        this.findWay = "EMAIL邮箱";
        this.isPhone = false;
        this.loginCodeMsg = "验证码将发送到您的密保邮箱";
      }
      this.active = 1;
    },
    nextSecond() {
      if (this.isPhone) {
        if (this.param.contactPhone != "" && this.param.loginCode != "") {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
      } else {
        if (this.param.contactMail != "" && this.param.loginCode != "") {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
      }
      this.pageJump(1);
    },
    pageJump(val) {
      if (val === 1) {
        if (this.isNext) {
          if( this.isPhone){
            this.checkMobileCode();
          }else{
            this.checkEmailCode();
          }
        } else {
          this.active = 1;
          this.$message({
            type: "error",
            message: "请完善信息"
          });
        }
      } else if (val === 2) {
        if (this.isNext) {
          this.companyRegisterSave();
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
      if (this.param.password != "" && this.param.confiPassword != "") {
        this.isNext = true;
      } else {
        this.isNext = false;
      }
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
    sendCode() {
      if (this.findWay === "手机号码") {
        this.checkMobile();
      } else {
        this.checkEmail();
      }
    },
    checkMobile() {
      checkMobile(this.param.contactPhone).then(response => {
        var success = response.data;
        var msg = success ? "验证通过" : "请输入正确的手机号";
        this.message(success, msg);
        if (msg != "验证通过") {
          return;
        } else {
          sendCode(this.param.contactPhone).then(response => {
            var success = response.data;
            var msg = success ? "请查看验证码" : "发送手机验证码失败";
            this.message(success, msg);
            this.getCode()
          });
        }
      });
    },
    checkEmail() {
      checkEmail(this.param.contactMail).then(response => {
        var success = response.data;
        var msg = success ? "验证通过" : "请输入正确的邮箱号";
        this.message(success,msg)
        if (msg != "验证通过") {
          return;
        } else {
          sendEmailCode(this.param.contactMail).then(response => {
            var success = response.data;
            var msg = success ? "请查看邮箱验证码" : "发送手机验证码失败";
            this.message(success, msg);
            this.getCode()
          });
        }
      });
    },
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
      // const mobileNum = JSON.stringify(this.param.contactPhone);
      checkCode(this.param.contactPhone, this.param.loginCode).then(
        response => {
          var success = response.data;
          var msg = success ? "验证通过" : "验证错误";
           this.message(success,msg)
          if(success){
            this.active = 2;
          }else{
            this.active = 1;
          }
        }
      );
    },
    checkEmailCode() {
      checkEmailCode(this.param.contactMail, this.param.loginCode).then(
        response => {
          var success = response.data;
          var msg = success ? "验证通过" : "验证错误";
          this.message(success,msg)
            if(success){
            this.active = 2;
          }else{
            this.active = 1;
          }
        }
      );
    },
    // 信息保存
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
      //数据校验成功
      // 若果密码存在，则对密码进行加密操作
      else if (this.param.password) {
        this.active = 3;
        this.btnMassage = "跳转到登陆页面";
        var password = this.$encruption(this.param.password);
        this.param.password = password;
      }
       var num;
      if(isPhone){
         num = this.param.contactPhone
      }else {
        num =this.param.contactMail;
      }
      modifyPassWrod(num, this.param.password).then(
        response => {
          var success = response.data;
          var msg = success ? "修改成功" : "修改失败";
          this.message(success, msg);
        }
      );
      // //用户信息保存成功
      // registerSave(this.param).then(response => {
      //   var msg = response.status == 200 ? "注册成功" : "注册失败";
      //   if (response.status == 200) {
      //     //企业和用户的都保存成功
      //     this.param.createBy = response.data.userId;
      //     companyRegisterSave(this.param).then(response => {
      //       if (response.status == 200) {
      //         //保存成功
      //         this.$message({
      //           type: "success",
      //           error: "保存成功"
      //         });
      //       } else {
      //         console.log(response.message);
      //       }
      //     }).catch((error) => {
      //       console.log(error)
      //     });
      //   }
      // })
      // }
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
  font-size: 12px;
  .register_title {
    width: 100%;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .reg-con-c {
    text-align: center;
  }

  .point_msg {
    line-height: 40px;
    font-size: 14px;
    color: #a5a5a5;
  }
  .singal_line {
    display: block !important;
    width: 100%;
    height: 20px;
  }
  .suc_info {
    margin-top: 80px;
  }
}
</style>
