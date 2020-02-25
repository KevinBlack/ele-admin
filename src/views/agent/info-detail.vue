<template>
  <el-card class="detailsContainer">
    <el-tabs v-model="tabView">
      <el-tab-pane label="企业信息" name="info1">
        <el-row>
          <!-- 企业信息 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <h5 class="dtl-title-line">企业信息</h5>
            </el-col>
          </el-row>

          <el-form
            ref="ruleForm"
            :model="hxXdCompanyInfoParam"
            :disabled="disabled"
            label-width="150px"
            size="mini"
            :rules="rules1"
          >
            <el-row :gutter="20" class="line_bottom">
              <el-col :span="12">
                <el-form-item label="企业名称" prop="businessName">
                  <el-input
                    v-model="hxXdCompanyInfoParam.businessName"
                    :readonly="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="英文名称" prop="businessNameEn">
                  <el-input v-model="hxXdCompanyInfoParam.businessNameEn" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经营地址" prop="businessAddress">
                  <el-input v-model="hxXdCompanyInfoParam.businessAddress" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业性质" prop="enterpriseNature">
                  <el-input v-model="hxXdCompanyInfoParam.enterpriseNature" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属省份" prop="province">
                  <el-select
                    v-model="hxXdCompanyInfoParam.province"
                    filterable
                    placeholder="请选择"
                    size="mini"
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
              <el-col :span="6">
                <el-form-item label="所属地区" prop="area">
                  <el-select
                    v-model="hxXdCompanyInfoParam.area"
                    filterable
                    placeholder="请选择"
                    size="mini"
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
              <el-col :span="6">
                <el-form-item label="统一社会信用代码" prop="socialCode">
                  <el-input v-model="hxXdCompanyInfoParam.socialCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工商登记机关" prop="bureauCommerce">
                  <el-input v-model="hxXdCompanyInfoParam.bureauCommerce" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织机构代码" prop="orgCode">
                  <el-input v-model="hxXdCompanyInfoParam.orgCode" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="代码证颁发机关" prop="codeCertiAuth">
                  <el-input v-model="hxXdCompanyInfoParam.codeCertiAuth" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="旅行社经营许可证" prop="travelLicense">
                  <el-input v-model="hxXdCompanyInfoParam.travelLicense" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="营业执照" prop="licenseNo">
                  <el-input v-model="hxXdCompanyInfoParam.licenseNo" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="附件">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action
                    :on-preview="handlePreview"
                    :before-upload="handleUpload"
                    :headers="uploadHeaders"
                    :multiple="true"
                    :file-list="fileList"
                    :auto-upload="false"
                  >
                    <el-button slot="trigger" size="mini" type="primary"
                      >选取文件</el-button
                    >
                  </el-upload>
                  <el-button
                    :key="index"
                    v-for="(item, index) in hxXdCompanyInfoParam.fileList"
                    type="text"
                    @click="
                      fileClick(item.fileCatalog, item.belongId, item.fileName)
                    "
                    >{{ item.fileName }}</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 法定代表人信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">法定代表人信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="line_bottom">
              <el-col :span="6">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="hxXdCompanyInfoParam.name" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别" prop="sex">
                  <el-select
                    v-model="hxXdCompanyInfoParam.sex"
                    filterable
                    placeholder="请选择"
                    size="mini"
                  >
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍" prop="nationality">
                  <el-input v-model="hxXdCompanyInfoParam.nationality" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学历" prop="educationalBackground">
                  <el-input
                    v-model="hxXdCompanyInfoParam.educationalBackground"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份证号/护照号" prop="idNum">
                  <el-input v-model="hxXdCompanyInfoParam.idNum" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 投资人信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">投资人信息</h5>
              </el-col>
            </el-row>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addLine"
              >添加</el-button
            >
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleDelete"
              >删除</el-button
            >
            <el-table
              ref="multipleTable"
              :data="investorList"
              border
              style="width: 100%; margin-top: 20px;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column prop="investorType" label="投资人类型">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.investorType"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="investorName" label="投资人名称">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.investorName"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="certificateNum" label="证照/证件号码">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.certificateNum"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="investmentAmount" label="投资金额（万元）">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.investmentAmount"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="currencyType" label="货币类型">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.currencyType"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="currencyType" label="投资比例">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.investmentsRatio"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
            </el-table>
            <!-- 分支机构信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">分支机构信息</h5>
              </el-col>
            </el-row>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="subsidAddLine"
              >添加</el-button
            >
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="subsidHandleDelete"
              >删除</el-button
            >
            <el-table
              ref="multipleTable"
              :data="subsidiaryList"
              border
              style="width: 100%; margin-top: 20px;"
              @selection-change="subsidHandleSelectionChange"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column prop="subsidiaryName" label="名称">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryName"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="subsidiaryAddr" label="地址">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryAddr"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="subsidiaryLinkman" label="联系人">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryLinkman"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="subsidiaryPhone" label="电话">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryPhone"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
            </el-table>

            <!-- 其他信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">其它信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="IATA号码" prop="iataNum">
                  <el-input v-model="hxXdCompanyInfoParam.iataNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="CDS号码" prop="cdsNum">
                  <el-input v-model="hxXdCompanyInfoParam.cdsNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="中性货单结算号码" prop="neutralBillNum">
                  <el-input v-model="hxXdCompanyInfoParam.neutralBillNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="OFFICE号码" prop="officeNo">
                  <el-input v-model="hxXdCompanyInfoParam.officeNo" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="常用信息" name="info2">
        <el-row>
          <el-form
            ref="ruleForm2"
            :model="HxXdCompanyCommonInfoParam"
            :disabled="disabled"
            label-width="130px"
            size="mini"
          >
            <!-- 银行信息 -->
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">银行信息</h5>
              </el-col>
            </el-row>
            <el-row class="line_bottom">
              <el-col :span="6">
                <el-form-item label="开户银行" prop="bankName">
                  <el-input v-model="HxXdCompanyCommonInfoParam.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开户账号" prop="openAccountNum">
                  <el-input
                    v-model="HxXdCompanyCommonInfoParam.openAccountNum"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍" prop="nationality">
                  <el-input v-model="HxXdCompanyCommonInfoParam.nationality" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学历" prop="bankEducationalBackground">
                  <el-select
                    v-model="
                      HxXdCompanyCommonInfoParam.bankEducationalBackground
                    "
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in educationalBackgroundOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="bankRemarks">
                  <el-input
                    type="textarea"
                    maxlength="60"
                    :autosize="{ minRows: 6, maxRows: 8 }"
                    show-word-limit
                    v-model="HxXdCompanyCommonInfoParam.bankRemarks"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 负责人信息 -->
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">业务负责人信息</h5>
              </el-col>
            </el-row>
            <el-row class="line_bottom">
              <el-col :span="6">
                <el-form-item label="姓名" prop="chargeName">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别" prop="chargeSex">
                  <el-select
                    v-model="HxXdCompanyCommonInfoParam.chargeSex"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学历" prop="chargeEducationalBackground">
                  <el-select
                    v-model="
                      HxXdCompanyCommonInfoParam.chargeEducationalBackground
                    "
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in educationalBackgroundOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份证号" prop="idNum">
                  <el-input v-model="HxXdCompanyCommonInfoParam.idNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号" prop="cellNum">
                  <el-input v-model="HxXdCompanyCommonInfoParam.cellNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话号" prop="phoneNum">
                  <el-input v-model="HxXdCompanyCommonInfoParam.phoneNum" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="电子邮箱" prop="chargeMail">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeMail" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="快递地址" prop="chargeExpAddr">
                  <el-input
                    v-model="HxXdCompanyCommonInfoParam.chargeExpAddr"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="传真" prop="chargeFax">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeFax" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 从业人员信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">从业人员信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="从业人员总数" prop="employeesNumber">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.employeesNumber"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="懂英语人数" prop="understandEnNum">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.understandEnNum"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="合格人数（国内）"
                  prop="internalQualifiedNum"
                >
                  <el-input
                    v-model.number="
                      HxXdCompanyCommonInfoParam.internalQualifiedNum
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="合格人员（国内）"
                  prop="internationalQualifiedNum"
                >
                  <el-input
                    v-model.number="
                      HxXdCompanyCommonInfoParam.internationalQualifiedNum
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="女员工人数" prop="femaleEmployeesNum">
                  <el-input
                    v-model.number="
                      HxXdCompanyCommonInfoParam.femaleEmployeesNum
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同工数量" prop="contractsNumber">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.contractsNumber"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="派遣工数量" prop="dispatchWorker">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.dispatchWorker"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <!-- <el-col :span='12'>
        <a href='javascrip:;' style='color: #409EFF'>
          <i class='el-icon-back' style='color: #409EFF;margin-right: 5px;c' />返 回
        </a>
      </el-col>-->
      <el-col :span="24" v-if="isButton" class="btn_bottom">
        <el-button
          type="primary"
          size="mini"
          v-show="btnShow('100020110020')"
          @click="companyInfoSave()"
          >保存</el-button
        >
        <el-button type="primary" size="mini" @click="companyInfoCansle()"
          >取消</el-button
        >
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {
  getCompanyInfoById,
  getCommonById,
  companyUpdate,
  commonUpdate
} from "@/api/hxxd/agent";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      btns: this.$store.getters.btns["1000201100"],
      // 传递文件用
      formData: new FormData(),
      // 上传文件的相关变量
      fileList: [],
      uploadHeaders: {
        "X-Token": getToken()
      },
      isButton: true,
      disabled: true,
      sexOptions: [
        {
          value: "0",
          label: "男"
        },
        {
          value: "1",
          label: "女"
        }
      ],
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
      tabView: "info1",
      hxXdCompanyInfoParam: {
        id: "",
        businessName: "",
        businessNameEn: "",
        businessAddress: "",
        enterpriseNature: "",
        province: "",
        area: "",
        socialCode: "",
        bureauCommerce: "",
        orgCode: "",
        codeCertiAuth: "",
        travelLicense: "",
        licenseNo: "",
        name: "",
        sex: "",
        nationality: "",
        educationalBackground: "",
        idNum: "",
        iataNum: "",
        cdsNum: "",
        officeNo: "",
        neutralBillNum: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: "",
        hxXdInvestorInfoParamList: [],
        fileList: []
      },
      // 分支机构相关信息
      subsidiaryList: [
        {
          id: "",
          companyInfoId: "",
          subsidiaryName: "",
          subsidiaryAddr: "",
          subsidiaryLinkman: "",
          subsidiaryPhone: ""
        }
      ],
      subsidSelectArr: [],
      investorList: [
        {
          id: "",
          companyInfoId: "",
          investorType: "",
          investorName: "",
          certificateNum: "",
          investmentAmount: "",
          currencyType: "",
          investmentsRatio: ""
        }
      ],
      HxXdCompanyCommonInfoParam: {
        id: "",
        companyInfoId: "",
        chargeFax: "",
        chargeExpAddr: "",
        chargeMail: "",
        bankName: "",
        bankRemarks: "",
        openAccountNum: "",
        nationality: "",
        bankEducationalBackground: "",
        chargeName: "",
        chargeSex: "",
        chargeEducationalBackground: "",
        idNum: "",
        cellNum: "",
        phoneNum: "",
        employeesNumber: "",
        understandEnNum: "",
        internalQualifiedNum: "",
        internationalQualifiedNum: "",
        contractsNumber: "",
        dispatchWorker: "",
        femaleEmployeesNum: ""
      },
      selectArr: [],
      rules1: {
        businessName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        socialCode: [
          { required: true, message: "不能为空", trigger: "change" },
          { pattern: /^[0-9\/ ]{18,18}$/, message: "格式不正确" }
        ],
        bureauCommerce: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        idNum: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[0-9\/ ]{18,18}$/, message: "格式不正确" }
        ],
        orgCode: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[0-9\/ ]{9,9}$/, message: "格式不正确" }
        ]
      }
    };
  },
  created() {
    // 初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id;
    let type = this.$route.query.type;
    if (type == "update") {
      this.disabled = false;
    } else if (type == "show") {
      this.isButton = false;
      this.disabled = true;
    }
    if (id) {
      this.getCompanyInfoById(id);
      this.getCommonById(id);
    }
  },
  methods: {
    btnShow(menuCode) {
      // 根据用户所具有的菜单项控制
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
    // 修改数据时文件相关操作
    // 文件上传相关方法
    handleUpload(file) {
      this.formData.append("fileList", file);
      return false;
    },
    handlePreview(file) {
      console.log(file);
    },
    // 查看数据时文件展示
    fileClick(fileCatalog, belongId, fileName) {
      downloadTemplate(belongId, fileCatalog).then(response => {
        console.log("fileCatalog==" + fileCatalog);
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        var fileName = decodeURIComponent(result[1]).trim();
        const blob = new Blob([response.data]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          console.log(elink.href);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    goback() {
      this.$router.push({
        path: "/agent/agentquery",
        query: { flag: "1" }
      });
    },
    // 企业信息修改保存
    companyInfoSave() {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              const arr = this.investorList;
              for (const item of arr) {
                for (const p in item) {
                  if (item[p] === "") {
                    this.$message({
                      type: "success",
                      message: "请完善投资人数据"
                    });
                    return;
                  } else {
                    // 数据校验成功
                    this.hxXdCompanyInfoParam.hxXdInvestorInfoParamList = this.investorList;
                  }
                }
              }
              var hxXdCompanyInfoParamStr = JSON.stringify(
                this.hxXdCompanyInfoParam
              );
              var hxXdCompanyCommonInfoParamStr = JSON.stringify(
                this.HxXdCompanyCommonInfoParam
              );

              this.formData.append(
                "hxXdCompanyInfoParamStr",
                hxXdCompanyInfoParamStr
              );
              this.formData.append(
                "hxXdCompanyCommonInfoParamStr",
                hxXdCompanyCommonInfoParamStr
              );
              this.$refs.upload.submit(); // 附件文件上传
              companyUpdate(this.formData).then(response => {
                var msg = response.status == 200 ? "保存成功" : "保存失败";
                if (response.status === 200) {
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
            } else {
              //校验失败
              this.$message({
                message: "请正确录入企业信息页面数据",
                type: "warning"
              });
            }
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入企业基本信息页面数据",
            type: "warning"
          });
        }
      });
    },

    //企业信息查询
    getCompanyInfoById(id) {
      this.hxXdCompanyInfoParam.id = id;
      getCompanyInfoById(this.hxXdCompanyInfoParam).then(response => {
        this.hxXdCompanyInfoParam = response.data;
        //获取投资人信息
        this.investorList = this.hxXdCompanyInfoParam.hxXdInvestorInfoVOList;
        if (this.investorList == undefined) {
          this.investorList = [];
        }
        //获取分公司信息
        this.subsidiaryList = this.hxXdCompanyInfoParam.hxXdSubsidiaryVOList;
        if (this.subsidiaryList == undefined) {
          this.subsidiaryList = [];
        }
      });
    },
    //常用信息查询
    getCommonById(id) {
      this.HxXdCompanyCommonInfoParam.companyInfoId = id;
      getCommonById(this.HxXdCompanyCommonInfoParam).then(response => {
        this.HxXdCompanyCommonInfoParam = response.data;
        this.HxXdCompanyCommonInfoParam.companyInfoId = id;
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectArr = val;
    },
    addLine() {
      // 添加行数
      const len = this.investorList.length - 1;
      const sum = len >= 0 ? this.investorList[len].id : 0;
      const result = sum + 1;
      var newValue = {
        companyInfoId: "",
        investorType: "",
        investorName: "",
        certificateNum: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: "",
        editing: true
      };
      // 添加新的行数
      this.investorList.push(newValue);
    },
    handleDelete(index) {
      // 删除行数
      if (this.selectArr.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的项",
          type: "warning",
          duration: 2000
        });
      } else {
        const delArr = [];
        for (var i = 0; i < this.investorList.length; i++) {
          if (this.selectArr.indexOf(this.investorList[i]) === -1) {
            delArr.push(this.investorList[i]);
          }
        }
        this.investorList = delArr;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
    },
    //分支机构相关信息
    subsidHandleSelectionChange(val) {
      console.log(val);
      this.subsidSelectArr = val;
    },
    subsidAddLine() {
      // 添加行数
      const len = this.subsidiaryList.length - 1;
      const sum = len >= 0 ? this.subsidiaryList[len].id : 0;
      const result = sum + 1;
      var newValue = {
        subsidiaryName: "",
        subsidiaryAddr: "",
        subsidiaryLinkman: "",
        subsidiaryPhone: ""
      };
      // 添加新的行数
      this.subsidiaryList.push(newValue);
    },
    subsidHandleDelete(index) {
      // 删除行数
      if (this.subsidSelectArr.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的项",
          type: "warning",
          duration: 2000
        });
      } else {
        const delArr = [];
        for (var i = 0; i < this.subsidiaryList.length; i++) {
          if (this.subsidSelectArr.indexOf(this.subsidiaryList[i]) === -1) {
            delArr.push(this.subsidiaryList[i]);
          }
        }
        this.subsidiaryList = delArr;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
