<template>
  <div class="app-wrapper">
    <header class="header-throwsf">
      <div class="header-position">
        <img class="logo" src="../../assets/img/logo.png">
        <div class="head_group">
          <img src='../../assets/img/menology_n.png'>
          <div class="head_group_day">
            <span>2019年9月26日</span>
            <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;14:44</span>
          </div>
        </div>
      </div>
    </header>
    <div class="contont-main">
      <el-card style="min-height: 520px;margin-bottom: 100px;">
        <el-row>
          <el-col :span="24" class="reg-con-c" style="padding-top: 20px;">
            <h3>账户注册</h3>
          </el-col>
          <el-col :span="24">
            <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px;">
              <el-step title="选择用户类型"></el-step>
              <el-step title="基本信息录入"></el-step>
              <el-step title="账户信息录入"></el-step>
              <el-step title="注册信息展示"></el-step>
            </el-steps>
          </el-col>
          <el-col :span="24" class="reg-con-c" v-if="active==0">
            <el-button
              type="primary"
              size="small"
              style="padding: 10px 20px;margin-top: 50px;"
              @click="next"
            >航空公司</el-button>
            <el-button
              type="primary"
              size="small"
              style="padding: 10px 20px;margin-top: 50px;"
              @click="next"
            >销售代理人</el-button>
          </el-col>
          <el-col :span="3">&nbsp;</el-col>
          <el-col :span="18" style="padding-top: 50px;">
            <el-form ref="ruleForm" label-width="150px" size="mini" v-if="active==1">
              <el-form-item label="企业名称" prop="businessName">
                <el-input v-model="param.businessName" />
              </el-form-item>
              <el-form-item label="公司英文名称" prop="businessNameEn">
                <el-input v-model="param.businessNameEn" />
              </el-form-item>
              <el-form-item label="工商营业执照号" prop="licenseNo">
                <el-input v-model="param.licenseNo" />
              </el-form-item>
              <el-form-item label="社会信用代码" prop="socialCode">
                <el-input v-model="param.socialCode" />
              </el-form-item>
              <el-form-item label="公司类型" prop="companyType">
                <el-input v-model="param.companyType" />
              </el-form-item>
              <el-form-item label="经营模式" prop="manageModel">
                <el-input v-model="param.manageModel" />
              </el-form-item>
              <el-form-item label="销售模式" prop="salesMode">
                <el-input v-model="param.salesMode" />
              </el-form-item>
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input v-model="param.contactName" />
              </el-form-item>
              <el-form-item label="联系人工作电话" prop="contactNum">
                <el-input v-model="param.contactNum" />
              </el-form-item>
              <el-form-item label="联系人手机" prop="contactPhone">
                <el-input v-model="param.contactPhone" />
              </el-form-item>
              <el-form-item label="联系人邮箱" prop="contactMail">
                <el-input v-model="param.contactMail" />
              </el-form-item>
              <el-form-item label="联系地址" prop="contactAddr">
                <el-input v-model="param.contactAddr" />
              </el-form-item>
              <el-form-item label="邮政编码" prop="postalcode">
                <el-input v-model="param.postalcode" />
              </el-form-item>
            </el-form>
            <el-form ref="ruleForm" label-width="150px" size="mini" v-if="active==2">
              <el-form-item label="账号" prop="loginCode">
                <el-input v-model="jqUserParam.loginCode" />
              </el-form-item>
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="jqUserParam.userName" />
              </el-form-item>
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="jqUserParam.mobile" />
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input v-model="jqUserParam.password" />
              </el-form-item>
              <el-form-item label="确认密码" prop="confiPassword">
                <el-input v-model="jqUserParam.confiPassword" />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3">&nbsp;</el-col>
          <el-col :span="24" class="reg-con-c" v-if="active==3">
            {{this.jqUserParam.loginCode}},恭喜您完成注册
          </el-col>
          <el-col :span="24" class="reg-con-c" v-if="active!=0" style="margin-top: 50px;">
            <el-button type="primary" v-if="active!=3" class="a" @click="pre" style="padding: 10px 20px;">上一步</el-button>
            <el-button type="primary" @click="next" style="padding: 10px 20px;">{{ btnMassage }}</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
    </footer>
  </div>
</template>

<script>
import { companyRegisterSave } from "@/api/hxxd/agent";
import { registerSave } from "@/api/system/user";
export default {
  name: "register",
  data() {
    return {
      active: 0,
      btnMassage: "下一步",
      param: {
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
        createBy: "",
        userName:""
      },
      jqUserParam: {
        loginCode: "",
        mobile: "",
        password: "",
        confiPassword: ""
      }
    };
  },
  created() {},
  methods: {
    next() {
      console.log(this.active);
      var a = this.$refs;
      // debugger;
      if (this.active == 2) {
        this.companyRegisterSave();
      }
      if (this.active++ > 2) {
        this.$router.push({ path: "/newlogin", query: {} });
      }
      if (this.active == 3) {
        this.btnMassage = "跳转到登陆页面";
      }
    },
    pre() {
      console.log(this.active);
      debugger;
      if (this.active != 0) {
        this.active--;
        this.btnMassage = "下一步";
      }
      if (this.active == 3) {
        this.btnMassage = "跳转到登陆页面";
      }
    }, //企业注册信息保存
    companyRegisterSave() {
      debugger;
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {

      //数据校验成功
      // 若果密码存在，则对密码进行加密操作
      if (this.jqUserParam.password) {
        var password = this.$encruption(this.jqUserParam.password);
        this.jqUserParam.password = password;
      }
      //用户信息保存成功
      registerSave(this.jqUserParam).then(response => {
        var msg = response.status == 200 ? "注册成功" : "注册失败";
        if (response.status == 200) {
          //企业和用户的都保存成功
          this.param.createBy = response.data.userId;
          companyRegisterSave(this.param).then(response => {
            if (response.status == 200) {
              //保存成功
              this.$message({
                type: "success",
                error: "保存成功"
              });
            } else {
              console.log(response.message);
            }
          });
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

<style lang="scss" scoped>
  @import '../../styles/register.scss';

  .contont-main {
    .reg-con-c {
      text-align: center;
      margin-bottom: 50px;
      h3 {
        border-bottom: 1px solid #bfbfc0;
        font-size: 30px;
        height: 60px;
        line-height: 10px;
      }
    }
  }
</style>
