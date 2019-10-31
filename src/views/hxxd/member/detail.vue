<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">会员详情</a>
        </el-col>
        <!-- <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini">保存</el-button>
          <el-button type="primary" size="mini">取消</el-button>
        </el-col> -->
      </el-row>
      <el-form
        ref="mainForm"
        :model="mainForm"
        label-width="110px"
        size="mini"
        :rules="mainFormRules"
      >
        <!-- 第一块分组 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">基础信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- 写好一个col其他的知己复制粘贴 -->
          <el-col :span="6">
            <el-form-item label="会员姓名" size="mini" prop="name">
              <el-input v-model="mainForm.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法人代表姓名" size="mini" prop="legalRepresentName">
              <el-input v-model="mainForm.legalRepresentName" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="注册资金" size="mini" prop="registeredFunds">
              <el-input v-model="mainForm.registeredFunds" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态" size="mini" prop="status">
              <el-select v-model="mainForm.status" size="mini" style="width:100%" :disabled="true">
                <el-option
                  v-for="item in mainFormOptions.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="公司性质" size="mini" prop="corporateNature">
              <el-input v-model="mainForm.corporateNature" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="主业务范围" size="mini" prop="mainBusinessScope">
              <el-input v-model="mainForm.mainBusinessScope" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯地址" size="mini" prop="postalAddress">
              <el-input v-model="mainForm.postalAddress" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="传真" size="mini" prop="fax">
              <el-input v-model="mainForm.fax" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮政编码" size="mini" prop="postalCode">
              <el-input v-model="mainForm.postalCode" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="Email" size="mini" prop="email">
              <el-input v-model="mainForm.email" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="QQ号" size="mini" prop="qq">
              <el-input v-model="mainForm.qq" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">联系人信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- 写好一个col其他的知己复制粘贴 -->
          <el-col :span="6">
            <el-form-item label="姓名" size="mini" prop="contactName">
              <el-input v-model="mainForm.contactName" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="电话" size="mini" prop="contactPhone">
              <el-input v-model="mainForm.contactPhone" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="职务" size="mini" prop="contactJob">
              <el-input v-model="mainForm.contactJob" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="手机号" size="mini" prop="contactTel">
              <el-input v-model="mainForm.contactTel" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="邮箱" size="mini" prop="contactEmail">
              <el-input v-model="mainForm.contactEmail" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">入会信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- 写好一个col其他的知己复制粘贴 -->
          <el-col :span="12">
            <el-form-item label="入会时间" size="mini" prop="entryMeetingDate">
              <el-date-picker
                v-model="mainForm.entryMeetingDate"
                type="datetime"
                placeholder="选择日期时间"
                align="left"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会员证书号" size="mini" prop="code">
              <el-input v-model="mainForm.code" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="批准会议" size="mini" prop="entryMeeting">
              <el-input
                v-model="mainForm.entryMeeting"
                size="mini"
                type="textarea"
                :rows="2"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="备注" size="mini" prop="remarks">
              <el-input
                v-model="mainForm.remarks"
                size="mini"
                type="textarea"
                :rows="4"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">协议与权利义务</h5>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <!-- 是否同意申请 -->
            <el-form-item label="已读申请书" size="mini"  prop="hasReadApply">
              <el-checkbox v-model="mainForm.hasReadApply"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- 是否已读权利和义务 -->
            <el-form-item label="已读权利和义务" size="mini" label-width="150" prop="hasReadRight">
              <el-checkbox v-model="mainForm.hasReadRight"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">审核信息</h5>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="审核人ID" size="mini" prop="auditBy">
              <el-input v-model="mainForm.auditBy" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核时间" size="mini" prop="auditDate">
              <el-input v-model="mainForm.auditDate" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核原因" size="mini" prop="auditReason">
              <el-input v-model="mainForm.auditReason" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">系统信息</h5>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="制单人ID" size="mini" prop="createBy">
              <el-input v-model="mainForm.createBy" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制单时间" size="mini" prop="createDate">
              <el-input v-model="mainForm.createDate" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="更新人ID" size="mini" prop="updateBy">
              <el-input v-model="mainForm.updateBy" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="更新时间" size="mini" prop="updateDate">
              <el-input v-model="mainForm.updateDate" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="提交人ID" size="mini" prop="submitBy">
              <el-input v-model="mainForm.submitBy" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提交时间" size="mini" prop="submitDate">
              <el-input v-model="mainForm.submitDate" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属公司ID" size="mini" prop="companyId">
              <el-input v-model="mainForm.companyId" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属组织机构" size="mini" prop="officeFullPaths">
              <el-input v-model="mainForm.officeFullPaths" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
          <el-col :span="24" style="text-align:right;">
            <el-button type="primary" size="mini" @click="save"  v-if="btnDisplay('10')" >保存</el-button>
            <el-button type="primary" size="mini" @click="submit" v-if="btnDisplay('10')">提交</el-button>
            <el-button type="primary" size="mini" @click="cancel" v-if="btnDisplay('10')">取消</el-button>
          </el-col>
        </el-row>-->
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入axios
import {
  memberApply,
  submitMember,
  getMember,
  getMemberByType
} from "@/api/hxxd/member";
import { parseTime } from "@/utils/index.js";

