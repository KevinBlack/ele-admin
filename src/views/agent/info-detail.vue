<template>
  <el-card class="detailsContainer">
    <el-tabs v-model="tabView">
      <el-tab-pane label="企业信息" name="info1">
        <el-row>
          <!-- 企业信息 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <h5 class="dtl-title-line bg-font-color">企业信息</h5>
            </el-col>
          </el-row>

          <el-form
            ref="ruleForm"
            :model="hxXdCompanyInfoParam"
            :disabled="disabled"
            label-width="135px"
            size="mini"
            :rules="rules1"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="企业名称" prop="businessName">
                  <el-input v-model="hxXdCompanyInfoParam.businessName" />
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
            </el-row>

            <!-- 法定代表人信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line bg-font-color">法定代表人信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
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
                  <el-input v-model="hxXdCompanyInfoParam.educationalBackground" />
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
                <h5 class="dtl-title-line bg-font-color">投资人信息</h5>
              </el-col>
            </el-row>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-plus"
              :disabled="disabled"
              @click="addLine"
            >添加</el-button>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-check"
              @click="savemodify"
            >保存</el-button>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleDelete"
            >删除</el-button>
            <el-table
              ref="multipleTable"
              :data="investorList"
              style="width: 100%; margin-top: 20px;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column prop="investorType" label="投资人类型">
                <template slot-scope="scope">
                  <template v-if="scope.row.editing">
                    <el-input v-model="scope.row.investorType" class="edit-input" />
                  </template>
                  <span v-else>{{ scope.row.investorType }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="investorName" label="投资人名称">
                <template slot-scope="scope">
                  <template v-if="scope.row.editing">
                    <el-input v-model="scope.row.investorName" class="edit-input" />
                  </template>
                  <span v-else>{{ scope.row.investorName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="certificateNum" label="证照/证件号码">
                <template slot-scope="scope">
                  <template v-if="scope.row.editing">
                    <el-input v-model="scope.row.certificateNum" class="edit-input" />
                  </template>
                  <span v-else>{{ scope.row.certificateNum }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="investmentAmount" label="投资金额（万元）">
                <template slot-scope="scope">
                  <template v-if="scope.row.editing">
                    <el-input v-model="scope.row.investmentAmount" class="edit-input" />
                  </template>
                  <span v-else>{{ scope.row.investmentAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="currencyType" label="货币类型">
                <template slot-scope="scope">
                  <template v-if="scope.row.editing">
                    <el-input v-model="scope.row.currencyType" class="edit-input" />
                  </template>
                  <span v-else>{{ scope.row.currencyType }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="currencyType" label="投资比例">
                <template slot-scope="scope">
                  <template v-if="scope.row.editing">
                    <el-input v-model="scope.row.investmentsRatio" class="edit-input" />
                  </template>
                  <span v-else>{{ scope.row.investmentsRatio }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="editing" label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="!scope.row.editing"
                    v-model="scope.$index"
                    type="danger"
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                  <el-button
                    v-else
                    v-model="scope.$index"
                    type="danger"
                    icon="el-icon-circle-close"
                    size="mini"
                    @click="handleCancle(scope.$index, scope.row)"
                  >取消</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 其他信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line bg-font-color">其它信息</h5>
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
            </el-row>
          </el-form>
          <!-- 按钮区 -->
          <el-row :gutter="10">
            <el-col :span="22" style="text-align:right;margin-top:20px;">
              <el-button type="primary" size="mini" @click="companyInfoSave">保存</el-button>
              <el-button type="primary" size="mini" @click="companyInfoSave">提交</el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="常用信息" name="info2">
        <el-row>
          <!-- 联系信息 -->
          <el-row :gutter="10">
            <el-col :span="24">
              <h5 class="dtl-title-line bg-font-color">联系信息</h5>
            </el-col>
          </el-row>
          <el-form
            ref="ruleForm2"
            :model="HxXdCompanyCommonInfoParam"
            :rules="rules2"
            :disabled="disabled"
            label-width="130px"
            size="mini"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="公司邮箱" prop="companyMail">
                  <el-input v-model="HxXdCompanyCommonInfoParam.companyMail" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公司电话" prop="companyPhone">
                  <el-input v-model="HxXdCompanyCommonInfoParam.companyPhone" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公司传真" prop="companyFax">
                  <el-input v-model="HxXdCompanyCommonInfoParam.companyFax" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 银行信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line bg-font-color">银行信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="开会银行" prop="bankName">
                  <el-input v-model="HxXdCompanyCommonInfoParam.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开会账号" prop="openAccountNum">
                  <el-input v-model="HxXdCompanyCommonInfoParam.openAccountNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国籍" prop="nationality">
                  <el-input v-model="HxXdCompanyCommonInfoParam.nationality" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学历" prop="bankEducationalBackground">
                  <el-input v-model="HxXdCompanyCommonInfoParam.bankEducationalBackground" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 负责人信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line bg-font-color">业务负责人信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="业务负责人姓名" prop="chargeName">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务负责人性别" prop="chargeSex">
                  <el-select
                    v-model="HxXdCompanyCommonInfoParam.chargeSex"
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
                <el-form-item label="学历" prop="chargeEducationalBackground">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeEducationalBackground" />
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
            </el-row>

            <!-- 从业人员信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line bg-font-color">从业人员信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="从业人员总数" prop="employeesNumber">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.employeesNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="懂英语人数" prop="understandEnNum">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.understandEnNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合格人数（国内）" prop="internalQualifiedNum">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.internalQualifiedNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合格人员（国内）" prop="internationalQualifiedNum">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.internationalQualifiedNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="女员工人数" prop="femaleEmployeesNum">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.femaleEmployeesNum" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同工数量" prop="contractsNumber">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.contractsNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="派遣工数量" prop="dispatchWorker">
                  <el-input v-model.number="HxXdCompanyCommonInfoParam.dispatchWorker" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 按钮区 -->
          <el-row :gutter="10">
            <el-col :span="22" style="text-align:right;margin-top:20px;">
              <el-button type="primary" size="mini" @click="companyInfoCommonSave()">保存</el-button>
              <el-button type="primary" size="mini" @click="companyInfoCommonSave()">提交</el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getCompanyInfoById, getCommonById ,companyUpdate ,commonUpdate} from "@/api/hxxd/agent";
export default {
  data() {
    return {
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
        neutralBillNum: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: ""
      },
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
      hxxdCompanyInfo: {
        companyInfo: "",
        investorList: ""
      },
      HxXdCompanyCommonInfoParam: {
        id: "",
        companyInfoId: "",
        companyMail: "",
        companyPhone: "",
        companyFax: "",
        bankName: "",
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
      }
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id;
    let type = this.$route.query.type;
    if (type == "update") {
      this.disabled = false;
    } else if (type == "show") {
      this.disabled = true;
    }
    if (id) {
      this.getCompanyInfoById(id);
      this.getCommonById(id);
    }
  },
  methods: {
    goback() {
      this.$router.push({
        path: "/agent/agentquery",
        query: { flag: "1" }
      });
    },
     //企业信息保存
    companyInfoSave() {
      // this.$refs["ruleForm"].validate(valid => {
      //   debugger;
      //   if (valid) {
          //数据校验成功
          //this.companyInfo.hxXdCompanyInfoParam = this.hxXdCompanyInfoParam;
          // this.companyInfo.investorList = this.investorList;
          this.hxxdCompanyInfo.companyInfo   = JSON.stringify(this.hxXdCompanyInfoParam);
          this.hxxdCompanyInfo.investorList   = JSON.stringify(this.investorList);
          companyUpdate(this.hxxdCompanyInfo).then(response => {
            debugger;
            var msg = response.status == 200 ? "保存成功" : "保存失败";
            if (response.status == 200) {
              //保存成功
              this.$message({
                type: "success",
                message: msg
              });
              this.HxXdCompanyCommonInfoParam.companyInfoId = response.data;
            } else {
              //保存失败
              this.$message({
                type: "success",
                error: msg
              });
              console.log(response.message);
            }
          });
      //   } else {
      //     //校验失败
      //     this.$message({
      //       message: "请正确录入页面数据",
      //       type: "warning"
      //     });
      //   }
      // });
    },
    //常用信息保存
    companyInfoCommonSave() {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          //数据校验成功
          commonUpdate(this.HxXdCompanyCommonInfoParam).then(response => {
            debugger;
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
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
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
      });
    },
    //常用信息查询
    getCommonById(id) {
      
      this.HxXdCompanyCommonInfoParam.companyInfoId = id;
      getCommonById(this.HxXdCompanyCommonInfoParam).then(response => {
        this.HxXdCompanyCommonInfoParam = response.data;
        this.HxXdCompanyCommonInfoParam.companyInfoId = id;
      });
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
