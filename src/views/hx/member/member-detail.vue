<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">会员详情</a>
        </el-col>
      </el-row>
      <!-- 会员信息 -->
      <el-form ref="hxForm" :model="hxForm" label-width="110px" size="mini">
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">会员信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="会员证书编号" size="mini" prop="certificateNo">
              <el-input v-model="hxForm.certificateNo" size="mini" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会员名称" size="mini" prop="name">
              <el-input v-model="hxForm.name" size="mini" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" size="mini" prop="status">
              <el-select v-model="hxForm.status" size="mini" style="width:100%" :disabled="true">
                <el-option
                  v-for="item in formOptions.hxStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="过期时间" size="mini" prop="expiryDate">
              <el-input v-model="hxForm.expiryDate" size="mini" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属地区" size="mini" prop="areas">
              <el-cascader
                :props="formProps.area"
                :options="formOptions.area"
                v-model="hxForm.areas"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
                :disabled="true"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
        <el-tab-pane label="销售代理会员信息" name="hxXdMember">
          <el-form ref="hxXdForm" :model="hxXdForm" label-width="110px" size="mini">
            <!-- 第一块分组 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">基础信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="申请编号" size="mini" prop="code">
                  <el-input v-model="hxXdForm.code" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="会员姓名" size="mini" prop="name">
                  <el-input v-model="hxXdForm.name" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" size="mini" prop="status">
                  <el-select
                    v-model="hxXdForm.status"
                    size="mini"
                    style="width:100%"
                    :disabled="true"
                  >
                    <el-option
                      v-for="item in formOptions.status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司性质" size="mini" prop="corporateNature">
                  <el-input v-model="hxXdForm.corporateNature" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="法人代表姓名" size="mini" prop="legalRepresentName">
                  <el-input v-model="hxXdForm.legalRepresentName" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="注册资金(万)" size="mini" prop="registeredFunds">
                  <el-input v-model="hxXdForm.registeredFunds" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="主业务范围" size="mini" prop="mainBusinessScope">
                  <el-input v-model="hxXdForm.mainBusinessScope" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="传真" size="mini" prop="fax">
                  <el-input v-model="hxXdForm.fax" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="邮政编码" size="mini" prop="postalCode">
                  <el-input v-model="hxXdForm.postalCode" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="通讯地址" size="mini" prop="postalAddress">
                  <el-input v-model="hxXdForm.postalAddress" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="Email" size="mini" prop="email">
                  <el-input v-model="hxXdForm.email" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="QQ号" size="mini" prop="qq">
                  <el-input v-model="hxXdForm.qq" size="mini" :readonly="true"></el-input>
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
                  <el-input v-model="hxXdForm.contactName" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="电话" size="mini" prop="contactPhone">
                  <el-input v-model="hxXdForm.contactPhone" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="职务" size="mini" prop="contactJob">
                  <el-input v-model="hxXdForm.contactJob" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="手机号" size="mini" prop="contactTel">
                  <el-input v-model="hxXdForm.contactTel" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="归属地区" size="mini" prop="areas">
                  <el-cascader
                    :props="formProps.area"
                    :options="formOptions.area"
                    v-model="hxXdForm.areas"
                    clearable
                    filterable
                    size="mini"
                    style="width:100%;"
                    change-on-select
                    :disabled="true"
                  ></el-cascader>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="邮箱" size="mini" prop="contactEmail">
                  <el-input v-model="hxXdForm.contactEmail" size="mini" :readonly="true"></el-input>
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
                    v-model="hxXdForm.entryMeetingDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="left"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    style="width:100%"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="会员证书编号" size="mini" prop="certificateNo">
                  <el-input v-model="hxXdForm.certificateNo" size="mini" maxlength="200" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="批准会议" size="mini" prop="entryMeeting">
                  <el-input v-model="hxXdForm.entryMeeting" size="mini" maxlength="200" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="备注" size="mini" prop="remarks">
                  <el-input
                    v-model="hxXdForm.remarks"
                    size="mini"
                    type="textarea"
                    :rows="4"
                    maxlength="500"
                    show-word-limit
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">身份标记</h5>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="身份标记" size="mini" prop="identityMark">
                  <el-input v-model="hxXdForm.identityMark" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="身份标记时间" size="mini" prop="identityMarkDate">
                  <el-input v-model="hxXdForm.identityMarkDate" size="mini" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">协议与权利义务</h5>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="24">
                <!-- 是否同意申请 -->
                <el-form-item label size="mini" prop="hasReadApply">
                  <el-checkbox v-model="hxXdForm.hasReadApply" :disabled="true" ></el-checkbox>
                  <el-button :disabled="true"
                    type="text"
                    @click=" memberApplyDialogShow=true"
                  >《中国航空运输协会销售代理分会单位会员申请书》</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <!-- 是否已读权利和义务 -->
                <el-form-item label size="mini" prop="hasReadRight">
                  <el-checkbox v-model="hxXdForm.hasReadRight" :disabled="true"></el-checkbox>
                  <el-button type="text" @click=" memberRightDialogShow=true" :disabled="true">《会员的权利与义务》</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <!-- 中国航空运输协会销售代理分会单位会员申请书 彈框 -->
      <el-dialog title="中国航空运输协会销售代理分会单位会员申请书" :visible.sync="memberApplyDialogShow">
        <div>
          <!-- 内容开始 -->
          <p style="color:#666666;font-family:ArialMT, Arial;font-size:13px;text-align:center;">
            <span style="font-family:Arial-BoldMT, &quot;font-weight:700;">
              <strong>中国航空运输协会销售代理分会</strong>
            </span>
          </p>
          <p style="color:#666666;font-family:ArialMT, Arial;font-size:13px;">
            <span style="font-family:Arial-BoldMT, &quot;font-weight:700;">单位会员申请书</span>
          </p>
          <p style="color:#666666;font-family:ArialMT, Arial;font-size:13px;">中国航空运输协会销售代理分会：</p>
          <p
            style="color:#666666;font-family:ArialMT, Arial;font-size:13px;"
          >&nbsp;&nbsp;&nbsp;&nbsp;经研究，我单位自愿加入“中国航空运输协会销售代理分会”，并成为中国航空运输协会销售代理分会会员单位，遵循分会工作规则，执行分会决议，履行会员义务，按时缴纳会费。</p>
          <p style="color:#666666;font-family:ArialMT, Arial;font-size:13px;">
            <br />
          </p>
          <p
            style="text-align:right;color:#666666;font-family:ArialMT, Arial;font-size:13px;"
          >中国航空运输协会</p>
          <div
            style="text-align:right;color:#666666;font-family:ArialMT, Arial;font-size:13px;"
          >航空运输销售代理人委员会</div>
          <!-- 内容结束 -->
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="memberApplyDialogCallBack('yes')">同意</el-button>
          <el-button type="primary" @click="memberApplyDialogCallBack('no')">不同意</el-button>
        </div>
      </el-dialog>

      <el-dialog title="会员的权利与义务" :visible.sync="memberRightDialogShow">
        <div>
          <!-- 内容开始 -->
          <div style="color:#666666;font-family:ArialMT, Arial;font-size:13px;">
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >根据《中国航空运输协会航空运输销售代理人委员会组织和工作规则》，贵公司成为&nbsp; 会员后，将享有下列权利：</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（一）《规则》规定的选举权、被选举权和表决权；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（二）参加本委员会的活动；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（三）获得本委员会的各项服务；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（四）对销售代理行业自律提出意见和建议；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（五）对销售代理市场管理和发展提出意见和建议；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（六）对销售代理人委员会、中国航协的工作提出意见和建议，对销售代理人委员会的领导机构、工作机构和人员进行批评和监督；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（七）当合法权益受到损害时，请求本委员会给予维护；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（八）入会自愿、退会自由；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（九）依据法律、中国航协《章程》和本委员会《规则》拥有的其他权利。</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >贵公司还应履行下列义务：</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（一）遵守法律法规、依法诚信经营；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（二）遵守中国航协《章程》、本《规则》和中国航协、本委员会的各项决议、规定；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（三）维护中国航协和本委员会的权益；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（四）参加本委员会组织的会议和活动，完成本委员会交办的工作；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（五）向本委员会提供有关资料和统计数据；</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >（六）正式履行入会手续，按时缴纳会费。</p>
            <p
              style="font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >&nbsp;</p>
            <p
              style="text-align:right;font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >中国航空运输协会</p>
            <p
              style="text-align:right;font-family:ArialMT, Arial;background-color:#FFFFFF;color:#666666;font-size:13px;"
            >航空运输销售代理人委员会</p>
          </div>
          <br />
          <!-- 内容结束 -->
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="memberRightDialogCallBack('yes')">同意</el-button>
          <el-button type="primary" @click="memberRightDialogCallBack('no')">不同意</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 引入axios