export default {
  name: "MemberApply",
  data() {
    return {
      //表单对应下拉字典
      mainFormOptions: {
        status: [
          { value: "10", label: "未提交" },
          { value: "15", label: "审核驳回" },
          { value: "20", label: "待审核" },
          { value: "30", label: "审核通过" },
          { value: "40", label: "已退会" }
        ]
      },
      //表单el标签属性
      mainFormProps: {},

      //主表form
      mainForm: {
        id: "",
        status: "10",
        //会员编号
        code: "",
        //会员名称
        name: "",
        //注册资金
        registeredFunds: "",
        //法定代表人姓名
        legalRepresentName: "",
        //公司性质
        corporateNature: "",
        //主要业务范围
        mainBusinessScope: "",
        //通讯地址
        postalAddress: "",
        //传真
        fax: "",
        //邮政编码
        postalCode: "",
        //邮箱
        email: "",
        //QQ号
        qq: "",
        //联系人姓名
        contactName: "",
        //联系人电话
        contactPhone: "",
        //联系人职务
        contactJob: "",
        //联系人手机
        contactTel: "",
        //联系人邮箱
        contactEmail: "",
        //入会时间
        entryMeetingDate: "",
        //入会会议
        entryMeeting: "",
        //备注
        remarks: "",
        hasReadApply: false,
        hasReadRight: false,
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        companyId: "",
        officeFullPaths: "",
        auditBy: "",
        auditDate: "",
        auditReason: ""
      },
      mainFormRules: {
        name: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          { max: 20, message: "长度在 20 个字符", trigger: "blur" }
        ],
        registeredFunds: [
          { required: true, message: "请输入注册资金", trigger: "blur" }
        ],
        legalRepresentName: [
          { required: true, message: "请输入法人代表姓名", trigger: "blur" },
          { max: 20, message: "长度在 20 个字符", trigger: "blur" }
        ],
        corporateNature: [
          { required: true, message: "请输入公司性质", trigger: "blur" }
        ],
        mainBusinessScope: [
          { required: true, message: "请输入主业务范围", trigger: "blur" }
        ],
        postalAddress: [
          { required: true, message: "请输入通讯地址", trigger: "blur" }
        ],
        fax: [
          {
            pattern: /^(\d{3,4}-)?\d{7,8}$/,
            required: true,
            message: "请输入正确格式的传真",
            trigger: "blur"
          }
        ],
        postalCode: [
          {
            required: true,
            pattern: /^[1-9][0-9]{5}$/,
            message: "格式不正确",
            trigger: ["blur"]
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        qq: [{ required: true, message: "请输入QQ号", trigger: "blur" }],
        contactName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ],
        contactJob: [
          { required: true, message: "请输入联系人职务", trigger: "blur" }
        ],
        contactTel: [
          { required: true, message: "请输入联系人手机", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            required: true,
            message: "请输入正确格式的手机号",
            trigger: "blur"
          }
        ],
        contactEmail: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        entryMeetingDate: [
          { required: true, message: "请输入入会时间", trigger: "blur" }
        ],
        entryMeeting: [
          { required: true, message: "请输入入会会议", trigger: "blur" }
        ],
        hasReadApply: [
          {
            type: "boolean",
            required: true,
            trigger: "blur",
            validator(rule, value, callback) {
              if (value) {
                callback();
              } else {
                callback(new Error("请阅读并同意申请书"));
              }
            }
          }
        ],
        hasReadRight: [
          {
            type: "boolean",
            required: true,
            trigger: "blur",
            validator(rule, value, callback) {
              if (value) {
                callback();
              } else {
                callback(new Error("请阅读并同意权力和义务"));
              }
            }
          }
        ]
      },
      memberApplyDialogShow: false,
      memberRightDialogShow: false
    };
  },
  created() {
    // 初始化查询表单
    this.initForm();
  },
  methods: {
    initForm() {
      let id = this.$route.query.id;
      getMember(id).then(response => {
        this.assignToMainForm(response.data);
      });
    },
    assignToMainForm(data) {
      data.hasReadApply = data.hasReadApply == 1;
      data.hasReadRight = data.hasReadRight == 1;
      //同名字段覆盖，不同名字段添加
      Object.assign(this.mainForm, data);
    },
    save() {
      this.$refs["mainForm"].validate(valid => {
        if (valid) {
          //做数据拷贝，防止影响双向绑定的数据
          var mainData = JSON.parse(JSON.stringify(this.mainForm));
          mainData.hasReadApply = this.hasReadApply ? 1 : 0;
          mainData.hasReadRight = this.hasReadRight ? 1 : 0;
          memberApply(mainData).then(response => {
            this.mainForm.id = response.data.id;
            var msg = this.mainForm.id ? "保存成功" : "保存失败";
            this.$message({
              type: "success",
              message: msg
            });
          });
        }
      });
    },
    submit() {
      var id = this.mainForm.id;
      //校验
      if (!id) {
        this.$message({
          type: "success",
          message: "请先保存数据"
        });
      }
      //提交
      submitMember(id).then(response => {
        this.mainForm.status = response.data.status;
        var msg = this.mainForm.status == "20" ? "提交成功" : "提交失败";
        this.$message({
          type: "success",
          message: msg
        });
      });
    },
    cancel() {
      this.$nextTick(() => {
        this.$refs["mainForm"].resetFields();
      });
    },
    memberApplyDialogCallBack(command) {
      this.memberApplyDialogShow = !this.memberApplyDialogShow;
      if (command == "yes") {
        this.mainForm.hasReadApply = true;
      } else {
        this.mainForm.hasReadApply = false;
      }
    },
    memberRightDialogCallBack(command) {
      this.memberRightDialogShow = !this.memberRightDialogShow;
      if (command == "yes") {
        this.mainForm.hasReadRight = true;
      } else {
        this.mainForm.hasReadRight = false;
      }
    },
    //data中这个不能少：btns: this.$store.getters.btns['100010'],
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      for (var i = 0; i < this.btns.length; i++) {
        if (menuCode === this.btns[i]) {
          return true;
        }
      }
      return false;
    },
    btnDisplay(status) {
      //根据具体业务数据控制
      if (this.mainForm.status == status) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.title {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
  font-size: 20px;
  text-align: center;
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
