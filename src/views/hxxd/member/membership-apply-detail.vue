<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">会员申请详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="save" v-if="btnDisplay('10,15')">保存</el-button>
          <el-button type="primary" size="mini" @click="submit" v-if="btnDisplay('10,15')">提交</el-button>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col class="title">
          <span>会员申请</span>
        </el-col>
      </el-row>-->
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
          <el-col :span="12">
            <el-form-item label="申请编号" size="mini" prop="code">
              <el-input v-model="mainForm.code" size="mini" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会员姓名" size="mini" prop="name">
              <el-input v-model="mainForm.name" size="mini"></el-input>
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
          <el-col :span="6">
            <el-form-item label="法人代表姓名" size="mini" prop="legalRepresentName">
              <el-input v-model="mainForm.legalRepresentName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册资金(万)" size="mini" prop="registeredFunds">
              <el-input v-model="mainForm.registeredFunds" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="主业务范围" size="mini" prop="mainBusinessScope">
              <el-input v-model="mainForm.mainBusinessScope" size="mini"></el-input>
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

          <el-col :span="12">
            <el-form-item label="通讯地址" size="mini" prop="postalAddress">
              <el-input v-model="mainForm.postalAddress" size="mini"></el-input>
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

          <el-col :span="12">
            <el-form-item label="归属地区" size="mini" prop="areas">
              <el-cascader
                :props="mainFormProps.area"
                :options="mainFormOptions.area"
                v-model="mainForm.areas"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
              ></el-cascader>
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
            <el-form-item label="会员证书编号" size="mini" prop="certificateNo">
              <el-input
                v-model="mainForm.certificateNo"
                size="mini"
                maxlength="200"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="批准会议" size="mini" prop="entryMeeting">
              <el-input v-model="mainForm.entryMeeting" size="mini" maxlength="200"></el-input>
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
          <el-col :span="24">
            <!-- 是否同意申请 -->
            <el-form-item label size="mini" prop="hasReadApply">
              <el-checkbox v-model="mainForm.hasReadApply"></el-checkbox>
              <el-button type="text" @click=" memberApplyDialogShow=true">《中国航空运输协会销售代理分会单位会员申请书》</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <!-- 是否已读权利和义务 -->
            <el-form-item label size="mini" prop="hasReadRight">
              <el-checkbox v-model="mainForm.hasReadRight"></el-checkbox>
              <el-button type="text" @click=" memberRightDialogShow=true">《会员的权利与义务》</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">附件</h5>
          </el-col>
        </el-row>

        <!-- 按钮区域 -->
        <el-row class="area_bordes">
          <el-col :span="24">
            <el-button-group size="mini">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleFileAdd">新增</el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="batchFileDelete"
              >删除</el-button>
            </el-button-group>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-table
            ref="fileTable"
            :data="fileTable"
            border
            tooltip-effect="dark"
            style="width: 100%;margin-bottom:20px;"
            @selection-change="fileTableSelectChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="filename" label="文件名" align="center"></el-table-column>
          </el-table>
        </el-row>
      </el-form>

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
import { memberApply, submitMember, getMember } from "@/api/hxxd/member";
import { parseTime, strToArr, makeCode } from "@/utils/index.js";
import { getAreaTree } from "@/api/system/comm/comm";

export default {
  name: "MembershipApplyDetail",
  data() {
    return {
      //附件上传
      fileTable: [],
      //表单对应下拉字典
      mainFormOptions: {
        status: [
          { value: "10", label: "未提交" },
          { value: "15", label: "审核驳回" },
          { value: "20", label: "待审核" },
          { value: "30", label: "审核通过" },
          { value: "40", label: "已退会" }
        ],
        area: []
      },
      //表单el标签属性
      mainFormProps: {
        area: {
          multiple: false,
          checkStrictly: true,
          showAllLevels: true,
          value: "id",
          label: "name",
          children: "childs"
        }
      },
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
        areas: [],
        certificateNo: ""
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
        area: [
          {
            type: "array",
            required: true,
            message: "归属地区不能为空",
            trigger: ["change", "blur"]
          }
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
  watch: {
    "$route.query.id": function(val, oldVal) {
      // console.log(val);
      // console.log(oldVal);
      if (val) {
        if (val != oldVal) {
          this.initForm(val);
        }
      } else {
        this.initForm(val);
      }
    }
  },
  created() {
    let id = this.$route.query.id;
    // 初始化查询表单
    this.initForm(this.$route.query.id);
  },
  methods: {
    initForm(id) {
      getAreaTree().then(response => {
        this.mainFormOptions.area = response.data;
      });
      // 生成申请编号
      this.mainForm.code = makeCode("HXXD");
      if (id) {
        getMember(id).then(response => {
          // 同名字段覆盖，不同名字段添加
          Object.assign(this.mainForm, response.data);
          this.mainForm.areas = strToArr(response.data.areas, ",");
          //
          this.mainForm.hasReadApply = response.data.hasReadApply == 1;
          this.mainForm.hasReadRight = response.data.hasReadRight == 1;
        });
      }
    },
    save() {
      this.$refs["mainForm"].validate(valid => {
        if (valid) {
          //做数据拷贝，防止影响双向绑定的数据
          var mainData = JSON.parse(JSON.stringify(this.mainForm));
          mainData.hasReadApply = mainData.hasReadApply ? 1 : 0;
          mainData.hasReadRight = mainData.hasReadRight ? 1 : 0;
          mainData.areas = this.mainForm.areas.join(",");
          memberApply(mainData).then(response => {
            this.mainForm.id = response.data.id;
            //后端生成编号
            this.mainForm.code = response.data.code;
            var msg = this.mainForm.id ? "保存成功" : "保存失败";
            this.$message({
              type: "success",
              message: msg
            });
          });
        }
      });
    },
    //附件新增
    handleFileAdd(){

    },
    //附件删除
    handleFileDelete(){

    },
    submit() {
      var id = this.mainForm.id;
      //校验
      if (!id) {
        this.$message({
          type: "success",
          message: "请先保存数据"
        });
        return;
      }
      //提交
      submitMember(id).then(response => {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        //重新加载数据
        this.initForm(id);
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
    btnDisplay(multiStatus) {
      //根据具体业务数据控制
      var statusArr = strToArr(multiStatus, ",");
      if (!statusArr) {
        return false;
      } else {
        for (var i = 0; i <= statusArr.length; i++) {
          if (this.mainForm.status == statusArr[i]) {
            return true;
          }
        }
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