import {
  memberApply,
  submitMember,
  getMemberByCertNo,
  auditMember
} from "@/api/hxxd/member";
import { getHxMember } from "@/api/hx/member";
import { parseTime, strToArr } from "@/utils/index.js";
import { getAreaTree } from "@/api/system/comm/comm";

export default {
  name: "MemberDetail",
  data() {
    return {
      //表单对应下拉字典
      formOptions: {
        status: [
          { value: "10", label: "未提交" },
          { value: "15", label: "审核驳回" },
          { value: "20", label: "待审核" },
          { value: "30", label: "审核通过" },
          { value: "40", label: "已退会" }
        ],
        hxStatus: [
          { value: "10", label: "生效" },
          { value: "30", label: "作废" }
        ],
        area: []
      },
      //表单el标签属性
      formProps: {
        area: {
          multiple: false,
          checkStrictly: true,
          showAllLevels: true,
          value: "id",
          label: "name",
          children: "childs"
        }
      },
      hxForm: {
        id: "",
        code: "",
        certificateNo: "",
        name: "",
        type: "",
        status: "",
        expiryDate: "",
        areas: ""
      },
      //主表form
      hxXdForm: {
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
        areas: [],
        identityMark: "",
        identityMarkDate: ""
      },
      memberApplyDialogShow: false,
      memberRightDialogShow: false,
      // 查询面板
      activeTabName: "hxXdMember"
    };
  },
  created() {
    // 初始化查询表单
    this.initForm(this.$route.query.id);
  },
  methods: {
    // 面板切换时触发的函数
    handleTabClick() {},
    initForm(id) {
      getAreaTree().then(response => {
        this.formOptions.area = response.data;
      });
      //加载航协会员表
      getHxMember(id).then(response => {
        // 同名字段覆盖，不同名字段添加
        Object.assign(this.hxForm, response.data);
        this.hxForm.areas = strToArr(response.data.areas, ",");
        //加载航协会员信息
        console.log("this.hxForm.certificateNo", this.hxForm.certificateNo);
        if (this.hxForm.certificateNo) {
          getMemberByCertNo(this.hxForm.certificateNo).then(response => {
            // 同名字段覆盖，不同名字段添加
            Object.assign(this.hxXdForm, response.data);
            this.hxXdForm.areas = strToArr(response.data.areas, ",");
            this.hxXdForm.hasReadApply = response.data.hasReadApply == 1;
            this.hxXdForm.hasReadRight = response.data.hasReadRight == 1;
          });
        }
      });
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
      if (this.hxXdForm.status == status) {
        return true;
      }
      return false;
    },
    memberApplyDialogCallBack(command) {
      this.memberApplyDialogShow = !this.memberApplyDialogShow;
      if (command == "yes") {
        this.hxXdForm.hasReadApply = true;
      } else {
        this.hxXdForm.hasReadApply = false;
      }
    },
    memberRightDialogCallBack(command) {
      this.memberRightDialogShow = !this.memberRightDialogShow;
      if (command == "yes") {
        this.hxXdForm.hasReadRight = true;
      } else {
        this.hxXdForm.hasReadRight = false;
      }
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
